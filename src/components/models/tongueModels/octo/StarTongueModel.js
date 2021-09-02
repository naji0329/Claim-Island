import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/octo/Tongues/star.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.863168}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_star3.geometry}
          position={[-0.019825, -0.034977, -0.042079]}
          rotation={[0.074829, -0.369653, 0.01508]}
          scale={0.76047}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_star3.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
