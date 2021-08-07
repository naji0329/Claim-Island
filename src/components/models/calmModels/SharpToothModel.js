import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function SharpToothModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/clam-models/sharptooth/clam.glb');

  return (
    <group ref={group} {...props}>
      <group scale={1.43273}>
        <mesh castShadow receiveShadow geometry={nodes.ct_top_1.geometry} material={nodes.ct_top_1.material} />
        <mesh castShadow receiveShadow geometry={nodes.ct_top_2.geometry} material={nodes.ct_top_2.material} />
        <mesh castShadow receiveShadow geometry={nodes.ct_top_3.geometry} material={nodes.ct_top_3.material} />
        <mesh castShadow receiveShadow geometry={nodes.ct_bttm_1.geometry} material={nodes.ct_bttm_1.material} />
        <mesh castShadow receiveShadow geometry={nodes.ct_bttm_2.geometry} material={nodes.ct_bttm_2.material} />
        <mesh castShadow receiveShadow geometry={nodes.ct_bttm_3.geometry} material={nodes.ct_bttm_3.material} />
      </group>
    </group>
  );
}

export default SharpToothModel;

useGLTF.preload('/clam-models/sharptooth/clam.glb');
