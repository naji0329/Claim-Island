import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/octo/Tongues/heart.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.863168}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_t_heart3.geometry}
          position={[-0.003376, -0.016464, -0.053896]}
          rotation={[-0.293931, 1.510729, 0.407226]}
          scale={1.724074}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_t_heart3.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
