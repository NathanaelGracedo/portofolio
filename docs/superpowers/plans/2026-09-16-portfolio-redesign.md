# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild and transform Nathanael Juan Gracedo's portfolio into a high-performance, interactive, cyber-HUD developer portfolio inspired by codedgar.com using Astro v5, Tailwind CSS v4, and modular vanilla JS components.

**Architecture:** Static Site Generation (SSG) powered by Astro v5, deploying to Vercel. Global styles use Tailwind CSS v4 with custom CSS variables for dark/light dual-theming. Interactive features (ASCII matrix photo reveal, HUD targeting cursor, persistent bottom status bar, and keyboard shortcuts modal) are built as lightweight, isolated vanilla client scripts with zero framework bloat.

**Tech Stack:** Astro v5, Tailwind CSS v4 (`@tailwindcss/vite`), Vanilla JavaScript (ES Modules), HTML5 Canvas.

## Global Constraints

- Core Framework: Astro v5 (Node 24+ compatible, static output to `dist/`).
- Styling: Tailwind CSS v4 via `@tailwindcss/vite`.
- Theming: Dual theme (`[data-theme="dark"]` default + `[data-theme="light"]` warm sand) with zero FOUC via inline head script and `localStorage` persistence.
- Headings Font: `Space Grotesk` (Google Fonts).
- Monospace Font: `JetBrains Mono` (Google Fonts).
- Body Font: `Plus Jakarta Sans` (Google Fonts).
- Target Role Copy: "Undergraduate student in Informatics Engineering (Sarjana Terapan Teknik Informatika) at Politeknik Negeri Malang", "AI & Software Developer".
- Experience: Mobile Developer Intern at PT SIDIGS (Jun 2022 — Nov 2022). No teaching assistant entries.
- Projects: Include Resurva ecosystem (Web, Mobile, Backend repos) under Nexa Code Studio, Trashware IoT, Pentagram App, LaporSana.
- Exclusions: No GitHub activity heatmap section. No CV download button. No audio effects.
- Contact: Interactive Quick Copy Email with toast notification, direct LinkedIn & GitHub links.
- Performance: 100% valid build with `npm run build`, responsive from 360px mobile to 1440px+ desktop.

---

### Task 1: Project Scaffolding & Astro Setup

**Files:**
- Modify: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`

**Interfaces:**
- Consumes: Existing project assets (`src/assets/hero.png`, `public/favicon.svg`).
- Produces: Working Astro v5 build environment with Tailwind CSS v4 and dual-theme CSS variables.

- [ ] **Step 1: Update package.json dependencies and scripts**

Update `package.json` to configure Astro v5, Tailwind CSS v4, and `@tailwindcss/vite`:

```json
{
  "name": "portofolio",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.4.2"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.9",
    "tailwindcss": "^4.0.9"
  }
}
```

- [ ] **Step 2: Run npm install to install dependencies**

Run:
```bash
npm install
```
Expected: packages installed successfully without errors.

- [ ] **Step 3: Create astro.config.mjs and tsconfig.json**

Create `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  }
});
```

Create `tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 4: Create src/styles/global.css with theme variables & typography**

Create `src/styles/global.css`:
```css
@import "tailwindcss";

@layer base {
  :root,
  [data-theme="dark"] {
    --bg-primary: #0a0a0a;
    --bg-secondary: #121212;
    --bg-surface: #18181b;
    --border-color: rgba(255, 255, 255, 0.1);
    --border-hover: rgba(255, 255, 255, 0.25);
    --text-primary: #fafafa;
    --text-secondary: #a1a1aa;
    --text-muted: #71717a;
    --accent-blue: #3b82f6;
    --accent-blue-subtle: rgba(59, 130, 246, 0.15);
    --accent-orange: #f97316;
    --accent-orange-subtle: rgba(249, 115, 22, 0.15);
    --accent-green: #10b981;
    --grid-line: rgba(255, 255, 255, 0.04);
  }

  [data-theme="light"] {
    --bg-primary: #f4f4f4;
    --bg-secondary: #ece7de;
    --bg-surface: #ffffff;
    --border-color: rgba(25, 24, 24, 0.12);
    --border-hover: rgba(25, 24, 24, 0.3);
    --text-primary: #191818;
    --text-secondary: rgba(25, 24, 24, 0.72);
    --text-muted: rgba(25, 24, 24, 0.45);
    --accent-blue: #1b5def;
    --accent-blue-subtle: rgba(27, 93, 239, 0.1);
    --accent-orange: #e25327;
    --accent-orange-subtle: rgba(226, 83, 39, 0.1);
    --accent-green: #15803d;
    --grid-line: rgba(25, 24, 24, 0.05);
  }

  html {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    scroll-behavior: smooth;
    transition: background-color 0.25s ease, color 0.25s ease;
  }

  body {
    min-height: 100vh;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, .font-display {
    font-family: 'Space Grotesk', sans-serif;
  }

  code, kbd, pre, .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }
}

/* HUD System Annotations */
.hud-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.hud-comment {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: var(--accent-blue);
  opacity: 0.85;
}

.watermark-number {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: clamp(4rem, 10vw, 7.5rem);
  line-height: 1;
  color: var(--text-primary);
  opacity: 0.04;
  user-select: none;
  pointer-events: none;
}

/* Card Glow Pulse */
.hud-card {
  position: relative;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  transition: border-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.hud-card:hover {
  border-color: var(--border-hover);
}
```

- [ ] **Step 5: Test build scaffolding**

Create a temporary `src/pages/index.astro` to verify Astro build works:
```astro
---
import '../styles/global.css';
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Setup Verification</title>
</head>
<body>
  <h1>Astro Initialized</h1>
</body>
</html>
```

Run:
```bash
npm run build
```
Expected: `[build] complete` with output directory `dist/`.

- [ ] **Step 6: Commit Task 1**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/styles/global.css src/pages/index.astro
git commit -m "chore: scaffold astro v5 and tailwind v4 setup"
```

---

### Task 2: Layout & Theme Architecture

**Files:**
- Create: `src/layouts/Layout.astro`
- Create: `src/components/TopNav.astro`
- Create: `src/components/Footer.astro`

**Interfaces:**
- Consumes: `src/styles/global.css`, Google Fonts.
- Produces: `Layout.astro` providing HTML shell, font preloads, anti-FOUC theme hydration script, `TopNav`, and `Footer`.

- [ ] **Step 1: Create src/components/TopNav.astro**

Create `src/components/TopNav.astro` with logo monogram, nav links, and responsive hamburger menu:
```astro
---
---
<nav id="top-nav" class="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[var(--bg-primary)]/80 border-b border-[var(--border-color)] transition-all duration-300">
  <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
    <a href="#hero" class="group flex items-center gap-2 text-sm font-mono font-bold tracking-wider text-[var(--text-primary)] hover:text-[var(--accent-blue)] transition-colors">
      <span class="text-[var(--accent-blue)]">&lt;</span>
      <span>NJG</span>
      <span class="text-[var(--accent-blue)]">/&gt;</span>
      <span class="hidden sm:inline-block text-[10px] text-[var(--text-muted)] font-normal border border-[var(--border-color)] rounded px-1.5 py-0.5 ml-1">// dev</span>
    </a>

    <!-- Desktop Menu -->
    <div class="hidden md:flex items-center gap-6 font-mono text-xs">
      <a href="#experience" class="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">// 01.exp</a>
      <a href="#projects" class="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">// 02.projects</a>
      <a href="#education" class="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">// 03.edu</a>
      <a href="#skills" class="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">// 04.skills</a>
      <a href="#contact" class="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">// 05.contact</a>
    </div>

    <!-- Right status indicator -->
    <div class="hidden sm:flex items-center gap-3">
      <div class="flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] text-[11px] font-mono text-[var(--text-secondary)]">
        <span class="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse"></span>
        <span>Open for Intern</span>
      </div>
    </div>

    <!-- Mobile Hamburger Button -->
    <button id="mobile-toggle-btn" class="md:hidden flex flex-col justify-center gap-1.5 p-2 text-[var(--text-primary)] cursor-pointer" aria-label="Toggle Navigation">
      <span class="w-5 h-0.5 bg-current transition-transform duration-300" id="bar-1"></span>
      <span class="w-5 h-0.5 bg-current transition-opacity duration-300" id="bar-2"></span>
      <span class="w-3 h-0.5 bg-current transition-transform duration-300" id="bar-3"></span>
    </button>
  </div>

  <!-- Mobile Drawer -->
  <div id="mobile-drawer" class="md:hidden max-h-0 overflow-hidden transition-all duration-300 ease-in-out border-b border-[var(--border-color)] bg-[var(--bg-primary)]">
    <div class="px-6 py-4 flex flex-col gap-3 font-mono text-xs">
      <a href="#experience" class="mobile-link text-[var(--text-secondary)] hover:text-[var(--accent-blue)] py-1">// 01.experience</a>
      <a href="#projects" class="mobile-link text-[var(--text-secondary)] hover:text-[var(--accent-blue)] py-1">// 02.projects</a>
      <a href="#education" class="mobile-link text-[var(--text-secondary)] hover:text-[var(--accent-blue)] py-1">// 03.education</a>
      <a href="#skills" class="mobile-link text-[var(--text-secondary)] hover:text-[var(--accent-blue)] py-1">// 04.skills</a>
      <a href="#contact" class="mobile-link text-[var(--text-secondary)] hover:text-[var(--accent-blue)] py-1">// 05.contact</a>
    </div>
  </div>
</nav>

<script>
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const drawer = document.getElementById('mobile-drawer');
  const bar1 = document.getElementById('bar-1');
  const bar2 = document.getElementById('bar-2');
  const bar3 = document.getElementById('bar-3');
  let open = false;

  const toggle = (state) => {
    open = state !== undefined ? state : !open;
    if (drawer && bar1 && bar2 && bar3) {
      if (open) {
        drawer.style.maxHeight = `${drawer.scrollHeight}px`;
        bar1.style.transform = 'translateY(5px) rotate(45deg)';
        bar2.style.opacity = '0';
        bar3.style.transform = 'translateY(-5px) rotate(-45deg)';
        bar3.style.width = '1.25rem';
      } else {
        drawer.style.maxHeight = '0px';
        bar1.style.transform = '';
        bar2.style.opacity = '1';
        bar3.style.transform = '';
        bar3.style.width = '0.75rem';
      }
    }
  };

  toggleBtn?.addEventListener('click', () => toggle());
  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => toggle(false));
  });
</script>
```

- [ ] **Step 2: Create src/components/Footer.astro**

Create `src/components/Footer.astro`:
```astro
---
---
<footer class="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/50 py-12 px-6 pb-24 text-center sm:text-left">
  <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-[var(--text-muted)]">
    <div>
      <p class="text-[var(--text-secondary)]">Nathanael Juan Gracedo — 2026</p>
      <p class="text-[11px] mt-1">Undergraduate TI @ Politeknik Negeri Malang</p>
    </div>
    <div class="flex items-center gap-6 text-[11px]">
      <a href="https://github.com/NathanaelGracedo" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--accent-blue)] transition-colors">GitHub</a>
      <a href="https://linkedin.com/in/nathanael-juan-gracedo" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--accent-blue)] transition-colors">LinkedIn</a>
      <a href="#hero" class="hover:text-[var(--accent-blue)] transition-colors">Back to Top ↑</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Create src/layouts/Layout.astro with anti-FOUC theme script**

Create `src/layouts/Layout.astro`:
```astro
---
import '../styles/global.css';
import TopNav from '../components/TopNav.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = "Nathanael Juan Gracedo — AI & Software Developer",
  description = "Portfolio of Nathanael Juan Gracedo — Informatics Engineering undergraduate at Politeknik Negeri Malang focused on AI, Web, and Mobile development."
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
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (prefersDark ? 'dark' : 'dark'); // default dark
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>
</head>
<body class="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
  <TopNav />
  <slot />
  <Footer />
</body>
</html>
```

- [ ] **Step 4: Verify build with layout**

Update `src/pages/index.astro` to wrap content with `<Layout>` and run `npm run build`:
```bash
npm run build
```
Expected: PASS with no errors.

- [ ] **Step 5: Commit Task 2**

```bash
git add src/layouts/Layout.astro src/components/TopNav.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add base layout, top navigation, and anti-fouc theme provider"
```

---

### Task 3: Background Canvas & Interactive Cursor

**Files:**
- Create: `src/components/GridCanvas.astro`
- Create: `src/components/CustomCursor.astro`

**Interfaces:**
- Consumes: CSS variables from `src/styles/global.css`.
- Produces: Cyber retro grid background canvas (`GridCanvas.astro`) and desktop HUD targeting cursor with 4 magnetic corner brackets `[ ]` (`CustomCursor.astro`).

- [ ] **Step 1: Create src/components/GridCanvas.astro**

Create `src/components/GridCanvas.astro` with throttled frame rate and scanlines:
```astro
---
---
<div class="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
  <canvas id="grid-canvas" class="w-full h-full block opacity-40"></canvas>
  <!-- Subtle top and bottom gradient fades -->
  <div class="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)] opacity-80 pointer-events-none"></div>
</div>

<script>
  const canvas = document.getElementById('grid-canvas') as HTMLCanvasElement | null;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let offset = 0;
    let animationId: number;
    let lastTime = 0;
    const fps = 30; // throttle for low CPU usage
    const fpsInterval = 1000 / fps;

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize, { passive: true });

    const draw = (currentTime: number) => {
      animationId = requestAnimationFrame(draw);
      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      ctx.strokeStyle = isLight ? 'rgba(25, 24, 24, 0.05)' : 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;

      const gridSize = 40;
      offset = (offset + 0.3) % gridSize;

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines moving slightly
      for (let y = offset; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      animationId = requestAnimationFrame(draw);
    }
  }
</script>
```

- [ ] **Step 2: Create src/components/CustomCursor.astro**

Create `src/components/CustomCursor.astro` with dot, trailing ring, and corner targets:
```astro
---
---
<div id="hud-cursor" class="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
  <!-- Precision dot -->
  <div id="cursor-dot" class="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 opacity-0 pointer-events-none"></div>
  
  <!-- Smooth trailing ring -->
  <div id="cursor-ring" class="fixed top-0 left-0 w-7 h-7 rounded-full border border-[var(--accent-blue)]/60 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 opacity-0 pointer-events-none"></div>

  <!-- 4 Corner Targets [ ] for hovered interactive items -->
  <div id="cursor-target" class="fixed pointer-events-none transition-all duration-150 opacity-0">
    <span class="corner corner-tl absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[var(--accent-orange)] -translate-x-1 -translate-y-1"></span>
    <span class="corner corner-tr absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[var(--accent-orange)] translate-x-1 -translate-y-1"></span>
    <span class="corner corner-bl absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[var(--accent-orange)] -translate-x-1 translate-y-1"></span>
    <span class="corner corner-br absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[var(--accent-orange)] translate-x-1 translate-y-1"></span>
  </div>
</div>

<script>
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const target = document.getElementById('cursor-target');

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible && dot && ring) {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        isVisible = true;
      }

      if (dot) {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    });

    const animateRing = () => {
      // Lerp smooth follow
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ring) {
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animateRing);
    };
    requestAnimationFrame(animateRing);

    // Magnetic target locking on interactive elements
    const lockables = 'a, button, input, .hud-card, .interactive-target';
    document.addEventListener('mouseover', (e) => {
      const el = (e.target as HTMLElement)?.closest(lockables) as HTMLElement | null;
      if (el && target) {
        const rect = el.getBoundingClientRect();
        target.style.top = `${rect.top}px`;
        target.style.left = `${rect.left}px`;
        target.style.width = `${rect.width}px`;
        target.style.height = `${rect.height}px`;
        target.style.opacity = '1';
        window.dispatchEvent(new CustomEvent('hud-mode-change', { detail: 'HOVER' }));
      }
    });

    document.addEventListener('mouseout', (e) => {
      const el = (e.target as HTMLElement)?.closest(lockables);
      if (el && target) {
        target.style.opacity = '0';
        window.dispatchEvent(new CustomEvent('hud-mode-change', { detail: 'NORMAL' }));
      }
    });
  }
</script>
```

- [ ] **Step 3: Integrate into Layout.astro and verify build**

Add `<GridCanvas />` and `<CustomCursor />` inside `src/layouts/Layout.astro` and run `npm run build`:
```bash
npm run build
```
Expected: PASS with no syntax errors.

- [ ] **Step 4: Commit Task 3**

```bash
git add src/components/GridCanvas.astro src/components/CustomCursor.astro src/layouts/Layout.astro
git commit -m "feat: add retro grid background canvas and custom hud targeting cursor"
```

---

### Task 4: Bottom HUD Status Bar & Shortcuts Modal

**Files:**
- Create: `src/components/StatusBar.astro`
- Create: `src/components/ShortcutsModal.astro`
- Modify: `src/layouts/Layout.astro`

**Interfaces:**
- Consumes: Window scroll events, theme change events, keyboard events.
- Produces: Fixed bottom HUD status bar with live status metrics (`StatusBar.astro`) and keyboard shortcuts modal (`ShortcutsModal.astro`).

- [ ] **Step 1: Create src/components/StatusBar.astro**

Create `src/components/StatusBar.astro`:
```astro
---
---
<aside id="status-bar" class="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-md border-t border-[var(--border-color)] font-mono text-[11px] text-[var(--text-secondary)] select-none">
  <div class="max-w-6xl mx-auto px-4 h-9 flex items-center justify-between gap-4">
    <!-- Left: Path & Mode -->
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-1 text-[var(--accent-green)]">
        <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
        <span class="font-bold tracking-wider">LIVE</span>
      </div>
      <span class="text-[var(--border-color)]">|</span>
      <div class="flex items-center gap-1.5">
        <span class="text-[var(--text-muted)]">path:</span>
        <span id="sb-path" class="text-[var(--text-primary)] font-medium">~/nathanael</span>
      </div>
      <span class="hidden sm:inline-block text-[var(--border-color)]">|</span>
      <div class="hidden sm:flex items-center gap-1.5">
        <span class="text-[var(--text-muted)]">mode:</span>
        <span id="sb-mode" class="text-[var(--accent-blue)] font-medium">NORMAL</span>
      </div>
    </div>

    <!-- Center: Scroll Progress Bar -->
    <div class="hidden md:flex items-center gap-2 flex-1 max-w-xs mx-auto">
      <div class="w-full bg-[var(--border-color)] h-1 rounded-full overflow-hidden">
        <div id="sb-progress-bar" class="h-full bg-[var(--accent-blue)] w-0 transition-all duration-75"></div>
      </div>
      <span id="sb-progress-num" class="w-9 text-right text-[var(--text-muted)] font-mono text-[10px]">0%</span>
    </div>

    <!-- Right: Clock & Triggers -->
    <div class="flex items-center gap-3">
      <div id="sb-clock" class="hidden sm:block text-[var(--text-muted)] tabular-nums font-medium">
        00:00:00 WIB
      </div>
      <span class="text-[var(--border-color)]">|</span>
      
      <!-- Theme Switcher Button -->
      <button id="theme-toggle-btn" class="hover:text-[var(--accent-orange)] transition-colors px-1.5 py-0.5 border border-[var(--border-color)] rounded bg-[var(--bg-surface)] cursor-pointer" title="Toggle Theme (T)">
        [<span id="theme-icon">🌓</span> <span class="hidden sm:inline">Theme</span>]
      </button>

      <!-- Shortcuts Trigger Button -->
      <button id="shortcuts-toggle-btn" class="hover:text-[var(--accent-blue)] transition-colors px-1.5 py-0.5 border border-[var(--border-color)] rounded bg-[var(--bg-surface)] cursor-pointer" title="Keyboard Shortcuts (?)">
        [?]
      </button>
    </div>
  </div>
</aside>

<script>
  // 1. Live Clock
  const clockEl = document.getElementById('sb-clock');
  const updateClock = () => {
    if (!clockEl) return;
    const now = new Date();
    // WIB is UTC+7
    const timeStr = now.toLocaleTimeString('id-ID', {
      hour12: false,
      timeZone: 'Asia/Jakarta'
    });
    clockEl.textContent = `${timeStr} WIB`;
  };
  setInterval(updateClock, 1000);
  updateClock();

  // 2. Scroll Progress & Path Indicator
  const pathEl = document.getElementById('sb-path');
  const progressBar = document.getElementById('sb-progress-bar');
  const progressNum = document.getElementById('sb-progress-num');

  const sections = ['hero', 'experience', 'projects', 'education', 'skills', 'contact'];

  const onScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? Math.min(Math.round((scrollY / docHeight) * 100), 100) : 0;

    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressNum) progressNum.textContent = `${percent}%`;

    // Detect active section
    let currentSection = 'hero';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) {
          currentSection = id;
          break;
        }
      }
    }
    if (pathEl) pathEl.textContent = `~/nathanael/${currentSection}`;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 3. HUD Mode Listener
  const modeEl = document.getElementById('sb-mode');
  window.addEventListener('hud-mode-change', ((e: CustomEvent) => {
    if (modeEl && e.detail) modeEl.textContent = e.detail;
  }) as EventListener);

  // 4. Theme Toggle Logic
  const themeBtn = document.getElementById('theme-toggle-btn');
  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };
  themeBtn?.addEventListener('click', toggleTheme);

  // Dispatch key 'T' for theme
  window.addEventListener('keydown', (e) => {
    if ((e.key === 't' || e.key === 'T') && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      toggleTheme();
    }
  });
</script>
```

- [ ] **Step 2: Create src/components/ShortcutsModal.astro**

Create `src/components/ShortcutsModal.astro`:
```astro
---
---
<div id="shortcuts-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-200 font-mono">
  <div class="relative w-full max-w-lg mx-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-2xl p-6 text-xs transform scale-95 transition-transform duration-200" id="shortcuts-content">
    <!-- Header -->
    <div class="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-color)]">
      <div class="flex items-center gap-2">
        <span class="text-[var(--accent-blue)] font-bold">//</span>
        <h3 class="font-bold text-sm tracking-wide text-[var(--text-primary)]">keyboard.shortcuts</h3>
      </div>
      <button id="close-shortcuts-btn" class="p-1 hover:text-[var(--accent-orange)] text-[var(--text-muted)] cursor-pointer" aria-label="Close modal">
        ✕
      </button>
    </div>

    <!-- Shortcuts Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div>
        <p class="text-[var(--accent-orange)] text-[10px] uppercase font-bold tracking-wider mb-2">Navigation</p>
        <ul class="space-y-2">
          <li class="flex justify-between items-center"><span class="text-[var(--text-secondary)]">Hero</span><kbd class="px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">1</kbd></li>
          <li class="flex justify-between items-center"><span class="text-[var(--text-secondary)]">Experience</span><kbd class="px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">2</kbd></li>
          <li class="flex justify-between items-center"><span class="text-[var(--text-secondary)]">Projects</span><kbd class="px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">3</kbd></li>
          <li class="flex justify-between items-center"><span class="text-[var(--text-secondary)]">Education</span><kbd class="px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">4</kbd></li>
          <li class="flex justify-between items-center"><span class="text-[var(--text-secondary)]">Skills</span><kbd class="px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">5</kbd></li>
          <li class="flex justify-between items-center"><span class="text-[var(--text-secondary)]">Contact</span><kbd class="px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">6</kbd></li>
        </ul>
      </div>

      <div>
        <p class="text-[var(--accent-orange)] text-[10px] uppercase font-bold tracking-wider mb-2">Actions</p>
        <ul class="space-y-2">
          <li class="flex justify-between items-center"><span class="text-[var(--text-secondary)]">Toggle Theme</span><kbd class="px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">T</kbd></li>
          <li class="flex justify-between items-center"><span class="text-[var(--text-secondary)]">Scroll to Top</span><kbd class="px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">G</kbd></li>
          <li class="flex justify-between items-center"><span class="text-[var(--text-secondary)]">Scroll to Bottom</span><kbd class="px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">Shift+G</kbd></li>
          <li class="flex justify-between items-center"><span class="text-[var(--text-secondary)]">Close Dialog</span><kbd class="px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">Esc</kbd></li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <div class="pt-3 border-t border-[var(--border-color)] text-center text-[10px] text-[var(--text-muted)]">
      Press <kbd class="px-1.5 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">?</kbd> anywhere to toggle this menu.
    </div>
  </div>
</div>

<script>
  const modal = document.getElementById('shortcuts-modal');
  const content = document.getElementById('shortcuts-content');
  const closeBtn = document.getElementById('close-shortcuts-btn');
  const toggleBtn = document.getElementById('shortcuts-toggle-btn');

  let isOpen = false;

  const setOpen = (open: boolean) => {
    isOpen = open;
    if (modal && content) {
      if (isOpen) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100', 'pointer-events-auto');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
        window.dispatchEvent(new CustomEvent('hud-mode-change', { detail: 'MODAL' }));
      } else {
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        modal.classList.add('opacity-0', 'pointer-events-none');
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
        window.dispatchEvent(new CustomEvent('hud-mode-change', { detail: 'NORMAL' }));
      }
    }
  };

  closeBtn?.addEventListener('click', () => setOpen(false));
  toggleBtn?.addEventListener('click', () => setOpen(!isOpen));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) setOpen(false);
  });

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  window.addEventListener('keydown', (e) => {
    const targetTag = (e.target as HTMLElement).tagName;
    if (['INPUT', 'TEXTAREA'].includes(targetTag)) return;

    if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      e.preventDefault();
      setOpen(!isOpen);
    } else if (e.key === 'Escape' && isOpen) {
      setOpen(false);
    } else if (!isOpen) {
      if (e.key === '1') jumpTo('hero');
      if (e.key === '2') jumpTo('experience');
      if (e.key === '3') jumpTo('projects');
      if (e.key === '4') jumpTo('education');
      if (e.key === '5') jumpTo('skills');
      if (e.key === '6') jumpTo('contact');
      if (e.key === 'g' && !e.shiftKey) window.scrollTo({ top: 0, behavior: 'smooth' });
      if (e.key === 'G' || (e.shiftKey && e.key === 'g')) window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  });
</script>
```

- [ ] **Step 3: Integrate into Layout.astro and verify build**

Add `<StatusBar />` and `<ShortcutsModal />` to `src/layouts/Layout.astro`.
Run:
```bash
npm run build
```
Expected: PASS with 0 build errors.

- [ ] **Step 4: Commit Task 4**

```bash
git add src/components/StatusBar.astro src/components/ShortcutsModal.astro src/layouts/Layout.astro
git commit -m "feat: add bottom hud status bar and keyboard shortcuts modal"
```

---

### Task 5: ASCII Matrix Photo Reveal & Hero Section

**Files:**
- Create: `src/components/AsciiRevealPhoto.astro`
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: Image file `src/assets/hero.png`.
- Produces: `AsciiRevealPhoto.astro` canvas effect and `Hero.astro` with full undergraduate Polinema positioning and metric counters.

- [ ] **Step 1: Create src/components/AsciiRevealPhoto.astro**

Create `src/components/AsciiRevealPhoto.astro` that renders the user's photo with interactive luminance-based ASCII matrix characters that dissolve on hover or initial load:
```astro
---
interface Props {
  imageSrc?: string;
  alt?: string;
}

const {
  imageSrc = "/src/assets/hero.png",
  alt = "Nathanael Juan Gracedo"
} = Astro.props;
---
<div class="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] mx-auto group select-none">
  <!-- Outer HUD decorative frame -->
  <div class="absolute -inset-2 border border-[var(--border-color)] rounded-xl pointer-events-none group-hover:border-[var(--accent-blue)]/50 transition-colors duration-500"></div>
  <div class="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[var(--accent-blue)]"></div>
  <div class="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[var(--accent-blue)]"></div>
  <div class="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[var(--accent-blue)]"></div>
  <div class="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[var(--accent-blue)]"></div>

  <!-- Real Portrait Photo -->
  <div class="relative w-full h-full rounded-lg overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-color)]">
    <img
      id="profile-img"
      src={imageSrc}
      alt={alt}
      class="w-full h-full object-cover object-center filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700"
      loading="eager"
    />

    <!-- Canvas ASCII Matrix Overlay -->
    <canvas
      id="ascii-canvas"
      class="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair transition-opacity duration-700 opacity-90 group-hover:opacity-10"
    ></canvas>
  </div>

  <!-- HUD Tag Under Photo -->
  <div class="mt-3 flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
    <span>// id: NJG-2026</span>
    <span class="text-[var(--accent-blue)]">HOVER TO DECODE</span>
  </div>
</div>

<script>
  const img = document.getElementById('profile-img') as HTMLImageElement | null;
  const canvas = document.getElementById('ascii-canvas') as HTMLCanvasElement | null;

  if (img && canvas) {
    const ctx = canvas.getContext('2d');
    const chars = ' .,:;i1tfLCG08@';

    const renderAscii = () => {
      if (!ctx || !img.naturalWidth) return;
      const w = (canvas.width = canvas.parentElement?.clientWidth || 320);
      const h = (canvas.height = canvas.parentElement?.clientHeight || 400);

      // Create offscreen canvas to read pixel data
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      const sampleWidth = 55;
      const sampleHeight = Math.floor(sampleWidth * (h / w));
      offscreen.width = sampleWidth;
      offscreen.height = sampleHeight;

      if (!offCtx) return;
      offCtx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
      const imgData = offCtx.getImageData(0, 0, sampleWidth, sampleHeight).data;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, w, h);

      const cellW = w / sampleWidth;
      const cellH = h / sampleHeight;
      ctx.font = `${Math.floor(cellW * 1.2)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let y = 0; y < sampleHeight; y++) {
        for (let x = 0; x < sampleWidth; x++) {
          const idx = (y * sampleWidth + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          const charIndex = Math.floor(brightness * (chars.length - 1));
          const char = chars[charIndex];

          ctx.fillStyle = brightness > 0.6 ? '#60a5fa' : brightness > 0.3 ? '#3b82f6' : '#1e3a8a';
          ctx.fillText(char, x * cellW + cellW / 2, y * cellH + cellH / 2);
        }
      }
    };

    if (img.complete) {
      renderAscii();
    } else {
      img.addEventListener('load', renderAscii);
    }

    window.addEventListener('resize', renderAscii, { passive: true });
  }
</script>
```

- [ ] **Step 2: Create src/components/Hero.astro**

Create `src/components/Hero.astro` with undergraduate Polinema copy, metrics counters, and ASCII reveal photo:
```astro
---
import AsciiRevealPhoto from './AsciiRevealPhoto.astro';
---
<section id="hero" class="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
  <div class="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
    
    <!-- Left Column: Copy & Bio -->
    <div class="lg:col-span-7 flex flex-col items-start">
      <!-- HUD Pre-title -->
      <div class="flex items-center gap-2 mb-4">
        <span class="hud-comment">// system.init</span>
        <span class="text-[var(--border-color)]">/</span>
        <span class="hud-tag">portofolio v2.0</span>
      </div>

      <!-- Main Headline -->
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
        <span>Nathanael</span><br />
        <span class="text-[var(--accent-blue)]">Juan Gracedo</span>
      </h1>

      <p class="font-mono text-sm sm:text-base text-[var(--accent-orange)] font-medium mb-6">
        AI & Software Developer
      </p>

      <!-- Bio Paragraph -->
      <p class="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xl">
        Undergraduate student in Informatics Engineering (<span class="text-[var(--text-primary)] font-semibold">Sarjana Terapan Teknik Informatika</span>) at Politeknik Negeri Malang with a strong focus on Artificial Intelligence and software development. Experienced in building scalable cross-platform mobile and web applications with clean, responsive, and human-centric UI/UX.
      </p>

      <!-- Metric Cards Grid -->
      <div class="grid grid-cols-3 gap-3 w-full max-w-xl mb-8">
        <div class="hud-card rounded-lg p-3 sm:p-4 text-center">
          <div class="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] counter" data-target="4">0</div>
          <p class="font-mono text-[10px] sm:text-xs text-[var(--text-muted)] mt-1">Highlighted Projects</p>
        </div>
        <div class="hud-card rounded-lg p-3 sm:p-4 text-center">
          <div class="font-display text-2xl sm:text-3xl font-bold text-[var(--accent-blue)] counter" data-target="1">0</div>
          <p class="font-mono text-[10px] sm:text-xs text-[var(--text-muted)] mt-1">Industry Intern (SIDIGS)</p>
        </div>
        <div class="hud-card rounded-lg p-3 sm:p-4 text-center">
          <div class="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">D4 TI</div>
          <p class="font-mono text-[10px] sm:text-xs text-[var(--text-muted)] mt-1">Polinema Malang</p>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="flex flex-wrap items-center gap-4 font-mono text-xs">
        <a href="#projects" class="px-5 py-2.5 rounded-lg bg-[var(--accent-blue)] text-white font-medium hover:opacity-90 transition-opacity">
          View Projects →
        </a>
        <a href="#contact" class="px-5 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors">
          Get in Touch
        </a>
      </div>
    </div>

    <!-- Right Column: Photo with ASCII Reveal -->
    <div class="lg:col-span-5 flex justify-center">
      <AsciiRevealPhoto imageSrc="/src/assets/hero.png" alt="Nathanael Juan Gracedo" />
    </div>

  </div>
</section>

<script>
  // Counter animation
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = Number(el.dataset.target || 0);
          const duration = 1200;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = Math.floor(progress * target).toString() + '+';
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => observer.observe(c));
  }
</script>
```

- [ ] **Step 3: Verify build**

Import `<Hero />` in `src/pages/index.astro` and run `npm run build`:
```bash
npm run build
```
Expected: PASS with 0 build errors.

- [ ] **Step 4: Commit Task 5**

```bash
git add src/components/AsciiRevealPhoto.astro src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add hero section with ascii matrix portrait reveal and metric counters"
```

---

### Task 6: Experience, Education & Skills Sections

**Files:**
- Create: `src/components/Experience.astro`
- Create: `src/components/Education.astro`
- Create: `src/components/Skills.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: Experience schema (PT SIDIGS), Education schema (Polinema & SMAK Santa Maria), Skills schema.
- Produces: Sections 01, 03, and 04 with HUD watermarks (`01`, `03`, `04`) and code comments.

- [ ] **Step 1: Create src/components/Experience.astro**

Create `src/components/Experience.astro`:
```astro
---
const experiences = [
  {
    role: "Mobile Developer Intern",
    company: "PT SIDIGS",
    period: "Jun 2022 — Nov 2022",
    location: "Indonesia",
    type: "Industry Internship",
    description: "Worked as a Mobile Developer Intern focused on cross-platform application development using Flutter and Dart. Translated business requirements and UI/UX design specifications into interactive, pixel-accurate, and responsive interfaces across various mobile screen densities.",
    skills: ["Flutter", "Dart", "Mobile Development", "UI/UX Implementation", "REST API"]
  }
];
---
<section id="experience" class="py-20 px-6 relative border-t border-[var(--border-color)]">
  <div class="max-w-5xl mx-auto relative">
    <!-- Huge Watermark Number -->
    <div class="absolute -top-10 left-0 watermark-number">01</div>

    <div class="relative z-10 mb-12">
      <p class="hud-comment mb-2">// section.experience</p>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">Work History</h2>
    </div>

    <!-- Timeline Container -->
    <div class="space-y-6 relative z-10">
      {experiences.map((exp) => (
        <div class="hud-card rounded-xl p-6 sm:p-8">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-lg sm:text-xl font-bold text-[var(--text-primary)]">{exp.role}</h3>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--accent-blue-subtle)] text-[var(--accent-blue)] border border-[var(--accent-blue)]/30">
                  {exp.type}
                </span>
              </div>
              <p class="text-sm font-mono text-[var(--accent-orange)] font-medium mt-1">{exp.company}</p>
            </div>
            <div class="font-mono text-xs text-[var(--text-muted)] sm:text-right">
              {exp.period}
            </div>
          </div>

          <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
            {exp.description}
          </p>

          <div class="flex flex-wrap gap-2">
            {exp.skills.map((skill) => (
              <span class="px-2.5 py-1 rounded font-mono text-xs bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create src/components/Education.astro**

Create `src/components/Education.astro`:
```astro
---
const educations = [
  {
    institution: "Politeknik Negeri Malang",
    degree: "Sarjana Terapan (D4) Teknik Informatika",
    period: "2022 — Present",
    status: "Undergraduate",
    notes: "Focused on Artificial Intelligence, mobile software engineering, and modern full-stack web architectures."
  },
  {
    institution: "SMAK Santa Maria Malang",
    degree: "Matematika dan Ilmu Pengetahuan Alam (MIPA)",
    period: "2019 — 2022",
    status: "Graduated",
    notes: "Foundation in science, algorithms, mathematics, and computer literacy."
  }
];
---
<section id="education" class="py-20 px-6 relative border-t border-[var(--border-color)]">
  <div class="max-w-5xl mx-auto relative">
    <!-- Huge Watermark Number -->
    <div class="absolute -top-10 left-0 watermark-number">03</div>

    <div class="relative z-10 mb-12">
      <p class="hud-comment mb-2">// section.education</p>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">Academic Background</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
      {educations.map((edu) => (
        <div class="hud-card rounded-xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3 font-mono text-xs">
              <span class="px-2 py-0.5 rounded bg-[var(--accent-orange-subtle)] text-[var(--accent-orange)] border border-[var(--accent-orange)]/30">
                {edu.status}
              </span>
              <span class="text-[var(--text-muted)]">{edu.period}</span>
            </div>
            <h3 class="text-lg font-bold text-[var(--text-primary)] mb-1">{edu.institution}</h3>
            <p class="text-sm font-medium text-[var(--accent-blue)] mb-4">{edu.degree}</p>
            <p class="text-xs text-[var(--text-secondary)] leading-relaxed">{edu.notes}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create src/components/Skills.astro**

Create `src/components/Skills.astro`:
```astro
---
const skillCategories = [
  {
    category: "Languages",
    skills: ["Dart", "PHP", "TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"]
  },
  {
    category: "Frameworks & Ecosystem",
    skills: ["Flutter", "Laravel", "Next.js", "Tailwind CSS", "Bootstrap", "Node.js"]
  },
  {
    category: "Databases, Tools & DevOps",
    skills: ["MySQL", "PostgreSQL", "Firebase", "Git", "GitHub", "Docker", "Postman", "Figma", "VS Code"]
  }
];
---
<section id="skills" class="py-20 px-6 relative border-t border-[var(--border-color)]">
  <div class="max-w-5xl mx-auto relative">
    <!-- Huge Watermark Number -->
    <div class="absolute -top-10 left-0 watermark-number">04</div>

    <div class="relative z-10 mb-12">
      <p class="hud-comment mb-2">// section.skills</p>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">Technical Arsenal</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
      {skillCategories.map((group) => (
        <div class="hud-card rounded-xl p-6">
          <h3 class="font-mono text-xs uppercase text-[var(--accent-orange)] font-bold tracking-wider mb-4 pb-2 border-b border-[var(--border-color)]">
            // {group.category}
          </h3>
          <div class="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span class="px-2.5 py-1 rounded font-mono text-xs bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent-blue)] transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Verify build**

Import and place `<Experience />`, `<Education />`, and `<Skills />` in `src/pages/index.astro`.
Run:
```bash
npm run build
```
Expected: PASS with 0 build errors.

- [ ] **Step 5: Commit Task 6**

```bash
git add src/components/Experience.astro src/components/Education.astro src/components/Skills.astro src/pages/index.astro
git commit -m "feat: add experience, education, and skills sections with hud styling"
```

---

### Task 7: Featured Projects & Contact Section

**Files:**
- Create: `src/components/Projects.astro`
- Create: `src/components/Contact.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: Project items (Resurva 3 repos, Trashware IoT, Pentagram, LaporSana), email address.
- Produces: `Projects.astro` (Section 02) with mouse tracking border glow pulse and `Contact.astro` (Section 05) with one-click Quick Copy Email and toast feedback.

- [ ] **Step 1: Create src/components/Projects.astro**

Create `src/components/Projects.astro`:
```astro
---
const projects = [
  {
    title: "Resurva Platform",
    featured: true,
    tag: "Multi-Repo Ecosystem // Nexa Code Studio",
    description: "Modern sustainability and resource management ecosystem consisting of a Next.js web application, Flutter mobile app, and microservices backend. Contributed as a community core contributor across all 3 repositories.",
    badges: ["Next.js", "Flutter", "Dart", "TypeScript", "REST API", "Community Contributor"],
    links: [
      { label: "Frontend Web", url: "https://github.com/Nexa-Code-Studio/resurva_web" },
      { label: "Mobile App", url: "https://github.com/Nexa-Code-Studio/resurva_mobile" },
      { label: "Backend API", url: "https://github.com/Nexa-Code-Studio/resurva_backend" }
    ]
  },
  {
    title: "Trashware IoT",
    featured: false,
    tag: "Smart Waste Management",
    description: "IoT-powered campus waste monitoring system integrating Cloud Computing and Big Data analytics to monitor bin capacity in real-time and optimize garbage collection logistics.",
    badges: ["IoT", "Flutter", "Cloud Computing", "Big Data", "Real-time"],
    links: [
      { label: "GitHub Repo", url: "https://github.com/soulqan/trashware" }
    ]
  },
  {
    title: "Pentagram App",
    featured: false,
    tag: "Mobile Citizen & Community Management",
    description: "Neighborhood administration mobile application with neighborhood finances, group chat, and citizen onboarding integrated with ID Card OCR using Machine Learning.",
    badges: ["Flutter", "Dart", "Firebase", "Python", "OCR / ML"],
    links: [
      { label: "GitHub Repo", url: "https://github.com/Ruphasa/Four-Heavenly-Principle" }
    ]
  },
  {
    title: "LaporSana",
    featured: false,
    tag: "Campus Reporting & Competition Recommender",
    description: "Campus facility damage reporting system combined with student competition recommendations based on machine learning classification algorithms (KNN & Naive Bayes).",
    badges: ["Laravel", "PHP", "MySQL", "KNN / Naive Bayes"],
    links: [
      { label: "GitHub Repo", url: "https://github.com/AlexanderDev2004/LaporSana" }
    ]
  }
];
---
<section id="projects" class="py-20 px-6 relative border-t border-[var(--border-color)]">
  <div class="max-w-5xl mx-auto relative">
    <!-- Huge Watermark Number -->
    <div class="absolute -top-10 left-0 watermark-number">02</div>

    <div class="relative z-10 mb-12">
      <p class="hud-comment mb-2">// section.projects</p>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">Featured Engineering</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
      {projects.map((proj) => (
        <div class={`project-card hud-card rounded-xl p-6 sm:p-8 flex flex-col justify-between ${proj.featured ? 'md:col-span-2' : ''}`}>
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="font-mono text-[11px] text-[var(--accent-orange)] font-medium">
                // {proj.tag}
              </span>
              {proj.featured && (
                <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--accent-blue-subtle)] text-[var(--accent-blue)] border border-[var(--accent-blue)]/30">
                  Featured
                </span>
              )}
            </div>

            <h3 class="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-3">{proj.title}</h3>
            <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              {proj.description}
            </p>

            <div class="flex flex-wrap gap-2 mb-6">
              {proj.badges.map((badge) => (
                <span class="px-2 py-0.5 rounded font-mono text-[11px] bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <!-- Action Links -->
          <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-color)] font-mono text-xs">
            {proj.links.map((link) => (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--bg-secondary)] hover:bg-[var(--accent-blue)] hover:text-white border border-[var(--border-color)] transition-all duration-200"
              >
                <span>{link.label}</span>
                <span class="text-[10px]">↗</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<script>
  // Mouse tracking border glow for project cards
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = (((e as MouseEvent).clientX - rect.left) / rect.width) * 100;
      const y = (((e as MouseEvent).clientY - rect.top) / rect.height) * 100;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
    });
  });
</script>
```

- [ ] **Step 2: Create src/components/Contact.astro**

Create `src/components/Contact.astro`:
```astro
---
const email = "nathanaeljuan.gracedo@gmail.com";
---
<section id="contact" class="py-24 px-6 relative border-t border-[var(--border-color)]">
  <div class="max-w-4xl mx-auto relative text-center">
    <!-- Huge Watermark Number -->
    <div class="absolute -top-10 left-1/2 -translate-x-1/2 watermark-number">05</div>

    <div class="relative z-10">
      <p class="hud-comment mb-2">// section.contact</p>
      <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">Let's Connect</h2>
      <p class="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
        Actively seeking industry internship opportunities in Mobile Development, Web Engineering, or Artificial Intelligence. Let's discuss how I can contribute to your team.
      </p>

      <!-- Interactive Contact Actions -->
      <div class="flex flex-wrap items-center justify-center gap-4 font-mono text-xs mb-10">
        <!-- Quick Copy Email Button -->
        <button
          id="copy-email-btn"
          data-email={email}
          class="flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--accent-blue)] text-white font-medium hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-blue-500/10"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span id="copy-btn-text">Copy Email</span>
        </button>

        <!-- GitHub -->
        <a
          href="https://github.com/NathanaelGracedo"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-orange)] transition-colors"
        >
          <span>GitHub Profile ↗</span>
        </a>

        <!-- LinkedIn -->
        <a
          href="https://linkedin.com/in/nathanael-juan-gracedo"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-blue)] transition-colors"
        >
          <span>LinkedIn ↗</span>
        </a>
      </div>

      <!-- Toast Feedback -->
      <div id="copy-toast" class="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-green)] text-white font-mono text-xs opacity-0 pointer-events-none transition-all duration-300 transform translate-y-2">
        ✓ Email copied to clipboard!
      </div>
    </div>
  </div>
</section>

<script>
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-btn-text');
  const toast = document.getElementById('copy-toast');

  copyBtn?.addEventListener('click', async () => {
    const email = copyBtn.dataset.email || 'nathanaeljuan.gracedo@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      if (copyText) copyText.textContent = 'Copied!';
      if (toast) {
        toast.classList.remove('opacity-0', 'translate-y-2');
        toast.classList.add('opacity-100', 'translate-y-0');
        setTimeout(() => {
          toast.classList.remove('opacity-100', 'translate-y-0');
          toast.classList.add('opacity-0', 'translate-y-2');
          if (copyText) copyText.textContent = 'Copy Email';
        }, 2200);
      }
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
</script>
```

- [ ] **Step 3: Verify build**

Import and add `<Projects />` and `<Contact />` into `src/pages/index.astro`.
Run:
```bash
npm run build
```
Expected: PASS with 0 build errors.

- [ ] **Step 4: Commit Task 7**

```bash
git add src/components/Projects.astro src/components/Contact.astro src/pages/index.astro
git commit -m "feat: add featured projects with resurva ecosystem and contact section with quick copy email"
```

---

### Task 8: Page Integration, Cleanup & Final Verification

**Files:**
- Modify: `src/pages/index.astro`
- Delete/Clean: obsolete legacy files (`index.html`, `vite.config.js`, legacy `src/main.js`, legacy `src/style.css`)
- Verify: `npm run build`

**Interfaces:**
- Consumes: All components (`Hero`, `Experience`, `Projects`, `Education`, `Skills`, `Contact`).
- Produces: Complete production build in `dist/` ready for Vercel deployment.

- [ ] **Step 1: Finalize src/pages/index.astro**

Assemble all sections in order:
```astro
---
import Layout from '../layouts/Layout.astro';
import GridCanvas from '../components/GridCanvas.astro';
import CustomCursor from '../components/CustomCursor.astro';
import StatusBar from '../components/StatusBar.astro';
import ShortcutsModal from '../components/ShortcutsModal.astro';
import Hero from '../components/Hero.astro';
import Experience from '../components/Experience.astro';
import Projects from '../components/Projects.astro';
import Education from '../components/Education.astro';
import Skills from '../components/Skills.astro';
import Contact from '../components/Contact.astro';
---
<Layout title="Nathanael Juan Gracedo — AI & Software Developer">
  <GridCanvas />
  <CustomCursor />
  <main class="relative z-10">
    <Hero />
    <Experience />
    <Projects />
    <Education />
    <Skills />
    <Contact />
  </main>
  <StatusBar />
  <ShortcutsModal />
</Layout>
```

- [ ] **Step 2: Clean up obsolete legacy files**

Remove old Vite single-page files that are no longer needed:
```bash
rm -f index.html vite.config.js src/main.js src/style.css
```

- [ ] **Step 3: Run full build test**

Run:
```bash
npm run build
```
Expected: Output generated in `dist/` with valid `index.html` and assets. No warnings or errors.

- [ ] **Step 4: Verify preview server**

Run preview server briefly or test file output:
```bash
test -f dist/index.html && echo "dist/index.html exists and is valid"
```
Expected: `dist/index.html exists and is valid`.

- [ ] **Step 5: Commit Task 8**

```bash
git add -A
git commit -m "feat: complete portfolio redesign with astro v5 and cyber-hud styling"
```
