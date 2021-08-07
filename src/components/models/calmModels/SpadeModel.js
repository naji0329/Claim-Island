import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function SpadeModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/clam-models/spade/clam.glb');

    return (
      <group ref={group} {...props}>
        <group position={[-0.225128, -0.001867, 0.221955]} scale={1.217426}>
          <mesh castShadow receiveShadow geometry={nodes.cs_top_1.geometry} material={nodes.cs_top_1.material} />
          <mesh castShadow receiveShadow geometry={nodes.cs_top_2.geometry} material={nodes.cs_top_2.material} />
          <mesh castShadow receiveShadow geometry={nodes.cs_top_3.geometry} material={nodes.cs_top_3.material} />
          <mesh castShadow receiveShadow geometry={nodes.cs_bttm_1.geometry} material={nodes.cs_bttm_1.material} />
          <mesh castShadow receiveShadow geometry={nodes.cs_bttm_2.geometry} material={nodes.cs_bttm_2.material} />
          <mesh castShadow receiveShadow geometry={nodes.cs_bttm_3.geometry} material={nodes.cs_bttm_3.material} />
        </group>
      </group>
    );
}

export default SpadeModel;

useGLTF.preload('/clam-models/spade/clam.glb');
