import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
// import * as GUI from '../../loaders/dat.gui.module.js';
import OBJLoader from '../../loaders/OBJLoader';
import MTLLoader from '../../loaders/MTLLoader';
import GLTFLoader from '../../loaders/GLTFLoader';
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import Water from '../../loaders/Water';
import Sky from '../../loaders/Sky';
import { OrbitControls, MapControls} from '../../loaders/OrbitControls';
// window.THREE = THREE;

import { ISLAND_OBJECTS } from './constants';

THREE.Cache.enabled = true;

// require('../../loaders/FBXLoader');

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
const create3DScene = (element) => {
    // create a 3d renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    

    // renderer.setPixelRatio( window.devicePixelRatio );
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;

    element.appendChild( renderer.domElement );

    // create a camera
    // const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    // camera.position.set( 0, 2, 5 );
    // camera.lookAt( 0, 0, 0 );
    const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
	camera.position.set( 30, 30, 100 );
    // camera.position.set( 1, 1, 20 );
    // camera.position.set( 0, 2, 5 );

    // orbit controls to pan and zoom
    const controls = new OrbitControls( camera, renderer.domElement );

    // create a scene
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xe1e1e1 );

    const sun = new THREE.Vector3();

    const water = createWater({ scene });

    const { parameters, updateSun } = createSky({ scene, water, sun, renderer });

    addLights(scene);

    // load objects and materials
    // ISLAND_OBJECTS.forEach((obj) => {
    //     loadTexture({ ...obj, scene });
    // });
    loadGLTF('glb_files/Bank_Island.glb', scene);
    loadGLTF('glb_files/Farm_Island.glb', scene);
    loadGLTF('glb_files/Market_Island.glb', scene);
    loadGLTF('glb_files/Vault_Island.glb', scene);
    loadGLTF('glb_files/Bridges.glb', scene);
    loadGLTF('glb_files/Rocks.glb', scene);
    loadGLTF('glb_files/LillyPads.glb', scene);

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
    const ambient = new THREE.AmbientLight( 0xffffff );
    scene.add( ambient );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 0, 10, 0 ).normalize();
    scene.add( directionalLight );
};

const loadGLTF = (url, scene) => {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
        console.log(gltf)
        // scene.add(gltf);

        gltf.scene.scale.set( 500, 500, 500 );			   
        gltf.scene.position.x = 0;				    //Position (x = right+ left-) 
        gltf.scene.position.y = 10;				    //Position (y = up+, down-)
        gltf.scene.position.z = 0;	

        scene.add( gltf.scene );

		// gltf.animations; // Array<THREE.AnimationClip>
		// gltf.scene; // THREE.Group
		// gltf.scenes; // Array<THREE.Group>
		// gltf.cameras; // Array<THREE.Camera>
		// gltf.asset; // Object
    }, undefined, function(err) {
        console.log(err);
    })
};

const loadTexture = ({
    materialUrl,
    objectUrl,
    textureUrl,
    scene
}) => {
    const loader = new THREE.TextureLoader();
    loader.load(textureUrl, (texture) => {
        loadMaterial({
            materialUrl,
            objectUrl,
            texture,
            scene
        });
    }, undefined, function(err) {
        console.log(err);
    })
};

// LOAD a Material and then load object
const loadMaterial = ({
    materialUrl,
    objectUrl,
    texture,
    scene
}) => {
    const loader = new MTLLoader();
    loader.load(materialUrl, function ( materials ) {
        // console.log(material);
        materials.preload();
        loadObject(objectUrl, scene, materials, texture);
    }, undefined, function(error) {
        console.log('Material Error: ', error);
    });
}

// LOAD A 3D OBJECT
const loadObject = (url, scene, materials, texture) => {
    const loader = new OBJLoader();
    loader.setMaterials( materials );
    loader.load(url, function ( object ) {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                if(child.material.length > 0) {
                    child.material.forEach( mat => {
                        child.material.map = texture;
                        child.material.map.needsUpdate = true;
                    });
                } else {
                    child.material.map = texture;
                    // child.material.color.setHex( 0xff0000 );
                    child.material.map.needsUpdate = true;
                    // child.material = new THREE.MeshPhongMaterial( {
                    //     map: texture
                    // });
                    // child.material = [
                    //     // child.material,
                    //     new THREE.MeshPhongMaterial({
                    //         // map: texture
                    //         color: 0xff0000,
                    //     })
                    // ];
                    // child.material.needsUpdate = true;
                }
                // console.log(child.material)
                // child.material = materials;
                // child.material = new THREE.MeshPhongMaterial( {
                //     map: texture
                //     // color: 0xff0000,
                //     // emissive: 0xfb6a4a,
                //     // emissiveIntensity: 0.4,
                //     // metalness: 1
                // } );
                // child.material = new THREE.MeshStandardMaterial( {
                //     color: 0xffffff,
                //     emissive: 0xfb6a4a,
                //     emissiveIntensity: 0.4,
                //     metalness: 1
                // } );
                // child.scale.set(200, 200, 200)
                // child.rotation.set(0, 5.3, 0)
                child.scale.set(2, 2, 2)
                child.position.set(0, 7, 0);
                // child.material.map = texture;
                // child.material.color = 0xff0000;
                // child.material.needsUpdate = true;
                // child.material.setValues({ color: 0xFF0000 })
            }
        });
        // directionalLight.lookAt(object);
        scene.add( object );
    }, undefined, function ( error ) {
        console.error( error );
    } );
};

// CALL ANIMATE EVERY SECOND TO DISPLAY
const animate = ({ scene, camera, water, controls, renderer }) => {
    window.requestAnimationFrame(function() {
        animate({ scene, camera, water, controls, renderer });
    });
    controls.update();
    water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
    renderer.render( scene, camera );
};

const createWater = ({ scene }) => {
    const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

    const water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            } ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );
    water.rotation.x = - Math.PI / 2;

    scene.add( water );

    return water;
};

const createSky = ({ scene, water, sun, renderer }) => {
    const sky = new Sky();
    sky.scale.setScalar( 10000 );
    scene.add( sky );

    const skyUniforms = sky.material.uniforms;

    skyUniforms[ 'turbidity' ].value = 10;
    skyUniforms[ 'rayleigh' ].value = 2;
    skyUniforms[ 'mieCoefficient' ].value = 0.005;
    skyUniforms[ 'mieDirectionalG' ].value = 0.8;

    const parameters = {
        inclination: 0.47,
        azimuth: 0.205
    };

    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    function updateSun() {

        const theta = Math.PI * ( parameters.inclination - 0.5 );
        const phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

        sun.x = Math.cos( phi );
        sun.y = Math.sin( phi ) * Math.sin( theta );
        sun.z = Math.sin( phi ) * Math.cos( theta );

        sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
        water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

        scene.environment = pmremGenerator.fromScene( sky ).texture;

    }

    updateSun();
    return { parameters, updateSun };
};

export default Map3D;