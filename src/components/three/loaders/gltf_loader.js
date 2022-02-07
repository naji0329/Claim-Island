import * as THREE from "three";
import GLTFLoader from "../../../loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export const loadGLTFPromise = (url) => {
  return new Promise((resolve) => {
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/draco/' );

    gltfLoader
      .setDRACOLoader(dracoLoader)
      .load(url, resolve);
  });
};

const enableShadowMap = (children) => {
  return children.map((obj) => {
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return obj;
  });
};

const loadGLTF = async (url, scene, type = "island", name, callback = () => {}) => {
  const gltf = await loadGLTFPromise(url);
  callback();
  gltf.scene.children = enableShadowMap(gltf.scene.children);
  if(name) gltf.scene.name = name;

  if (type === "island") {
    if(name === "lighthouse") {
      gltf.scene.scale.set(1750, 1750, 1750);
      gltf.scene.position.set(-750, 2, 750);
      gltf.scene.rotation.y = 0.8;
    } else if (name === 'info_sign') {
      gltf.scene.scale.set(1000, 1000, 1000);
      gltf.scene.position.set(-550, 80, 300);
      gltf.scene.rotation.y = 0.8;
    } else {
      gltf.scene.scale.set(1000, 1000, 1000);
      gltf.scene.position.x = 0; //Position (x = right+ left-)
      gltf.scene.position.y = 2; //Position (y = up+, down-)
      gltf.scene.position.z = 0;
      if(name === 'shop_sign') {
        gltf.scene.rotation.y = -0.1;
        gltf.scene.position.z = 0;
        gltf.scene.position.x = 30;
        gltf.scene.position.y = -50;

      }
    }
  } else if (type === "bridge") {
    gltf.scene.scale.set(1250, 1000, 1250);
    gltf.scene.position.x = -10; //Position (x = right+ left-)
    gltf.scene.position.y = 30; //Position (y = up+, down-)
    gltf.scene.position.z = 10;
  } else if (type === "lillies") {
    gltf.scene.scale.set(1000, 1000, 1000);
    gltf.scene.position.x = 0; //Position (x = right+ left-)
    gltf.scene.position.y = 32; //Position (y = up+, down-)
    gltf.scene.position.z = 0;
  } else if (type === "rocks") {
    gltf.scene.scale.set(1000, 1000, 1000);
    gltf.scene.position.x = 0; //Position (x = right+ left-)
    gltf.scene.position.y = 30; //Position (y = up+, down-)
    gltf.scene.position.z = 0;
  } else if (type === "sailboat") {
    gltf.scene.scale.set(20, 20, 20);
    gltf.scene.position.x = 0; //Position (x = right+ left-)
    gltf.scene.position.y = 60; //Position (y = up+, down-)
    gltf.scene.position.z = 440;
    gltf.scene.rotation.y = 5;
  } else if (type === "seagull") {
    gltf.scene.scale.set(5, 5, 5);
    gltf.scene.position.x = 0; //Position (x = right+ left-)
    gltf.scene.position.y = 200; //Position (y = up+, down-)
    gltf.scene.position.z = 0;

    const seagulls = [];
    for (let i = 1; i < 5; i++) {
      const clone = gltf.scene.clone();

      if (clone) {
        clone.scale.set(1, 1, 1);
        clone.rotation.y = 6.2;
        clone.rotation.x = 3.1;
        clone.rotation.z = 2.8;

        const zpos = i === 1 ? -100 : i === 2 ? 200 : i === 3 ? -300 : 0;

        const xpos = i === 1 ? 0 : i === 2 ? -50 : i === 3 ? 200 : 300;

        clone.position.z = 0;
        clone.position.x = 100;
        clone.position.y = 0;

        const pivot = new THREE.Object3D();
        pivot.position.z = zpos;
        pivot.position.x = xpos;
        pivot.position.y = 200 + Math.random() * 100;
        pivot.userData.speed = Math.random() * 0.01;

        scene.add(pivot);
        pivot.add(clone);
        seagulls.push({
          obj: clone,
          pivot,
        });
      }
    }
    return seagulls;
  } else if (type === "dolphin") {
    gltf.scene.scale.set(10, 10, 10);
    gltf.scene.position.x = 0;
    gltf.scene.position.y = 10;
    gltf.scene.position.z = -300;

    const dolphins = [];
    for (let i = 0; i < 5; i++) {
      const clone = gltf.scene.clone();
      if (clone) {
        clone.scale.set(10, 10, 10);
        const pivot = new THREE.Object3D();
        if (i < 2) {
          pivot.position.z = Math.random() * 225 - 500;
          pivot.position.x = Math.random() * 70 - 150;
          pivot.userData.under = false;
        } else {
          pivot.position.z = Math.random() * 100 + 350;
          pivot.position.x = Math.random() * 100 - 250;
          pivot.userData.under = true;
        }
        pivot.rotation.x += THREE.Math.degToRad(Math.random() * 90);
        pivot.position.y = -295;
        clone.position.y = 50;
        clone.rotation.x = 5;
        scene.add(pivot);

        pivot.add(clone);
        dolphins.push({
          obj: clone,
          pivot,
        });
      }
    }

    return dolphins;
  } else if (type === "ship") {
    gltf.scene.scale.set(20, 20, 20);
    gltf.scene.position.set(-380, 0, 120);
    gltf.scene.rotation.y = 0.6;
  } else if (type === "boats") {
    gltf.scene.scale.set(1250, 1000, 1250);
    gltf.scene.position.x = 120; //Position (x = right+ left-)
    gltf.scene.position.y = 30; //Position (y = up+, down-)
    gltf.scene.position.z = -120;
    gltf.scene.rotation.y = 1
  }

  if (["dolphin", "seagull"].indexOf(type) === -1) {
    scene.add(gltf.scene);
  }

  return gltf.scene;
};

export default loadGLTF;
