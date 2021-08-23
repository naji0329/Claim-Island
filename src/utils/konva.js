/** Just copied from 3DClams.js */
import Konva from "konva";
import * as THREE from "three";

const setKonvaLayerTexture = (layer, color, rgb) => {
  //   layer.hue(parseFloat(color.h));
  //   layer.saturation(parseFloat(color.s));
  //   layer.value(parseFloat(color.v));
  if (rgb) {
    layer.red(color.r);
    layer.green(color.g);
    layer.blue(color.b);
  } else {
    layer.hue(parseFloat(color[0]));
    layer.saturation(parseFloat(color[1] / 100));
    layer.value(parseFloat(color[2] / 100));
  }
  layer.batchDraw();
};

const loadTexture = (url) => {
  return new Promise((resolve) => {
    new THREE.TextureLoader().load(url, resolve);
  });
};

const loadTextureKonva = async (object, texture, base, rgb, addKonvaObject) => {
  const obj = object.type;
  const img = texture.image;
  const sliders = ["hue", "saturation", "value"];

  const layer = new Konva.Layer();

  const konvaImage = new Konva.Image({
    x: 0,
    y: 0,
    image: img,
    width: 1024,
    height: 1024,
  });
  addKonvaObject(konvaImage);
  layer.add(konvaImage);

  if (obj === "os") {
    const pattern = new Konva.Image({
      x: 0,
      y: 0,
      image: base.image,
      width: 1024,
      height: 1024,
      // fill: '#000',
      // stroke: '#ff0000'
    });
    addKonvaObject(pattern);
    layer.add(pattern);
  }

  layer.cache();
  if (rgb) {
    layer.filters([Konva.Filters.RGBA]);
  } else {
    layer.filters([Konva.Filters.HSV]);
  }

  setKonvaLayerTexture(layer, object.color, rgb);

  return layer;
};

export const loadAllTextures = async (traits, clamDir, rgb, addKonvaObject) => {
  const textures = [
    {
      type: "os",
      img: "outerPBS_basecolor.png",
      color: traits.shellColour.HSVadj || traits.shellColour,
    },
    {
      type: "is",
      img: "innerPBS_basecolor.png",
      color: traits.innerColour.HSVadj || traits.innerColour,
    },
    {
      type: "lip",
      img: "lip_basecolor.png",
      color: traits.lipColour.HSVadj || traits.lipColour,
    },
    {
      type: "tongue",
      img: "tongue_BaseColor.png",
      color: traits.tongueColour.HSVadj || traits.tongueColour,
    },
  ];
  //console.log(textures);
  const loaded = await Promise.all(textures.map((k) => loadTexture(clamDir + k.img)));
  const base = await loadTexture(
    "/clam-models/patterns/" + traits.pattern.toLowerCase() + "_basecolor.png"
  );

  return Promise.all(
    textures.map((k, i) => loadTextureKonva(k, loaded[i], base, rgb, addKonvaObject))
  );
};

export const getClamDir = (traits) => "/clam-models/" + traits.shellShape.toLowerCase() + "/";
