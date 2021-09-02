import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/maxima/Tongues/forked.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.283419}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_forked2.geometry}
          position={[-0.007736, -0.020599, -0.058283]}
          rotation={[0.549713, 0.247191, 0]}
          scale={3.815215}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_forked2.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
