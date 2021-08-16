import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export const PearlBackground = () => {
  const { scene } = useThree();
  const [texture] = useTexture(['/pearl-models/patterns/pearl_bg.jpg']);
  scene.background = texture;
  return null;
}
