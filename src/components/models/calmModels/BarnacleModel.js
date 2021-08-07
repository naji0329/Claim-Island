import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function BarnacleModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/clam-models/barnacle/clam.glb');
  const { outerTexture, innerTexture, lipTexture, ...rest } = props;

  return (
      <group ref={group} {...rest}>
          <group scale={1.955912}>
              <mesh castShadow receiveShadow geometry={nodes.cb_top2_1.geometry} material={nodes.cb_top2_1.material} />
              <mesh castShadow receiveShadow geometry={nodes.cb_top2_2.geometry} material={nodes.cb_top2_2.material} />
              <mesh castShadow receiveShadow geometry={nodes.cb_top2_3.geometry} material={nodes.cb_top2_3.material} />
              <mesh castShadow receiveShadow geometry={nodes.cb_top3_1.geometry} material={nodes.cb_top3_1.material} />
              <mesh castShadow receiveShadow geometry={nodes.cb_top3_2.geometry} material={nodes.cb_top3_2.material} />
              <mesh castShadow receiveShadow geometry={nodes.cb_top3_3.geometry} material={nodes.cb_top3_3.material} />
          </group>
      </group>
  );
}

export default BarnacleModel;
