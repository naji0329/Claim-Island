import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/hamburger/Tongues/heart.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group position={[-0.000004, -0.002924, -0.093903]} scale={0.441361}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_t_heart8.geometry}
          position={[-0.008777, 0.003771, 0.120421]}
          rotation={[0.415498, 1.527166, -0.505647]}
          scale={2.834003}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_t_heart8.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
