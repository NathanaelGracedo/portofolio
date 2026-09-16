import { translations, getNestedValue, type Lang } from '../utils/i18n';

export function initI18n() {
  const getSavedLang = (): Lang => {
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'id' || saved === 'en') return saved;
    } catch (e) {}
    return 'en';
  };

  const updateUI = (lang: Lang) => {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.lang = lang;

    // Update all data-i18n elements
    document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        const val = getNestedValue(translations[lang], key);
        if (val !== undefined) {
          el.innerHTML = val;
        }
      }
    });

    // Update button states
    const btnEn = document.getElementById('lang-btn-en');
    const btnId = document.getElementById('lang-btn-id');
    const mBtnEn = document.getElementById('mobile-lang-btn-en');
    const mBtnId = document.getElementById('mobile-lang-btn-id');

    if (lang === 'id') {
      btnId?.classList.add('font-bold', 'text-[var(--accent-blue)]');
      btnId?.classList.remove('text-[var(--text-secondary)]');
      btnEn?.classList.remove('font-bold', 'text-[var(--accent-blue)]');
      btnEn?.classList.add('text-[var(--text-secondary)]');

      mBtnId?.classList.add('font-bold', 'text-[var(--accent-blue)]');
      mBtnId?.classList.remove('text-[var(--text-secondary)]');
      mBtnEn?.classList.remove('font-bold', 'text-[var(--accent-blue)]');
      mBtnEn?.classList.add('text-[var(--text-secondary)]');
    } else {
      btnEn?.classList.add('font-bold', 'text-[var(--accent-blue)]');
      btnEn?.classList.remove('text-[var(--text-secondary)]');
      btnId?.classList.remove('font-bold', 'text-[var(--accent-blue)]');
      btnId?.classList.add('text-[var(--text-secondary)]');

      mBtnEn?.classList.add('font-bold', 'text-[var(--accent-blue)]');
      mBtnEn?.classList.remove('text-[var(--text-secondary)]');
      mBtnId?.classList.remove('font-bold', 'text-[var(--accent-blue)]');
      mBtnId?.classList.add('text-[var(--text-secondary)]');
    }

    window.dispatchEvent(new CustomEvent('lang-change', { detail: lang }));
  };

  const setLanguage = (newLang: Lang) => {
    try {
      localStorage.setItem('lang', newLang);
    } catch (e) {}
    updateUI(newLang);
  };

  const toggleLanguage = () => {
    const current = (document.documentElement.getAttribute('data-lang') as Lang) || 'en';
    const next: Lang = current === 'en' ? 'id' : 'en';
    setLanguage(next);
  };

  // Wire buttons
  document.getElementById('lang-toggle-btn')?.addEventListener('click', toggleLanguage);
  document.getElementById('mobile-lang-toggle-btn')?.addEventListener('click', toggleLanguage);
  window.addEventListener('lang-toggle-trigger', toggleLanguage);

  // Wire 'L' shortcut key
  window.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'l' || e.key === 'L') {
      e.preventDefault();
      toggleLanguage();
    }
  });

  // Initial apply
  updateUI(getSavedLang());
}
