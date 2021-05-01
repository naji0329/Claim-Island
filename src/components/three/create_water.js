import * as THREE from 'three';
import Water from '../../loaders/Water';

const createWater = ({ scene, waterTexUrl= 'textures/waternormals.jpg'}) => {
    const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

    const water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( waterTexUrl, function ( texture ) {

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

export default createWater;