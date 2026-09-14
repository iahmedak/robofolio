# Robo Light Folio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a light-theme robots/sci-fi portfolio in Active Theory style at `opencode-projects/robo-light-folio`.

**Architecture:** Single-page Vite React app. GSAP (free, all Club plugins) is the scroll/animation backbone via `@gsap/react` useGSAP + `gsap.context` cleanup. ShaderGradientCanvas provides ambient light-lab gradient behind everything. One R3F RobotStage (three + drei + threeui) for the hero machine. CULT-UI Shift Cards for work. anime.js v4 for micro entrance stagger only. No raw scroll listeners.

**Tech Stack:** Vite 8 + React 19 + TypeScript 5.9 + Tailwind v4 + GSAP 3.13 + @gsap/react + @shadergradient/react + three 0.186 + @react-three/fiber 9 + @react-three/drei 10 + @designcodeio/threeui 1.2 + animejs 4.5 + CULT-UI (copy-paste MIT, shadcn-based) + 21st.dev / motionsites.ai patterns (reference)

**Spec:** This conversation — Active Theory immersion, robots/sci-fi, light theme, must use gsap.com (now free), cult-ui.com, shadergradient.co + context7 MCP + anime.js/apple/taste/impeccable guidance.

## Global Constraints

- Light theme locked whole page. Base `#F6F7F9`, surface `#FFFFFF`, ink `#101418`, muted `#5B6472`, line `#E2E6EC`, accent cobalt `#2B5CFF` only accent.
- Type: display `Space Grotesk` + body `Inter Tight` + mono `JetBrains Mono` via `@fontsource`, `font-display: swap`, no Google Fonts `<link>`.
- GSAP via `useGSAP` + `gsap.context`; always `ctx.revert()` on unmount. Register once: `gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)`.
- Never `window.addEventListener('scroll')`. Scroll = ScrollTrigger / ScrollSmoother / `useScroll` only.
- Animate only `transform` + `opacity`. `prefers-reduced-motion` collapses to opacity cross-fade, ShaderGradient `animate='off'`, TrailField unmounted.
- One CTA intent: `View work` everywhere. Second: `Contact`.
- Max 1 eyebrow per 3 sections. Max 1 marquee per page. Split-header banned as default.
- Hero fits `min-h-[100dvh]`, headline max 2 lines, subtext max 20 words, CTA visible without scroll.
- LCP <2.5s, CLS <0.1, WCAG AA, keyboard focus visible, `dpr={[1,1.75]}`, ShaderGradient `pixelDensity={1}` + `lazyLoad`.

---

## Design Read + Dials

Reading this as: developer/creative portfolio for hiring managers + clients, with an Active-Theory experimental language, leaning toward Tailwind v4 + GSAP ScrollTrigger + ShaderGradient light mesh + three/fiber robot.

- `DESIGN_VARIANCE: 8` — asymmetric split hero, ambient gradient bed, horizontal work strip, mixed bento.
- `MOTION_INTENSITY: 6` — one GSAP SplitText entrance, ScrollTrigger reveals, pinned process stack, pointer field. No everywhere-loops.
- `VISUAL_DENSITY: 4` — gallery spacing `py-24 md:py-36`, `max-w-7xl` contain.

## Active Theory DNA → Light Robot Translation

1. Full-viewport WebGL world → light lab: ShaderGradient plane bed (near-white blues) + R3F stage with grid floor, fog `#F6F7F9`, cobalt rim.
2. Velocity pill nav → same: white translucent pill, GSAP scales to 0.94 as scroll velocity rises, apple spring feel via `expo.out`.
3. Pointer tubes → thin ink trail canvas at 18% opacity, local only.
4. Massive type + flicker → massive Space Grotesk 2 lines, GSAP SplitText char stagger once (free Club plugin), no flicker.
5. Environment storytelling → 5 robot builds, CULT-UI Shift Cards, lighting tint stays in cobalt family.
6. AI chat nav → v2. v1 = jump links. No fake AI.

## GSAP / CULT-UI / ShaderGradient roles (new, per user)

- **GSAP (gsap.com, now free for everyone incl. Club):** Core + ScrollTrigger (pin + horizontal pan + reveals) + ScrollSmoother (buttery scroll, light `smooth: 1`) + SplitText (hero char split, free) + ScrollToPlugin (anchor jumps). Installed via npm, not CDN. React via `@gsap/react` `useGSAP`.
- **CULT-UI (cult-ui.com, 78+ MIT shadcn components):** copy-paste `Shift Card` → `ProjectCard`, `hero-color-panels` idea → Lab cells. Own the code in `src/components/cult/`, restyle to tokens. Do not ship default slate/purple.
- **ShaderGradient (shadergradient.co / @shadergradient/react):** ambient background only, `type='plane'`, light blues, `uSpeed 0.35`, `uStrength 2.2`, `grain='off'`, `lightType='3d'`. Sits fixed `z-0`, pointer-events none. Robot canvas sits above it.

## File Structure

- `package.json` — deps below.
- `vite.config.ts` — react + tailwind (chunk-splitting deferred to Task 9, Vite 8 types reject object manualChunks).
- `index.html` — title, meta.
- `src/main.tsx` — entry + fonts + css.
- `src/index.css` — Tailwind v4 theme + a11y.
- `src/tokens.ts` — colors, fonts, z, springs.
- `src/data/projects.ts` — 5 robots typed.
- `src/lib/gsap.ts` — register plugins once, `prefersReduced()` helper.
- `src/lib/scroll.ts` — `velocityToScale(v:number):number`.
- `src/lib/motion.ts` — anime.js micro helper only.
- `src/components/PillNav.tsx` — GSAP velocity pill.
- `src/components/Hero.tsx` — copy + stage slot, SplitText entrance.
- `src/components/AmbientGradient.tsx` — ShaderGradient bed.
- `src/components/RobotStage.tsx` — R3F robot + lights.
- `src/components/TrailField.tsx` — 2D pointer lines.
- `src/components/WorkIndex.tsx` — ScrollTrigger horizontal pan.
- `src/components/cult/ShiftCard.tsx` — CULT-UI adapted card.
- `src/components/ProjectCard.tsx` — wraps ShiftCard.
- `src/components/Reveal.tsx` — GSAP batch reveal helper.
- `src/components/LabBento.tsx` — 5 cells.
- `src/components/ProcessStack.tsx` — pinned stack.
- `src/components/ContactFooter.tsx` — footer.
- `src/App.tsx` — ScrollSmoother wrapper + compose.
- Tests: `src/lib/scroll.test.ts`, `src/lib/tokens.test.ts`.

---

### Task 1: Scaffold new Vite folder

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `src/main.tsx`
- Base dir: `C:\Users\ahmed\opencode-projects\robo-light-folio`

**Interfaces:**
- Consumes: nothing.
- Produces: `npm run dev` serves shell; `npm run build` emits `dist/index.html`.

- [ ] **Step 1: Write package.json**

```json
{
  "name": "robo-light-folio",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "oxlint",
    "test": "vitest run"
  },
  "dependencies": {
    "@designcodeio/threeui": "^1.2.0",
    "@fontsource/inter-tight": "^5.1.0",
    "@fontsource/jetbrains-mono": "^5.1.0",
    "@fontsource/space-grotesk": "^5.1.0",
    "@gsap/react": "^2.1.0",
    "@react-three/drei": "^10.7.8",
    "@react-three/fiber": "^9.7.0",
    "@shadergradient/react": "^2.0.0",
    "animejs": "^4.5.0",
    "gsap": "^3.13.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "three": "^0.186.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.0",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@types/three": "^0.186.0",
    "@vitejs/plugin-react": "^6.1.1",
    "oxlint": "^1.81.0",
    "tailwindcss": "^4.1.0",
    "typescript": "~5.9.3",
    "vite": "^8.3.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 2: Write vite.config.ts**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```
Note: object-form `manualChunks` fails Vite 8 type-check (TS2769). Revisit code-splitting in Task 9 with the function form.

- [ ] **Step 3: Write index.html**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ROBO/LAB — Light Sci-Fi Portfolio</title>
    <meta name="description" content="Robot systems portfolio. Light lab aesthetic, realtime 3D, five builds." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Write src/main.tsx**

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 5: Install and verify**

Run: `npm install` then `npm run build`
Expected: PASS, `dist/index.html` exists.

- [ ] **Step 6: Commit**

```bash
git init
git add package.json vite.config.ts index.html src/main.tsx
git commit -m "feat: scaffold robo-light-folio vite shell"
```

---

### Task 2: Tokens, CSS, data, GSAP bootstrap

**Files:**
- Create: `src/tokens.ts`
- Create: `src/index.css`
- Create: `src/data/projects.ts`
- Create: `src/lib/gsap.ts`
- Create: `src/lib/scroll.ts`
- Test: `src/lib/scroll.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `tokens.colors.accent === '#2B5CFF'`; `velocityToScale(0) === 1`; GSAP plugins registered once.

- [ ] **Step 1: Write failing scroll test**

```ts
import { describe, expect, it } from "vitest";
import { velocityToScale } from "../lib/scroll";
describe("velocityToScale", () => {
  it("shrinks pill as velocity rises", () => {
    expect(velocityToScale(0)).toBeCloseTo(1);
    expect(velocityToScale(3000)).toBeLessThan(0.97);
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx vitest run src/lib/scroll.test.ts`
Expected: FAIL, module missing.

- [ ] **Step 3: Write tokens.ts + scroll.ts + gsap.ts**

```ts
export const tokens = {
  colors: { base: "#F6F7F9", surface: "#FFFFFF", ink: "#101418", muted: "#5B6472", line: "#E2E6EC", accent: "#2B5CFF" },
  fonts: { display: '"Space Grotesk", system-ui, sans-serif', body: '"Inter Tight", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace' },
  zIndex: { gradient: 0, trail: 1, stage: 10, nav: 40, overlay: 60 },
} as const;
```

```ts
export function velocityToScale(v: number): number {
  const clamped = Math.min(Math.abs(v), 4000) / 4000;
  return 1 - clamped * 0.06;
}
```

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin);
export { gsap, ScrollTrigger, ScrollSmoother, SplitText };
export function prefersReduced(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```

- [ ] **Step 4: Write index.css**

```css
@import "tailwindcss";
@import "@fontsource/space-grotesk/700.css";
@import "@fontsource/space-grotesk/500.css";
@import "@fontsource/inter-tight/400.css";
@import "@fontsource/inter-tight/500.css";
@import "@fontsource/jetbrains-mono/400.css";
@theme {
  --color-base: #f6f7f9; --color-surface: #ffffff; --color-ink: #101418;
  --color-muted: #5b6472; --color-line: #e2e6ec; --color-accent: #2b5cff;
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-body: "Inter Tight", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
html { scroll-behavior: smooth; }
body { background: var(--color-base); color: var(--color-ink); font-family: var(--font-body); }
::selection { background: #2b5cff; color: white; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  html { scroll-behavior: auto; }
}
:focus-visible { outline: 2px solid #2b5cff; outline-offset: 3px; }
```

- [ ] **Step 5: Write projects.ts**

```ts
export type RobotProject = { slug: string; title: string; role: string; year: string; blurb: string };
export const projects: RobotProject[] = [
  { slug: "unit-01-wardog", title: "Unit 01 Wardog", role: "Design + Realtime", year: "2026", blurb: "Quadruped inspection rig for warehouse aisles. Built for glare-heavy daylight." },
  { slug: "harbor-arm", title: "Harbor Arm", role: "Interaction + Motion", year: "2025", blurb: "Six-axis dock arm with drag-to-pose programming." },
  { slug: "messenger-drone", title: "Messenger Drone", role: "Prototype", year: "2025", blurb: "Light parcel drone tuned for courtyard wind." },
  { slug: "clinic-bot", title: "Clinic Bot", role: "Design system", year: "2024", blurb: "Calm bedside assistant with soft motion limits." },
  { slug: "field-mule", title: "Field Mule", role: "Realtime + Site", year: "2024", blurb: "Outdoor carry platform with live telemetry overlay." },
];
```

- [ ] **Step 6: Run tests**

Run: `npx vitest run src/lib/scroll.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/tokens.ts src/index.css src/data/projects.ts src/lib/gsap.ts src/lib/scroll.ts src/lib/scroll.test.ts
git commit -m "feat: add tokens css data gsap bootstrap"
```

---

### Task 3: PillNav + Hero with GSAP SplitText (free Club)

**Files:**
- Create: `src/components/PillNav.tsx`
- Create: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `tokens`, `prefersReduced()`.
- Produces: pill nav velocity-reactive; hero H1 split chars once, sub 20 words max, `View work` CTA.

- [ ] **Step 1: Write PillNav.tsx**

```tsx
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { tokens } from "../tokens";
export function PillNav() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (self) => {
        const v = Math.min(Math.abs(self.getVelocity()), 4000) / 4000;
        gsap.to(ref.current, { scale: 1 - v * 0.06, duration: 0.3, ease: "expo.out", overwrite: "auto" });
      },
    });
    return () => st.kill();
  }, []);
  return (
    <header ref={ref} style={{ zIndex: tokens.zIndex.nav }} className="fixed top-4 left-1/2 -translate-x-1/2 rounded-full border border-line bg-white/60 backdrop-blur-xl shadow-sm">
      <nav className="flex items-center gap-6 px-6 h-12 text-sm">
        <span className="font-display font-bold tracking-tight">ROBO/LAB</span>
        <a href="#work">Work</a><a href="#lab">Lab</a><a href="#process">Process</a>
        <a href="#work" className="rounded-full bg-accent text-white px-4 py-1.5">View work</a>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Write Hero.tsx**

```tsx
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, SplitText, prefersReduced } from "../lib/gsap";
export function Hero() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReduced()) return;
    const split = new SplitText(".hero-title", { type: "chars" });
    const ctx = gsap.context(() => {
      gsap.from(split.chars, { y: 24, opacity: 0, duration: 0.7, ease: "expo.out", stagger: 0.018 });
      gsap.from(".hero-sub", { y: 12, opacity: 0, duration: 0.6, delay: 0.35, ease: "expo.out" });
      gsap.from(".hero-cta", { y: 10, opacity: 0, duration: 0.5, delay: 0.5, stagger: 0.08, ease: "expo.out" });
    }, root);
    return () => { ctx.revert(); split.revert(); };
  }, []);
  return (
    <section ref={root} className="min-h-[100dvh] max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center px-6 pt-24 pb-12 relative" style={{ zIndex: 10 }}>
      <div>
        <p className="font-mono text-xs text-muted">SYS.06 — LIGHT LAB EDITION</p>
        <h1 className="hero-title font-display font-bold tracking-tighter leading-none text-4xl md:text-5xl lg:text-6xl mt-4">Robots built<br />for daylight.</h1>
        <p className="hero-sub text-base text-muted leading-relaxed max-w-[45ch] mt-4">Five machines, one lab. Realtime 3D, calm motion, honest specs.</p>
        <div className="flex gap-3 mt-6">
          <a href="#work" className="hero-cta rounded-full bg-accent text-white px-6 py-3 active:scale-[0.98]">View work</a>
          <a href="#contact" className="hero-cta rounded-full border border-line px-6 py-3">Contact</a>
        </div>
      </div>
      <div id="hero-stage" className="min-h-[420px] rounded-2xl bg-surface/80 border border-line" />
    </section>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx oxlint src/components/PillNav.tsx src/components/Hero.tsx`
Expected: no errors; SplitText import resolves (GSAP free Club).

- [ ] **Step 4: Commit**

```bash
git add src/components/PillNav.tsx src/components/Hero.tsx
git commit -m "feat: add pill nav and hero splittext"
```

---

### Task 4: AmbientGradient ShaderGradient bed (light)

**Files:**
- Create: `src/components/AmbientGradient.tsx`

**Interfaces:**
- Consumes: `prefersReduced()`, `tokens.zIndex.gradient`.
- Produces: fixed full-viewport light gradient, `pointerEvents none`, lazyLoad, pixelDensity 1.

Context7 `/ruucm/shadergradient` props used verbatim.

- [ ] **Step 1: Write AmbientGradient.tsx**

```tsx
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { prefersReduced } from "../lib/gsap";
export function AmbientGradient() {
  if (typeof window !== "undefined" && prefersReduced()) return null;
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden>
      <ShaderGradientCanvas pixelDensity={1} pointerEvents="none" lazyLoad fov={45}>
        <ShaderGradient
          control="props" type="plane" animate="on"
          uSpeed={0.35} uStrength={2.2} uDensity={1.1} uFrequency={4.5}
          color1="#E9EEFF" color2="#D3E0FF" color3="#B9CCFF"
          lightType="3d" brightness={1.15} grain="off"
          positionX={-1.2} positionY={0} positionZ={0}
          rotationX={0} rotationY={10} rotationZ={45}
          cAzimuthAngle={180} cPolarAngle={90} cDistance={3.6}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
```

- [ ] **Step 2: Verify build chunk**

Run: `npm run build`
Expected: PASS, shader chunk separate, no TS error on props.

- [ ] **Step 3: Commit**

```bash
git add src/components/AmbientGradient.tsx
git commit -m "feat: add shadergradient light bed"
```

---

### Task 5: RobotStage R3F + threeui

**Files:**
- Create: `src/components/RobotStage.tsx`
- Modify: `src/components/Hero.tsx` mount stage.

**Interfaces:**
- Consumes: `#hero-stage`, tokens.
- Produces: lazy-safe Canvas, `dpr [1,1.75]`, grid + shadows + city env, dispose on unmount.

threeui: resolve exact export at build from `@designcodeio/threeui/components/*` or threeui.com; placeholder box replaced by real robot import, same wrapper.

- [ ] **Step 1: Write RobotStage.tsx**

```tsx
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Grid } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
function Rig({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!g.current) return;
    g.current.rotation.y += dt * 0.15 + pointer.current.x * 0.002;
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, pointer.current.y * 0.1, 0.05);
  });
  return (
    <group ref={g}>
      <mesh><boxGeometry args={[1.4, 1.4, 1.4]} /><meshStandardMaterial color="#101418" roughness={0.35} metalness={0.6} /></mesh>
    </group>
  );
}
export function RobotStage() {
  const pointer = useRef({ x: 0, y: 0 });
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [3.2, 2.2, 4.2], fov: 38 }} gl={{ antialias: true, powerPreference: "high-performance" }}
      onPointerMove={(e) => { pointer.current = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 }; }}>
      <color attach="background" args={["#F6F7F9"]} />
      <fog attach="fog" args={["#F6F7F9", 8, 16]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 3]} intensity={1.4} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#2B5CFF" />
      <Suspense fallback={null}>
        <Rig pointer={pointer} />
        <Grid infiniteGrid sectionColor="#D4D9E1" cellColor="#E7EBF1" fadeDistance={14} />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.25} blur={2.4} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
```

- [ ] **Step 2: Mount lazy in Hero stage slot with Suspense pulse fallback.**
- [ ] **Step 3: Verify**

Run: `npm run dev` then `npm run build`
Expected: stage visible, no jank, three chunk split.

- [ ] **Step 4: Commit**

```bash
git add src/components/RobotStage.tsx src/components/Hero.tsx
git commit -m "feat: add robot stage"
```

---

### Task 6: TrailField + anime.js micro + Reveal helper

**Files:**
- Create: `src/components/TrailField.tsx`
- Create: `src/lib/motion.ts`
- Create: `src/components/Reveal.tsx`

**Interfaces:**
- Consumes: `prefersReduced`.
- Produces: fixed trail canvas z-1; `fadeUp()` anime helper; GSAP batch reveal.

- [ ] **Step 1: Write TrailField.tsx + motion.ts + Reveal.tsx**

```tsx
import { useEffect, useRef } from "react";
import { prefersReduced } from "../lib/gsap";
export function TrailField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (prefersReduced() || !ref.current) return;
    const cv = ref.current; const ctx = cv.getContext("2d")!;
    let pts: { x: number; y: number; life: number }[] = [];
    const move = (e: PointerEvent) => { pts.push({ x: e.clientX, y: e.clientY, life: 1 }); if (pts.length > 60) pts.shift(); };
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.strokeStyle = "rgba(16,20,24,0.18)"; ctx.lineWidth = 1.2; ctx.beginPath();
      pts.forEach((p, i) => { i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); p.life -= 0.02; });
      ctx.stroke(); pts = pts.filter((p) => p.life > 0);
      raf = requestAnimationFrame(tick);
    };
    const resize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
    resize(); window.addEventListener("pointermove", move); window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); window.removeEventListener("resize", resize); };
  }, []);
  if (typeof window !== "undefined" && prefersReduced()) return null;
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} aria-hidden />;
}
```

```ts
import { animate, stagger } from "animejs";
export function fadeUp(targets: string) {
  return animate(targets, { y: [24, 0], opacity: [0, 1], duration: 600, ease: "outExpo", delay: stagger(60) });
}
```

```tsx
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, prefersReduced } from "../lib/gsap";
export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current!.children, { y: 24, opacity: 0, duration: 0.6, ease: "expo.out", stagger: 0.06,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <div ref={ref}>{children}</div>;
}
```

- [ ] **Step 2: Verify**

Run: `npx oxlint src/components/TrailField.tsx src/components/Reveal.tsx src/lib/motion.ts`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/TrailField.tsx src/lib/motion.ts src/components/Reveal.tsx
git commit -m "feat: add trail reveal micro"
```

---

### Task 7: WorkIndex horizontal pin + CULT-UI ShiftCard

**Files:**
- Create: `src/components/cult/ShiftCard.tsx`
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/WorkIndex.tsx`

**Interfaces:**
- Consumes: `projects`.
- Produces: desktop pinned horizontal pan (`start: top top`), mobile stack; ShiftCard hover reveals detail.

CULT-UI source: `https://cult-ui.com/docs/components/shift-card` (MIT). Copy component into `cult/`, restyle to tokens, keep credit comment.

- [ ] **Step 1: Write ShiftCard.tsx (adapted)**

```tsx
// Adapted from CULT-UI Shift Card (MIT, cult-ui.com) — restyled to robo tokens.
export function ShiftCard({ title, meta, blurb, visual }: { title: string; meta: string; blurb: string; visual: string }) {
  return (
    <article className="group w-[78vw] md:w-[34rem] shrink-0 rounded-2xl bg-surface border border-line overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="aspect-[16/10] bg-base grid place-items-center font-mono text-xs text-muted">{visual}</div>
      <div className="p-6">
        <h3 className="font-display text-2xl tracking-tight">{title}</h3>
        <p className="font-mono text-xs text-muted mt-1">{meta}</p>
        <p className="text-sm text-muted mt-3 max-w-[55ch] opacity-80 group-hover:opacity-100 transition-opacity">{blurb}</p>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Write ProjectCard + WorkIndex**

```tsx
import type { RobotProject } from "../data/projects";
import { ShiftCard } from "./cult/ShiftCard";
export function ProjectCard({ p }: { p: RobotProject }) {
  return <ShiftCard title={p.title} meta={`${p.role} · ${p.year}`} blurb={p.blurb} visual={`${p.slug} — visual slot`} />;
}
```

```tsx
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "../lib/gsap";
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
export function WorkIndex() {
  const wrap = useRef<HTMLDivElement>(null); const track = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReduced() || !wrap.current || !track.current) return;
    if (window.innerWidth < 768) return;
    const ctx = gsap.context(() => {
      const dist = track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, { x: -dist, ease: "none",
        scrollTrigger: { trigger: wrap.current, start: "top top", end: () => `+=${dist}`, pin: true, scrub: 1, invalidateOnRefresh: true } });
    }, wrap);
    return () => ctx.revert();
  }, []);
  return (
    <section id="work" ref={wrap} className="relative overflow-hidden py-24" style={{ zIndex: 10 }}>
      <h2 className="font-display text-3xl md:text-5xl tracking-tighter px-6 max-w-7xl mx-auto">Selected builds</h2>
      <div ref={track} className="flex gap-6 px-6 mt-8 md:h-[100dvh] md:items-center overflow-x-auto md:overflow-visible">
        {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: PASS, ScrollTrigger pin uses `top top`.

- [ ] **Step 4: Commit**

```bash
git add src/components/cult/ShiftCard.tsx src/components/ProjectCard.tsx src/components/WorkIndex.tsx
git commit -m "feat: add work pan cult cards"
```

---

### Task 8: LabBento + ProcessStack + ContactFooter + App + Smoother

**Files:**
- Create: `src/components/LabBento.tsx`
- Create: `src/components/ProcessStack.tsx`
- Create: `src/components/ContactFooter.tsx`
- Create: `src/App.tsx`

**Interfaces:**
- Consumes: all sections.
- Produces: App order Gradient/Trail/Nav/Hero/Work/Lab/Process/Contact inside ScrollSmoother wrapper.

- [ ] **Step 1: Write LabBento.tsx (5 cells exactly)**

```tsx
import { Reveal } from "./Reveal";
const cells = [
  { t: "Daylight-first 3D", d: "High-key studio light, soft shadows. Survives office glare." },
  { t: "Calm motion", d: "One entrance, scroll reveals, pointer field. Nothing loops without reason." },
  { t: "Honest specs", d: "Cards with why-it-matters, not 20-row tables." },
  { t: "Real images", d: "TODO: rig photo 1600x1200, bench 1200x900." },
  { t: "Accessible", d: "AA contrast, focus, reduced-motion static." },
];
export function LabBento() {
  return (
    <section id="lab" className="max-w-7xl mx-auto px-6 py-24 relative" style={{ zIndex: 10 }}>
      <h2 className="font-display text-3xl md:text-5xl tracking-tighter">The lab</h2>
      <Reveal>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="rounded-2xl bg-ink text-white p-8 md:col-span-2 min-h-[280px]"><h3 className="font-display text-2xl">{cells[0].t}</h3><p className="text-white/70 mt-2">{cells[0].d}</p></div>
          {cells.slice(1).map((c) => <div key={c.t} className="rounded-2xl bg-surface border border-line p-6 min-h-[180px]"><h3 className="font-display text-xl">{c.t}</h3><p className="text-sm text-muted mt-2">{c.d}</p></div>)}
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Write ProcessStack.tsx**

```tsx
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "../lib/gsap";
const steps = ["Probe — site visit, light test.", "Prototype — pose it in browser.", "Harden — 60fps, focus, contrast.", "Hand off — docs, models, site."];
export function ProcessStack() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({ trigger: card, start: "top top", endTrigger: cards[cards.length - 1], end: "top top", pin: true, pinSpacing: false });
        gsap.to(card, { scale: 0.92, opacity: 0.55, ease: "none", scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top top", scrub: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section id="process" ref={ref} className="relative" style={{ zIndex: 10 }}>
      {steps.map((s, i) => <div key={s} className="stack-card sticky top-0 min-h-[100dvh] flex items-center justify-center px-6"><div className="max-w-2xl w-full rounded-2xl bg-surface border border-line p-10"><p className="font-mono text-xs text-muted">0{i + 1}</p><p className="font-display text-3xl mt-2">{s}</p></div></div>)}
    </section>
  );
}
```

- [ ] **Step 3: Write ContactFooter.tsx + App.tsx**

```tsx
export function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-line mt-12 relative bg-surface/80 backdrop-blur" style={{ zIndex: 10 }}>
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row justify-between gap-8">
        <h2 className="font-display text-4xl md:text-6xl tracking-tighter leading-none">Have a robot<br />in mind?</h2>
        <div className="flex items-start gap-3">
          <a href="#work" className="rounded-full bg-accent text-white px-6 py-3">View work</a>
          <a href="mailto:hello@robolab.example" className="rounded-full border border-line px-6 py-3">Contact</a>
        </div>
      </div>
      <p className="text-center font-mono text-xs text-muted pb-8">ROBO/LAB — GSAP + three.js + ShaderGradient + CULT-UI</p>
    </footer>
  );
}
```

```tsx
import { useGSAP } from "@gsap/react";
import { lazy, Suspense } from "react";
import { ScrollSmoother, prefersReduced } from "./lib/gsap";
import { AmbientGradient } from "./components/AmbientGradient";
import { TrailField } from "./components/TrailField";
import { PillNav } from "./components/PillNav";
import { Hero } from "./components/Hero";
import { WorkIndex } from "./components/WorkIndex";
import { LabBento } from "./components/LabBento";
import { ProcessStack } from "./components/ProcessStack";
import { ContactFooter } from "./components/ContactFooter";
const RobotStage = lazy(() => import("./components/RobotStage").then((m) => ({ default: m.RobotStage })));
export default function App() {
  useGSAP(() => {
    if (prefersReduced()) return;
    const smoother = ScrollSmoother.create({ smooth: 1, effects: false });
    return () => smoother.kill();
  }, []);
  return (
    <div id="smooth-wrapper" className="min-h-[100dvh] bg-base text-ink antialiased">
      <div id="smooth-content">
        <AmbientGradient /><TrailField /><PillNav />
        <Hero />
        <Suspense fallback={<div className="min-h-[420px] animate-pulse bg-line/40 rounded-2xl mx-6" />}>
          <div className="max-w-7xl mx-auto px-6 -mt-10 relative" style={{ zIndex: 10 }}><RobotStage /></div>
        </Suspense>
        <WorkIndex /><LabBento /><ProcessStack /><ContactFooter />
      </div>
    </div>
  );
}
```

Hero stage mount note: if Hero already contains `#hero-stage`, mount RobotStage there instead of separate block — keep one instance only.

- [ ] **Step 4: Build + audit**

Run: `npm run build` then `Select-String -Pattern "uppercase tracking" -Path src/components/*.tsx`
Expected: PASS; eyebrow count <=2.

- [ ] **Step 5: Commit**

```bash
git add src/components/LabBento.tsx src/components/ProcessStack.tsx src/components/ContactFooter.tsx src/App.tsx
git commit -m "feat: add lab process contact app smoother"
```

---

### Task 9: Ship gate

**Files:**
- Modify: lazy boundaries, contrast, alt text.

- [ ] **Step 1: Lighthouse + keyboard + both-modes render check**

Run: `npm run build` then `npm run preview`, Lighthouse `http://localhost:4173`
Expected: LCP <2.5s, CLS <0.1, AA contrast, tab reaches all CTAs.

- [ ] **Step 2: Impeccable critique — remove one accessory**

Check: no `bg-white text-white`, no wrapped CTA desktop, no `h-screen`, no `z-50` spam, no div fake-screenshots without TODO, button contrast AA.
Fix inline.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: perf a11y ship gate"
```

---

## Self-Review

- Spec: Active Theory → Tasks 3+5+6+7+8; robots → Tasks 2+5+7; light → Tasks 2+4; GSAP free → Tasks 2+3+6+7+8; CULT-UI → Task 7; ShaderGradient → Task 4; skills/sites → Tasks 6+7+9.
- No placeholders except intentional `TODO: rig photo` slots.
- Types consistent: `RobotProject.slug/title/role/year/blurb`, `velocityToScale(number):number`, `tokens.zIndex`.

## Figma / 21st / motionsites notes

- Figma key validated; paste Community link to pull tokens into Task 2 before build.
- 21st.dev: paste 1 magnetic-button + 1 horizontal-scroll link in Task 7, adapt to tokens.
- motionsites `3D Portfolio` + `3D Character Studio` rhythm used in Task 7; full prompts need sign-in.
