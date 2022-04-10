import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/pearl-models/Pearl_oval.glb");
  const {
    map,
    envMap,
    emissiveMap,
    envMapIntensity,
    color,
    emissive,
    emissiveIntensity,
    roughness,
    onBeforeCompile,
    glowMaterial,
    backGlowMaterial,
  } = props;

  return (
    <group ref={group} {...props}>
      <mesh geometry={nodes.Oval.geometry} material={materials.Pearl}>
        <meshStandardMaterial
          {...materials.Pearl}
          map={map}
          envMap={envMap}
          emissiveMap={emissiveMap}
          envMapIntensity={envMapIntensity}
          emissiveIntensity={emissiveIntensity}
          emissive={emissive}
          color={color}
          roughness={roughness}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>
      {glowMaterial && (
        <mesh
          geometry={nodes.Oval.geometry}
          material={glowMaterial}
          scale={1.025}
          layers={1}
          position={[0, -0.001, 0]}
        />
      )}
      {backGlowMaterial && (
        <mesh
          geometry={nodes.Oval.geometry}
          material={backGlowMaterial}
          scale={1.1}
          position={[0, -0.002, 0]}
          layers={1}
        />
      )}
    </group>
  );
}
