import { useTexture } from '@react-three/drei'

import RoundPearlModel from '../models/pearlModels/RoundPearlModel';

export const Pearl = () => {
  const textures = useTexture({
    map: '/pearl-models/patterns/ice-texture-final-7.jpg',
    envMap: '/pearl-models/patterns/envmap-2.jpg',
    emissiveMap: '/pearl-models/patterns/emissive-final.jpg'
  });

  return (
    <group position={[0, 0.001, 0]} scale={[4, 4, 4]}>
      <RoundPearlModel textures={textures} />
    </group>
  );
};
