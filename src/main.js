import './style.css';

// ─── Scroll Reveal (IntersectionObserver) ───
const initReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
    observer.observe(el);
  });
};

// ─── Navbar show/hide on scroll ───
const initNavbar = () => {
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;
  let ticking = false;

  const updateNavbar = () => {
    const scrollY = window.scrollY;
    if (scrollY > 300) {
      navbar.classList.remove('-translate-y-full');
      navbar.classList.add('translate-y-0');
    } else {
      navbar.classList.add('-translate-y-full');
      navbar.classList.remove('translate-y-0');
    }
    lastScrollY = scrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  });
};

// ─── Mobile menu toggle ───
const initMobileMenu = () => {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const h1 = document.getElementById('hamburger-1');
  const h2 = document.getElementById('hamburger-2');
  const h3 = document.getElementById('hamburger-3');
  let open = false;

  btn.addEventListener('click', () => {
    open = !open;
    if (open) {
      menu.style.maxHeight = menu.scrollHeight + 'px';
      h1.style.transform = 'rotate(45deg) translate(2px, 2px)';
      h2.style.opacity = '0';
      h3.style.transform = 'rotate(-45deg) translate(2px, -2px)';
      h3.style.width = '1.25rem';
    } else {
      menu.style.maxHeight = '0';
      h1.style.transform = '';
      h2.style.opacity = '';
      h3.style.transform = '';
      h3.style.width = '';
    }
  });

  // Close on link click
  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      open = false;
      menu.style.maxHeight = '0';
      h1.style.transform = '';
      h2.style.opacity = '';
      h3.style.transform = '';
      h3.style.width = '';
    });
  });
};

// ─── Project card glow follow mouse ───
const initCardGlow = () => {
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
};

// ─── GitHub contribution graph (mock) ───
const initContributionGraph = () => {
  const container = document.getElementById('contribution-graph');
  if (!container) return;

  const weeks = 52;
  const days = 7;
  const levels = ['bg-surface', 'bg-accent/10', 'bg-accent/20', 'bg-accent/40', 'bg-accent/70'];

  // Generate a deterministic but varying pattern
  const seed = (i) => {
    const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };

  for (let w = 0; w < weeks; w++) {
    const weekCol = document.createElement('div');
    weekCol.className = 'flex flex-col gap-[3px]';

    for (let d = 0; d < days; d++) {
      const cell = document.createElement('div');
      const idx = w * days + d;
      const val = seed(idx);

      let level;
      if (val < 0.4) level = 0;
      else if (val < 0.6) level = 1;
      else if (val < 0.75) level = 2;
      else if (val < 0.9) level = 3;
      else level = 4;

      cell.className = `w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px] ${levels[level]} transition-colors duration-300`;
      cell.title = `${Math.floor(val * 10)} contributions`;
      weekCol.appendChild(cell);
    }

    container.appendChild(weekCol);
  }
};

// ─── GitHub repository cards (mock) ───
const initGitHubRepos = () => {
  const container = document.getElementById('github-repos');
  if (!container) return;

  const repos = [
    {
      name: 'trashware-iot',
      description: 'Smart Trash Bin IoT system with Cloud Computing & Big Data integration for real-time campus monitoring.',
      language: 'Dart',
      langColor: '#00B4AB',
      stars: 12,
      forks: 3,
    },
    {
      name: 'pentagram-app',
      description: 'Mobile citizen data management app with community chat, financial tools, and KTP OCR integration.',
      language: 'Dart',
      langColor: '#00B4AB',
      stars: 8,
      forks: 2,
    },
    {
      name: 'laporsana',
      description: 'Campus facility damage reporting system with priority repair recommendations.',
      language: 'PHP',
      langColor: '#4F5D95',
      stars: 5,
      forks: 1,
    },
    {
      name: 'pemrograman-berbasis-framework',
      description: 'Repository untuk mata kuliah Pemrograman Berbasis Framework, mencakup praktikum dan proyek pengembangan aplikasi web modern.',
      language: 'TypeScript',
      langColor: '#3178C6',
      stars: 3,
      forks: 0,
    },
    {
      name: 'PROGRAMING_MOBILE_2025-2026',
      description: 'Mata Kuliah Pemrograman Mobile Semester 5 — kumpulan tugas, praktikum, dan proyek pengembangan aplikasi mobile.',
      language: 'Dart',
      langColor: '#00B4AB',
      stars: 2,
      forks: 0,
    },
    {
      name: '2341720217_ML_2025',
      description: 'Repository pengerjaan praktikum maupun proyek dari mata kuliah Machine Learning Semester 5.',
      language: 'Python',
      langColor: '#3572A5',
      stars: 1,
      forks: 0,
    },
  ];

  repos.forEach((repo) => {
    const card = document.createElement('div');
    card.className =
      'github-card group border border-border rounded-xl p-5 bg-surface/50 hover:border-border-hover transition-all duration-500 relative overflow-hidden cursor-pointer';

    card.innerHTML = `
      <div class="github-card-shimmer absolute inset-0 pointer-events-none"></div>
      <div class="relative z-10">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            <h3 class="text-sm font-semibold text-accent group-hover:underline underline-offset-4">${repo.name}</h3>
          </div>
          <span class="text-[10px] text-text-muted border border-border rounded-full px-2 py-0.5 font-mono">Public</span>
        </div>
        <p class="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-2">${repo.description}</p>
        <div class="flex items-center gap-4 text-text-muted">
          <div class="flex items-center gap-1.5">
            <span class="lang-dot" style="background-color: ${repo.langColor}"></span>
            <span class="text-xs">${repo.language}</span>
          </div>
          <div class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span class="text-xs">${repo.stars}</span>
          </div>
          <div class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v3"/></svg>
            <span class="text-xs">${repo.forks}</span>
          </div>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      window.open(`https://github.com/NathanaelGracedo/${repo.name}`, '_blank');
    });

    container.appendChild(card);
  });
};

// ─── Smooth anchor scrolling with offset ───
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const pos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });
};

// ─── Init everything ───
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initNavbar();
  initMobileMenu();
  initCardGlow();
  initContributionGraph();
  initGitHubRepos();
  initSmoothScroll();
});
