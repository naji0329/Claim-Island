import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { OrbitControls, MapControls} from '../../loaders/OrbitControls';

import loadGLTF from './loaders/gltf_loader';
import createWater from './create_water';
import createSky from './create_sky';

const clock = new THREE.Clock();

THREE.Cache.enabled = true;

const Map3D = (props) => {
    const mapRef = useRef(null); 

    useEffect(() => {
        create3DScene(mapRef.current)
    });

    return (
        <div ref={mapRef}></div>
    );
};

// CREATE A 3D SCENE
const create3DScene = async (element) => {
    // create a 3d renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    // renderer.gammaOutput = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    // renderer.gammaFactor = 2.2;
    renderer.setSize( window.innerWidth, window.innerHeight );
    

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
    controls.maxDistance = 2000;

    // create a scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xe1e1e1 );


    const water = createWater({ scene });

    createSky({ scene, water, renderer });

    addLights(scene);

    // load animation before all models load
    animate({
        scene, water, camera, controls, renderer
    });

    // load gltf
    const bank = await loadGLTF('glb_files/Bank_Island.glb', scene);
    loadGLTF('glb_files/farm_island.glb', scene);
    const market = await loadGLTF('glb_files/Market_Island.glb', scene);
    const vault = await loadGLTF('glb_files/Vault_Island.glb', scene);
    const bridge = await loadGLTF('glb_files/Bridges.glb', scene, 'bridge');
    const rocks = await loadGLTF('glb_files/Rocks.glb', scene, 'rocks');
    const lilly = await loadGLTF('glb_files/LillyPads.glb', scene, 'lillies');
    const boats = await loadGLTF('glb_files/Boats.glb', scene);
    const ship = await loadGLTF('glb_files/ship.glb', scene, 'ship');
    const sailboat = await loadGLTF('glb_files/sailboat.glb', scene, 'sailboat');

    const seagulls = await loadGLTF('glb_files/seagull.glb', scene, 'seagull');
    const dolphins = await loadGLTF('glb_files/dolphin.glb', scene, 'dolphin');

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
        lilly,
        sailboat,
        seagulls,
        dolphins
    });
};

// ADD LIGHTS
const addLights = (scene) => {
    // const ambient = new THREE.AmbientLight( 0xffffff );
    // scene.add( ambient );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
    directionalLight.position.set( 140, 10, 0 ).normalize();
    directionalLight.castShadow = true;
    scene.add( directionalLight );

    const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 2 );
    directionalLight2.position.set( -190, 10, 0 ).normalize();
    directionalLight2.castShadow = true;
    scene.add( directionalLight2 );
};

// CALL ANIMATE EVERY SECOND TO DISPLAY
const animate = ({
    scene, camera, water, controls, renderer, ship,
    bank, market, vault, bridge, boats, lilly, sailboat,
    seagulls, dolphins
}) => {
    window.requestAnimationFrame(function() {
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
            lilly,
            sailboat,
            seagulls,
            dolphins
        });
    });
    controls.update();
    water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

    let t = clock.getElapsedTime();
    giveBuoyancy(ship, t, 5, 15);
    giveBuoyancy(bank, t, 2, 2);
    giveBuoyancy(market, t, 2, 2);
    giveBuoyancy(vault, t, 2, 2);
    giveBuoyancy(bridge, t, 2, 30);
    giveBuoyancy(boats, t, 2, 2);
    giveBuoyancy(lilly, t, 0.3, 32);
    giveBuoyancy(sailboat, t, 5, 60);

    flyingSeagulls(seagulls, t);
    swimmingDolphins(dolphins, t);

    renderer.render( scene, camera );
};

const giveBuoyancy = (obj, t, factor, init) => {
    if(obj) {
        const delta = Math.sin(factor + t);
        const newPos = delta * factor;
        obj.position.y = init + newPos;
    }
};

const flyingSeagulls = (seagulls, t) => {
    if(seagulls) {
        seagulls.forEach((seagull, i) => {
            // const theta = Math.atan(seagull.position.x / seagull.position.z);
            // const radius = seagull.position.x * Math.sin(theta);
            // console.log(theta, radius)

            // console.log(seagull.position.x / seagull.position.z);
            // if(radius && radius !== 0) {
                // seagull.position.x = radius * Math.sin(-t);
                const zpos = i === 0 ? -100
                    : i === 1 ? 200
                    : i === 2 ? -300
                    : -100;

                const xpos = i === 0 ? 0
                    : i === 1 ? 0
                    : i === 2 ? 300
                    : 350;

                const theta = i === 0 ? 0.3
                    : i === 1 ? 0.4
                    : i === 2 ? 0.2
                    : 0.35;

                const radius = i === 0 ? 100
                    : i === 1 ? 100
                    : i === 2 ? 150
                    : 80;

                seagull.position.x = xpos + radius * Math.sin(-t * theta );
                seagull.position.z = zpos + radius * Math.cos(-t * theta );
            // } else {
            //     console.log(seagull.position)
            //     console.log(theta, radius)
            // }
            seagull.rotateY(-0.008)
        });
    }
};

const swimmingDolphins = (dolphins, t) => {
    if(dolphins) {
        dolphins.forEach((dolphin, i) => {
            const delta = Math.sin(12 + t + (i + 1));
            const newPos = delta * 30;
            dolphin.position.y = 5 + newPos;
            dolphin.position.z += delta;
        });
    }
};

export default Map3D;