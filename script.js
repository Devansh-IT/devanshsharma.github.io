
// Update year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
(function mobileMenu(){
  const btn = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
})();

// Theme toggle (optional)
(function themeToggle(){
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// 🔒 Force ALL links to open in a new tab (including mailto/tel)
(function forceNewTab(){
  const links = document.querySelectorAll('a[href]');
  links.forEach(a => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });
})();
