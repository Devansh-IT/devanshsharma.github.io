
// Update year
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

// Mobile menu
(function(){
  const btn=document.querySelector('.menu-toggle');
  const nav=document.getElementById('site-nav');
  if(!btn||!nav) return;
  btn.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
})();

// Theme toggle
(function(){
  const root=document.documentElement; const btn=document.getElementById('theme-toggle');
  if(!btn) return;
  btn.addEventListener('click',()=>{
    const current=root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
    const next=current==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    localStorage.setItem('theme',next);
  });
})();

// Force ALL links to open in a new tab (including mailto/tel)
(function(){
  document.querySelectorAll('a[href]').forEach(a=>{
    a.setAttribute('target','_blank');
    a.setAttribute('rel','noopener');
  });
})();
