import * as THREE from "three";

import { getSnoise } from "./noise-shader";
import { getAmplitude, getFrequency } from "./noise-material";

const fragmentShader = `
uniform vec3 glowColor;
varying float intensity;
void main() 
{
  vec3 glow = glowColor * intensity;
  gl_FragColor = vec4( glow, 1.0 );
}
`;

const vertexShader = (amplitude, frequency) => `
uniform vec3 viewVector;
uniform float c;
uniform float p;
varying float intensity;
${getSnoise()}
void main()
{
  vec3 vNormal = normalize( normalMatrix * normal );
  vec3 vNormel = normalize( normalMatrix * viewVector );
  intensity = pow( c - dot(vNormal, vNormel), p );
  float distortion = snoise(vec4(normal * ${frequency.toFixed(4)}, 1.0)) * ${amplitude.toFixed(4)};
  vec3 transformed = position + (normal * distortion);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;
//glowing without noise
/*const vertexShader = () => `
uniform vec3 viewVector;
uniform float c;
uniform float p;
varying float intensity;
void main()
{
  vec3 vNormal = normalize( normalMatrix * normal );
  vec3 vNormel = normalize( normalMatrix * viewVector );
  intensity = pow( c - dot(vNormal, vNormel), p );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`*/

export const getGlowMaterial = (camera, color, surface) =>
  new THREE.ShaderMaterial({
    uniforms: {
      /** Params "c" and "p" configure glow */
      /*c:   { type: "f", value: 1 },
        p:   { type: "f", value: 1.4 },*/
      c: { type: "f", value: 0.5 },
      p: { type: "f", value: 0.7 },
      /*c:   { type: "f", value: 0.1 },
        p:   { type: "f", value: 3 },*/
      glowColor: { type: "c", value: new THREE.Color(parseInt(color.replace("#", "0x"), 16)) },
      viewVector: { type: "v3", value: camera.position },
    },
    vertexShader: vertexShader(getAmplitude(surface), getFrequency(surface)),
    fragmentShader: fragmentShader,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });
