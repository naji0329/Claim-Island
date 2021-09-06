import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function ThreeLippedModel(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/threelipped/clam.glb");
  const { outerTexture, innerTexture, lipTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group
        position={[-0.005353, -0.00009, -0.007789]}
        rotation={[-0.868151, 0.171459, -2.942771]}
        scale={1.778416}
      >
        <group position={[0, 0.013618, 0.003292]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.c3_top_1.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.c3_top_1.material}
              map={innerTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.c3_top_2.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.c3_top_2.material}
              map={outerTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.c3_top_3.geometry}>
            <meshStandardMaterial attach="material" {...nodes.c3_top_3.material} map={lipTexture} />
          </mesh>
        </group>
        <group position={[0, 0.013618, 0.003292]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.c3_bttm_1.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.c3_bttm_1.material}
              map={innerTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.c3_bttm_2.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.c3_bttm_2.material}
              map={outerTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.c3_bttm_3.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.c3_bttm_3.material}
              map={lipTexture}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default ThreeLippedModel;
