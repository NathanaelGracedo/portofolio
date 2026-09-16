# Portfolio Front-End Polish & Visual Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement front-end visual enhancements, fix the custom cursor bug, and update content corrections across Hero and Education sections.

**Architecture:** Enhance the client-side background canvas with an interactive cyber constellation particle mesh that reacts to cursor proximity while throttled for performance. Add GPU-accelerated ambient glowing orbs via CSS keyframes in `Layout.astro` and fix the desktop custom cursor visibility with a global CSS rule. Update static data in `Hero.astro` and `Education.astro`.

**Tech Stack:** Astro v5, Tailwind CSS v4, HTML5 Canvas, Vanilla JavaScript (ES Modules).

## Global Constraints

- Pointer Fix: Apply `cursor: none !important` on desktop fine pointer devices (`@media (hover: hover) and (pointer: fine)`) across interactive and body elements. Touch devices must retain native touch behavior.
- Hero Copy: Subtitle strictly "Software Developer" (remove "AI").
- Hero Metric 2: Target `1`, label "Internship Experience" (no mention of company name in card).
- Hero Metric 3: Target `10`, label "Tech Stacks Mastered", formats to `10+`.
- Education: Entry 2 strictly "SMK Telkom Shandy Putra Malang", degree "Rekayasa Perangkat Lunak (RPL)", period "2019 — 2022", status "Graduated".
- Background Animation: Interactive constellation particle mesh in `GridCanvas.astro`, responsive to theme and respecting `prefers-reduced-motion`.
- Ambient Orbs: GPU-accelerated CSS keyframe transforms without main thread layout thrashing.
- Performance: `npm run build` must succeed with 0 errors.

---

### Task 1: Cursor Bug Fix & Content Corrections

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/Hero.astro`
- Modify: `src/components/Education.astro`

**Interfaces:**
- Consumes: Existing component templates.
- Produces: Hidden native OS cursor on desktop, updated hero subtitle and metrics, corrected vocational high school history.

- [ ] **Step 1: Add global cursor hide rule in src/styles/global.css**

In `src/styles/global.css`, add the desktop fine-pointer rule inside `@layer base`:
```css
@media (hover: hover) and (pointer: fine) {
  html,
  body,
  a,
  button,
  input,
  textarea,
  select,
  [role="button"],
  .hud-card {
    cursor: none !important;
  }
}
```

- [ ] **Step 2: Update Hero subtitle and metric cards in src/components/Hero.astro**

In `src/components/Hero.astro`:
1. Change subtitle text:
```html
<p class="font-mono text-sm sm:text-base text-[var(--accent-orange)] font-medium mb-6">
  Software Developer
</p>
```
2. Update metric cards 2 and 3:
```html
<div class="hud-card rounded-lg p-3 sm:p-4 text-center">
  <div class="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] counter" data-target="4">0</div>
  <p class="font-mono text-[10px] sm:text-xs text-[var(--text-muted)] mt-1">Highlighted Projects</p>
</div>
<div class="hud-card rounded-lg p-3 sm:p-4 text-center">
  <div class="font-display text-2xl sm:text-3xl font-bold text-[var(--accent-blue)] counter" data-target="1">0</div>
  <p class="font-mono text-[10px] sm:text-xs text-[var(--text-muted)] mt-1">Internship Experience</p>
</div>
<div class="hud-card rounded-lg p-3 sm:p-4 text-center">
  <div class="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] counter" data-target="10">0</div>
  <p class="font-mono text-[10px] sm:text-xs text-[var(--text-muted)] mt-1">Tech Stacks Mastered</p>
</div>
```

- [ ] **Step 3: Update Education history in src/components/Education.astro**

In `src/components/Education.astro`, update the `educations` array:
```typescript
const educations: EducationItem[] = [
  {
    institution: "Politeknik Negeri Malang",
    degree: "Sarjana Terapan (D4) Teknik Informatika",
    period: "2022 — Present",
    status: "Undergraduate",
    notes: "Focused on mobile software engineering, modern web architectures, algorithms, and distributed systems."
  },
  {
    institution: "SMK Telkom Shandy Putra Malang",
    degree: "Rekayasa Perangkat Lunak (RPL)",
    period: "2019 — 2022",
    status: "Graduated",
    notes: "Foundational software engineering curriculum covering web development, mobile applications, database modeling, and algorithmic design."
  }
];
```

- [ ] **Step 4: Verify build**

Run:
```bash
npm run build
```
Expected: PASS with 0 errors.

- [ ] **Step 5: Commit Task 1**

```bash
git add src/styles/global.css src/components/Hero.astro src/components/Education.astro
git commit -m "fix: hide native cursor on desktop, update hero metrics, and correct education history"
```

---

### Task 2: Background Constellation Mesh Canvas Upgrade

**Files:**
- Modify: `src/components/GridCanvas.astro`

**Interfaces:**
- Consumes: Mouse position events, window resize, theme changes.
- Produces: Dynamic interactive constellation particle mesh with connecting lines and retro grid.

- [ ] **Step 1: Upgrade src/components/GridCanvas.astro with particle network**

Implement constellation particles in `src/components/GridCanvas.astro`:
- Particle array (~45-55 nodes) with `x`, `y`, `vx`, `vy`, and `size`.
- Mouse tracking coordinates `mouseX`, `mouseY` (reset on `mouseleave`).
- Draw connecting lines between particles closer than 90px.
- Draw connecting lines from particles to cursor when within 120px with slight attraction.
- Batch path drawing into single `beginPath()` and `stroke()` for efficiency.
- Dynamic theme response (Dark HUD vs Light Sand).
- Respect `prefers-reduced-motion`.

```astro
---
---
<div class="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
  <canvas id="grid-canvas" class="w-full h-full block opacity-60"></canvas>
  <div class="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)] opacity-80 pointer-events-none"></div>
</div>

<script>
  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
  }

  const canvas = document.getElementById('grid-canvas') as HTMLCanvasElement | null;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = 1;
    let offset = 0;
    let animationId: number;
    let lastTime = 0;
    const fps = 35; // Throttled for performance
    const fpsInterval = 1000 / fps;

    let mouseX = -1000;
    let mouseY = -1000;

    const particles: Particle[] = [];
    const particleCount = 48;

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.5 + 1
        });
      }
    };

    const resize = () => {
      if (!canvas || !ctx) return;
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) initParticles();
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });
    document.addEventListener('mouseleave', () => {
      mouseX = -1000;
      mouseY = -1000;
    });

    resize();

    const renderScene = (isAnimated: boolean) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const gridColor = isLight ? 'rgba(25, 24, 24, 0.04)' : 'rgba(255, 255, 255, 0.03)';
      const nodeColor = isLight ? 'rgba(27, 93, 239, 0.4)' : 'rgba(96, 165, 250, 0.4)';
      const lineBaseColor = isLight ? '27, 93, 239' : '96, 165, 250';

      const gridSize = 45;
      if (isAnimated) {
        offset = (offset + 0.25) % gridSize;
      }

      // 1. Draw subtle background grid
      ctx.beginPath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offset; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isAnimated) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Mouse gravitational interaction
          const dxM = mouseX - p.x;
          const dyM = mouseY - p.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);
          if (distM < 120) {
            p.x += (dxM / distM) * 0.3;
            p.y += (dyM / distM) * 0.3;
          }
        }

        // Draw particle dot
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // 3. Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            const alpha = (1 - dist / 85) * (isLight ? 0.12 : 0.18);
            ctx.strokeStyle = `rgba(${lineBaseColor}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect particle to mouse
        const dxM = mouseX - p.x;
        const dyM = mouseY - p.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < 110) {
          const alpha = (1 - distM / 110) * (isLight ? 0.25 : 0.35);
          ctx.strokeStyle = `rgba(${lineBaseColor}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      }
    };

    const drawLoop = (currentTime: number) => {
      animationId = requestAnimationFrame(drawLoop);
      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);
      renderScene(true);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      renderScene(false);
    } else {
      animationId = requestAnimationFrame(drawLoop);
    }

    mediaQuery.addEventListener('change', (e) => {
      cancelAnimationFrame(animationId);
      if (e.matches) {
        renderScene(false);
      } else {
        lastTime = performance.now();
        animationId = requestAnimationFrame(drawLoop);
      }
    });

    const observer = new MutationObserver(() => {
      if (mediaQuery.matches) renderScene(false);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }
</script>
```

- [ ] **Step 2: Verify build**

Run:
```bash
npm run build
```
Expected: PASS with 0 build errors.

- [ ] **Step 3: Commit Task 2**

```bash
git add src/components/GridCanvas.astro
git commit -m "feat: upgrade background with interactive cyber constellation mesh canvas"
```

---

### Task 3: Ambient Glowing Orbs & HUD Layout Accents

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/Layout.astro`

**Interfaces:**
- Consumes: Layout shell, theme variables.
- Produces: Atmospheric floating blurred ambient glow orbs and HUD corner crosshairs decor.

- [ ] **Step 1: Add keyframes in src/styles/global.css**

In `src/styles/global.css`, append keyframes for ambient orb drifting:
```css
@keyframes orb-float-1 {
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(-35px, 45px, 0);
  }
}

@keyframes orb-float-2 {
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(45px, -35px, 0);
  }
}

.ambient-orb-1 {
  animation: orb-float-1 18s ease-in-out infinite;
  will-change: transform;
}

.ambient-orb-2 {
  animation: orb-float-2 22s ease-in-out infinite;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .ambient-orb-1,
  .ambient-orb-2 {
    animation: none !important;
  }
}
```

- [ ] **Step 2: Add ambient orbs and HUD layout accents to src/layouts/Layout.astro**

In `src/layouts/Layout.astro`, add the ambient orbs and decorative HUD corner crosshairs:
```astro
---
import '../styles/global.css';
import TopNav from '../components/TopNav.astro';
import Footer from '../components/Footer.astro';
import GridCanvas from '../components/GridCanvas.astro';
import CustomCursor from '../components/CustomCursor.astro';
import StatusBar from '../components/StatusBar.astro';
import ShortcutsModal from '../components/ShortcutsModal.astro';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = "Nathanael Juan Gracedo — Software Developer",
  description = "Portfolio of Nathanael Juan Gracedo — Informatics Engineering undergraduate at Politeknik Negeri Malang focused on software development across web and mobile."
} = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  
  <!-- Preconnect & Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />

  <!-- Anti-FOUC Theme Script -->
  <script is:inline>
    (function () {
      try {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();
  </script>
</head>
<body class="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative">
  <!-- Ambient Blurred Glowing Orbs -->
  <div class="fixed top-[10%] right-[5%] w-96 h-96 rounded-full bg-[var(--accent-blue)]/12 blur-3xl pointer-events-none z-0 ambient-orb-1" aria-hidden="true"></div>
  <div class="fixed bottom-[15%] left-[5%] w-80 h-80 rounded-full bg-[var(--accent-orange)]/8 blur-3xl pointer-events-none z-0 ambient-orb-2" aria-hidden="true"></div>

  <!-- Decorative HUD Layout Corner Crosshairs -->
  <div class="fixed top-16 left-6 font-mono text-[10px] text-[var(--text-muted)] opacity-30 select-none pointer-events-none hidden xl:block" aria-hidden="true">+</div>
  <div class="fixed top-16 right-6 font-mono text-[10px] text-[var(--text-muted)] opacity-30 select-none pointer-events-none hidden xl:block" aria-hidden="true">+</div>
  <div class="fixed bottom-12 left-6 font-mono text-[10px] text-[var(--text-muted)] opacity-30 select-none pointer-events-none hidden xl:block" aria-hidden="true">// LOC: 7.9S · 112.6E</div>

  <GridCanvas />
  <CustomCursor />
  <TopNav />
  <slot />
  <Footer />
  <StatusBar />
  <ShortcutsModal />
</body>
</html>
```

- [ ] **Step 3: Run final full build test**

Run:
```bash
npm run build
```
Expected: PASS with 0 build errors.

- [ ] **Step 4: Commit Task 3**

```bash
git add src/styles/global.css src/layouts/Layout.astro
git commit -m "feat: add ambient glowing orbs and hud layout accents"
```
