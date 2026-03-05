// Year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Force EXTERNAL/CONTACT/FILE links to open in a new tab
(function () {
  document.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href') || '';
    const isExternal = /^https?:\/\//i.test(href);
    const isMail = href.startsWith('mailto:');
    const isTel = href.startsWith('tel:');
    const isFile = href.startsWith('assets/') || /\.(pdf|png|jpe?g|gif|svg|docx?|xlsx?)$/i.test(href);
    if (isExternal || isMail || isTel || isFile) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    }
  });
})();

// Contact form -> mailto handler (no backend needed for GitHub Pages)
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (document.getElementById('name') || {}).value || '';
    const email = (document.getElementById('email') || {}).value || '';
    const phone = (document.getElementById('phone') || {}).value || '';
    const subject = (document.getElementById('subject') || {}).value || 'Portfolio Contact';
    const msg = (document.getElementById('message') || {}).value || '';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const fullSubject = `Portfolio Contact — ${subject} — ${name || 'No name'}`;
    const body =
      `Name: ${name}%0D%0A` +
      `Email: ${email}%0D%0A` +
      `Phone: ${phone}%0D%0A%0D%0A` +
      `Message:%0D%0A${encodeURIComponent(msg)}`;

    const mailto = `mailto:134dev.s@gmail.com?subject=${encodeURIComponent(fullSubject)}&body=${body}`;
    window.location.href = mailto;
    form.reset();
  });
})();
