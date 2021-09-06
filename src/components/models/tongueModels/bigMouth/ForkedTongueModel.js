import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/bigmouth/Tongues/forked.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.695856}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_forked5.geometry}
          position={[-0.006141, -0.01279, -0.0431]}
          rotation={[0.510079, -0.001286, -0.004164]}
          scale={4.422758}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_forked5.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
