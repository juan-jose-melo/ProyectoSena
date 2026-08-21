// ================= MENÚ DESPLEGABLE =================
const menuBtn = document.querySelector('.menu-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (menuBtn && dropdownMenu) {
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
  });

  window.addEventListener('click', (e) => {
    if (!dropdownMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      dropdownMenu.classList.remove('show');
    }
  });
}

// ================= SLIDER PRINCIPAL =================
const track = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

let mainIndex = 1; 
let isMainTransitioning = false;
let totalMainOriginals = 0;
let allMainSlides = [];
let mainAutoSlideInterval;

function startMainAutoSlide() {
  mainAutoSlideInterval = setInterval(() => {
    if (typeof moveMainSlide === 'function') moveMainSlide(mainIndex + 1);
  }, 4000);
}

function resetMainAutoSlide() {
  clearInterval(mainAutoSlideInterval);
  startMainAutoSlide();
}

if (track && prevBtn && nextBtn && dotsContainer) {
  let mainOriginals = Array.from(track.querySelectorAll('.slide'));
  totalMainOriginals = mainOriginals.length;

  if (totalMainOriginals > 0) {
    const mainFirstClone = mainOriginals[0].cloneNode(true);
    const mainLastClone = mainOriginals[totalMainOriginals - 1].cloneNode(true);

    track.appendChild(mainFirstClone);
    track.insertBefore(mainLastClone, mainOriginals[0]);

    allMainSlides = Array.from(track.querySelectorAll('.slide'));

    function getMainSlideWidth() {
      const slideWidth = allMainSlides[0].getBoundingClientRect().width;
      const gap = 20;
      return slideWidth + gap;
    }

    function setMainTrackPosition(index, animate = true) {
      const slideWidth = allMainSlides[0].getBoundingClientRect().width;
      const gap = 20;
      const viewportWidth = track.parentElement.getBoundingClientRect().width;
      const offset = (viewportWidth - slideWidth) / 2;
    
      track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
      track.style.transform = `translateX(-${(index * (slideWidth + gap)) - offset}px)`;
      updateDots();
    }

    function updateDots() {
      const dots = dotsContainer.querySelectorAll('.dot');
      let activeDotIndex = (mainIndex - 1 + totalMainOriginals) % totalMainOriginals;
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeDotIndex);
      });
    }

    function moveMainSlide(nextIndex) {
      if (isMainTransitioning) return;
      isMainTransitioning = true;
      mainIndex = nextIndex;
      setMainTrackPosition(mainIndex, true);
    }

    track.addEventListener('transitionend', () => {
      isMainTransitioning = false;
      if (mainIndex >= allMainSlides.length - 1) {
        mainIndex = 1;
        setMainTrackPosition(mainIndex, false);
      }
      if (mainIndex <= 0) {
        mainIndex = totalMainOriginals;
        setMainTrackPosition(mainIndex, false);
      }
    });

    nextBtn.addEventListener('click', () => {
      moveMainSlide(mainIndex + 1);
      resetMainAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
      moveMainSlide(mainIndex - 1);
      resetMainAutoSlide();
    });

    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        moveMainSlide(index + 1);
        resetMainAutoSlide();
      });
    });

    setMainTrackPosition(mainIndex, false);
    startMainAutoSlide();
  }
}

// ================= MINI SLIDER =================
const miniTrack = document.getElementById('miniSliderTrack');
const miniPrevBtn = document.getElementById('miniPrevBtn');
const miniNextBtn = document.getElementById('miniNextBtn');

let miniIndex = 5;
let isMiniTransitioning = false;
let totalMiniOriginals = 0;
let visibleCount = 5;
let miniAutoSlideInterval;

function startMiniAutoSlide() {
  miniAutoSlideInterval = setInterval(() => {
    if (typeof moveMiniSlide === 'function') moveMiniSlide(miniIndex + 1);
  }, 4500);
}

function resetMiniAutoSlide() {
  clearInterval(miniAutoSlideInterval);
  startMiniAutoSlide();
}

if (miniTrack && miniPrevBtn && miniNextBtn) {
  let miniOriginals = Array.from(miniTrack.querySelectorAll('.mini-box'));
  totalMiniOriginals = miniOriginals.length;

  if (totalMiniOriginals > 0) {
    for (let i = 0; i < visibleCount; i++) {
      const cloneAppend = miniOriginals[i % totalMiniOriginals].cloneNode(true);
      const clonePrepend = miniOriginals[(totalMiniOriginals - 1 - i + totalMiniOriginals) % totalMiniOriginals].cloneNode(true);
      miniTrack.appendChild(cloneAppend);
      miniTrack.insertBefore(clonePrepend, miniTrack.firstChild);
    }

    let allMiniSlides = Array.from(miniTrack.querySelectorAll('.mini-box'));

    function getMiniBoxWidth() {
      const boxWidth = allMiniSlides[0].getBoundingClientRect().width;
      const gap = 15;
      return boxWidth + gap;
    }

    function setMiniTrackPosition(index, animate = true) {
      const step = getMiniBoxWidth();
      miniTrack.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
      miniTrack.style.transform = `translateX(-${index * step}px)`;
    }

    function moveMiniSlide(nextIndex) {
      if (isMiniTransitioning) return;
      isMiniTransitioning = true;
      miniIndex = nextIndex;
      setMiniTrackPosition(miniIndex, true);
    }

    miniTrack.addEventListener('transitionend', () => {
      isMiniTransitioning = false;
      if (miniIndex >= totalMiniOriginals + visibleCount) {
        miniIndex = visibleCount;
        setMiniTrackPosition(miniIndex, false);
      }
      if (miniIndex < visibleCount) {
        miniIndex = totalMiniOriginals + miniIndex;
        setMiniTrackPosition(miniIndex, false);
      }
    });

    miniNextBtn.addEventListener('click', () => {
      moveMiniSlide(miniIndex + 1);
      resetMiniAutoSlide();
    });

    miniPrevBtn.addEventListener('click', () => {
      moveMiniSlide(miniIndex - 1);
      resetMiniAutoSlide();
    });

    setMiniTrackPosition(miniIndex, false);
    startMiniAutoSlide();
  }
}

// ================= SLIDER PUBLICIDAD (INFINITO BUCLE) =================
const pistaQ = document.getElementById('pistaQuantum');
const btnZPrev = document.getElementById('btnZipPrev');
const btnZNext = document.getElementById('btnZipNext');

let posSub = 2;
const totalOriginalesPublicidad = 6;
let enTransicionQuantum = false;
let quantumAutoSlideInterval;

function startQuantumAutoSlide() {
  quantumAutoSlideInterval = setInterval(() => {
    moveQuantumSlider(posSub + 1);
  }, 5000);
}

function resetQuantumAutoSlide() {
  clearInterval(quantumAutoSlideInterval);
  startQuantumAutoSlide();
}

function setQuantumPosition(index, conAnimacion = true) {
  if (!pistaQ) return;
  pistaQ.style.transition = conAnimacion ? 'transform 0.5s ease-in-out' : 'none';
  pistaQ.style.transform = `translateX(-${index * 50}%)`;
}

function moveQuantumSlider(siguientePos) {
  if (enTransicionQuantum || !pistaQ) return;
  enTransicionQuantum = true;
  posSub = siguientePos;
  setQuantumPosition(posSub, true);
}

if (pistaQ) {
  pistaQ.addEventListener('transitionend', () => {
    enTransicionQuantum = false;

    if (posSub >= totalOriginalesPublicidad + 2) {
      posSub = 2;
      setQuantumPosition(posSub, false);
    }
    if (posSub <= 0) {
      posSub = totalOriginalesPublicidad;
      setQuantumPosition(posSub, false);
    }
  });

  setQuantumPosition(posSub, false);
  startQuantumAutoSlide();
}

if (btnZNext && btnZPrev) {
  btnZNext.addEventListener('click', () => {
    moveQuantumSlider(posSub + 1);
    resetQuantumAutoSlide();
  });

  btnZPrev.addEventListener('click', () => {
    moveQuantumSlider(posSub - 1);
    resetQuantumAutoSlide();
  });
}

// ================= EVENTOS GLOBALES =================
window.addEventListener('resize', () => {
  if (typeof setMainTrackPosition === 'function') setMainTrackPosition(mainIndex, false);
  if (typeof setMiniTrackPosition === 'function') setMiniTrackPosition(miniIndex, false);
});