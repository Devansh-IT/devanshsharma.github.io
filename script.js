
(function themeToggle(){
  const root=document.documentElement;const toggle=document.getElementById('theme-toggle');
  const stored=localStorage.getItem('theme');if(stored) root.setAttribute('data-theme',stored);
  if(toggle){toggle.addEventListener('click',()=>{const current=root.getAttribute('data-theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');const next=current==='dark'?'light':'dark';root.setAttribute('data-theme',next);localStorage.setItem('theme',next);});}
})();
(function mobileMenu(){
  const btn=document.querySelector('.menu-toggle');const nav=document.getElementById('site-nav');
  if(!btn||!nav) return;btn.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));});
})();

document.getElementById('year').textContent=new Date().getFullYear();
