import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function SharpToothModel(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/sharptooth/clam.glb");
  const { outerTexture, innerTexture, lipTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.43273}>
        <mesh castShadow receiveShadow geometry={nodes.ct_top_1.geometry}>
          <meshStandardMaterial attach="material" {...nodes.ct_top_1.material} map={lipTexture} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.ct_top_2.geometry}>
          <meshStandardMaterial attach="material" {...nodes.ct_top_2.material} map={outerTexture} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.ct_top_3.geometry}>
          <meshStandardMaterial attach="material" {...nodes.ct_top_3.material} map={innerTexture} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.ct_bttm_1.geometry}>
          <meshStandardMaterial attach="material" {...nodes.ct_bttm_1.material} map={lipTexture} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.ct_bttm_2.geometry}>
          <meshStandardMaterial
            attach="material"
            {...nodes.ct_bttm_2.material}
            map={outerTexture}
          />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.ct_bttm_3.geometry}>
          <meshStandardMaterial
            attach="material"
            {...nodes.ct_bttm_3.material}
            map={innerTexture}
          />
        </mesh>
      </group>
    </group>
  );
}

export default SharpToothModel;
