import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/sharptooth/Tongues/forked.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.43273}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_forked6.geometry}
          position={[0.001045, -0.025714, -0.038268]}
          rotation={[0.549713, 0, 0]}
          scale={4.778253}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_forked6.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
