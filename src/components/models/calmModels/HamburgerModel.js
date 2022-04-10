import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function HamburgerModel(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/hamburger/clam.glb");
  const { outerTexture, innerTexture, lipTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group position={[-0.000004, -0.002924, -0.093903]} scale={0.441361}>
        <group position={[0.000009, 0.006624, 0.212758]} scale={2.265721}>
          <mesh castShadow receiveShadow geometry={nodes.shell_top_1.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.shell_top_1.material}
              map={lipTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.shell_top_2.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.shell_top_2.material}
              map={outerTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.shell_top_3.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.shell_top_3.material}
              map={innerTexture}
            />
          </mesh>
        </group>
        <group position={[0.000009, 0.006624, 0.212758]} scale={2.265721}>
          <mesh castShadow receiveShadow geometry={nodes.shell_bttm_1.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.shell_bttm_1.material}
              map={lipTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.shell_bttm_2.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.shell_bttm_2.material}
              map={outerTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.shell_bttm_3.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.shell_bttm_3.material}
              map={innerTexture}
            />
          </mesh>
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.crown.geometry}
          position={[0.000009, -0.051605, 0.254435]}
          rotation={[Math.PI / 4, 0, 0]}
          scale={4.568887}
        >
          <meshStandardMaterial attach="material" {...nodes.crown.material} map={outerTexture} />
        </mesh>
      </group>
    </group>
  );
}

export default HamburgerModel;
