// Load saved theme if any
(function(){
  const stored = localStorage.getItem('theme');
  if (stored) document.documentElement.setAttribute('data-theme', stored);
})();

// Theme toggle
(function(){
  const btn = document.getElementById('theme-toggle');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    const root = document.documentElement;
    const current = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    const label = btn.querySelector('.label');
    if(label) label.textContent = next === 'dark' ? 'Light Mode' : 'Dark Mode';
  });
})();

// Force all external/contact/file links to open in new tab
(function(){
  document.querySelectorAll('a[href]').forEach(a=>{
    const href = a.getAttribute('href')||'';
    const ext = /^https?:\/\//i.test(href);
    const mail = href.startsWith('mailto:');
    const tel = href.startsWith('tel:');
    const file = href.startsWith('assets/') || /(pdf|png|jpe?g|gif|svg|docx?|xlsx?)$/i.test(href);
    if (ext || mail || tel || file){ a.setAttribute('target','_blank'); a.setAttribute('rel','noopener'); }
  });
})();

// Contact form -> mailto
(function(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const val = id => (document.getElementById(id)||{}).value||'';
    const name = val('name');
    const email= val('email');
    const phone= val('phone');
    const subject = val('subject') || 'Portfolio Contact';
    const msg = val('message');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email.'); return; }
    const s = `Portfolio Contact — ${subject} — ${name||'No name'}`;
    const b = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(msg)}`;
    window.location.href = `mailto:134dev.s@gmail.com?subject=${encodeURIComponent(s)}&body=${b}`;
    form.reset();
  });
})();

// === LinkedIn JSON loader ===
(async function(){
  try{
    const res = await fetch('assets/linkedin.json');
    if (!res.ok) return; // quietly skip if not present
    const data = await res.json();

    // Headline (optional: place under name)
    const headlineEl = document.getElementById('li-headline');
    if (headlineEl && data.headline) headlineEl.textContent = data.headline;

    const about = document.getElementById('li-about');
    if(about && data.about) about.textContent = data.about;

    const hl = document.getElementById('li-highlights');
    if(hl && Array.isArray(data.highlights)){
      data.highlights.forEach(h=>{
        const li = document.createElement('li');
        li.innerHTML = `<strong>${h.title}</strong> — ${h.detail||''}`;
        hl.appendChild(li);
      });
    }

    const certs = document.getElementById('li-certs');
    if(certs && Array.isArray(data.licenses_certifications)){
      data.licenses_certifications.forEach(c=>{
        const div = document.createElement('div');
        div.className = 'cert';
        div.innerHTML = `<h3>${c.name}</h3><p class="issuer">${c.issuer||''}${c.date?' • '+c.date:''}</p>${c.url?`<a href="${c.url}">Credential</a>`:''}`;
        certs.appendChild(div);
      });
    }

    const recos = document.getElementById('li-recos');
    if(recos && Array.isArray(data.recommendations)){
      data.recommendations.forEach(r=>{
        const div = document.createElement('div');
        div.className = 'testimonial';
        div.innerHTML = `<blockquote>${r.quote||''}</blockquote><footer>— ${r.author||'Name'}, ${r.role||''}</footer>`;
        recos.appendChild(div);
      });
    }

    const feat = document.getElementById('li-featured');
    if(feat && Array.isArray(data.featured)){
      data.featured.forEach(f=>{
        const li = document.createElement('li');
        li.innerHTML = `<a href="${f.url||'#'}">${f.label||'Featured'}</a>`;
        feat.appendChild(li);
      });
    }
  }catch(err){
    console.error('LinkedIn data error', err);
  }
})();
