import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/fan/Tongues/spiral.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.192474} position={[-0.015, 0.01, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cs_spiral4.geometry}
          position={[0.017777, -0.224671, -0.576121]}
          rotation={[-0.253673, 0, 0]}
          scale={3.107498}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cs_spiral4.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
