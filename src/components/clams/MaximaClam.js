import { MaximaModel } from "../models/calmModels/MaximaModel";
import CommonTongueModel from "../models/tongueModels/maxima/CommonTongueModel";
import ForkedTongueModel from "../models/tongueModels/maxima/ForkedTongueModel";
import HeartTongueModel from "../models/tongueModels/maxima/HeartTongueModel";
import SpiralTongueModel from "../models/tongueModels/maxima/SpiralTongueModel";
import StarTongueModel from "../models/tongueModels/maxima/StarTongueModel";
import { TONGUE_TYPES } from "../../constants/ui/clams";

const TONGUE_COMPONENTS = {
  [TONGUE_TYPES.common]: CommonTongueModel,
  [TONGUE_TYPES.forked]: ForkedTongueModel,
  [TONGUE_TYPES.heart]: HeartTongueModel,
  [TONGUE_TYPES.spiral]: SpiralTongueModel,
  [TONGUE_TYPES.star]: StarTongueModel,
};

const DefaultTongue = () => null;

export const MaximaClam = (props) => {
  const { tongueType, textures } = props;
  const [outerTexture, innerTexture, lipTexture, tongueTexture] = textures;
  const TongueComponent = TONGUE_COMPONENTS[tongueType] || DefaultTongue;
  return (
    <group position={[0, 0, -0.01]}>
      <MaximaModel
        outerTexture={outerTexture}
        innerTexture={innerTexture}
        lipTexture={lipTexture}
      />
      <TongueComponent tongueTexture={tongueTexture} />
    </group>
  );
};
