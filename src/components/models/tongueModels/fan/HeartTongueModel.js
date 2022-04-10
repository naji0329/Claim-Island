import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/fan/Tongues/heart.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.192474}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cs_t_heart4.geometry}
          position={[0.001979, -0.110953, -0.226628]}
          rotation={[-0.103727, 1.528689, 0.241475]}
          scale={7.448968}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cs_t_heart4.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
