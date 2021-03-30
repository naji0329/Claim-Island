import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
import OBJLoader from '../../loaders/OBJLoader';
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

const create3DScene = (element) => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    element.appendChild( renderer.domElement );

    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set( 0, 2, 100 );
    camera.lookAt( 0, 0, 0 );

    const controls = new OrbitControls( camera, renderer.domElement );

    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xe1e1e1 );

    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const cube = new THREE.Mesh( geometry, material );
    // cube.position.set(10,0,0).normalize();
    // scene.add( cube );

    camera.position.z = 5;
    controls.update();

    const ambient = new THREE.AmbientLight( 0x016c59 );
    scene.add( ambient );

    const directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 500, 100, 0 ).normalize();
    scene.add( directionalLight );

    // const loader = new window.THREE.FBXLoader();
    const loader = new OBJLoader();
    // const loader = new THREE.FileLoader();

    loader.load( 'models/island.obj', function ( object ) {

        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = new THREE.MeshStandardMaterial( {
                    color: 0xffffff,
                    emissive: 0xfb6a4a,
                    emissiveIntensity: 0.4,
                    metalness: 1
                } );
                child.scale.set(10, 10, 10)
                child.rotation.set(0, 5.3, 0)
            }
        });
        // directionalLight.lookAt(object);

        scene.add( object );
    }, undefined, function ( error ) {
        console.error( error );
    } );

    function animate() {
        requestAnimationFrame( animate );
        controls.update();
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }

    animate();
};

export default Map3D;