import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function OctoModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/clam-models/octo/clam.glb');

    return (
        <group ref={group} {...props}>
            <group scale={0.863168}>
                <group rotation={[0.709442, 0, 0]}>
                    <mesh castShadow receiveShadow geometry={nodes.oc_top_1.geometry} material={nodes.oc_top_1.material} />
                    <mesh castShadow receiveShadow geometry={nodes.oc_top_2.geometry} material={nodes.oc_top_2.material} />
                    <mesh castShadow receiveShadow geometry={nodes.oc_top_3.geometry} material={nodes.oc_top_3.material} />
                </group>
                <group rotation={[-Math.PI, 0, 0]} scale={[1, 1, -1]}>
                    <mesh castShadow receiveShadow geometry={nodes.clam_bttm_1.geometry} material={nodes.clam_bttm_1.material} />
                    <mesh castShadow receiveShadow geometry={nodes.clam_bttm_2.geometry} material={nodes.clam_bttm_2.material} />
                    <mesh castShadow receiveShadow geometry={nodes.clam_bttm_3.geometry} material={nodes.clam_bttm_3.material} />
                </group>
            </group>
        </group>
    );
}

export default OctoModel;

useGLTF.preload('/clam-models/octo/clam.glb');
