import * as THREE from "three";

export const updateMap = (texture) => {
  if (!texture) {
    return;
  }
  texture.encoding = THREE.sRGBEncoding;
  texture.flipY = false;
};

export const updateEnvMap = (texture) => {
  if (!texture) {
    return;
  }
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.encoding = THREE.sRGBEncoding;
};

export const updateEmissiveMap = (texture) => {
  if (!texture) {
    return;
  }
  texture.encoding = THREE.sRGBEncoding;
  texture.flipY = false;
};

export const getTextureFiles = (overtoneColour, bodyHSV) => {
  let envMapFile;
  let emissiveFile;

  switch (overtoneColour) {
    case "rainbow":
      emissiveFile = "emissive-rainbow-2.jpg";
      bodyHSV[2] < 40
        ? (envMapFile = "envmap-rainbow-dark.jpg")
        : (envMapFile = "envmap-rainbow-light.jpg");
      break;

    case "peacock":
      emissiveFile = "emissive-peacock-2.jpg";
      bodyHSV[2]
        ? (envMapFile = "envmap-peacock-dark.jpg")
        : (envMapFile = "envmap-peacock-light.jpg");
      break;

    default:
      emissiveFile = "emissive-final.jpg";
      bodyHSV[2] ? (envMapFile = "envmap-4.jpg") : (envMapFile = "envmap-5.jpg");
      break;
  }

  return [envMapFile, emissiveFile];
};

export const getEmissiveIntensity = (bodyHSV, overtoneHSV, lustre) => {
  const bodySFactor = bodyHSV[0] === 0 ? 0 : (100 - bodyHSV[1]) / 100;
  const bodyVFactor = bodyHSV[2] / 100;
  const overtoneSFactor = (100 - overtoneHSV[1]) / 100;
  const overtoneVFactor =
    overtoneHSV[2] < 40 ? ((100 - overtoneHSV[2]) / 100) * 2 : (100 - overtoneHSV[2]) / 100;
  const lustreFactor = lustre / 100;

  const eInt =
    0.1 * bodySFactor +
    0.15 * bodyVFactor +
    0.05 * overtoneSFactor +
    0.15 * overtoneVFactor +
    0.15 * lustreFactor;

  return eInt;
};
