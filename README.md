# hashim.dev — portfolio

Personal portfolio for Hashim — full-stack engineer building AI-integrated
tools that ship.

The signature element is a shader-driven "plasma core": a high-subdivision
icosahedron displaced by domain-warped simplex FBM, with a Fresnel rim that
sweeps the cyan→violet→magenta palette. Cursor velocity injects energy that
ripples the surface and decays with a spring; bloom, chromatic aberration,
and a vignette turn the crests into light. Behind it, a fullscreen GLSL quad
pans low-frequency warped noise — telemetry haze, not fog.

## Stack

- Next.js (App Router) · React · TypeScript (strict)
- React Three Fiber + drei + @react-three/postprocessing (custom GLSL)
- GSAP + ScrollTrigger (pinned hero handoff, scroll parallax)
- Lenis smooth scroll (driven by GSAP's ticker)
- Framer Motion (mask reveals, card expand dialogs, magnetic hovers)
- Tailwind CSS v4 (palette + type as `@theme` tokens)
- Fonts: Space Grotesk (display) · Inter (body) · JetBrains Mono (labels)

## Design system

Dark multi-hue "signal room": near-black base `#08080C`, neon data-viz
accents — cyan `#22E3FF`, violet `#8B5CF6`, magenta `#FF2E97`. Lime
`#B4FF39` is scarce and only ever means *live* (status pulse, shipped tags,
fx-on state). All tokens live in `src/app/globals.css`; the WebGL layer
mirrors them in `src/components/three/palette.ts`.

## Performance & accessibility

- All Three.js is code-split behind `next/dynamic` (`ssr: false`); one
  canvas, mounted only on the hero, idled when scrolled off-screen.
- Mobile budget: fewer subdivisions/particles, capped DPR, bloom-only
  post chain. Low-power devices and `prefers-reduced-motion` get a static
  gradient hero, native scroll, and instant reveals — plus a visible `fx`
  toggle in the nav to override either way.
- Semantic HTML, skip link, keyboard-visible focus, AA contrast on copy.

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

> Note: `/resume.pdf` is linked from the hero — drop the actual PDF into
> `public/resume.pdf` before deploying. DailyWages and Tryla card links are
> TODO in `src/lib/data.ts`.
