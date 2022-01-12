import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

// font awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faSearchMinus } from "@fortawesome/free-solid-svg-icons";

// THREE.JS LIBRARIES
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import loadGLTF from "./loaders/gltf_loader";
import CameraControls from 'camera-controls';

// local file functions
import "./3d_map.scss";
import createWater from "./create_water";
import createSky from "./create_sky";
import { LiteVersionSwitcher } from "../liteVersionSwitcher";
import { CAMERA_SETTINGS } from "constants/ui/mapCameraSettings";

import { ISLAND_OBJECTS, ISLANDS_NAMES } from './constants';
import LoadingScreen from "components/LoadingScreen";
import { MapGuider } from "./mapGuider";
import { GuidedTourButton } from "./mapGuider/GuidedTourButton";

const clock = new THREE.Clock();

THREE.Cache.enabled = true;
CameraControls.install( { THREE: THREE } );

const Map3D = ({ isGuidedTourPassed, setIsGuidedTourPassed }) => {
  const mapRef = useRef(null);
  const hoverLabelRef = useRef(null);
  const cameraControls = useRef(null);
  const modelObjs = useRef([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [hoverName, setHoverName] = useState("");
  const [loadedFiles, setLoadedFiles] = useState(0)

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let renderer, scene, camera, water;

  let composer,
    outlinePass,
    effectFXAA,
    outlineMeshes = [],
    hoverStr = "";

  let lighthouseOutlineMeshes,
    farmOutlineMeshes,
    vaultOutlineMeshes,
    marketOutlineMeshes,
    bankOutlineMeshes;

  useEffect(() => {
    create3DScene(mapRef.current, setLoading);
  }, [mapRef]);

  const zoomIn = () => {
    cameraControls.current.dolly( 200, true )
  };

  const zoomOut = () => {
    cameraControls.current.dolly( -200, true )
  };

  const create3DScene = async (element, setLoading) => {
    renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);

    element.appendChild(renderer.domElement);
    renderer.setClearColor(0xe1e1e1, 1);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.set(650, 350, 500);

    const controls = new CameraControls( camera, renderer.domElement );
    controls.minDistance = CAMERA_SETTINGS.minDistance;
    controls.maxDistance = CAMERA_SETTINGS.maxDistance;
    controls.minPolarAngle = CAMERA_SETTINGS.minPolarAngle;
    controls.maxPolarAngle = CAMERA_SETTINGS.maxPolarAngle;
    controls.mouseButtons.right = CameraControls.ACTION.NONE;
    controls.saveState();
    cameraControls.current = controls;

    scene = new THREE.Scene();

    water = createWater({ scene });
    createSky({ scene, water, renderer });
    addLights();

    const callback = () => setLoadedFiles((prev) => prev + 1);
    modelObjs.current = (await Promise.all(ISLAND_OBJECTS.map((k, i) =>
      loadGLTF(k.objectUrl, scene, k.type, k.name, callback)
    )))
      .map((model, index) => ({
        ...ISLAND_OBJECTS[index],
        model,
        boundingBox: ISLANDS_NAMES[ISLAND_OBJECTS[index].name] && new THREE.Box3().setFromObject(model),
      }));

    setOutlineMeshes();

    setLoading(false);
    composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera
    );
    outlinePass.edgeStrength = 10;
    outlinePass.edgeThickness = 2;
    outlinePass.pulsePeriod = 2;
    outlinePass.edgeGlow = 0.2;
    outlinePass.visibleEdgeColor.set(0x38dcdc);
    outlinePass.hiddenEdgeColor.set(0x38dcdc);
    composer.addPass(outlinePass);

    effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms["resolution"].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    composer.addPass(effectFXAA);

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("click", onMouseClick);

    animate();
  };

  const addLights = () => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
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

  const getOutlineMesh = (name) => {
    const mesh = modelObjs.current.find(k => k.name === name).model;
    return mesh.children.filter((el) => el.name === name);
  };

  const setOutlineMeshes = () => {
    lighthouseOutlineMeshes = getOutlineMesh(ISLANDS_NAMES.lighthouse);
    farmOutlineMeshes = getOutlineMesh(ISLANDS_NAMES.farm);
    vaultOutlineMeshes = getOutlineMesh(ISLANDS_NAMES.vault);
    marketOutlineMeshes = getOutlineMesh(ISLANDS_NAMES.market);
    bankOutlineMeshes = getOutlineMesh(ISLANDS_NAMES.bank);

    outlineMeshes = [
      ...lighthouseOutlineMeshes,
      ...farmOutlineMeshes,
      ...marketOutlineMeshes,
      ...bankOutlineMeshes,
      ...vaultOutlineMeshes,
    ];
  };
  let now = Date.now();
  const animate = () => {
    let tDelta = (Date.now() - now) / 1000;
    now = Date.now();
    let t = clock.getElapsedTime();
    if (cameraControls.current) {
      cameraControls.current.update(tDelta);
    }

    requestAnimationFrame(animate);
    if (water) water.material.uniforms["time"].value += 1.0 / 60.0;

    modelObjs.current.forEach(k => {
      if (k.buoyancy) {
        giveBuoyancy(k.model, t, k.buoyancy.factor, k.buoyancy.init);
      }
    });

    flyingSeagulls(tDelta);
    swimmingDolphins(tDelta);

    composer.render();
  };

  const giveBuoyancy = (obj, t, factor, init) => {
    if (obj) {
      const delta = Math.sin(factor + t);
      const newPos = delta * factor;
      obj.position.y = init + newPos;
    }
  };

  const flyingSeagulls = (tDelta) => {
    const seagulls = modelObjs.current.find(k => k.type === 'seagull').model;
    if (seagulls) {
      seagulls.forEach((seagull) => {
        seagull.pivot.rotation.y += seagull.pivot.userData.speed + tDelta / 2;
      });
    }
  };

  const swimmingDolphins = (tDelta) => {
    const dolphins = modelObjs.current.find(k => k.type === 'dolphin').model;
    if (dolphins) {
      dolphins.forEach((dolphin, i) => {
        dolphin.pivot.rotation.x += tDelta;
        let zpos, xpos;
        if (i < 2) {
          zpos = Math.random() * 225 - 500;
          xpos = Math.random() * 70 - 150;
        } else {
          zpos = Math.random() * 100 + 350;
          xpos = Math.random() * 100 - 250;
        }
        if (THREE.Math.radToDeg(dolphin.pivot.rotation.x) % 360 > 120 && !dolphin.pivot.under) {
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

  const onMouseMove = (event) => {
    if (event.isPrimary === false) return;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    checkIntersection(event);
  };

  const onMouseClick = () => {
    // places: bank, farm, market, vault, lighthouse
    if (hoverStr === '') return;
    const obj = modelObjs.current.find(k => k.name === hoverStr);
    if (obj && obj.url && obj.urlType === 'external') {
      return window.open(obj.url, '_blank');
    } else if (obj && obj.url) {
      return history.push(obj.url);
    } else {
      window.open('', '_self');
    }
  };

  const checkIntersection = () => {
    raycaster.setFromCamera(mouse, camera);
    const intersect = raycaster.intersectObjects(outlineMeshes, true)[0];
    if (intersect) {
      const interParent = intersect.object.parent.name;
      const currentHover = hoverStr;
      switch (interParent) {
        case ISLANDS_NAMES.lighthouse: {
          if (hoverStr !== ISLANDS_NAMES.lighthouse) {
            hoverStr = ISLANDS_NAMES.lighthouse;
            outlinePass.selectedObjects = lighthouseOutlineMeshes;
          }
          break;
        }
        case ISLANDS_NAMES.farm: {
          if (hoverStr !== ISLANDS_NAMES.farm) {
            hoverStr = ISLANDS_NAMES.farm;
            outlinePass.selectedObjects = farmOutlineMeshes;
          }
          break;
        }
        case ISLANDS_NAMES.market: {
          if (hoverStr !== ISLANDS_NAMES.market) {
            hoverStr = ISLANDS_NAMES.market;
            outlinePass.selectedObjects = marketOutlineMeshes;
          }
          break;
        }
        case ISLANDS_NAMES.bank: {
          if (hoverStr !== ISLANDS_NAMES.bank) {
            hoverStr = ISLANDS_NAMES.bank;
            outlinePass.selectedObjects = bankOutlineMeshes;
          }
          break;
        }
        case ISLANDS_NAMES.vault: {
          if (hoverStr !== ISLANDS_NAMES.vault) {
            hoverStr = ISLANDS_NAMES.vault;
            outlinePass.selectedObjects = vaultOutlineMeshes;
          }
          break;
        }
        default:
          console.error("intersect obj is not found");
      }
      if (currentHover !== hoverStr) {
        setHoverName(hoverStr);
      }

      // if (currentHover !== hoverStr) {
      //   setHoverName(hoverStr);
      //   const hoverLabel = hoverLabelRef.current;
      //   hoverLabel.style.left = event.clientX + 50 + "px";
      //   hoverLabel.style.top = event.clientY - 100 + "px";
      //   hoverLabel.style.display = "block";
      // }
    } else {
      if (hoverStr !== "") {
        hoverStr = "";
        outlinePass.selectedObjects = [];
        const hoverLabel = hoverLabelRef.current;
        hoverLabel.style.display = "none";
        setHoverName("");
      }
    }
  };

  return (
    <div>
      {loading && (
        <>
          <LoadingScreen text="Taking you to Clam Island..." progress={(loadedFiles / ISLAND_OBJECTS.length) * 100} />
          <LiteVersionSwitcher />
        </>
      )}
      <button className="zoom-btn zoom-in text-blue-500" onClick={zoomIn}>
        <FontAwesomeIcon icon={faSearchPlus} />
      </button>
      <button className="zoom-btn zoom-out text-blue-500" onClick={zoomOut}>
        <FontAwesomeIcon icon={faSearchMinus} />
      </button>
      <div
        className={`three-container ${hoverName !== "" ? "hover" : ""}`}
        id="container"
        ref={mapRef}
      />
      <div id="hoverLabel" ref={hoverLabelRef}>Opening Soon</div>
      {!isGuidedTourPassed && <MapGuider controls={cameraControls.current} islandModels={modelObjs.current} setIsGuidedTourPassed={setIsGuidedTourPassed} />}
      {isGuidedTourPassed && <GuidedTourButton setIsGuidedTourPassed={setIsGuidedTourPassed} />}
    </div>
  );
};

export default Map3D;
