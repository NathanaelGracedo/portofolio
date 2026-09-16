# Design Specification: Portfolio Redesign (Astro v5 + Cyber-HUD Editorial)

**Author:** Nathanael Juan Gracedo  
**Date:** 2026-09-16  
**Status:** Approved  
**Inspiration:** [codedgar.com](https://codedgar.com/)  

---

## 1. Overview & Objectives

Rombak total website portofolio pribadi **Nathanael Juan Gracedo** untuk keperluan pendaftaran magang industri (AI & Software Development). Mengadopsi arsitektur dan gaya estetika teknis ala **codedgar.com** dengan fondasi **Astro v5**, styling modern **Tailwind CSS v4**, dan interactive module berbasis Vanilla JS (island architecture).

### Key Goals:
1. **Peningkatan Interaktivitas & Animasi:** Efek visual khas developer HUD (ASCII matrix photo reveal, custom targeting cursor, persistent status bar, keyboard shortcuts, background animated grid).
2. **Branding Profesional Magang:** Menegaskan profil sebagai mahasiswa Undergraduate Sarjana Terapan Teknik Informatika di Politeknik Negeri Malang dengan keahlian praktis di Web & Mobile.
3. **Showcase Proyek Unggulan:** Menyoroti kontribusi pada ekosistem proyek multi-repo **Resurva** (Nexa Code Studio: Web, Mobile, Backend), **Trashware IoT**, **Pentagram App**, dan **LaporSana**.
4. **Performa Maksimal:** Skor Lighthouse 100/100, zero client overhead di luar elemen interaktif yang dibutuhkan, dan kompatibilitas penuh dengan hosting Vercel.

---

## 2. Tech Stack & Dependencies

- **Core Framework:** [Astro v5](https://astro.build/) (Static Site Generation / SSG).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) terintegrasi via `@tailwindcss/vite` di konfigurasi Astro (`astro.config.mjs`).
- **Typography:**
  - Display / Headings: `Space Grotesk` (Google Fonts).
  - Monospace / HUD Metadata: `JetBrains Mono` / `IBM Plex Mono`.
  - Body Text: `Plus Jakarta Sans` / `Inter`.
- **Hosting Target:** Vercel (Static Deployment).
- **Assets:** Foto profil portofolio (`src/assets/hero.png`), favicon SVG, dan icon asset.

---

## 3. Theme System & Visual Style

### 3.1. Dual Theme System
Menggunakan CSS Variables di `:root` yang dapat di-toggle secara dinamis antara Dark HUD dan Light Warm Sand. State tersimpan di `localStorage` dan tersinkronisasi langsung ke bottom status bar.

1. **Dark HUD (Default):**
   - Background: `#0a0a0a` / `#121212`
   - Surface / Card: `#18181b` dengan border subtle `#27272a`
   - Text Primary: `#fafafa`
   - Text Secondary: `#a1a1aa`
   - Accent Primary: Electric Blue (`#3b82f6` / `#60a5fa`)
   - Accent Signal: Signal Orange (`#f97316`)
   - Success / Live: Emerald Green (`#10b981`)
2. **Light Warm Editorial (Inspirasi Codedgar):**
   - Background: Cream Sand (`#f4f4f4` / `#f0ece4`)
   - Surface / Card: `#ffffff` dengan border subtle `rgba(25, 24, 24, 0.12)`
   - Text Primary: Sharp Black (`#191818`)
   - Text Secondary: Muted Black (`rgba(25, 24, 24, 0.7)`)
   - Accent Primary: Electric Blue (`#1b5def`)
   - Accent Signal: Signal Orange (`#e25327`)

### 3.2. HUD Editorial Elements
- **Nomor Section Raksasa:** Indikator watermarked transparan di pojok kiri atas section (`01`, `02`, `03`, `04`, `05`).
- **Code Annotations:** Label sub-header bergaya komentar kode (`// system.init`, `// section.experience`, `// section.projects`, `// section.education`, `// section.skills`, `// section.contact`).
- **Corner Target Brackets:** Indikator `[ ]` tipis di sudut elemen aktif.
- **Scanlines:** Garis aksen laser halus di pemisah antar section.

---

## 4. Component Structure & Architecture

```text
portofolio/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── hero.png                  # Foto profil portrait
│   ├── components/
│   │   ├── TopNav.astro              # Monospace header + drawer mobile
│   │   ├── StatusBar.astro           # Bottom fixed HUD (path, mode, clock, scroll bar, toggle)
│   │   ├── CustomCursor.astro        # Pointer dot + smooth ring + 4 target brackets [ ]
│   │   ├── ShortcutsModal.astro      # Modal panduan keyboard navigation ('?')
│   │   ├── GridCanvas.astro          # Background cyber grid / scanline animasi
│   │   ├── AsciiRevealPhoto.astro    # Foto profil dengan canvas ASCII matrix glitch reveal
│   │   ├── Hero.astro                # Hero section (bio, status, metrics, photo)
│   │   ├── Experience.astro          # Timeline riwayat magang PT SIDIGS
│   │   ├── Projects.astro            # Card showcase (Resurva, Trashware, Pentagram, LaporSana)
│   │   ├── Education.astro           # Polinema & SMAK Santa Maria
│   │   ├── Skills.astro              # Skill categorical pills
│   │   ├── Contact.astro             # Quick copy email + direct social links
│   │   └── Footer.astro              # Minimalist metadata & copyright
│   ├── layouts/
│   │   └── Layout.astro              # HTML root, theme provider, SEO, fonts
│   ├── styles/
│   │   └── global.css                # Tailwind v4 directives, custom theme variables, animations
│   └── pages/
│       └── index.astro               # Assembly halaman utama
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## 5. Interactive Features & Animation Specs

### 5.1. ASCII Matrix Reveal Photo (`AsciiRevealPhoto.astro`)
- Mengambil gambar dari `hero.png`.
- Menggunakan HTML5 Canvas overlay untuk mengonversi nilai grayscale/luminance piksel menjadi karakter ASCII (`0`, `1`, `*`, `#`, `>`, `@`).
- Saat kursor mouse bergerak di atas foto atau saat trigger load selesai, karakter ASCII terurai dengan efek trail/fade, menampilkan foto portrait asli yang bersih dan beresolusi tinggi.

### 5.2. Custom HUD Targeting Cursor (`CustomCursor.astro`)
- Desktop-only (`pointer-events: none`, otomatis disembunyikan pada perangkat touchscreen).
- Terdiri dari 3 layer:
  1. `cursor-dot`: Titik 4px presisi mengikuti posisi mouse secara instan.
  2. `cursor-ring`: Lingkaran 28px dengan efek peredam inersia (lerp smoothing via `requestAnimationFrame`).
  3. `cursor-corners`: 4 siku sudut `[ ]` yang mengunci ukuran elemen yang sedang di-hover (tombol, link, kartu proyek).

### 5.3. Persistent Bottom Status Bar (`StatusBar.astro`)
- Selalu menempel di dasar viewport (`fixed bottom-0 left-0 right-0 z-50`).
- Komponen:
  - `status-bar__path`: Menampilkan path direktori aktif (`~/nathanael/work`, `~/nathanael/experience`, dst.) sesuai scroll position.
  - `status-bar__mode`: Status mode (`NORMAL` saat santai, `HOVER` saat kursor di atas tautan, `MODAL` saat shortcut terbuka).
  - `status-bar__progress`: Scroll progress bar horizontal + persentase angka tabular (0% - 100%).
  - `status-bar__clock`: Jam digital live format WIB 24 jam (`HH:MM:SS`).
  - `status-bar__theme`: Tombol shortcut `[T]` untuk mengganti tema Dark/Light.
  - `status-bar__help`: Tombol shortcut `[?]` untuk membuka menu Keyboard Shortcuts.

### 5.4. Keyboard Shortcuts Modal (`ShortcutsModal.astro`)
- Membuka modal HUD terminal saat menekan `?` pada keyboard atau klik icon di status bar.
- Binding:
  - `1` / `H`: Scroll ke Hero.
  - `2` / `E`: Scroll ke Experience.
  - `3` / `P`: Scroll ke Projects.
  - `4` / `U`: Scroll ke Education.
  - `5` / `S`: Scroll ke Skills.
  - `6` / `C`: Scroll ke Contact.
  - `G`: Scroll ke paling atas (Top).
  - `Shift+G`: Scroll ke paling bawah (Bottom).
  - `T`: Toggle Dark/Light Mode.
  - `Escape`: Menutup modal.

### 5.5. Cyber Grid Canvas (`GridCanvas.astro`)
- Latar belakang canvas fullscreen dengan animasi grid perspektif/dot matrix halus dan aksen scanline.
- Mendukung mode hemat daya: Frame-rate di-throttle dan otomatis dipause bila tab tidak aktif atau pengguna mengaktifkan `prefers-reduced-motion`.

### 5.6. Project Card Interactive Glow
- Menggunakan event `mousemove` pada `.project-card` untuk memperbarui custom properties `--mouse-x` dan `--mouse-y`.
- Menghasilkan radial gradient glow halus yang mengikuti kursor pada batas tepi kartu (border glow pulse).

---

## 6. Detailed Content & Copywriting

### Hero Section (`#hero`)
- **Annotation:** `// system.init`
- **Status Badge:** `● Available for Internship & Opportunities`
- **Title:** Nathanael Juan Gracedo
- **Subtitle:** AI & Software Developer
- **Bio:**
  > Undergraduate student in Informatics Engineering (Sarjana Terapan Teknik Informatika) at Politeknik Negeri Malang with a strong focus on Artificial Intelligence and modern software engineering. Experienced in building scalable cross-platform mobile and web applications with clean, responsive, and human-centric UI/UX.
- **Metric Cards:**
  - `4+` Featured Projects
  - `1` Industry Internship (PT SIDIGS)
  - `D4 TI` Politeknik Negeri Malang
- **Visual:** Foto profil beranimasi ASCII Reveal di sisi kanan.

### Section 01 // Experience (`#experience`)
- **Watermark Number:** `01`
- **Annotation:** `// section.experience`
- **Entry:**
  - **Role:** Mobile Developer Intern
  - **Company:** PT SIDIGS
  - **Period:** Jun 2022 — Nov 2022
  - **Description:** Mengembangkan aplikasi mobile cross-platform berbasis Flutter dan Dart. Menerjemahkan kebutuhan bisnis dan rancangan desain UI/UX ke dalam antarmuka interaktif yang responsif dan pixel-accurate di berbagai resolusi layar.
  - **Tech Stack:** Flutter, Dart, UI/UX Implementation, RESTful API Integration.
  *(Format data disiapkan dalam array terstruktur sehingga mudah ditambah pengalaman magang berikutnya).*

### Section 02 // Projects (`#projects`)
- **Watermark Number:** `02`
- **Annotation:** `// section.projects`
- **Highlight 1: Resurva Platform (Nexa Code Studio — Contributor)**
  - *Description:* Ekosistem platform keberlanjutan dan manajemen sumber daya modern yang terdiri dari web app, mobile app, dan microservices backend.
  - *Repositories:*
    - Web (Frontend Next.js & shadcn): [github.com/Nexa-Code-Studio/resurva_web](https://github.com/Nexa-Code-Studio/resurva_web)
    - Mobile (Flutter/Dart App): [github.com/Nexa-Code-Studio/resurva_mobile](https://github.com/Nexa-Code-Studio/resurva_mobile)
    - Backend (REST API Service): [github.com/Nexa-Code-Studio/resurva_backend](https://github.com/Nexa-Code-Studio/resurva_backend)
  - *Badges:* `Next.js`, `Flutter`, `TypeScript`, `Backend API`, `Community Contributor`
- **Highlight 2: Trashware IoT**
  - *Description:* Smart waste management IoT system terintegrasi Cloud Computing & Big Data untuk monitoring kapasitas tempat sampah kampus secara real-time.
  - *Badges:* `IoT`, `Flutter`, `Cloud Computing`, `Real-time Monitoring`
  - *Repository:* [github.com/soulqan/trashware](https://github.com/soulqan/trashware)
- **Highlight 3: Pentagram App**
  - *Description:* Aplikasi mobile tata kelola kependudukan RT/RW dengan fitur community chat, kas warga, dan pendaftaran onboarding terintegrasi OCR e-KTP berbasis Machine Learning.
  - *Badges:* `Flutter`, `Dart`, `Firebase`, `Python`, `OCR / ML`
  - *Repository:* [github.com/Ruphasa/Four-Heavenly-Principle](https://github.com/Ruphasa/Four-Heavenly-Principle)
- **Highlight 4: LaporSana**
  - *Description:* Web pelaporan kerusakan sarana kampus serta rekomendasi kompetisi berbasis algoritma machine learning (KNN & Naive Bayes).
  - *Badges:* `Laravel`, `PHP`, `MySQL`, `KNN / Naive Bayes`
  - *Repository:* [github.com/AlexanderDev2004/LaporSana](https://github.com/AlexanderDev2004/LaporSana)

### Section 03 // Education (`#education`)
- **Watermark Number:** `03`
- **Annotation:** `// section.education`
- **Entry 1:**
  - **Institution:** Politeknik Negeri Malang (Polinema)
  - **Degree:** Sarjana Terapan (D4) Teknik Informatika
  - **Period:** 2022 — Sekarang (Undergraduate)
- **Entry 2:**
  - **Institution:** SMAK Santa Maria Malang
  - **Major:** Matematika dan Ilmu Pengetahuan Alam (MIPA)
  - **Period:** 2019 — 2022

### Section 04 // Skills (`#skills`)
- **Watermark Number:** `04`
- **Annotation:** `// section.skills`
- **Programming Languages:** Dart, PHP, TypeScript, JavaScript, Python, SQL, HTML/CSS.
- **Frameworks & Libraries:** Flutter, Laravel, Next.js, Tailwind CSS, Node.js.
- **Database, Tools & DevOps:** MySQL, PostgreSQL, Firebase, Git, GitHub, Docker, Postman, Figma, VS Code.

### Section 05 // Contact & Let's Talk (`#contact`)
- **Watermark Number:** `05`
- **Annotation:** `// section.contact`
- **Headings:** Let's Connect // Open for Internship Opportunities
- **Description:** Sedang aktif mencari peluang magang industri di bidang Mobile Development, Web Development, atau AI/ML Engineering.
- **Interactions:**
  - **Quick Copy Email:** Tombol interaktif yang menyalin alamat email ke clipboard dalam satu klik disertai HUD toast notification.
  - **Direct Socials:** Tautan terverifikasi ke profil LinkedIn dan GitHub ([github.com/NathanaelGracedo](https://github.com/NathanaelGracedo)).

---

## 7. Verification & Success Criteria

1. **Build & Bundle Test:**
   - `npm run build` (`astro build`) selesai tanpa error. Output folder `dist/` valid untuk deploy Vercel.
2. **Interactive Elements Test:**
   - ASCII matrix reveal beranimasi saat kursor menyentuh foto hero.
   - Custom HUD cursor bergerak mulus tanpa jank dan mengunci target dengan akurat.
   - Status bar menampilkan data live (path, clock, scroll progress).
   - Modal shortcuts membuka dan merespons tombol keyboard navigasi.
   - Tema Dark/Light berpindah mulus tanpa flash of unstyled content (FOUC).
   - Tombol Quick Copy Email berfungsi dan memicu toast feedback.
3. **Responsive Design:**
   - Tampilan optimal pada layar smartphone (360px+), tablet, dan desktop lebar (1440px+).
   - Touchscreen fallback: Kursor custom otomatis dinonaktifkan di layar sentuh agar UX mobile tetap native dan nyaman.
