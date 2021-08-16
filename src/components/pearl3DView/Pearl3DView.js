import { PearlScene } from "./PearlScene";
import { PearlGround } from "./PearlGround";
import { Pearl } from "../pearls/Pearl";
import { ReflectionPlate } from "../ReflectionPlate";
import { Mist } from "./Mist";

export const Pearl3DView = () => (
  <div className="w-full max-w-canvas h-canvas cursor-grab active:cursor-grabbing">
    <PearlScene>
      <Pearl />
      <ReflectionPlate />
      <PearlGround />
      <Mist />
    </PearlScene>
  </div>
);
