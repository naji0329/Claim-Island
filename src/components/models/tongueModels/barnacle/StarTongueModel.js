import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/barnacle/Tongues/star.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.955912}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_star7.geometry}
          position={[-0.017657, -0.009638, -0.026017]}
          rotation={[-0.0747, -0.595288, -0.010089]}
          scale={0.409115}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_star7.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
