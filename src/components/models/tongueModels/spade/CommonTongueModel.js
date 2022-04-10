import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/spade/Tongues/common.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group position={[-0.225128, -0.001867, 0.221955]} scale={1.217426}>
        <mesh castShadow receiveShadow geometry={nodes.cs_tongue.geometry}>
          <meshStandardMaterial
            attach="material"
            {...nodes.cs_tongue.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
