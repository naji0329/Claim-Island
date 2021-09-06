import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/fan/Tongues/common.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.192474}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cf_tongue.geometry}
          position={[0.038203, -0.06419, -0.012541]}
          rotation={[-0.000971, 0.033837, 0.028707]}
          scale={1.846701}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cf_tongue.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
