import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/barnacle/Tongues/common.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.955912}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cb_tong.geometry}
          position={[0.000776, 0.003194, -0.006379]}
          rotation={[-0.070249, -0.005193, 0.073671]}
          scale={0.161573}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cb_tong.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
