import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/hamburger/Tongues/forked.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group position={[-0.000004, -0.002924, -0.093903]} scale={0.441361}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_forked8.geometry}
          position={[-0.006095, 0.006647, 0.048918]}
          rotation={[0.358352, 0, 0]}
          scale={14.523055}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_forked8.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
