import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function OctoModel(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/octo/clam.glb");
  const { outerTexture, innerTexture, lipTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.863168}>
        <group rotation={[0.709442, 0, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.oc_top_1.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.oc_top_1.material}
              map={innerTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.oc_top_2.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.oc_top_2.material}
              map={outerTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.oc_top_3.geometry}>
            <meshStandardMaterial attach="material" {...nodes.oc_top_3.material} map={lipTexture} />
          </mesh>
        </group>
        <group rotation={[-Math.PI, 0, 0]} scale={[1, 1, -1]}>
          <mesh castShadow receiveShadow geometry={nodes.clam_bttm_1.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.clam_bttm_1.material}
              map={innerTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.clam_bttm_2.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.clam_bttm_2.material}
              map={outerTexture}
            />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.clam_bttm_3.geometry}>
            <meshStandardMaterial
              attach="material"
              {...nodes.clam_bttm_3.material}
              map={lipTexture}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default OctoModel;
