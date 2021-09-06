import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/barnacle/Tongues/forked.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.955912}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_forked7.geometry}
          position={[0.001109, -0.005572, -0.020074]}
          rotation={[-2.386902, 0, 0]}
          scale={0.518769}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_forked7.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
