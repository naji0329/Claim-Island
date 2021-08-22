import { useCallback, useEffect } from "react";
import { useTexture } from '@react-three/drei'
import convert from 'color-convert';

import { PEARLS_SHAPES } from "../../constants/pearls";
import BaroquePearlModel from '../models/pearlModels/BaroquePearlModel';
import ButtonPearlModel from '../models/pearlModels/ButtonPearlModel';
import DropPearlModel from '../models/pearlModels/DropPearlModel';
import OvalPearlModel from '../models/pearlModels/OvalPearlModel';
import RingedPearlModel from '../models/pearlModels/RingedPearlModel';
import RoundPearlModel from '../models/pearlModels/RoundPearlModel';
import { getOnBeforeCompile } from "../../shaders/noise-material";

import {
  updateMap,
  updateEnvMap,
  updateEmissiveMap,
  getTextureFiles,
  getEmissiveIntensity,
} from "../../utils/pearl-helper";

const PEARL_COMPONENTS = {
  [PEARLS_SHAPES.baroque]: BaroquePearlModel,
  [PEARLS_SHAPES.button]: ButtonPearlModel,
  [PEARLS_SHAPES.drop]: DropPearlModel,
  [PEARLS_SHAPES.oval]: OvalPearlModel,
  [PEARLS_SHAPES.ringed]: RingedPearlModel,
  [PEARLS_SHAPES.round]: RoundPearlModel,
  default: () => null,
}

export const Pearl = (props) => {
  const {
    shape,
    surface,
    HSV,
    overtone,
    lustre,
    size,
  } = props;

  const PearlComponent = PEARL_COMPONENTS[shape] || PEARL_COMPONENTS.default;
  const [bodyColorHSV, overtoneColorHSV] = HSV;
  const [envMapFile, emissiveMapFile] = getTextureFiles(overtone, bodyColorHSV);
  const color = `#${convert.hsv.hex(bodyColorHSV)}`;
  const emissive = `#${convert.hsv.hex(overtoneColorHSV)}`;
  const emissiveIntensity = getEmissiveIntensity(bodyColorHSV, overtoneColorHSV, lustre);
  const roughness = 0.2 + (100 - lustre) / 100 * 0.15;
  const scaleFactor = size / 100 * 0.5 + 0.5;

  const {
    map,
    envMap,
    emissiveMap,
  } = useTexture({
    map: '/pearl-models/patterns/ice-texture-final-7.jpg',
    envMap: `/pearl-models/patterns/${envMapFile}`,
    emissiveMap: `/pearl-models/patterns/${emissiveMapFile}`,
  });

  const onBeforeCompile = useCallback(getOnBeforeCompile(surface), [surface]);

  useEffect(() => {
    updateMap(map);
    updateEnvMap(envMap);
    updateEmissiveMap(emissiveMap);
  }, [map, envMap, emissiveMap]);

  return (
    <group position={[0, 0.001, 0]} scale={4 * scaleFactor}>
      <PearlComponent
        map={map}
        envMap={envMap}
        emissiveMap={emissiveMap}
        onBeforeCompile={onBeforeCompile}
        envMapIntensity={1.2}
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        roughness={roughness}
      />
    </group>
  );
};
