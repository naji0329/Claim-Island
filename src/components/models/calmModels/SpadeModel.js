import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function SpadeModel(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/spade/clam.glb");
  const { outerTexture, innerTexture, lipTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group position={[-0.225128, -0.001867, 0.221955]} scale={1.217426}>
        <mesh castShadow receiveShadow geometry={nodes.cs_top_1.geometry}>
          <meshStandardMaterial attach="material" {...nodes.cs_top_1.material} map={innerTexture} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.cs_top_2.geometry}>
          <meshStandardMaterial attach="material" {...nodes.cs_top_2.material} map={outerTexture} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.cs_top_3.geometry}>
          <meshStandardMaterial attach="material" {...nodes.cs_top_3.material} map={lipTexture} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.cs_bttm_1.geometry}>
          <meshStandardMaterial
            attach="material"
            {...nodes.cs_bttm_1.material}
            map={innerTexture}
          />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.cs_bttm_2.geometry}>
          <meshStandardMaterial
            attach="material"
            {...nodes.cs_bttm_2.material}
            map={outerTexture}
          />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.cs_bttm_3.geometry}>
          <meshStandardMaterial attach="material" {...nodes.cs_bttm_3.material} map={lipTexture} />
        </mesh>
      </group>
    </group>
  );
}

export default SpadeModel;
