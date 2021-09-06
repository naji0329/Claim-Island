import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/maxima/Tongues/heart.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.283419}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_t_heart2.geometry}
          position={[-0.003471, -0.018622, -0.031485]}
          rotation={[0.492103, 1.43316, -0.677168]}
          scale={0.853932}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_t_heart2.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
