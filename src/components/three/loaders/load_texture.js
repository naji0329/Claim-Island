import * as THREE from "three";

const loadTexture = ({ textureUrl }) => {
  const loader = new THREE.TextureLoader();
  loader.load(
    textureUrl,
    (texture) => {
      console.log(texture);
    },
    undefined,
    (err) => {
      console.log(err);
    }
  );
};

export default loadTexture;
