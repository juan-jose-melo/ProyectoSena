const GINE_URL = 'https://juan-jose-melo.github.io/ProyectoSena/index.html';

(() => {
  const slides = [...document.querySelectorAll('.tool-slide')];
  const previous = document.getElementById('slidePrev');
  const next = document.getElementById('slideNext');
  const progress = document.getElementById('slideProgress');
  const counter = document.getElementById('slideCount');
  const carousel = document.getElementById('depthCarousel');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav-links');
  const year = document.getElementById('year');
  let current = 0;
  let autoAdvance;
  let touchStartX = 0;
  let touchEndX = 0;

  if (year) year.textContent = new Date().getFullYear();

  // Personalización según la ferretería aliada (?aliada=1..6)
  const partnerNumber = new URLSearchParams(window.location.search).get('aliada');
  if (partnerNumber && /^[1-6]$/.test(partnerNumber)) {
    const partnerLabel = `Ferretería aliada ${partnerNumber}`;
    document.title = `${partnerLabel} | GINE`;
    document.querySelectorAll('.brand-name').forEach(el => {
      el.innerHTML = `${partnerLabel.toUpperCase()} <small>ALIADA GINE</small>`;
    });
    document.querySelectorAll('.topline').forEach(el => {
      el.innerHTML = `<span class="status-dot"></span> ${partnerLabel.toUpperCase()} <span class="topline-mark">/</span> ALIADA DE GINE`;
    });
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) heroTitle.innerHTML = `Bienvenido a <em>${partnerLabel.toLowerCase()}.</em>`;
    const heroParagraph = document.querySelector('.hero-copy > p');
    if (heroParagraph) heroParagraph.textContent = `Conoce ${partnerLabel.toLowerCase()}, una de las ferreterías aliadas que hacen parte de la comunidad GINE. Esta página es una presentación; para buscar productos y realizar tus compras, continúa en GINE.`;
  }

  if (!slides.length) return;

  function renderSlides() {
    const total = slides.length;
    slides.forEach((slide, index) => {
      slide.classList.remove('is-active', 'is-prev', 'is-next');
      slide.setAttribute('aria-hidden', index === current ? 'false' : 'true');
      
      if (index === current) {
        slide.classList.add('is-active');
      } else if (index === (current - 1 + total) % total) {
        slide.classList.add('is-prev');
      } else if (index === (current + 1) % total) {
        slide.classList.add('is-next');
      }
    });

    if (progress) progress.style.width = `${((current + 1) / total) * 100}%`;
    if (counter) counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    renderSlides();
  }

  function stopAuto() {
    if (autoAdvance) window.clearInterval(autoAdvance);
  }

  function startAuto() {
    stopAuto();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      autoAdvance = window.setInterval(() => goTo(current + 1), 5200);
    }
  }

  // Eventos de botones
  previous?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  next?.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  // Eventos de teclado
  carousel?.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(current - 1); startAuto(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(current + 1); startAuto(); }
  });

  // Pausa en hover / focus
  carousel?.addEventListener('mouseenter', stopAuto);
  carousel?.addEventListener('mouseleave', startAuto);
  carousel?.addEventListener('focusin', stopAuto);
  carousel?.addEventListener('focusout', startAuto);

  // Soporte táctil / Swipe
  carousel?.addEventListener('touchstart', event => {
    touchStartX = event.changedTouches[0].screenX;
    stopAuto();
  }, { passive: true });

  carousel?.addEventListener('touchend', event => {
    touchEndX = event.changedTouches[0].screenX;
    const distance = touchStartX - touchEndX;
    if (Math.abs(distance) > 45) {
      goTo(current + (distance > 0 ? 1 : -1));
    }
    startAuto();
  }, { passive: true });

  // Menú móvil
  menuToggle?.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(opened));
    menuToggle.textContent = opened ? '✕' : '☰';
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = '☰';
  }));

  // Inicializar
  renderSlides();
  startAuto();
})();