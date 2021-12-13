import { BigmouthModel } from "../models/calmModels/BigmouthModel";
import CommonTongueModel from "../models/tongueModels/bigMouth/CommonTongueModel";
import ForkedTongueModel from "../models/tongueModels/bigMouth/ForkedTongueModel";
import HeartTongueModel from "../models/tongueModels/bigMouth/HeartTongueModel";
import SpiralTongueModel from "../models/tongueModels/bigMouth/SpiralTongueModel";
import StarTongueModel from "../models/tongueModels/bigMouth/StarTongueModel";
import { TONGUE_TYPES } from "../../constants/ui/clams";

const TONGUE_COMPONENTS = {
  [TONGUE_TYPES.common]: CommonTongueModel,
  [TONGUE_TYPES.forked]: ForkedTongueModel,
  [TONGUE_TYPES.heart]: HeartTongueModel,
  [TONGUE_TYPES.spiral]: SpiralTongueModel,
  [TONGUE_TYPES.star]: StarTongueModel,
};

const DefaultTongue = () => null;

export const BigmouthClam = (props) => {
  const { tongueType, textures } = props;
  const [outerTexture, innerTexture, lipTexture, tongueTexture] = textures;
  const TongueComponent = TONGUE_COMPONENTS[tongueType] || DefaultTongue;
  return (
    <group position={[0.005, 0, -0.01]}>
      <BigmouthModel
        outerTexture={outerTexture}
        innerTexture={innerTexture}
        lipTexture={lipTexture}
      />
      <TongueComponent tongueTexture={tongueTexture} />
    </group>
  );
};
