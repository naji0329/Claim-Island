import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function SpadeModel(props) {
  const group = useRef();
  const { nodes } = useGLTF('/clam-models/spade/clam.glb');
  const { outerTexture, innerTexture, lipTexture, ...rest } = props;

    return (
      <group ref={group} {...rest}>
        <group position={[-0.225128, -0.001867, 0.221955]} scale={1.217426}>
          <mesh castShadow receiveShadow geometry={nodes.cs_top_1.geometry} material={nodes.cs_top_1.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[innerTexture]}/>
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.cs_top_2.geometry} material={nodes.cs_top_2.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[outerTexture]}/>
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.cs_top_3.geometry} material={nodes.cs_top_3.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[lipTexture]}/>
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.cs_bttm_1.geometry} material={nodes.cs_bttm_1.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[innerTexture]}/>
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.cs_bttm_2.geometry} material={nodes.cs_bttm_2.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[outerTexture]}/>
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.cs_bttm_3.geometry} material={nodes.cs_bttm_3.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[lipTexture]}/>
            </meshStandardMaterial>
          </mesh>
        </group>
      </group>
    );
}

export default SpadeModel;

useGLTF.preload('/clam-models/spade/clam.glb');
