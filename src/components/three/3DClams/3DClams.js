import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Konva from "konva";
import axios from 'axios';

import { getTraits } from "./main";
import decodeDna from "./decodeDna";

import { OrbitControls } from "../../../loaders/OrbitControls";
import GLTFLoader from "../../../loaders/GLTFLoader";
import lighting from "./config/lighting-setup-2.json";

import GLTFExporter from "../../../loaders/GLTFExporter";

// const clock = new THREE.Clock();

THREE.Cache.enabled = true;

const loadTexture = (url) => {
  return new Promise((resolve) => {
    new THREE.TextureLoader().load(url, resolve);
  });
};

const loadGLTF = (url) => {
  return new Promise((resolve) => {
    new GLTFLoader().load(url, resolve);
  });
};

const convertFileToBase64 = blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onload = () => {
      console.log('#####')
      return resolve({
          fileName: 'scene.glb',
          base64: reader.result
      });
    };
    reader.onerror = reject;
});

const save = async (blob, filename, img, traits, setModelPath) => {
  // const href = URL.createObjectURL(blob);
  // console.log(href);
  // const link = document.createElement('a');
  // link.href = URL.createObjectURL(blob);
  // link.download = filename;
  // link.click();
  // URL.revokeObjectURL( url ); breaks Firefox...

  // console.log(blob)
  // const file = await convertFileToBase64(blob);
  // console.log(file)

  const data = new FormData()
  data.append('img', img);
  data.append('traits', JSON.stringify(traits));
  data.append('file', blob, 'scene.glb');
  // console.log(data.get('file'));
  // console.log(data.get('img'))

  const result = await axios.post("http://localhost:4000/upload", data, {
      // receive two    parameter endpoint url ,form data
  })
  console.log(result)
  const glbUrl = `https://gateway.pinata.cloud/ipfs/${result.jsonIpfs.glbHash}`;
  setModelPath(glbUrl)

};

const saveArrayBuffer = (buffer, filename, img, traits, setModelPath) => {
  save(
    new Blob([buffer], { type: "application/octet-stream" }),
    filename,
    img,
    traits,
    setModelPath
  );
};

const exportGLTF = (input, mapRef, traits, setModelPath) => {
  const canvas = mapRef.current.querySelector("canvas");
  const img = canvas.toDataURL("image/jpeg");

  const gltfExporter = new GLTFExporter();

  const options = {
    trs: false,
    onlyVisible: true,
    truncateDrawRange: true,
    binary: true,
    embedImages: true,
    maxTextureSize: Infinity, // To prevent NaN value
  };
  gltfExporter.parse(
    input,
    (result) => {
      if (result instanceof ArrayBuffer) {
        saveArrayBuffer(result, "scene.glb", img, traits, setModelPath);
      } else {
        const output = JSON.stringify(result, null, 2);
        console.log(output);
        saveString(output, "scene.gltf");
      }
    },
    options
  );
};

// const loadObj = (url) => {
//   return new Promise((resolve) => {
//     new THREE.ObjectLoader().load(url, resolve);
//   });
// };

const imageArray = [];

const Clams3D = ({
  width,
  height,
  clamDna,
  decodedDna,
  clamViewer,
  clamTraits,
  setModelPath,
  rgb,
  showSCTraits = false,
  showTraitsTable = false,
}) => {
  const mapRef = useRef(null);
  const mapRef1 = useRef(null);
  const [scene, setScene] = useState("");
  const [traits, setTraits] = useState({});

  if (!clamDna && !clamViewer) return <div>No Clam to see!</div>;

  useEffect(() => {
    const defaultTraits = clamTraits ? clamTraits : getTraits();
    const defaultClamDir = `/clam-models/${defaultTraits.shellShape.toLowerCase()}/`;
    setTraits(defaultTraits);

    if (defaultClamDir) {
      create3DScene(
        mapRef.current,
        setScene,
        defaultTraits,
        defaultClamDir,
        takePhoto,
        clamViewer,
        rgb,
        width,
        height
      );
    }
  }, [mapRef]);

  useEffect(() => {
    if (decodedDna && scene) {
      refreshTraits();
    }
  }, [decodedDna, scene]);

  const takePhoto = () => {
    const canvas = mapRef.current.querySelector("canvas");
    const src = canvas.toDataURL("image/jpeg");
    let img = mapRef1.current;
    img.src = src;
  };

  useEffect(() => {
    if (scene) {
      refreshTraits();
    }
  }, [clamTraits]);

  const refreshTraits = async () => {
    // const traits = getTraits(clamDna);
    const traits = clamViewer ? clamTraits : decodeDna(decodedDna);
    const clamDir = "/clam-models/" + traits.shellShape.toLowerCase() + "/";
    setTraits(traits);

    scene.clear();
    await loadModels(scene, clamDir, traits);
    const layers = await loadAllTextures(traits, clamDir, rgb);
    setScene(scene);
    setTimeout(() => {
      updateShellTextures(scene, layers, traits, takePhoto);
    }, 500);
  };

  const download = () => {
    // console.log(traits)
    exportGLTF(scene, mapRef, traits, setModelPath);
  };

  return (
    <>
      {/* <div className="flex flex-col w-full justify-center bg-gray-50"> */}
      {/* <div className="flex items-center justify-between w-full">
          <Button className="flex flex-col items-center h-18 py-2" onClick={takePhoto}>
            Take Photo
          </Button>
          <Button className="flex flex-col items-center h-18 py-2" onClick={refreshTraits}>
            Refresh Traits
          </Button>
        </div> */}

      {clamViewer ?
        <button className="bg-blue-700 hover:bg-blue-500 text-white rounded-xl shadow-md px-5" onClick={download}>Download</button>
        : ''}

      <div className="flex flex-1 flex-column">
        <div className="three-container" style={{width, height}} ref={mapRef}></div>
        {showTraitsTable ? (
          <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <tbody>
              <tr>
                <td>Rarity</td>
                <td>{traits.rarity}</td>
              </tr>
              <tr>
                <td>Shape</td>
                <td>{traits.shellShape}</td>
              </tr>
              <tr>
                <td>Pattern</td>
                <td>{traits.pattern}</td>
              </tr>
              <tr>
                <td>Tongue</td>
                <td>{traits.tongue}</td>
              </tr>
              <tr>
                <td>Size</td>
                <td>{traits.size}</td>
              </tr>
              <tr>
                <td>LifeSpan</td>
                <td>{traits.lifespan} pearls</td>
              </tr>
              <tr>
                <td>Shell Colour</td>
                <td>{traits.shellColour && traits.shellColour.colour}</td>
              </tr>
              <tr>
                <td>Inner Colour</td>
                <td>{traits.innerColour && traits.innerColour.colour}</td>
              </tr>
              <tr>
                <td>Lip Colour</td>
                <td>{traits.lipColour && traits.lipColour.colour}</td>
              </tr>
              <tr>
                <td>Tongue Colour</td>
                <td>{traits.tongueColour && traits.tongueColour.colour}</td>
              </tr>
            </tbody>
          </table>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* <img className="hidden" src="" ref={mapRef1} style={{ width, height }} /> */}
      {/* </div> */}
      {showSCTraits ? (
        <>
          <div className="mt-4 mb-4 flex-1">
            SC Converted to JS Interpreter: {JSON.stringify(traits, null, 4)}
          </div>
          <br />
          <div className="mt-4 mb-4 flex-1">
            SC Interpreter: {JSON.stringify(decodedDna, null, 4)}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

// const traits = getTraits();
// const clamDir =
//   "clam-models/" + traits.shellShape.replace(/\s+/g, "-").toLowerCase() + "/";

// CREATE A 3D SCENE
const create3DScene = async (
  element,
  setScene,
  traits,
  clamDir,
  takePhoto,
  clamViewer,
  rgb,
  width,
  height
) => {
  // create a 3d renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  renderer.gammaOutput = true;
  renderer.setSize(width, height); // previouly element.offsetWidth, element.offsetHeight

  element.appendChild(renderer.domElement);

  // create a camera
  const fov = 75;
  const aspect = 1;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = -1.4;
  camera.position.y = 0.9;
  camera.position.x = -0.4;
  camera.zoom = 7;
  camera.updateProjectionMatrix();

  // orbit controls to pan and zoom
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.minAzimuthAngle = -2.8632929945846817;
  controls.maxAzimuthAngle = -2.8632929945846817;
  controls.enablePan = false;
  controls.update();

  const txloader = new THREE.TextureLoader();
  const bgTexture = txloader.load("/clam-models/clam-template-bg-3.png");
  const scene = new THREE.Scene();
  scene.background = bgTexture;

  if (clamViewer) {
    await loadModels(scene, clamDir, traits);
    const layers = await loadAllTextures(traits, clamDir, rgb);
    updateShellTextures(scene, layers, traits, takePhoto);
  }

  setScene(scene);

  // load animation after models load
  animate({
    scene,
    camera,
    controls,
    renderer,
  });
};

const loadModels = async (scene, clamDir, traits) => {
  // load lighting
  // const sc = await loadObj("./config/lighting-setup-2.json");
  const loader = new THREE.ObjectLoader();
  const sc = loader.parse(lighting);
  let objs = sc.children;
  do {
    scene.add(objs[0]);
  } while (objs.length > 0);

  const rotator = new THREE.Object3D();
  const clamGroup = new THREE.Group();
  clamGroup.name = "clamgroup";
  rotator.name = "rotator";

  // load clam model
  const clamModel = await loadGLTF(clamDir + "clam.glb");
  const clamRoot = clamModel.scene;
  clamRoot.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  clamRoot.name = "shell";
  clamGroup.add(clamRoot);

  // load tongue model
  const tongueTex = await loadTexture("/clam-models/tongue-normal.png");
  const tongueUrl = clamDir + "Tongues/" + traits.tongue.toLowerCase() + ".glb";
  const tongueModel = await loadGLTF(tongueUrl);
  const tongueRoot = tongueModel.scene;
  tongueRoot.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      n.material.normalMap = tongueTex;
      //n.material.map.anisotropy = 16;
    }
  });
  tongueRoot.name = "tongue";
  clamGroup.add(tongueRoot);

  /*  switch (traits.shellShape) {
    case "Three Lipped":
      clamGroup.rotation.y += 3;
      clamGroup.scale.set(1.7, 1.7, 1.7);
      break;
    case "Big Mouth":
      clamGroup.scale.set(1.75, 1.75, 1.75);
      break;
    case "Fan":
      clamGroup.scale.set(0.2, 0.2, 0.2);
      break;
    case "Common":
      clamGroup.rotation.set(-0.2, 0, 0.1);
      break;
    case "Spade":
      clamGroup.scale.set(1.25, 1.25, 1.25);
      break;
    case "Heart":
      clamGroup.rotation.set(0.1, -0.1, 0);
      break;
    case "Sharp Tooth":
      clamGroup.rotation.set(0.1, 0, 0);
      clamGroup.scale.set(1.35, 1.35, 1.35);
      clamGroup.position.y += 0.05;
      break;
    default:
      break;
  }
*/
  rotator.add(clamGroup);
  scene.add(rotator);
  rotator.position.z = -0.05;
  clamGroup.position.z = 0.05;
};

const setKonvaLayerTexture = (layer, color, rgb) => {
  //   layer.hue(parseFloat(color.h));
  //   layer.saturation(parseFloat(color.s));
  //   layer.value(parseFloat(color.v));
  if (rgb) {
    layer.red(color.r);
    layer.green(color.g);
    layer.blue(color.b);
  } else {
    layer.hue(parseFloat(color[0]));
    layer.saturation(parseFloat(color[1] / 100));
    layer.value(parseFloat(color[2] / 100));
  }
  layer.batchDraw();
};

// const loadTextureKonva = async function (obj, textureFile) {
const loadTextureKonva = async (object, texture, base, rgb) => {
  const obj = object.type;
  const img = texture.image;
  const sliders = ["hue", "saturation", "value"];

  const div = document.createElement("div");

  const stage = new Konva.Stage({
    container: div, // obj + '-canvas',
    width: 1024,
    height: 1024,
  });
  const layer = new Konva.Layer();

  imageArray[obj] = new Konva.Image({
    x: 0,
    y: 0,
    image: img,
    width: 1024,
    height: 1024,
  });
  layer.add(imageArray[obj]);

  if (obj === "os") {
    const pattern = new Konva.Image({
      x: 0,
      y: 0,
      image: base.image,
      width: 1024,
      height: 1024,
      // fill: '#000',
      // stroke: '#ff0000'
    });
    layer.add(pattern);
  }

  layer.cache();
  if (rgb) {
    layer.filters([Konva.Filters.RGBA]);
  } else {
    layer.filters([Konva.Filters.HSV]);
  }
  stage.add(layer);

  setKonvaLayerTexture(layer, object.color, rgb);

  return layer;
};

const loadAllTextures = async (traits, clamDir, rgb) => {
  const textures = [
    {
      type: "os",
      img: "outerPBS_basecolor.png",
      color: traits.shellColour.HSVadj || traits.shellColour,
    },
    {
      type: "is",
      img: "innerPBS_basecolor.png",
      color: traits.innerColour.HSVadj || traits.innerColour,
    },
    {
      type: "lip",
      img: "lip_basecolor.png",
      color: traits.lipColour.HSVadj || traits.lipColour,
    },
    {
      type: "tongue",
      img: "tongue_BaseColor.png",
      color: traits.tongueColour.HSVadj || traits.tongueColour,
    },
  ];
  //console.log(textures);
  const loaded = await Promise.all(
    textures.map((k) => loadTexture(clamDir + k.img))
  );
  const base = await loadTexture(
    "/clam-models/patterns/" + traits.pattern.toLowerCase() + "_basecolor.png"
  );

  return Promise.all(
    textures.map((k, i) => loadTextureKonva(k, loaded[i], base, rgb))
  );
};

const updateShellTextures = (scene, containers, traits, takePhoto) => {
  const osCanvas = containers[0].toCanvas();
  const isCanvas = containers[1].toCanvas();
  const lipCanvas = containers[2].toCanvas();
  const tongueCanvas = containers[3].toCanvas();

  let shell = 0;
  let tongue = 0;

  if (osCanvas && isCanvas && lipCanvas && tongueCanvas) {
    const osTexture = new THREE.CanvasTexture(osCanvas);
    const isTexture = new THREE.CanvasTexture(isCanvas);
    const lipTexture = new THREE.CanvasTexture(lipCanvas);
    const tongueTexture = new THREE.CanvasTexture(tongueCanvas);

    tongueTexture.rotation = Math.random() * Math.PI;

    tongueTexture.flipY = false;
    osTexture.flipY = false;
    isTexture.flipY = false;
    lipTexture.flipY = false;

    if (scene.children[3].children[0].children[0].name == "shell") {
      shell = scene.children[3].children[0].children[0];
      tongue = scene.children[3].children[0].children[1];
    } else {
      shell = scene.children[3].children[0].children[1];
      tongue = scene.children[3].children[0].children[0];
    }

    shell.children[0].children.forEach((half) => {
      console.log(half);
      if (half.name == "crown") {
        half.material.map = osTexture;
      } else if (half.name == "lips") {
        half.material.map = lipTexture;
      } else {
        /*
          half.children.forEach(texture => {
            console.log(texture.material.name);
            switch(texture.material.name) {
              case "lip":
                texture.material.map = lipTexture;
                break;
              case "outter_shell":
                texture.material.map = osTexture;
                break;
              default:
                texture.material.map = isTexture;
                break;
            }
          })
*/

        half.children[1].material.map = osTexture;
        console.log(traits.shellShape.toLowerCase());
        if (
          traits.shellShape.toLowerCase() == "heart" ||
          traits.shellShape.toLowerCase() == "sharptooth" ||
          traits.shellShape.toLowerCase() == "hamburger" ||
          traits.shellShape.toLowerCase() == "fan"
        ) {
          console.log("test");
          half.children[0].material.map = lipTexture;
          half.children[2].material.map = isTexture;
        } else {
          if (traits.shellShape != "maxima") {
            half.children[2].material.map = lipTexture;
          }
          half.children[0].material.map = isTexture;
        }

        //  (traits.shellShape == "fan" || traits.shellShape == "heart" || traits.shellShape == "sharpTooth" || traits.shellShape == "hamburger") ?
        //      half.children[2].material.map = isTexture
        //      : half.children[0].material.map = isTexture;
      }
    });

    if (tongue.children[0]) {
      tongue.children[0].children[0].material.map = tongueTexture;
    }

    osTexture.needsUpdate = true;
    isTexture.needsUpdate = true;
    lipTexture.needsUpdate = true;
    tongueTexture.needsUpdate = true;

    console.log(traits);
    console.log(scene);
    // setTimeout(() => {
    //   takePhoto();
    // }, 1000);
  }
};

// CALL ANIMATE EVERY SECOND TO DISPLAY
const animate = ({ scene, camera, controls, renderer }) => {
  window.requestAnimationFrame(() => {
    animate({
      scene,
      camera,
      controls,
      renderer,
    });
  });
  controls.update();

  // const clamGroup = scene.getObjectByName("clamgroup");
  const rotator = scene.getObjectByName("rotator");

  //if(clamGroup) clamGroup.rotation.y +=  Math.PI * 2 / (10 / clock.getDelta());
  if (rotator) {
    rotator.rotation.y += (Math.PI * 2) * 0.001;
  }

  renderer.render(scene, camera);
};

export default Clams3D;
