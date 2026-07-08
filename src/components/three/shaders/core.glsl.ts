import { simplex3d } from "./noise.glsl";

/**
 * Signature object — a "plasma core" icosahedron.
 * Vertex: domain-warped FBM displacement + a localized cursor kick whose
 * energy is injected from JS (signal.energy) and decays per frame.
 * Fragment: dark body, Fresnel rim sweeping cyan→violet→magenta, glowing
 * turbulence crests picked up by bloom.
 */

export const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uIntro;   // 0..1 page-load settle
uniform float uEnergy;  // decaying interaction energy
uniform float uAmp;     // base displacement amplitude
uniform vec3 uMouse;    // cursor on the object's z-plane, world space

varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;
varying float vKick;

${simplex3d}

// scalar turbulence field over the unit sphere
float field(vec3 n) {
  vec3 q = n * 1.7 + vec3(0.0, uTime * 0.07, uTime * 0.11);
  vec3 warp = vec3(
    snoise(q + vec3(13.7, 0.0, 0.0)),
    snoise(q + vec3(0.0, 71.3, 0.0)),
    snoise(q + vec3(0.0, 0.0, 29.1))
  );
  vec3 s = n * 1.9 + warp * 0.5 + vec3(uTime * 0.05, 0.0, uTime * 0.09);
  return 0.5 * snoise(s) + 0.25 * snoise(s * 2.07) + 0.125 * snoise(s * 4.13);
}

void main() {
  vec3 n = normalize(position);
  float r = length(position);

  vec3 wp = (modelMatrix * vec4(position, 1.0)).xyz;
  float d = distance(wp, uMouse);
  float influence = exp(-d * d * 2.2);
  float kick = influence * uEnergy;

  float amp = uAmp * (0.4 + 0.6 * uIntro) + kick * 0.45;

  float f0 = field(n);
  float ripple = kick * 0.22 * sin(16.0 * d - uTime * 8.0);
  float disp = amp * f0 + ripple;

  // finite-difference normal of the displaced sphere
  vec3 t1 = normalize(
    abs(n.y) < 0.99 ? cross(n, vec3(0.0, 1.0, 0.0)) : cross(n, vec3(1.0, 0.0, 0.0))
  );
  vec3 t2 = normalize(cross(n, t1));
  float e = 0.055;
  vec3 nA = normalize(n + t1 * e);
  vec3 nB = normalize(n + t2 * e);
  vec3 pO = n  * (r + amp * f0);
  vec3 pA = nA * (r + amp * field(nA));
  vec3 pB = nB * (r + amp * field(nB));
  vec3 newNormal = normalize(cross(pA - pO, pB - pO));
  if (dot(newNormal, n) < 0.0) newNormal = -newNormal;

  vec3 displaced = n * (r + disp);
  displaced += (kick * 0.1) * normalize(wp - uMouse + vec3(1e-4));

  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  gl_Position = projectionMatrix * mv;

  vNormal = normalize(normalMatrix * newNormal);
  vView = normalize(-mv.xyz);
  vDisp = disp;
  vKick = kick;
}
`;

export const coreFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uCyan;
uniform vec3 uViolet;
uniform vec3 uMagenta;

varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;
varying float vKick;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vView);
  float fres = pow(max(1.0 - clamp(dot(N, V), 0.0, 1.0), 1e-4), 3.1);

  // sweep the rim through the palette, keyed to turbulence + slow time drift
  float t = clamp(0.5 + vDisp * 1.7 + 0.22 * sin(uTime * 0.35), 0.0, 1.0);
  vec3 sweep = mix(uCyan, uViolet, smoothstep(0.0, 0.55, t));
  sweep = mix(sweep, uMagenta, smoothstep(0.55, 1.0, t));

  vec3 body = vec3(0.012, 0.012, 0.024);
  float crest = smoothstep(0.24, 0.5, vDisp) * 0.28;

  vec3 col = body + sweep * (fres * (1.2 + vKick * 1.5) + crest);
  gl_FragColor = vec4(col, 1.0);
}
`;
