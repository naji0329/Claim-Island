import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/common/Tongues/star.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group position={[0, 0, -0.01]} scale={0.281405}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_star.geometry}
          position={[-0.063461, -0.145325, -0.097266]}
          rotation={[0.212985, -0.364496, -0.132115]}
          scale={2.025256}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_star.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
