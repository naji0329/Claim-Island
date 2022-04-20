import { PearlScene } from "./PearlScene";
import { Pearl } from "../pearls/Pearl";
import { ReflectionPlate } from "../ReflectionPlate";
import { Mist } from "./Mist";

export const Pearl3DView = (props) => {
  const { pearlDna, decodedDna, height } = props;
  const { shape, surface, HSV, overtone, lustre, size, glow } = decodedDna;

  return (
    <div
      className="w-full sm:max-w-canvas h-canvas cursor-grab active:cursor-grabbing"
      style={{ height }}
    >
      <PearlScene>
        <Pearl
          shape={shape}
          surface={surface}
          HSV={HSV}
          overtone={overtone}
          lustre={lustre}
          size={size}
          pearlDna={pearlDna}
          glow={glow}
        />
        <ReflectionPlate />
        <Mist />
      </PearlScene>
    </div>
  );
};
