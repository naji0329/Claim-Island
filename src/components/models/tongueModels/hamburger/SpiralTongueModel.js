import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/hamburger/Tongues/spiral.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group position={[-0.000004, -0.002924, -0.093903]} scale={0.441361}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_spiral.geometry}
          position={[-0.020872, 0, 0]}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.t_spiral.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
