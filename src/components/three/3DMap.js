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
import { OrbitControls } from "../../loaders/OrbitControls";
import loadGLTF from "./loaders/gltf_loader";

// local file functions
import "./3d_map.scss";
import { ISLAND_OBJECTS } from "./constants";
import createWater from "./create_water";
import createSky from "./create_sky";
import clamIcon from "../../assets/clam-icon.png";

// Set the three.js clock
const clock = new THREE.Clock();
THREE.Cache.enabled = true;

// MAIN CREATE COMPONENT
const Map3D = () => {
  const mapRef = useRef(null);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [hoverName, setHoverName] = useState("");

  // ON PAGE LOAD SETUP THREEJS
  useEffect(() => {
    create3DScene(mapRef.current, setLoading);
  }, [mapRef]);

  // GLOBAL VARIABLES FOR THREE.JS
  let renderer, scene, camera, controls, water, objects;
  let seagulls, dolphins;
  let composer,
    outlinePass,
    hotMeshArr = [],
    hoverStr = "";

  const zoomIn = () => {
    controls.dollyIn();
  };
  const zoomOut = () => {
    controls.dollyOut();
  };

  // Raycaster to intersect with objects with the mouse
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // SETUP THE RENDERER AND LOAD MODELS AND SETUP 3D SCENE
  const create3DScene = async (element, setLoading) => {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xe1e1e1, 1);
    element.appendChild(renderer.domElement);

    // SETUP THE CAMERA
    camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      20000
    );
    camera.position.set(730, 380, 700);

    // SETUP CONTROLS FOR ZOOM IN AND ZOOM OUT
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 800;
    controls.maxDistance = 1500;
    controls.maxPolarAngle = 1.5;
    controls.enablePan = false;

    // CREATE THE 3D SCENE
    scene = new THREE.Scene();

    // ADD WATER, SKY AND LIGHTING
    water = createWater({ scene });
    createSky({ scene, water, renderer });
    addLights();

    // LOAD ALL MODELS. URLS mentioned in constants file
    objects = await Promise.all(
      ISLAND_OBJECTS.map((k) => loadGLTF(k.objectUrl, scene, k.type, k.name))
    );
    // dolphins and seagulls are array of objects
    dolphins = objects[ISLAND_OBJECTS.findIndex(k => k.type === 'dolphin')];
    seagulls = objects[ISLAND_OBJECTS.findIndex(k => k.type === 'seagull')];

    // CLICKABLE models. 
    hotMeshArr = objects.filter(
      (k) =>
        ISLAND_OBJECTS.filter((d) => d.clickable)
          .map((d) => d.name)
          .indexOf(k.name) !== -1
    );

    // ONCE ALL MODELS LOADED SET LOADING ICON TO FALSE
    setLoading(false);

    const renderPass = new RenderPass(scene, camera);
    outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera
    );
    outlinePass.edgeStrength = 30;

    composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(outlinePass);

    // renderer mouse events
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("click", onMouseClick);

    animate();
  };

  // Add lighting to the scene
  const addLights = () => {
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

  // THREE.JS Animation function
  const animate = () => {
    requestAnimationFrame(animate);
    if (water) water.material.uniforms["time"].value += 1.0 / 60.0;

    let t = clock.getElapsedTime();
    const tdelta = clock.getDelta();
    giveBuoyancy(objects.find(k => k.name === 'ship'), t, 4, 35);
    giveBuoyancy(objects.find(k => k.name === 'bank'), t, 2, -5);
    giveBuoyancy(objects.find(k => k.name === 'market'), t, 2, 2);
    giveBuoyancy(objects.find(k => k.name === 'vault'), t, 2, 2);

    giveBuoyancy(objects.find(k => k.name === 'bridge'), t, 2, 30);
    giveBuoyancy(objects.find(k => k.name === 'boats'), t, 1.5, 1);
    //giveBuoyancy(lilly, t, 0.3, 32);
    giveBuoyancy(objects.find(k => k.name === 'sailboat'), t, 2, 38);

    flyingSeagulls(seagulls, tdelta);
    swimmingDolphins(dolphins, t);

    renderer.render(scene, camera);
  };

  // Buoyancy function for bobbing up and down
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

  // ON MOUSE OVER CHECk FOR INTERSECTION
  const onMouseMove = (event) => {
    if (event.isPrimary === false) return;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    checkIntersection();
  };

  // When model is clicked it will go to the url if hover intersect matched
  const onMouseClick = () => {
    if (hoverStr === "") return;
    const newUrlStr = ISLAND_OBJECTS.find(k => k.name === hoverStr).url;
    history.push(newUrlStr);
    // window.open(newUrlStr, "_blank");
  };

  // RAYCAST to get intersecting models and set the name of the matching model
  const checkIntersection = () => {
    raycaster.setFromCamera(mouse, camera);
    const intersect = raycaster.intersectObjects(hotMeshArr, true)[0];

    if (intersect) {
      // get the intersected object
      const match = hotMeshArr.find((gltf) =>
        gltf.children[0].children.find((k) => k.uuid === intersect.object.uuid)
      );

      if (hoverStr !== match.name) {
        hoverStr = match.name;
        setHoverName(hoverStr);
      }
    } else {
      if (hoverStr !== "") {
        hoverStr = "";
        setHoverName("");
      }
    }
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
      <div
        className={`three-container ${hoverName !== "" ? "hover" : ""}`}
        ref={mapRef}
      ></div>
    </div>
  );
};

export default Map3D;
