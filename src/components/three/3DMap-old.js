import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
// import * as GUI from '../../loaders/dat.gui.module.js';
import OBJLoader from '../../loaders/OBJLoader';
import Water from '../../loaders/Water';
import Sky from '../../loaders/Sky';
import { OrbitControls, MapControls} from '../../loaders/OrbitControls';
// window.THREE = THREE;

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

    loadObject('models/island.obj', scene);

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
    const ambient = new THREE.AmbientLight( 0x016c59 );
    scene.add( ambient );

    const directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 500, 100, 0 ).normalize();
    scene.add( directionalLight );
};

// LOAD A 3D OBJECT
const loadObject = (url, scene) => {
    const loader = new OBJLoader();
    loader.load(url, function ( object ) {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = new THREE.MeshStandardMaterial( {
                    color: 0xffffff,
                    emissive: 0xfb6a4a,
                    emissiveIntensity: 0.4,
                    metalness: 1
                } );
                child.scale.set(200, 200, 200)
                child.rotation.set(0, 5.3, 0)
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
        inclination: 0.49,
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