import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/octo/Tongues/common.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.863168}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.oc_tong.geometry}
          position={[0, 0, -0.01]}
          rotation={[-0.053387, 0.00109, 0.004532]}
          scale={0.375189}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.oc_tong.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
