import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/barnacle/Tongues/spiral.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.955912}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_spiral7.geometry}
          position={[-0.009059, -0.011087, -0.06123]}
          rotation={[-0.292798, 0.251129, 0.074773]}
          scale={0.305411}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.t_spiral7.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
