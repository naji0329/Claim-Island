import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { OrbitControls, MapControls } from "../../loaders/OrbitControls";

import loadGLTF from "./loaders/gltf_loader";
import createWater from "./create_water";
import createSky from "./create_sky";

import clamIcon from "../../assets/clam-icon.png";

import "./3d_map.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faSearchMinus } from "@fortawesome/free-solid-svg-icons";

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
  //renderer.toneMapping = THREE.ACESFilmicToneMapping;
  //renderer.toneMappingExposure = 1.2;
  // renderer.gammaOutput = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  // renderer.gammaFactor = 2.2;
  renderer.setSize(window.innerWidth, window.innerHeight);

  //console.log(renderer);

  // renderer.setPixelRatio( window.devicePixelRatio );
  // renderer.setSize( window.innerWidth, window.innerHeight );
  // renderer.toneMapping = THREE.ACESFilmicToneMapping;

  element.appendChild(renderer.domElement);

  // create a camera
  // const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
  // camera.position.set( 0, 2, 5 );
  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    20000
  );
  camera.position.set(730, 380, 700);
  // camera.position.set( 1, 1, 20 );
  // camera.position.set( 0, 2, 5 );
  camera.lookAt(0, 0, 0);

  // orbit controls to pan and zoom
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minZoom = 1;
  controls.maxZoom = 3;
  controls.minDistance = 400;
  controls.maxDistance = 1000;
  controls.maxPolarAngle = 1.5;
  controls.enablePan = false;

  // console.log(camera, controls);
  setControls(controls);

  // create a scene
  const scene = new THREE.Scene();
  // scene.background = new THREE.Color( 0xe1e1e1 );

  const water = createWater({ scene });

  createSky({ scene, water, renderer });

  addLights(scene);

  // load animation before all models load
  animate({
    scene,
    water,
    camera,
    controls,
    renderer,
    setControls,
  });

  // load gltf
  console.log("loading bank island ...");
  const bank = await loadGLTF("glb_files/Bank_Island.glb", scene);
  console.log("loading farm island ...");
  const farm = await loadGLTF("glb_files/Farm_Island.glb", scene);
  console.log("loading market island ...");
  const market = await loadGLTF("glb_files/Market_Island.glb", scene);
  console.log("loading vault island ...");
  const vault = await loadGLTF("glb_files/Vault_Island.glb", scene);
  const bridge = await loadGLTF("glb_files/Bridges.glb", scene, "bridge");
  const rocks = await loadGLTF("glb_files/Rocks.glb", scene, "rocks");
  //const lilly = await loadGLTF('glb_files/LillyPads.glb', scene, 'lillies');
  const boats = await loadGLTF("glb_files/Boats.glb", scene);
  const ship = await loadGLTF("glb_files/ship-2.glb", scene, "ship");
  const sailboat = await loadGLTF("glb_files/sailboat.glb", scene, "sailboat");

  const seagulls = await loadGLTF("glb_files/seagull.glb", scene, "seagull");
  const dolphins = await loadGLTF("glb_files/dolphin.glb", scene, "dolphin");

  //market.position.z = 40;
  //vault.position.x = 35;
  console.log(bank, farm, market, vault, bridge, rocks, sailboat, ship);

  setLoading(false);

  // load animation after models load
  animate({
    scene,
    water,
    camera,
    controls,
    renderer,
    ship,
    bank,
    market,
    vault,
    bridge,
    boats,
    sailboat,
    seagulls,
    dolphins,
    setControls,
  });
};

// ADD LIGHTS
const addLights = (scene) => {
  // const ambient = new THREE.AmbientLight( 0xffffff );
  // scene.add( ambient );

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
  //directionalLight.position.set( 140, 10, 0 ).normalize();
  directionalLight.position.set(500, 400, -100);
  directionalLight.rotation.set(0, 0.3, -0.55);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.scale.set(150, 150, 150);
  directionalLight.shadow.mapSize.set(2048, 2048);
  scene.add(directionalLight);
  console.log(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
  //directionalLight2.position.set( -190, 10, 0 ).normalize();
  directionalLight2.position.set(-2700, 2000, 900);
  directionalLight2.rotation.set(0, 0.3, 0.6);

  scene.add(directionalLight2);
  console.log(directionalLight2);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe0fffc, 0.4);
  scene.add(hemiLight);

  console.log(hemiLight);

  //scene.add( new THREE.DirectionalLightHelper( directionalLight, 5, 0xfc0317 ) );
  //scene.add( new THREE.CameraHelper( directionalLight.shadow.camera, 5, 0x0022ff ) );
  //scene.add( new THREE.DirectionalLightHelper( directionalLight2, 5, 0xfc0317 ) );
};

// CALL ANIMATE EVERY SECOND TO DISPLAY
const animate = ({
  scene,
  camera,
  water,
  controls,
  renderer,
  ship,
  bank,
  market,
  vault,
  bridge,
  boats,
  sailboat,
  seagulls,
  dolphins,
  setControls,
}) => {
  window.requestAnimationFrame(() => {
    animate({
      scene,
      water,
      camera,
      controls,
      renderer,
      ship,
      bank,
      market,
      vault,
      bridge,
      boats,
      sailboat,
      seagulls,
      dolphins,
      setControls,
    });
  });
  controls.update();
  setControls(controls);
  water.material.uniforms["time"].value += 1.0 / 60.0;

  let t = clock.getElapsedTime();
  const tdelta = clock.getDelta();
  giveBuoyancy(ship, t, 4, 35);
  giveBuoyancy(bank, t, 2, -5);
  giveBuoyancy(market, t, 2, 2);
  giveBuoyancy(vault, t, 2, 2);
  giveBuoyancy(bridge, t, 2, 30);
  giveBuoyancy(boats, t, 1.5, 1);
  //giveBuoyancy(lilly, t, 0.3, 32);
  giveBuoyancy(sailboat, t, 2, 38);

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
      //console.log(THREE.Math.radToDeg(dolphin.pivot.rotation.x) % 360);
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
