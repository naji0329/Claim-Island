import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from "three";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/pearl-models/round/Pearl_round.glb');
  const { textures: {
    map,
    envMap,
    emissiveMap,
  } } = props;

  envMap.mapping = THREE.EquirectangularReflectionMapping;
  envMap.encoding = THREE.sRGBEncoding;
  emissiveMap.encoding = THREE.sRGBEncoding;
  emissiveMap.flipY = false;
  map.encoding = THREE.sRGBEncoding;
  map.flipY = false;

  return (
    <group ref={group} position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
      <mesh castShadow receiveShadow geometry={nodes.Round.geometry} material={materials.Pearls1}>
        <meshStandardMaterial
          {...materials.Pearls1}
          map={map}
          envMap={envMap}
          emissiveMap={emissiveMap}
          envMapIntensity={1.2}
        />
      </mesh>
    </group>
  );
};
