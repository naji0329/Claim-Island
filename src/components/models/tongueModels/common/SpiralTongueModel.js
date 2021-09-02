import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/common/Tongues/spiral.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group position={[0, 0, -0.01]} scale={0.281405}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_spiral.geometry}
          position={[-0.037298, -0.090565, -0.344485]}
          scale={1.786165}
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
