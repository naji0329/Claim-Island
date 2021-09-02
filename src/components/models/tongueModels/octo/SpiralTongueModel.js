import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/octo/Tongues/spiral.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.863168}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_spiral3.geometry}
          position={[-0.008477, -0.036431, -0.127956]}
          rotation={[-0.283355, 0, 0]}
          scale={0.688651}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.t_spiral3.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
