import { useCallback, useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import convert from "color-convert";

import { PEARLS_SHAPES } from "../../constants/pearls";
import BaroquePearlModel from "../models/pearlModels/BaroquePearlModel";
import ButtonPearlModel from "../models/pearlModels/ButtonPearlModel";
import DropPearlModel from "../models/pearlModels/DropPearlModel";
import OvalPearlModel from "../models/pearlModels/OvalPearlModel";
import RingedPearlModel from "../models/pearlModels/RingedPearlModel";
import RoundPearlModel from "../models/pearlModels/RoundPearlModel";
import { getOnBeforeCompile } from "../../shaders/noise-material";
import { getGlowMaterial } from "../../shaders/glow";

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
};

export const Pearl = (props) => {
  const { shape, surface, HSV, overtone, lustre, size, pearlDna, glow } = props;

  const PearlComponent = PEARL_COMPONENTS[shape] || PEARL_COMPONENTS.default;
  const [bodyColorHSV, overtoneColorHSV] = HSV;
  const [envMapFile, emissiveMapFile] = getTextureFiles(overtone, bodyColorHSV);
  const color = `#${convert.hsv.hex(bodyColorHSV)}`;
  const emissive = `#${convert.hsv.hex(overtoneColorHSV)}`;
  const emissiveIntensity = getEmissiveIntensity(bodyColorHSV, overtoneColorHSV, lustre);
  const roughness = 0.2 + ((100 - lustre) / 100) * 0.15;
  const scaleFactor = (size / 100) * 0.5 + 0.5;
  const { gl: canvasGl } = useThree();

  const { map, envMap, emissiveMap } = useTexture({
    map: "/pearl-models/patterns/ice-texture-final-7.jpg",
    envMap: `/pearl-models/patterns/${envMapFile}`,
    emissiveMap: `/pearl-models/patterns/${emissiveMapFile}`,
  });

  const onBeforeCompile = useCallback(getOnBeforeCompile(surface), [surface]);

  const { camera } = useThree();
  camera.layers.enable(1);
  const glowMaterial = useMemo(() => glow && getGlowMaterial(camera, color, surface), [glow]);

  useEffect(() => {
    updateMap(map);
    updateEnvMap(envMap);
    updateEmissiveMap(emissiveMap);
    renderImg();
    return () => {
      map.dispose();
      envMap.dispose();
      emissiveMap.dispose();
    };
  }, [map, envMap, emissiveMap]);

  // check if cache api image exists
  const checkImgExists = async (cache) => {
    const response = await cache.match(`/${pearlDna}`);
    if (response) {
      let pearlImg = await response.json();
      pearlImg = pearlImg ? pearlImg.img : pearlImg;
      return pearlImg ? true : false;
    } else {
      return false;
    }
  };

  const renderImg = async () => {
    const cache = await caches.open("clam-island");
    let imgExists = await checkImgExists(cache);

    if (!imgExists) {
      const img = canvasGl.domElement.toDataURL();
      cache.put(`/${pearlDna}`, new Response(JSON.stringify({ img })));
      //startRotation(true);
    } else {
      //startRotation(true);
    }
  };

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
        glowMaterial={glowMaterial ? glowMaterial : undefined}
      />
    </group>
  );
};
