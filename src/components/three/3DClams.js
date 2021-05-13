import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { OrbitControls, MapControls} from '../../loaders/OrbitControls';

import loadGLTF from './loaders/gltf_loader';

const clock = new THREE.Clock();

THREE.Cache.enabled = true;

const Clams3D = (props) => {
    const mapRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        create3DScene(mapRef.current, setLoading)
    }, [mapRef]);

    return (
        <div>
            <div className='three-container' ref={mapRef}></div>
        </div>
    );
};

// CREATE A 3D SCENE
const create3DScene = async (element) => {
    // create a 3d renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    //renderer.toneMapping = THREE.ACESFilmicToneMapping;
    //renderer.toneMappingExposure = 1.2;
    // renderer.gammaOutput = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    // renderer.gammaFactor = 2.2;
    renderer.setSize( window.innerWidth, window.innerHeight );

    //console.log(renderer);


    // renderer.setPixelRatio( window.devicePixelRatio );
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;

    element.appendChild( renderer.domElement );

    // create a camera
    // const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    // camera.position.set( 0, 2, 5 );
    const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
	camera.position.set( 730, 380, 700 );
    // camera.position.set( 1, 1, 20 );
    // camera.position.set( 0, 2, 5 );
    camera.lookAt( 0, 0, 0 );

    // orbit controls to pan and zoom
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.minZoom = 1;
    controls.maxZoom = 3;
    controls.minDistance = 400;
    controls.maxDistance = 1000;
    controls.maxPolarAngle = 1.5;
    controls.enablePan = false;

    console.log(camera, controls);

    // create a scene
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xe1e1e1 );


    const water = createWater({ scene });

    createSky({ scene, water, renderer });

    addLights(scene);

    // load animation before all models load
    // animate({
    //     scene, water, camera, controls, renderer
    // });

    // load animation after models load
    animate({
        scene,
        water,
        camera,
        controls,
        renderer
    });
};

// ADD LIGHTS
const addLights = (scene) => {
    // const ambient = new THREE.AmbientLight( 0xffffff );
    // scene.add( ambient );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 );
    //directionalLight.position.set( 140, 10, 0 ).normalize();
    directionalLight.position.set( 500, 400, -100 );
    directionalLight.rotation.set(0, 0.3, -0.55);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.scale.set(150, 150, 150);
    directionalLight.shadow.mapSize.set(2048, 2048);
    scene.add( directionalLight );
    console.log(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    //directionalLight2.position.set( -190, 10, 0 ).normalize();
    directionalLight2.position.set( -2700, 2000, 900 );
    directionalLight2.rotation.set(0, 0.3, 0.6);

    scene.add( directionalLight2 );
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
    scene, camera, controls, renderer
}) => {
    window.requestAnimationFrame(function() {
        animate({
            scene,
            camera,
            controls,
            renderer
        });
    });
    controls.update();

    let t = clock.getElapsedTime();
    const tdelta = clock.getDelta();

    renderer.render( scene, camera );
};