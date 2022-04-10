import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/hamburger/Tongues/common.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group position={[-0.000004, -0.002924, -0.093903]} scale={0.441361}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_common.geometry}
          position={[0.002399, 0.010337, 0.178843]}
          rotation={[-0.07674, -0.000802, -0.004085]}
          scale={0.531968}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.t_common.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
