import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function HeartModel(props) {
  const group = useRef();
  const { nodes } = useGLTF('/clam-models/heart/clam.glb');
  const { outerTexture, innerTexture, lipTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.244673}>
        <group scale={4.08708}>
          <mesh castShadow receiveShadow geometry={nodes.top_1.geometry} material={nodes.top_1.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[innerTexture]} />
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.top_2.geometry} material={nodes.top_2.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[outerTexture]} />
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.top_3.geometry} material={nodes.top_3.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[lipTexture]} />
            </meshStandardMaterial>
          </mesh>
        </group>
        <group scale={4.08708}>
          <mesh castShadow receiveShadow geometry={nodes.bttm_1.geometry} material={nodes.bttm_1.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[innerTexture]} />
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.bttm_2.geometry} material={nodes.bttm_2.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[outerTexture]} />
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.bttm_3.geometry} material={nodes.bttm_3.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[lipTexture]} />
            </meshStandardMaterial>
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default HeartModel;

useGLTF.preload('/clam-models/heart/clam.glb');
