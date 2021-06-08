import * as THREE from "three";
import OBJLoader from "../../../loaders/OBJLoader";

const loadObj = (url, scene, materials, texture) => {
  const loader = new OBJLoader();
  loader.setMaterials(materials);
  loader.load(
    url,
    (object) => {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material.length > 0) {
            child.material.forEach((mat) => {
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
          child.scale.set(2, 2, 2);
          child.position.set(0, 7, 0);
          // child.material.map = texture;
          // child.material.color = 0xff0000;
          // child.material.needsUpdate = true;
          // child.material.setValues({ color: 0xFF0000 })
        }
      });
      // directionalLight.lookAt(object);
      scene.add(object);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );
};

export default loadObj;
