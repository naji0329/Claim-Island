import * as THREE from 'three';
import GLTFLoader from '../../../loaders/GLTFLoader';

const loadGLTFPromise = (url) => {
  return new Promise(resolve => {
    new GLTFLoader().load(url, resolve);
  });
};

const enableShadowMap = (children) => {
    return children.map(obj => {
        obj.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                // console.log(child);
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        return obj;
    });
};

const loadGLTF = async (url, scene, type='island') => {
    const gltf = await loadGLTFPromise(url);
    gltf.scene.children = enableShadowMap(gltf.scene.children);

    if(type === 'island') {
        gltf.scene.scale.set( 1000, 1000, 1000 );
        gltf.scene.position.x = 0;				    //Position (x = right+ left-)
        gltf.scene.position.y = 2;				    //Position (y = up+, down-)
        gltf.scene.position.z = 0;
    } else if(type === 'bridge') {
        gltf.scene.scale.set( 1000, 1000, 1000 );
        gltf.scene.position.x = 0;				    //Position (x = right+ left-)
        gltf.scene.position.y = 30;				    //Position (y = up+, down-)
        gltf.scene.position.z = 0;
    } else if(type === 'lillies') {
        gltf.scene.scale.set( 1000, 1000, 1000 );
        gltf.scene.position.x = 0;				    //Position (x = right+ left-)
        gltf.scene.position.y = 32;				    //Position (y = up+, down-)
        gltf.scene.position.z = 0;
    } else if(type === 'rocks') {
        gltf.scene.scale.set( 1000, 1000, 1000 );
        gltf.scene.position.x = 0;				    //Position (x = right+ left-)
        gltf.scene.position.y = 30;				    //Position (y = up+, down-)
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
        gltf.scene.position.y = 200;				    //Position (y = up+, down-)
        gltf.scene.position.z = 0;

        const seagulls = [];
        for(let i = 1; i < 5; i++) {
            const clone = gltf.scene.clone();
            // console.log(clone)
            if(clone) {
                clone.scale.set( 1, 1, 1 );
                // clone.position.z = i * 250 * Math.random();
                // clone.position.x = i * 250 * Math.random();
                //clone.rotateY(THREE.Math.degToRad(180));
                // clone.rotateX(THREE.Math.degToRad(-30));
                // clone.rotateZ(THREE.Math.degToRad(-30));
                 clone.rotation.y = 6.2;
                 clone.rotation.x = 3.4;
                 clone.rotation.z = 2.8;

                 console.log(clone);

                const zpos = i === 1 ? -100
                    : i === 2 ? 200
                    : i === 3 ? -300
                    : 0;

                const xpos = i === 1 ? 0
                    : i === 2 ? -50
                    : i === 3 ? 200
                    : 300;


                clone.position.z = 0;
                clone.position.x = 100;
                clone.position.y = 0

                const pivot = new THREE.Object3D();
                pivot.position.z = zpos;
                pivot.position.x = xpos;
                pivot.position.y = 200 + Math.random() * 100;
                pivot.userData.speed = Math.random() * 0.01;

                // clone.position.y = 100 + i * 250 * Math.random();				    //Position (y = up+, down-)
                scene.add(pivot);
                pivot.add(clone);
                seagulls.push({
                    obj: clone,
                    pivot
                });
            }
        }
        return seagulls;

    } else if(type === 'dolphin') {
        gltf.scene.scale.set( 10, 10, 10 );
        gltf.scene.position.x = 0;				    //Position (x = right+ left-)
        gltf.scene.position.y = 10;				    //Position (y = up+, down-)
        gltf.scene.position.z = -500;
        // scene.add(gltf.scene);
        // const obj = gltf.scene.children[0];
        const dolphins = [];
        for(let i = 0; i < 5; i++) {
            const clone = gltf.scene.clone();
            // console.log(clone)
            if(clone) {
                clone.scale.set( 10, 10, 10 );
                clone.position.z = -600 + i*50*Math.random();
                clone.position.x = i*-20;
                scene.add(clone);
                dolphins.push(clone);
            }
        }
        return dolphins;

    } else if(type === 'ship')  {
        gltf.scene.scale.set( 500, 500, 500 );
        gltf.scene.position.x = 0;				    //Position (x = right+ left-)
        gltf.scene.position.y = 15;				    //Position (y = up+, down-)
        gltf.scene.position.z = 20;
    }

    if(['dolphin', 'seagull'].indexOf(type) === -1) {
        scene.add( gltf.scene );
    }

    return gltf.scene;
};

export default loadGLTF;
