import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function CommonModel(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/common/clam.glb");
  const { outerTexture, innerTexture, lipTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group position={[0, 0, -0.01]} scale={0.281405}>
        <group position={[0, 0.022376, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.top_1.geometry}>
            <meshStandardMaterial attach="material" {...nodes.top_1.material} map={innerTexture} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.top_2.geometry}>
            <meshStandardMaterial attach="material" {...nodes.top_2.material} map={outerTexture} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.top_3.geometry}>
            <meshStandardMaterial attach="material" {...nodes.top_3.material} map={lipTexture} />
          </mesh>
        </group>
        <group position={[0, 0.002359, -0.001562]} rotation={[-2.114575, 0, 0]} scale={[1, 1, -1]}>
          <mesh castShadow receiveShadow geometry={nodes.bttm_1.geometry}>
            <meshStandardMaterial attach="material" {...nodes.bttm_1.material} map={innerTexture} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.bttm_2.geometry}>
            <meshStandardMaterial attach="material" {...nodes.bttm_2.material} map={outerTexture} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.bttm_3.geometry}>
            <meshStandardMaterial attach="material" {...nodes.bttm_3.material} map={lipTexture} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default CommonModel;
