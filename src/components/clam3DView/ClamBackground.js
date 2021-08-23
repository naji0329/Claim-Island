import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

export const ClamBackground = () => {
  const { scene } = useThree();
  const [texture] = useTexture(["/clam-models/clam-template-bg-3.png"]);

  scene.background = texture;
  return null;
};

export default ClamBackground;
