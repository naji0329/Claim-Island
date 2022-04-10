import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function MaximaModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/clam-models/maxima/clam.glb");
  const { outerTexture, innerTexture, lipTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.283419}>
        <mesh castShadow receiveShadow geometry={nodes.lips.geometry} scale={0.779169}>
          <meshStandardMaterial attach="material" {...materials.lip} map={lipTexture} />
        </mesh>
        <group scale={0.779169}>
          <mesh castShadow receiveShadow geometry={nodes.bttm_1.geometry}>
            <meshStandardMaterial attach="material" {...nodes.bttm_1.material} map={innerTexture} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.bttm_2.geometry}
            material={nodes.bttm_2.material}
          >
            <meshStandardMaterial attach="material" {...nodes.bttm_2.material} map={outerTexture} />
          </mesh>
        </group>
        <group scale={0.779169}>
          <mesh castShadow receiveShadow geometry={nodes.top_1.geometry}>
            <meshStandardMaterial attach="material" {...nodes.top_1.material} map={innerTexture} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.top_2.geometry}>
            <meshStandardMaterial attach="material" {...nodes.top_2.material} map={outerTexture} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default MaximaModel;
