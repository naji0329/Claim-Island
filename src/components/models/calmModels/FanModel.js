import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function FanModel(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/fan/clam.glb");
  const { outerTexture, innerTexture, lipTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.192474}>
        <group position={[-0.00055, 0.103054, 0.040315]} rotation={[0.413819, 0.038549, 0.060589]}>
          <mesh castShadow receiveShadow geometry={nodes.cf_bttm_1.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.cf_bttm_1.material}
              map={lipTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.cf_bttm_2.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.cf_bttm_2.material}
              map={outerTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.cf_bttm_3.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.cf_bttm_3.material}
              map={innerTexture}
            />
          </mesh>
        </group>
        <group position={[0, -0.003672, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.cf_bttm1_1.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.cf_bttm1_1.material}
              map={lipTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.cf_bttm1_2.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.cf_bttm1_2.material}
              map={outerTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.cf_bttm1_3.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.cf_bttm1_3.material}
              map={innerTexture}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default FanModel;
