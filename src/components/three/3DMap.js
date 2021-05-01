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
    // loadGLTF('glb_files/Island_Empty.glb', scene);
    loadGLTF('glb_files/Bank_Island.glb', scene);
    loadGLTF('glb_files/farm_island.glb', scene);
    loadGLTF('glb_files/Market_Island.glb', scene);
    loadGLTF('glb_files/Vault_Island.glb', scene);
    loadGLTF('glb_files/Bridges.glb', scene);
    loadGLTF('glb_files/Rocks.glb', scene);
    loadGLTF('glb_files/LillyPads.glb', scene);
    loadGLTF('glb_files/Boats.glb', scene);
    loadGLTF('glb_files/ship.glb', scene, 'ship');
    loadGLTF('glb_files/sailboat.glb', scene, 'sailboat');
    loadGLTF('glb_files/seagull.glb', scene, 'seagull');
    loadGLTF('glb_files/dolphin.glb', scene, 'dolphin');

    animate({
        scene,
        water,
        camera,
        controls,
        renderer,
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

const loadGLTF = (url, scene, type='island') => {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
        // scene.add(gltf);
        const children = gltf.scene.children.map(obj => {
            obj.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    // console.log(child);
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            return obj;
        });
        gltf.scene.children = children;

        if(type === 'island') {
            gltf.scene.scale.set( 1000, 1000, 1000 );			   
            gltf.scene.position.x = 0;				    //Position (x = right+ left-) 
            gltf.scene.position.y = 2;				    //Position (y = up+, down-)
            gltf.scene.position.z = 0;	
        } else if(type === 'sailboat') {
            gltf.scene.scale.set( 30, 30, 30 );			   
            gltf.scene.position.x = 0;				    //Position (x = right+ left-) 
            gltf.scene.position.y = 60;				    //Position (y = up+, down-)
            gltf.scene.position.z = 600;	
            gltf.scene.rotation.y = 5;	
        } else if(type === 'seagull') {
            gltf.scene.scale.set( 5, 5, 5 );			   
            gltf.scene.position.x = 0;				    //Position (x = right+ left-) 
            gltf.scene.position.y = 500;				    //Position (y = up+, down-)
            gltf.scene.position.z = 0;	

            for(let i = 0; i < 10; i++) {
                const clone = gltf.scene.clone();
                // console.log(clone)
                if(clone) {
                    clone.scale.set( 10, 10, 10 );			   
                    clone.position.z = i*250*Math.random();
                    clone.position.x = i*250*Math.random();
                    clone.position.y = 100 + i*250*Math.random();				    //Position (y = up+, down-)
                    scene.add(clone);
                }
            }

        } else if(type === 'dolphin') {
            gltf.scene.scale.set( 10, 10, 10 );			   
            gltf.scene.position.x = 0;				    //Position (x = right+ left-) 
            gltf.scene.position.y = 10;				    //Position (y = up+, down-)
            gltf.scene.position.z = -500;
            // scene.add(gltf.scene);
            // const obj = gltf.scene.children[0];
            for(let i = 0; i < 10; i++) {
                const clone = gltf.scene.clone();
                // console.log(clone)
                if(clone) {
                    clone.scale.set( 10, 10, 10 );			   
                    clone.position.z = -600 + i*50*Math.random();
                    clone.position.x = i*-20;
                    scene.add(clone);
                }
            }
        } else {
            gltf.scene.scale.set( 500, 500, 500 );			   
            gltf.scene.position.x = 0;				    //Position (x = right+ left-) 
            gltf.scene.position.y = 15;				    //Position (y = up+, down-)
            gltf.scene.position.z = 20;	
        }

        // console.log(gltf.scene)

        // let mixer;

        // if(gltf.animations && gltf.animations.length > 0) {
        //     mixer = new THREE.AnimationMixer( gltf.scene );
        //     var action = mixer.clipAction( gltf.animations[ 0 ] );
        //     action.play();
        //     scene.add( gltf.scene );
        // } else {
        if(['dolphin', 'seagull'].indexOf(type) === -1) {
            scene.add( gltf.scene );
        }
        // }

        // return mixer;

        // scene.add( gltf.scene );

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
            waterColor: 0x00FFFF,
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
    skyUniforms[ 'mieCoefficient' ].value = 0.003;
    skyUniforms[ 'mieDirectionalG' ].value = 1;

    const parameters = {
        inclination: 0.37,
        azimuth: 0.445
    };

    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    function updateSun() {

        const theta = Math.PI * ( parameters.inclination - 0.5 );
        const phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

        sun.x = Math.cos( phi );
        sun.y = Math.sin( phi ) * Math.sin( theta );
        sun.z = Math.sin( phi ) * Math.cos( theta );
        sun.castShadow = true;

        sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
        water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

        scene.environment = pmremGenerator.fromScene( sky ).texture;

    }

    updateSun();
    return { parameters, updateSun };
};

export default Map3D;