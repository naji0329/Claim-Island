import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/heart/Tongues/heart.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.245}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_t_heart1.geometry}
          position={[-0.014041, -0.085341, -0.157084]}
          rotation={[0.379814, 1.527166, -0.505648]}
          scale={4.897425}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_t_heart1.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
