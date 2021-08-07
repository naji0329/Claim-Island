import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function MaximaModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/clam-models/maxima/clam.glb');

  return (
    <group ref={group} {...props}>
      <group scale={1.283419}>
        <mesh castShadow receiveShadow geometry={nodes.lips.geometry} material={materials.lip} scale={0.779169} />
        <group scale={0.779169}>
          <mesh castShadow receiveShadow geometry={nodes.bttm_1.geometry} material={nodes.bttm_1.material} />
          <mesh castShadow receiveShadow geometry={nodes.bttm_2.geometry} material={nodes.bttm_2.material} />
        </group>
        <group scale={0.779169}>
          <mesh castShadow receiveShadow geometry={nodes.top_1.geometry} material={nodes.top_1.material} />
          <mesh castShadow receiveShadow geometry={nodes.top_2.geometry} material={nodes.top_2.material} />
        </group>
      </group>
    </group>
  );
}

export default MaximaModel;

useGLTF.preload('/clam-models/maxima/clam.glb');
