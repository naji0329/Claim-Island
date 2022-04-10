import { SharpToothModel } from "../models/calmModels/SharpToothModel";
import CommonTongueModel from "../models/tongueModels/sharpTooth/CommonTongueModel";
import ForkedTongueModel from "../models/tongueModels/sharpTooth/ForkedTongueModel";
import HeartTongueModel from "../models/tongueModels/sharpTooth/HeartTongueModel";
import SpiralTongueModel from "../models/tongueModels/sharpTooth/SpiralTongueModel";
import StarTongueModel from "../models/tongueModels/sharpTooth/StarTongueModel";
import { TONGUE_TYPES } from "../../constants/ui/clams";

const TONGUE_COMPONENTS = {
  [TONGUE_TYPES.common]: CommonTongueModel,
  [TONGUE_TYPES.forked]: ForkedTongueModel,
  [TONGUE_TYPES.heart]: HeartTongueModel,
  [TONGUE_TYPES.spiral]: SpiralTongueModel,
  [TONGUE_TYPES.star]: StarTongueModel,
};

const DefaultTongue = () => null;

export const SharpToothClam = (props) => {
  const { tongueType, textures } = props;
  const [outerTexture, innerTexture, lipTexture, tongueTexture] = textures;
  const TongueComponent = TONGUE_COMPONENTS[tongueType] || DefaultTongue;
  return (
    <group position={[0, 0.04, -0.01]}>
      <SharpToothModel
        outerTexture={outerTexture}
        innerTexture={innerTexture}
        lipTexture={lipTexture}
      />
      <TongueComponent tongueTexture={tongueTexture} />
    </group>
  );
};
