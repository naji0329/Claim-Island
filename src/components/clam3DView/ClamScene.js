import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

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
      dpr={[1, 2]}
    >
      <Suspense fallback={<Text>LOADING</Text>}>
        {children}
      </Suspense>
      <spotLight
        args={[0xffffff, 0.6, 6.42, 0.171, 1, 0]}
        castShadow
      />
      <spotLight
        args={[0xffffff, 1.14, 28.08, 0.214, 0, 1]}
      />
      <hemisphereLight args={[9538957, 0, 2.4]}/>
      <OrbitControls
        enableZoom={false}
        autoRotate={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
};
