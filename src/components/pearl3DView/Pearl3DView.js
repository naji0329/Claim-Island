import { PearlScene } from "./PearlScene";
import { PearlGround } from "./PearlGround";
import { Pearl } from "../pearls/Pearl";
import { ReflectionPlate } from "../ReflectionPlate";
import { Mist } from "./Mist";

export const Pearl3DView = (props) => {
  const { pearlDna, decodedDna, showTraitsTable } = props;
  const { shape, surface, HSV, overtone, lustre, size } = decodedDna;

  return (
    <div className="w-full max-w-canvas h-canvas cursor-grab active:cursor-grabbing">
      <PearlScene>
        <Pearl
          shape={shape}
          surface={surface}
          HSV={HSV}
          overtone={overtone}
          lustre={lustre}
          size={size}
        />
        <ReflectionPlate />
        <PearlGround />
        <Mist />
      </PearlScene>
    </div>
  );
};
