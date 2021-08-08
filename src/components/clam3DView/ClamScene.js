import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

import { ClamBackground } from "./ClamBackground";

export const ClamScene = ({ children }) => {
  return (
    <Canvas
      camera={{
        fov: 75,
        aspect: 1,
        near: 0.1,
        far: 1000,
        position: [-0.4, 0.9, -1.4],
        zoom: 7,
      }}
      shadows
      raycaster={{enabled: true}}
      pixelRatio={window.devicePixelRatio}
      onCreated={canvasCtx => {
        canvasCtx.gl.physicallyCorrectLights = true;
      }}
    >
      <Suspense fallback={<Text>LOADING</Text>}>
        {children}
        <ClamBackground />
      </Suspense>
      <spotLight
        args={[0xffffff, 0.6, 6.42, 0.171, 1, 0]}
        castShadow
      />
      <spotLight
        args={[0xffffff, 1.14, 28.08, 0.214, 0, 1]}
      />
      <hemisphereLight args={[0x8d8d91, 0, 2.4]} position={[0, 10, 0]} />
      <OrbitControls
        enableZoom={false}
        autoRotate={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        target={[0,0.04,-0.09]}
      />
    </Canvas>
  )
};
