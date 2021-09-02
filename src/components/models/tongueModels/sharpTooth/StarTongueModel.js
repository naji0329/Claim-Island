import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/sharptooth/Tongues/star.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.43273}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_star6.geometry}
          position={[-0.007642, -0.039779, -0.021379]}
          rotation={[0.060595, -0.308371, 0.020875]}
          scale={0.456833}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_star6.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
