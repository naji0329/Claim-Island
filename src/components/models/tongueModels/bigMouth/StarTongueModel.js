import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/bigmouth/Tongues/star.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.695856}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_star5.geometry}
          position={[-0.002163, -0.01445, -0.01048]}
          rotation={[-0.205453, -0.217701, 0.03681]}
          scale={0.343064}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_star5.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
