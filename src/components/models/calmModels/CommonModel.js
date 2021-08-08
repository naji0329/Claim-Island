import React, {useRef} from 'react';
import {useGLTF} from '@react-three/drei';

export function CommonModel(props) {
  const group = useRef();
  const { nodes } = useGLTF('/clam-models/common/clam.glb');
  const { outerTexture, innerTexture, lipTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group position={[0, 0, -0.01]} scale={0.281405}>
        <group position={[0, 0.022376, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.top_1.geometry} material={nodes.top_1.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[innerTexture]}/>
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.top_2.geometry} material={nodes.top_2.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[outerTexture]}/>
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.top_3.geometry} material={nodes.top_3.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[lipTexture]}/>
            </meshStandardMaterial>
          </mesh>
        </group>
        <group position={[0, 0.002359, -0.001562]} rotation={[-2.114575, 0, 0]} scale={[1, 1, -1]}>
          <mesh castShadow receiveShadow geometry={nodes.bttm_1.geometry} material={nodes.bttm_1.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[innerTexture]}/>
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.bttm_2.geometry} material={nodes.bttm_2.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[outerTexture]}/>
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.bttm_3.geometry} material={nodes.bttm_3.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[lipTexture]}/>
            </meshStandardMaterial>
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default CommonModel;

useGLTF.preload('/clam-models/common/clam.glb');
