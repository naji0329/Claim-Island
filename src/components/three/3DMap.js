import React, { useEffect, useRef, useState } from "react";
// import { useHistory } from "react-router-dom";

// font awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faSearchMinus } from "@fortawesome/free-solid-svg-icons";

// THREE.JS LIBRARIES
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { OrbitControls } from "../../loaders/OrbitControls";
import loadGLTF from "./loaders/gltf_loader";

// local file functions
import "./3d_map.scss";
import { ISLAND_OBJECTS } from "./constants";
import createWater from "./create_water";
import createSky from "./create_sky";
import clamIcon from "../../assets/clam-icon.png";

const clock = new THREE.Clock();

THREE.Cache.enabled = true;

const Map3D = (props) => {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [controls, setControls] = useState({});

  useEffect(() => {
    create3DScene(mapRef.current, setLoading, setControls);
  }, [mapRef]);

  const zoomIn = () => {
    controls.dollyIn();
  };

  const zoomOut = () => {
    controls.dollyOut();
  };

  return (
    <div>
      <div className={!loading ? "loading-screen hide" : "loading-screen"}>
        <div className="loading-elems">
          <img src={clamIcon} />
          <p>Taking you to Clam Island...</p>
        </div>
      </div>
      <button className="zoom-btn zoom-in text-blue-500" onClick={zoomIn}>
        <FontAwesomeIcon icon={faSearchPlus} />
      </button>
      <button className="zoom-btn zoom-out text-blue-500" onClick={zoomOut}>
        <FontAwesomeIcon icon={faSearchMinus} />
      </button>
      <div className="three-container" ref={mapRef}></div>
    </div>
  );
};

// CREATE A 3D SCENE
const create3DScene = async (element, setLoading, setControls) => {
  // create a 3d renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xe1e1e1, 1);
  element.appendChild(renderer.domElement);

  // create a camera
  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    20000
  );
  camera.position.set(730, 380, 700);
  camera.lookAt(0, 0, 0);

  // orbit controls to pan and zoom
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minZoom = 1;
  controls.maxZoom = 3;
  controls.minDistance = 400;
  controls.maxDistance = 1000;
  controls.maxPolarAngle = 1.5;
  controls.enablePan = false;

  setControls(controls);

  // create a scene
  const scene = new THREE.Scene();
  // scene.background = new THREE.Color( 0xe1e1e1 );

  const water = createWater({ scene });
  createSky({ scene, water, renderer });
  addLights(scene);

  // LOAD ALL MODELS. URLS mentioned in constants file
  const objects = await Promise.all(
    ISLAND_OBJECTS.map((k) => loadGLTF(k.objectUrl, scene, k.type, k.name))
  );
  // dolphins and seagulls are array of objects
  const dolphins = objects[ISLAND_OBJECTS.findIndex(k => k.type === 'dolphin')];
  const seagulls = objects[ISLAND_OBJECTS.findIndex(k => k.type === 'seagull')];

  setLoading(false);

  // const outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
  // outlinePass.edgeStrength = 50;
  // outlinePass.edgeThickness = 2;
  // outlinePass.pulsePeriod = 3;
  // outlinePass.visibleEdgeColor.set( 0xFF0000 );
  // outlinePass.hiddenEdgeColor.set( 0xFF0000 );

  // const renderPass = new RenderPass( scene, camera );

  // const composer = new EffectComposer( renderer );
  // composer.addPass( outlinePass );
  // composer.addPass( renderPass );

  // renderer.domElement.addEventListener( 'mousemove', onMouseMove );
  // renderer.domElement.addEventListener( 'click', onMouseClick );

  // load animation after models load
  animate({
    scene,
    water,
    camera,
    controls,
    renderer,
    seagulls,
    dolphins,
    setControls,
    objects
  });
};

// ADD LIGHTS
const addLights = (scene) => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
  directionalLight.position.set(500, 400, -100);
  directionalLight.rotation.set(0, 0.3, -0.55);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.scale.set(150, 150, 150);
  directionalLight.shadow.mapSize.set(2048, 2048);
  scene.add(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight2.position.set(-2700, 2000, 900);
  directionalLight2.rotation.set(0, 0.3, 0.6);

  scene.add(directionalLight2);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe0fffc, 0.4);
  scene.add(hemiLight);
};

// CALL ANIMATE EVERY SECOND TO DISPLAY
const animate = ({
  scene,
  camera,
  water,
  controls,
  renderer,
  seagulls,
  dolphins,
  setControls,
  objects
}) => {
  window.requestAnimationFrame(() => {
    animate({
      scene,
      water,
      camera,
      controls,
      renderer,
      seagulls,
      dolphins,
      setControls,
      objects
    });
  });
  controls.update();
  setControls(controls);
  water.material.uniforms["time"].value += 1.0 / 60.0;

  let t = clock.getElapsedTime();
  const tdelta = clock.getDelta();

  if(objects) {
    giveBuoyancy(objects.find(k => k.name === 'ship'), t, 4, 35);
    giveBuoyancy(objects.find(k => k.name === 'bank'), t, 2, -5);
    giveBuoyancy(objects.find(k => k.name === 'market'), t, 2, 2);
    giveBuoyancy(objects.find(k => k.name === 'vault'), t, 2, 2);

    giveBuoyancy(objects.find(k => k.name === 'bridge'), t, 2, 30);
    giveBuoyancy(objects.find(k => k.name === 'boats'), t, 1.5, 1);
    giveBuoyancy(objects.find(k => k.name === 'sailboat'), t, 2, 38);
  }

  flyingSeagulls(seagulls, tdelta);
  swimmingDolphins(dolphins, t);

  renderer.render(scene, camera);
};

const giveBuoyancy = (obj, t, factor, init) => {
  if (obj) {
    const delta = Math.sin(factor + t);
    const newPos = delta * factor;
    obj.position.y = init + newPos;
  }
};

const flyingSeagulls = (seagulls, t) => {
  if (seagulls) {
    seagulls.forEach((seagull, i) => {
      seagull.pivot.rotation.y += seagull.pivot.userData.speed + 0.01;
    });
  }
};

const swimmingDolphins = (dolphins, t) => {
  if (dolphins) {
    dolphins.forEach((dolphin, i) => {
      dolphin.pivot.rotation.x += 0.02;
      if (i < 2) {
        var zpos = Math.random() * 225 - 500;
        var xpos = Math.random() * 70 - 150;
      } else {
        var zpos = Math.random() * 100 + 350;
        var xpos = Math.random() * 100 - 250;
      }
      if (
        THREE.Math.radToDeg(dolphin.pivot.rotation.x) % 360 > 120 &&
        !dolphin.pivot.under
      ) {
        dolphin.pivot.position.z = zpos;
        dolphin.pivot.position.x = xpos;
        dolphin.pivot.rotation.x += THREE.Math.degToRad(Math.random() * 90);
        dolphin.pivot.under = true;
      } else if (
        THREE.Math.radToDeg(dolphin.pivot.rotation.x) % 360 <= 120 &&
        THREE.Math.radToDeg(dolphin.pivot.rotation.x) % 360 >= 60
      ) {
        dolphin.pivot.under = false;
      }
    });
  }
};

export default Map3D;