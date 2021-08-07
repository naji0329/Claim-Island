import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function BigmouthModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/clam-models/bigmouth/clam.glb');

  return (
      <group ref={group} {...props}>
          <group scale={1.695856}>
              <group position={[0, 0.083685, -0.061151]} rotation={[2.392276, 0, 0]}>
                  <mesh castShadow receiveShadow geometry={nodes.cbm_top_1.geometry} material={nodes.cbm_top_1.material} />
                  <mesh castShadow receiveShadow geometry={nodes.cbm_top_2.geometry} material={nodes.cbm_top_2.material} />
                  <mesh castShadow receiveShadow geometry={nodes.cbm_top_3.geometry} material={nodes.cbm_top_3.material} />
              </group>
              <group position={[0, -0.004356, -0.001215]} rotation={[0.20489, 0, 0]}>
                  <mesh castShadow receiveShadow geometry={nodes.cbm_bttm_1.geometry} material={nodes.cbm_bttm_1.material} />
                  <mesh castShadow receiveShadow geometry={nodes.cbm_bttm_2.geometry} material={nodes.cbm_bttm_2.material} />
                  <mesh castShadow receiveShadow geometry={nodes.cbm_bttm_3.geometry} material={nodes.cbm_bttm_3.material} />
              </group>
          </group>
      </group>
  );
}
export default BigmouthModel;
