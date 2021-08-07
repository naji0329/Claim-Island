import React, {useRef} from 'react';
import {useGLTF} from '@react-three/drei';

export function FanModel(props) {
  const group = useRef();
  const {nodes, materials} = useGLTF('/clam-models/fan/clam.glb');

  return (
    <group ref={group} {...props}>
      <group scale={0.192474}>
        <group position={[-0.00055, 0.103054, 0.040315]} rotation={[0.413819, 0.038549, 0.060589]}>
          <mesh castShadow receiveShadow geometry={nodes.cf_bttm_1.geometry} material={nodes.cf_bttm_1.material}/>
          <mesh castShadow receiveShadow geometry={nodes.cf_bttm_2.geometry} material={nodes.cf_bttm_2.material}/>
          <mesh castShadow receiveShadow geometry={nodes.cf_bttm_3.geometry} material={nodes.cf_bttm_3.material}/>
        </group>
        <group position={[0, -0.003672, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.cf_bttm1_1.geometry} material={nodes.cf_bttm1_1.material}/>
          <mesh castShadow receiveShadow geometry={nodes.cf_bttm1_2.geometry} material={nodes.cf_bttm1_2.material}/>
          <mesh castShadow receiveShadow geometry={nodes.cf_bttm1_3.geometry} material={nodes.cf_bttm1_3.material}/>
        </group>
      </group>
    </group>
  );
}

export default FanModel;

useGLTF.preload('/clam-models/fan/clam.glb');
