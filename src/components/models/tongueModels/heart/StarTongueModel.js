import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/heart/Tongues/star.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.244673}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_star1.geometry}
          position={[-0.047476, -0.145199, -0.146764]}
          rotation={[0.207383, -0.342121, 0.033449]}
          scale={2.206147}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_star1.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
