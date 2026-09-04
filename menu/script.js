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

// ================= BUSCADOR DE HERRAMIENTAS =================
const herramientas = [
{ nombre: "Alicate", url: "herramientas/alicate.html" },
  { nombre: "Azada", url: "herramientas/azada.html" },
  { nombre: "Arco de sierra", url: "herramientas/arco-de-sierra.html" },
  { nombre: "Aplanadora manual", url: "herramientas/aplanadora-manual.html" },
  { nombre: "Azadon", url: "herramientas/azadon.html" },
  { nombre: "Alezna", url: "herramientas/alezna.html" },

  // B
  { nombre: "Berbiqui", url: "herramientas/berbiqui.html" },
  { nombre: "Bomba de aire", url: "herramientas/bomba-de-aire.html" },
  { nombre: "Broca", url: "herramientas/broca.html" },
  { nombre: "Biseladora", url: "herramientas/biseladora.html" },
  { nombre: "Buril", url: "herramientas/buril.html" },
  { nombre: "Botador", url: "herramientas/botador.html" },

  // C
  { nombre: "Cinta metrica", url: "herramientas/cinta-metrica.html" },
  { nombre: "Cincel", url: "herramientas/cincel.html" },
  { nombre: "Compresor de aire", url: "herramientas/compresor-de-aire.html" },
  { nombre: "Cortafrios", url: "herramientas/cortafrios.html" },
  { nombre: "Cuter", url: "herramientas/cuter.html" },
  { nombre: "Clavadora", url: "herramientas/clavadora.html" },

  // D
  { nombre: "Destornillador", url: "herramientas/destornillador.html" },
  { nombre: "Dado de impacto", url: "herramientas/dado-de-impacto.html" },
  { nombre: "Decapador termico", url: "herramientas/decapador-termico.html" },
  { nombre: "Detector de cables", url: "herramientas/detector-de-cables.html" },
  { nombre: "Discos de corte", url: "herramientas/discos-de-corte.html" },
  { nombre: "Dobladora de tubos", url: "herramientas/dobladora-de-tubos.html" },

  // E
  { nombre: "Esmeriladora", url: "herramientas/esmeriladora.html" },
  { nombre: "Escuadra de carpintero", url: "herramientas/escuadra-de-carpintero.html" },
  { nombre: "Escofina", url: "herramientas/escofina.html" },
  { nombre: "Espatula", url: "herramientas/espatula.html" },
  { nombre: "Engrapadora manual", url: "herramientas/engrapadora-manual.html" },
  { nombre: "Extractor de tornillos", url: "herramientas/extractor-de-tornillos.html" },

  // F
  { nombre: "Formon", url: "herramientas/formon.html" },
  { nombre: "Fresadora", url: "herramientas/fresadora.html" },
  { nombre: "Flexometro", url: "herramientas/flexometro.html" },
  { nombre: "Filtradora de aceite", url: "herramientas/filtradora-de-aceite.html" },
  { nombre: "Fresa para taladro", url: "herramientas/fresa-para-taladro.html" },
  { nombre: "Fratas", url: "herramientas/fratas.html" },

  // G
  { nombre: "Gato hidraulico", url: "herramientas/gato-hidraulico.html" },
  { nombre: "Grapa industrial", url: "herramientas/grapa-industrial.html" },
  { nombre: "Guantes de trabajo", url: "herramientas/guantes-de-trabajo.html" },
  { nombre: "Gubia", url: "herramientas/gubia.html" },
  { nombre: "Gramil", url: "herramientas/gramil.html" },
  { nombre: "Generador electrico", url: "herramientas/generador-electrico.html" },

  // H
  { nombre: "Hacha", url: "herramientas/hacha.html" },
  { nombre: "Hoe", url: "herramientas/hoe.html" },
  { nombre: "Herramienta rotativa", url: "herramientas/herramienta-rotativa.html" },
  { nombre: "Hormigonera", url: "herramientas/hormigonera.html" },
  { nombre: "Hoja de sierra", url: "herramientas/hoja-de-sierra.html" },
  { nombre: "Hijuela", url: "herramientas/hijuela.html" },

  // I
  { nombre: "Inversor de soldadura", url: "herramientas/inversor-de-soldadura.html" },
  { nombre: "Inyector de grasa", url: "herramientas/inyector-de-grasa.html" },
  { nombre: "Iman telescopico", url: "herramientas/iman-telescopico.html" },
  { nombre: "Inclinometro", url: "herramientas/inclinometro.html" },
  { nombre: "Indicador de caratula", url: "herramientas/indicador-de-caratula.html" },
  { nombre: "Izadora de cable", url: "herramientas/izadora-de-cable.html" },

  // J
  { nombre: "Juego de llaves", url: "herramientas/juego-de-llaves.html" },
  { nombre: "Juego de tubos", url: "herramientas/juego-de-tubos.html" },
  { nombre: "Jeringa de succion", url: "herramientas/jeringa-de-succion.html" },
  { nombre: "Junta universal", url: "herramientas/junta-universal.html" },
  { nombre: "Juego de brocas", url: "herramientas/juego-de-brocas.html" },
  { nombre: "Junta torica extractor", url: "herramientas/junta-torica-extractor.html" },

  // K
  { nombre: "Kit de herramientas", url: "herramientas/kit-de-herramientas.html" },
  { nombre: "Kit de roscado", url: "herramientas/kit-de-roscado.html" },
  { nombre: "Kit de autocentrante", url: "herramientas/kit-de-autocentrante.html" },
  { nombre: "Knipex alicate", url: "herramientas/knipex-alicate.html" },
  { nombre: "Kit de soldado", url: "herramientas/kit-de-soldado.html" },
  { nombre: "Kit de carrocero", url: "herramientas/kit-de-carrocero.html" },

  // L
  { nombre: "Llave inglesa", url: "herramientas/llave-inglesa.html" },
  { nombre: "Llave Allen", url: "herramientas/llave-allen.html" },
  { nombre: "Lijadora", url: "herramientas/lijadora.html" },
  { nombre: "Lima", url: "herramientas/lima.html" },
  { nombre: "Llave fija", url: "herramientas/llave-fija.html" },
  { nombre: "Llave de trinquete", url: "herramientas/llave-de-trinquete.html" },

  // M
  { nombre: "Martillo", url: "herramientas/martillo.html" },
  { nombre: "Maza", url: "herramientas/maza.html" },
  { nombre: "Multimetro", url: "herramientas/multimetro.html" },
  { nombre: "Mini esmeriladora", url: "herramientas/mini-esmeriladora.html" },
  { nombre: "Mortero", url: "herramientas/mortero.html" },
  { nombre: "Manguera de presion", url: "herramientas/manguera-de-presion.html" },

  // N
  { nombre: "Nivel de burbuja", url: "herramientas/nivel-de-burbuja.html" },
  { nombre: "Nivel laser", url: "herramientas/nivel-laser.html" },
  { nombre: "Nibbler electrico", url: "herramientas/nibbler-electrico.html" },
  { nombre: "Nivel torpedo", url: "herramientas/nivel-torpedo.html" },
  { nombre: "Nivel de manguera", url: "herramientas/nivel-de-manguera.html" },
  { nombre: "Nivel de mano", url: "herramientas/nivel-de-mano.html" },

  // O
  { nombre: "Ojaladora", url: "herramientas/ojaladora.html" },
  { nombre: "Olla de presion para pintura", url: "herramientas/olla-de-presion-para-pintura.html" },
  { nombre: "Organizador de herramientas", url: "herramientas/organizador-de-herramientas.html" },
  { nombre: "Opresor de resortes", url: "herramientas/opresor-de-resortes.html" },
  { nombre: "Ojalillos metalicos", url: "herramientas/ojalillos-metalicos.html" },
  { nombre: "Opacimetro", url: "herramientas/opacimetro.html" },

  // P
  { nombre: "Alicate de presion", url: "herramientas/alicate-de-presion.html" },
  { nombre: "Pico", url: "herramientas/pico.html" },
  { nombre: "Pala", url: "herramientas/pala.html" },
  { nombre: "Pistola de calor", url: "herramientas/pistola-de-calor.html" },
  { nombre: "Prensa C", url: "herramientas/prensa-c.html" },
  { nombre: "Pincel", url: "herramientas/pincel.html" },

  // Q
  { nombre: "Quemador de gas", url: "herramientas/quemador-de-gas.html" },
  { nombre: "Quitapinturas termico", url: "herramientas/quitapinturas-termico.html" },
  { nombre: "Quitaesmalte industrial", url: "herramientas/quitaesmalte-industrial.html" },
  { nombre: "Quitarebabas", url: "herramientas/quitarebabas.html" },
  { nombre: "Quitagrapas pesado", url: "herramientas/quitagrapas-pesado.html" },
  { nombre: "Quitamanchas mecanico", url: "herramientas/quitamanchas-mecanico.html" },

  // R
  { nombre: "Remachadora", url: "herramientas/remachadora.html" },
  { nombre: "Rotomartillo", url: "herramientas/rotomartillo.html" },
  { nombre: "Rodillo de pintura", url: "herramientas/rodillo-de-pintura.html" },
  { nombre: "Roscadora", url: "herramientas/roscadora.html" },
  { nombre: "Rastrillo", url: "herramientas/rastrillo.html" },
  { nombre: "Ropa de seguridad", url: "herramientas/ropa-de-seguridad.html" },

  // S
  { nombre: "Sierra circular", url: "herramientas/sierra-circular.html" },
  { nombre: "Sierra de calar", url: "herramientas/sierra-de-calar.html" },
  { nombre: "Soldador de estano", url: "herramientas/soldador-de-estano.html" },
  { nombre: "Sargento", url: "herramientas/sargento.html" },
  { nombre: "Soplador de aire", url: "herramientas/soplador-de-aire.html" },
  { nombre: "Sarten de soldadura", url: "herramientas/sarten-de-soldadura.html" },

  // T
  { nombre: "Taladro", url: "herramientas/taladro.html" },
  { nombre: "Tijera de hojalatero", url: "herramientas/tijera-de-hojalatero.html" },
  { nombre: "Torno", url: "herramientas/torno.html" },
  { nombre: "Tornillo de banco", url: "herramientas/tornillo-de-banco.html" },
  { nombre: "Tarraja", url: "herramientas/tarraja.html" },
  { nombre: "Tenaza", url: "herramientas/tenaza.html" },

  // U
  { nombre: "Uneta de palanca", url: "herramientas/uneta-de-palanca.html" },
  { nombre: "Utilaje de corte", url: "herramientas/utilaje-de-corte.html" },
  { nombre: "Ultrasonido limpiador", url: "herramientas/ultrasonido-limpiador.html" },
  { nombre: "Union rapida neumatica", url: "herramientas/union-rapida-neumatica.html" },
  { nombre: "Unero de mecano", url: "herramientas/unero-de-mecano.html" },
  { nombre: "Unidad de mantenimiento FRL", url: "herramientas/unidad-de-mantenimiento-frl.html" },

  // V
  { nombre: "Vernier", url: "herramientas/vernier.html" },
  { nombre: "Ventosa para cristal", url: "herramientas/ventosa-para-cristal.html" },
  { nombre: "Valvula de presion", url: "herramientas/valvula-de-presion.html" },
  { nombre: "Volvedor de machos", url: "herramientas/volvedor-de-machos.html" },
  { nombre: "Vibrador de concreto", url: "herramientas/vibrador-de-concreto.html" },
  { nombre: "Varilla de soldar", url: "herramientas/varilla-de-soldar.html" },

  // W
  { nombre: "Winche manual", url: "herramientas/winche-manual.html" },
  { nombre: "Wiggle prensa", url: "herramientas/wiggle-prensa.html" },
  { nombre: "Wire stripper", url: "herramientas/wire-stripper.html" },
  { nombre: "Wrench de cadena", url: "herramientas/wrench-de-cadena.html" },
  { nombre: "Wincha metalica", url: "herramientas/wincha-metalica.html" },
  { nombre: "Waterpas", url: "herramientas/waterpas.html" },

  // X
  { nombre: "Xilografo cortador", url: "herramientas/xilografo-cortador.html" },
  { nombre: "Extractor X", url: "herramientas/extractor-x.html" },
  { nombre: "Xilofono comprobador", url: "herramientas/xilofono-comprobador.html" },
  { nombre: "Xeno probador de fugas", url: "herramientas/xeno-probador-de-fugas.html" },
  { nombre: "X-acto bisturi", url: "herramientas/x-acto-bisturi.html" },
  { nombre: "Xenon lampara de tiempo", url: "herramientas/xenon-lampara-de-tiempo.html" },

  // Y
  { nombre: "Yunque", url: "herramientas/yunque.html" },
  { nombre: "Yugo para resortes", url: "herramientas/yugo-para-resortes.html" },
  { nombre: "Yugular para casco", url: "herramientas/yugular-para-casco.html" },
  { nombre: "Yarda de medir", url: "herramientas/yarda-de-medir.html" },
  { nombre: "Yunque de mano", url: "herramientas/yunque-de-mano.html" },
  { nombre: "Yunta tensor", url: "herramientas/yunta-tensor.html" },

  // Z
  { nombre: "Zanjadora", url: "herramientas/zanjadora.html" },
  { nombre: "Zapata de prensado", url: "herramientas/zapata-de-prensado.html" },
  { nombre: "Zuncho de fleje", url: "herramientas/zuncho-de-fleje.html" },
  { nombre: "Zunchadora manual", url: "herramientas/zunchadora-manual.html" },
  { nombre: "Zapatilla de lijado", url: "herramientas/zapatilla-de-lijado.html" },
  { nombre: "Zocalo para dados", url: "herramientas/zocalo-para-dados.html" }
];

function filtrarHerramientas() {
  const inputEl = document.getElementById("miBuscador");
  const lista = document.getElementById("listaResultados");
  
  if (!inputEl || !lista) return;

  const input = inputEl.value.toLowerCase().trim();
  lista.innerHTML = "";

  if (input === "") {
    lista.style.display = "none";
    return;
  }

  const coincidencias = herramientas.filter(item => 
    item.nombre.toLowerCase().includes(input)
  );

  if (coincidencias.length > 0) {
    lista.style.display = "block";
    coincidencias.forEach(item => {
      const li = document.createElement("li");
      li.className = "item-resultado";
      li.textContent = item.nombre;
      
      li.onclick = () => {
        window.location.href = item.url;
      };
      
      lista.appendChild(li);
    });
  } else {
    lista.style.display = "none";
  }
}

// ================= EVENTOS GLOBALES =================
window.addEventListener('resize', () => {
  if (typeof setMainTrackPosition === 'function') setMainTrackPosition(mainIndex, false);
  if (typeof setMiniTrackPosition === 'function') setMiniTrackPosition(miniIndex, false);
});

document.addEventListener("click", function(e) {
  const lista = document.getElementById("listaResultados");
  if (lista && !e.target.closest(".search-box")) {
    lista.style.display = "none";
  }
});