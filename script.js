// ===== Header con sombra + barra de progreso al hacer scroll =====
const header = document.getElementById('header');
const progress = document.getElementById('scrollProgress');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Menú móvil =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
  })
);

// ===== Barra de cotización -> WhatsApp =====
const WA = '50662251972';
const quoteForm = document.getElementById('quoteForm');
const quoteInput = document.getElementById('quoteInput');
quoteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = quoteInput.value.trim();
  const base = 'Hola Materiales Meza, quiero cotizar';
  const msg = val ? `${base}: ${val}` : `${base} materiales para mi proyecto`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

// ===== Reveal al hacer scroll =====
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), (i % 4) * 80);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Contadores animados =====
const counters = document.querySelectorAll('.num[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const dur = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('es-CR') + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString('es-CR') + suffix;
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

// ===== Carrusel de productos =====
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const step = () => {
  const card = carousel.querySelector('.pcard');
  return card ? card.offsetWidth + 21 : 300;
};
nextBtn.addEventListener('click', () => carousel.scrollBy({ left: step(), behavior: 'smooth' }));
prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -step(), behavior: 'smooth' }));
