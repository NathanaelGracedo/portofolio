# Design Specification: Portfolio Front-End Polish & Visual Enhancements

**Author:** Nathanael Juan Gracedo  
**Date:** 2026-09-16  
**Status:** Approved  

---

## 1. Overview & Problem Statement

Setelah validasi lokal terhadap hasil redesign awal, ditemukan beberapa penyempurnaan konten dan visual yang diperlukan:
1. **Ketepatan Riwayat Akademik:** Pendidikan menengah yang benar adalah **SMK Telkom Shandy Putra Malang** jurusan **Rekayasa Perangkat Lunak (RPL)**, bukan SMAK Santa Maria Malang.
2. **Penajaman Identitas Role:** Mengubah subtitle Hero dari "AI & Software Developer" menjadi **"Software Developer"** agar lebih fokus dan sesuai dengan arah karir magang front-end / software development.
3. **Penyempurnaan Metrik Hero:**
   - Menyederhanakan kartu magang menjadi "1 Internship Experience" (tanpa menyebut nama instansi di judul kartu, karena detailnya sudah ada di section Experience).
   - Menggantikan "D4 TI Polinema Malang" menjadi **"10+ Tech Stacks Mastered"** dengan animasi counter yang dinamis.
4. **Perbaikan Bug Custom Cursor:** Pointer default browser/OS masih muncul bersamaan dengan custom HUD cursor. Perlu diterapkan CSS `cursor: none !important` pada layar non-touch.
5. **Peningkatan Visual Background (Front-End Showcase):** Latar belakang halaman terasa hampa. Diperlukan animasi background berkelas yang selaras dengan tema Cyber-HUD: **Interactive Constellation Particle Mesh Canvas**, **Ambient Glowing Orbs**, dan **HUD Corner Crosshairs** untuk menonjolkan keahlian Front-End Engineering.

---

## 2. Detailed Specifications

### 2.1. Bug Fix: Custom Pointer Hide
Pada file `src/styles/global.css`:
Tambahkan aturan global di dalam media query desktop (`(hover: hover) and (pointer: fine)`):
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
Hasil: Kursor bawaan OS/browser 100% tersembunyi saat berada di dalam viewport. Pengguna hanya melihat pointer presisi HUD (dot + smooth lerping ring + 4 magnetic corner brackets `[ ]`).

### 2.2. Content Updates

#### A. Hero Section (`src/components/Hero.astro`)
- **Subtitle:** Diubah dari `AI & Software Developer` menjadi:
  ```html
  <p class="font-mono text-sm sm:text-base text-[var(--accent-orange)] font-medium mb-6">
    Software Developer
  </p>
  ```
- **Metrik Card 2:**
  - Target: `1`
  - Label: `Internship Experience`
- **Metrik Card 3:**
  - Target: `10`
  - Counter formatting: `10+`
  - Label: `Tech Stacks Mastered`
  - Markup:
    ```html
    <div class="hud-card rounded-lg p-3 sm:p-4 text-center">
      <div class="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] counter" data-target="10">0</div>
      <p class="font-mono text-[10px] sm:text-xs text-[var(--text-muted)] mt-1">Tech Stacks Mastered</p>
    </div>
    ```

#### B. Education Section (`src/components/Education.astro`)
Perbarui array data `educations`:
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

### 2.3. Background Animation & Front-End Polish

#### A. Interactive Constellation Mesh Canvas (`src/components/GridCanvas.astro`)
Mengembangkan canvas latar belakang agar menggabungkan:
1. **Subtle Cyber Grid:** Garis grid perspektif tipis.
2. **Floating Particles:** Array 45–55 partikel titik mengapung bebas di viewport dengan kecepatan rendah (velocity random -0.4 s/d 0.4).
3. **Interactive Mesh Lines:**
   - Menghitung jarak Euclidean antar partikel (jarak < 90px: menghubungkan garis tipis ber-opacity proporsional).
   - Menghitung jarak partikel ke kursor mouse (jarak < 120px: partikel tertarik sedikit ke arah kursor dan membentuk garis jaring biru/oranye tipis).
4. **Theme Awareness:**
   - Dark theme: Titik dan garis menggunakan warna biru elektrik/putih ber-opacity 0.15–0.3.
   - Light theme: Titik dan garis menggunakan warna navy/slate ber-opacity 0.08–0.2.
5. **Performance & Accessibility:**
   - Throttled loop di 30-40 fps.
   - `prefers-reduced-motion`: Jika aktif, partikel dan grid digambar sekali secara statis tanpa requestAnimationFrame loop.

#### B. Ambient Glowing Orbs (`src/layouts/Layout.astro` & `src/styles/global.css`)
- Menyisipkan 2 elemen ambient blur fixed di belakang konten:
  - Orb 1: Posisi kanan atas (`top: 10%`, `right: 5%`), warna gradien biru elektrik (`bg-[var(--accent-blue)]/15`), blur `blur-3xl`, ukuran `w-96 h-96`.
  - Orb 2: Posisi kiri bawah (`bottom: 15%`, `left: 5%`), warna gradien oranye sinyal (`bg-[var(--accent-orange)]/10`), blur `blur-3xl`, ukuran `w-80 h-80`.
- Keyframes animation CSS GPU-accelerated:
  ```css
  @keyframes orb-float-1 {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(-30px, 40px, 0); }
  }
  @keyframes orb-float-2 {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(40px, -30px, 0); }
  }
  ```

#### C. HUD Corner Crosshairs & Coordinates Decor
Menambahkan dekorasi visual teknis di sudut-sudut viewport (`src/layouts/Layout.astro`):
- Crosshairs `+` di 4 sudut layout dengan font monospace samar.
- Koordinat statis `// LOC: 7.9S · 112.6E` (Malang) di margin layout untuk memperkuat karakter engineering.

---

## 3. Verification Plan

1. **Cursor Bug Verification:**
   - Jalankan preview di browser desktop: pastikan panah kursor default OS tidak tampak sama sekali saat melayang di atas body, heading, link, tombol, atau kartu.
   - Pastikan pada perangkat layar sentuh/mobile, kursor sentuh native tetap bekerja normal tanpa gangguan.
2. **Content Accuracy:**
   - Hero menampilkan `Software Developer`.
   - Kartu metrik menampilkan `4+ Highlighted Projects`, `1 Internship Experience`, `10+ Tech Stacks Mastered`.
   - Section Education menampilkan `SMK Telkom Shandy Putra Malang` (RPL).
3. **Animation Performance:**
   - Canvas constellation mesh merespons gerakan mouse dengan halus tanpa frame drops.
   - Ambient orbs melayang lembut di latar belakang tanpa layout thrashing.
   - `npm run build` berhasil dengan status 0 errors.
