import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/sharptooth/Tongues/spiral.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.43273}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_spiral6.geometry}
          position={[0.000557, -0.033485, -0.087165]}
          scale={0.406177}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.t_spiral6.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
