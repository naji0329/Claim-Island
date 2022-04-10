import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/maxima/Tongues/spiral.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.283419}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_spiral2.geometry}
          position={[-0.006743, -0.023918, -0.083647]}
          scale={0.323871}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.t_spiral2.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
