import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function HamburgerModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/clam-models/hamburger/clam.glb');

  return (
    <group ref={group} {...props}>
      <group position={[-0.000004, -0.002924, -0.093903]} scale={0.441361}>
        <group position={[0.000009, 0.006624, 0.212758]} scale={2.265721}>
          <mesh castShadow receiveShadow geometry={nodes.shell_top_1.geometry} material={nodes.shell_top_1.material} />
          <mesh castShadow receiveShadow geometry={nodes.shell_top_2.geometry} material={nodes.shell_top_2.material} />
          <mesh castShadow receiveShadow geometry={nodes.shell_top_3.geometry} material={nodes.shell_top_3.material} />
        </group>
        <group position={[0.000009, 0.006624, 0.212758]} scale={2.265721}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.shell_bttm_1.geometry}
            material={nodes.shell_bttm_1.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.shell_bttm_2.geometry}
            material={nodes.shell_bttm_2.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.shell_bttm_3.geometry}
            material={nodes.shell_bttm_3.material}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.crown.geometry}
          material={nodes.crown.material}
          position={[0.000009, -0.051605, 0.254435]}
          rotation={[Math.PI / 4, 0, 0]}
          scale={4.568887}
        />
      </group>
    </group>
  );
}

export default HamburgerModel;

useGLTF.preload('/clam-models/hamburger/clam.glb');
