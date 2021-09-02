import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/sharptooth/Tongues/heart.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.43273}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_t_heart6.geometry}
          position={[-0.005335, -0.023614, -0.035186]}
          rotation={[-1.317826, 1.514417, 1.231801]}
          scale={0.982339}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_t_heart6.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
