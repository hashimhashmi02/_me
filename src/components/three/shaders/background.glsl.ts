/**
 * Ambient hero background — fullscreen quad panning low-frequency
 * domain-warped value noise. Telemetry haze at ~4–8% intensity, never fog.
 */

export const backgroundVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`;

export const backgroundFragment = /* glsl */ `
uniform float uTime;
uniform float uAspect;
uniform vec3 uBg;
uniform vec3 uCyan;
uniform vec3 uViolet;
uniform vec3 uMagenta;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float f = 0.0;
  f += 0.5 * vnoise(p);
  f += 0.25 * vnoise(p * 2.03);
  f += 0.125 * vnoise(p * 4.07);
  f += 0.0625 * vnoise(p * 8.11);
  return f;
}

void main() {
  vec2 p = vec2(vUv.x * uAspect, vUv.y) * 1.35;

  vec2 w = vec2(
    fbm(p + vec2(0.0, uTime * 0.016)),
    fbm(p + 4.7 - vec2(uTime * 0.011, 0.0))
  );
  float n1 = fbm(p + w * 1.4 + vec2(0.0, uTime * 0.02));
  float n2 = fbm(p * 1.7 - w + vec2(uTime * 0.013, 0.0));

  vec3 col = uBg;
  col += uViolet * smoothstep(0.45, 0.95, n1) * 0.085;
  col += uCyan * smoothstep(0.5, 0.98, n2) * 0.06;
  col += uMagenta * smoothstep(0.62, 1.0, n1 * n2 * 2.1) * 0.03;

  // gentle corner falloff
  float vig = 1.0 - smoothstep(0.35, 1.25, distance(vUv, vec2(0.5)));
  col *= mix(0.72, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;
