import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/fan/Tongues/forked.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.192474}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cs_forked4.geometry}
          position={[-0.007061, -0.142, -0.379]}
          rotation={[0.405964, 0.004836, 0.007651]}
          scale={(36.896427, 36.896427, 39.536427)}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cs_forked4.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
