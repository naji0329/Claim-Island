import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function ThreeLippedModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/clam-models/threelipped/clam.glb');

  return (
    <group ref={group} {...props}>
      <group position={[-0.004353, -0.00009, -0.007789]} rotation={[-0.868151, 0.171459, -2.942771]} scale={1.778416}>
        <group position={[0, 0.013618, 0.003292]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.c3_top_1.geometry} material={nodes.c3_top_1.material} />
          <mesh castShadow receiveShadow geometry={nodes.c3_top_2.geometry} material={nodes.c3_top_2.material} />
          <mesh castShadow receiveShadow geometry={nodes.c3_top_3.geometry} material={nodes.c3_top_3.material} />
        </group>
        <group position={[0, 0.013618, 0.003292]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.c3_bttm_1.geometry} material={nodes.c3_bttm_1.material} />
          <mesh castShadow receiveShadow geometry={nodes.c3_bttm_2.geometry} material={nodes.c3_bttm_2.material} />
          <mesh castShadow receiveShadow geometry={nodes.c3_bttm_3.geometry} material={nodes.c3_bttm_3.material} />
        </group>
      </group>
    </group>
  );
}

export default ThreeLippedModel;

useGLTF.preload('/clam-models/threelipped/clam.glb');
