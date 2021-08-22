import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/pearl-models/Pearl_round.glb');
  const {
    map,
    envMap,
    emissiveMap,
    envMapIntensity,
    color,
    emissive,
    emissiveIntensity,
    roughness,
    onBeforeCompile,
  } = props;

  return (
    <group ref={group} position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
      <group ref={group} position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Round.geometry}>
          <meshStandardMaterial
            {...materials.Pearls1}
            map={map}
            envMap={envMap}
            emissiveMap={emissiveMap}
            envMapIntensity={envMapIntensity}
            emissiveIntensity={emissiveIntensity}
            emissive={emissive}
            color={color}
            roughness={roughness}
            onBeforeCompile={onBeforeCompile}
          />
        </mesh>
      </group>
    </group>
  );
};
