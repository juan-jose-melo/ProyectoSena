// ==========================================================================
// GINE - SCRIPT PRINCIPAL OPTIMIZADO COMPLETO
// ==========================================================================

// --- ANIMACIÓN REVEAL EN SCROLL ---
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll('.fade-in-section');
  const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -30px 0px" };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => appearOnScroll.observe(fader));
});

// --- MENÚ DESPLEGABLE HAMBURGUESA CORREGIDO PARA TÁCTIL ---
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector('.menu-btn');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (menuBtn && dropdownMenu) {
    const toggleMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
    };

    menuBtn.addEventListener('click', toggleMenu);

    document.addEventListener('click', (e) => {
      if (!dropdownMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        dropdownMenu.classList.remove('show');
      }
    });
  }
});

// ================= SLIDER PRINCIPAL PROMOCIONAL =================
const track = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

let mainIndex = 1; 
let isMainTransitioning = false;
let totalMainOriginals = 0;
let allMainSlides = [];
let mainAutoSlideInterval = null;

function startMainAutoSlide() {
  if (mainAutoSlideInterval) clearInterval(mainAutoSlideInterval);
  mainAutoSlideInterval = setInterval(() => {
    if (typeof moveMainSlide === 'function') moveMainSlide(mainIndex + 1);
  }, 4500);
}

function resetMainAutoSlide() {
  clearInterval(mainAutoSlideInterval);
  startMainAutoSlide();
}

if (track && prevBtn && nextBtn && dotsContainer) {
  const mainOriginals = Array.from(track.querySelectorAll('.slide'));
  totalMainOriginals = mainOriginals.length;

  if (totalMainOriginals > 0) {
    const mainFirstClone = mainOriginals[0].cloneNode(true);
    const mainLastClone = mainOriginals[totalMainOriginals - 1].cloneNode(true);

    mainFirstClone.classList.add('clone');
    mainLastClone.classList.add('clone');

    track.appendChild(mainFirstClone);
    track.insertBefore(mainLastClone, mainOriginals[0]);

    allMainSlides = Array.from(track.querySelectorAll('.slide'));

    function setMainTrackPosition(index, animate = true) {
      if (!allMainSlides[index]) return;
      
      const slideWidth = allMainSlides[index].getBoundingClientRect().width;
      const viewportWidth = track.parentElement.getBoundingClientRect().width;
      const gap = window.innerWidth <= 768 ? 10 : 20;
      const offset = (viewportWidth - slideWidth) / 2;
    
      track.style.transition = animate ? 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
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

    const handleNext = (e) => {
      e.preventDefault();
      e.stopPropagation();
      moveMainSlide(mainIndex + 1);
      resetMainAutoSlide();
    };

    const handlePrev = (e) => {
      e.preventDefault();
      e.stopPropagation();
      moveMainSlide(mainIndex - 1);
      resetMainAutoSlide();
    };

    nextBtn.addEventListener('click', handleNext);
    prevBtn.addEventListener('click', handlePrev);

    track.parentElement.addEventListener('mouseenter', () => clearInterval(mainAutoSlideInterval));
    track.parentElement.addEventListener('mouseleave', () => startMainAutoSlide());

    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        moveMainSlide(index + 1);
        resetMainAutoSlide();
      });
    });

    setTimeout(() => {
      setMainTrackPosition(mainIndex, false);
      startMainAutoSlide();
    }, 100);
  }
}

// ================= MINI SLIDER DE HERRAMIENTAS =================
const miniTrack = document.getElementById('miniSliderTrack');
const miniPrevBtn = document.getElementById('miniPrevBtn');
const miniNextBtn = document.getElementById('miniNextBtn');

let miniIndex = 5;
let isMiniTransitioning = false;
let totalMiniOriginals = 0;
let visibleCount = 5;
let miniAutoSlideInterval = null;

function startMiniAutoSlide() {
  if (miniAutoSlideInterval) clearInterval(miniAutoSlideInterval);
  miniAutoSlideInterval = setInterval(() => {
    if (typeof moveMiniSlide === 'function') moveMiniSlide(miniIndex + 1);
  }, 5000);
}

function resetMiniAutoSlide() {
  clearInterval(miniAutoSlideInterval);
  startMiniAutoSlide();
}

if (miniTrack && miniPrevBtn && miniNextBtn) {
  const miniOriginals = Array.from(miniTrack.querySelectorAll('.mini-box'));
  totalMiniOriginals = miniOriginals.length;

  if (totalMiniOriginals > 0) {
    for (let i = 0; i < visibleCount; i++) {
      const cloneAppend = miniOriginals[i % totalMiniOriginals].cloneNode(true);
      const clonePrepend = miniOriginals[(totalMiniOriginals - 1 - i + totalMiniOriginals) % totalMiniOriginals].cloneNode(true);
      miniTrack.appendChild(cloneAppend);
      miniTrack.insertBefore(clonePrepend, miniTrack.firstChild);
    }

    const allMiniSlides = Array.from(miniTrack.querySelectorAll('.mini-box'));

    function getMiniBoxWidth() {
      const boxWidth = allMiniSlides[0].getBoundingClientRect().width;
      const gap = window.innerWidth <= 768 ? 10 : 12;
      return boxWidth + gap;
    }

    function setMiniTrackPosition(index, animate = true) {
      const step = getMiniBoxWidth();
      miniTrack.style.transition = animate ? 'transform 0.45s ease-in-out' : 'none';
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

    miniTrack.parentElement.addEventListener('mouseenter', () => clearInterval(miniAutoSlideInterval));
    miniTrack.parentElement.addEventListener('mouseleave', () => startMiniAutoSlide());

    const handleMiniNext = (e) => {
      e.preventDefault();
      e.stopPropagation();
      moveMiniSlide(miniIndex + 1);
      resetMiniAutoSlide();
    };

    const handleMiniPrev = (e) => {
      e.preventDefault();
      e.stopPropagation();
      moveMiniSlide(miniIndex - 1);
      resetMiniAutoSlide();
    };

    miniNextBtn.addEventListener('click', handleMiniNext);
    miniPrevBtn.addEventListener('click', handleMiniPrev);

    setTimeout(() => {
      setMiniTrackPosition(miniIndex, false);
      startMiniAutoSlide();
    }, 100);
  }
}

// ================= BUSCADOR DE HERRAMIENTAS CORREGIDO =================
const herramientas = [
  { id: 6, nombre: "Alicate", url: "alicate.html" },
  { id: 7, nombre: "Azada", url: "azada.html" },
  { id: 8, nombre: "Arco de sierra", url: "arco-de-sierra.html" },
  { id: 9, nombre: "Aplanadora manual", url: "aplanadora-manual.html" },
  { id: 10, nombre: "Azadon", url: "azadon.html" },
  { id: 11, nombre: "Alezna", url: "alezna.html" },
  { id: 12, nombre: "Berbiqui", url: "berbiqui.html" },
  { id: 13, nombre: "Bomba de aire manual", url: "bomba-de-aire-manual.html" },
  { id: 14, nombre: "Broca", url: "broca.html" },
  { id: 15, nombre: "Biseladora", url: "biseladora.html" },
  { id: 16, nombre: "Buril", url: "buril.html" },
  { id: 17, nombre: "Botador", url: "botador.html" },
  { id: 18, nombre: "Cinta metrica", url: "cinta-metrica.html" },
  { id: 19, nombre: "Cincel", url: "cincel.html" },
  { id: 20, nombre: "Compresor de aire", url: "compresor-de-aire.html" },
  { id: 21, nombre: "Cortafrios", url: "cortafrios.html" },
  { id: 22, nombre: "Cuter", url: "cuter.html" },
  { id: 23, nombre: "Clavadora", url: "clavadora.html" },
  { id: 24, nombre: "Destornillador", url: "destornillador.html" },
  { id: 25, nombre: "Dado de impacto", url: "dado-de-impacto.html" },
  { id: 26, nombre: "Decapador termico", url: "decapador-termico.html" },
  { id: 27, nombre: "Detector de cables", url: "detector-de-cables.html" },
  { id: 28, nombre: "Discos de corte", url: "discos-de-corte.html" },
  { id: 29, nombre: "Dobladora de tubos", url: "dobladora-de-tubos.html" },
  { id: 30, nombre: "Esmeriladora", url: "esmeriladora.html" },
  { id: 31, nombre: "Escuadra de carpintero", url: "escuadra-de-carpintero.html" },
  { id: 32, nombre: "Escofina", url: "escofina.html" },
  { id: 33, nombre: "Espatula", url: "espatula.html" },
  { id: 34, nombre: "Engrapadora manual", url: "engrapadora-manual.html" },
  { id: 35, nombre: "Extractor de tornillos", url: "extractor-de-tornillos.html" },
  { id: 36, nombre: "Formon", url: "formon.html" },
  { id: 37, nombre: "Fresadora", url: "fresadora.html" },
  { id: 38, nombre: "Flexometro", url: "flexometro.html" },
  { id: 39, nombre: "Filtradora de aceite", url: "filtradora-de-aceite.html" },
  { id: 40, nombre: "Fresa para taladro", url: "fresa-para-taladro.html" },
  { id: 41, nombre: "Fratas", url: "fratas.html" },
  { id: 42, nombre: "Gato hidraulico", url: "gato-hidraulico.html" },
  { id: 43, nombre: "Grapa industrial", url: "grapa-industrial.html" },
  { id: 44, nombre: "Guantes de trabajo", url: "guantes-de-trabajo.html" },
  { id: 45, nombre: "Gubia", url: "gubia.html" },
  { id: 46, nombre: "Gramil", url: "gramil.html" },
  { id: 47, nombre: "Generador electrico", url: "generador-electrico.html" },
  { id: 48, nombre: "Hacha", url: "hacha.html" },
  { id: 49, nombre: "Hoe", url: "hoe.html" },
  { id: 50, nombre: "Herramienta rotativa", url: "herramienta-rotativa.html" },
  { id: 51, nombre: "Hormigonera", url: "hormigonera.html" },
  { id: 52, nombre: "Hoja de sierra", url: "hoja-de-sierra.html" },
  { id: 53, nombre: "Hijuela", url: "hijuela.html" },
  { id: 54, nombre: "Inversor de soldadura", url: "inversor-de-soldadura.html" },
  { id: 55, nombre: "Inyector de grasa", url: "inyector-de-grasa.html" },
  { id: 56, nombre: "Iman telescopico", url: "iman-telescopico.html" },
  { id: 57, nombre: "Inclinometro", url: "inclinometro.html" },
  { id: 58, nombre: "Indicador de caratula", url: "indicador-de-caratula.html" },
  { id: 59, nombre: "Izadora de cable", url: "izadora-de-cable.html" },
  { id: 60, nombre: "Juego de llaves", url: "juego-de-llaves.html" },
  { id: 61, nombre: "Juego de tubos", url: "juego-de-tubos.html" },
  { id: 62, nombre: "Jeringa de succion", url: "jeringa-de-succion.html" },
  { id: 63, nombre: "Junta universal", url: "junta-universal.html" },
  { id: 64, nombre: "Juego de brocas", url: "juego-de-brocas.html" },
  { id: 65, nombre: "Junta torica extractor", url: "junta-torica-extractor.html" },
  { id: 66, nombre: "Kit de herramientas", url: "kit-de-herramientas.html" },
  { id: 67, nombre: "Kit de roscado", url: "kit-de-roscado.html" },
  { id: 68, nombre: "Kit de autocentrante", url: "kit-de-autocentrante.html" },
  { id: 69, nombre: "Knipex alicate", url: "knipex-alicate.html" },
  { id: 70, nombre: "Kit de soldadadura electrica", url: "kit-de-soldadura-electrica.html" },
  { id: 71, nombre: "Kit de carrocero", url: "kit-de-carrocero.html" },
  { id: 72, nombre: "Llave inglesa", url: "llave-inglesa.html" },
  { id: 73, nombre: "Llave Allen", url: "llave-allen.html" },
  { id: 74, nombre: "Lijadora", url: "lijadora.html" },
  { id: 75, nombre: "Lima mecanica", url: "lima-mecanica.html" },
  { id: 76, nombre: "Llave fija", url: "llave-fija.html" },
  { id: 77, nombre: "Llave de trinquete", url: "llave-de-trinquete.html" },
  { id: 78, nombre: "Martillo de peña", url: "martillo-de-peña.html" },
  { id: 79, nombre: "Maza", url: "maza.html" },
  { id: 80, nombre: "Multimetro", url: "multimetro.html" },
  { id: 81, nombre: "Mini esmeriladora", url: "mini-esmeriladora.html" },
  { id: 82, nombre: "Mortero", url: "mortero.html" },
  { id: 83, nombre: "Manguera de presion", url: "manguera-de-presion.html" },
  { id: 84, nombre: "Nivel de burbuja", url: "nivel-de-burbuja.html" },
  { id: 85, nombre: "Nivel laser", url: "nivel-laser.html" },
  { id: 86, nombre: "Nibbler electrico", url: "nibbler-electrico.html" },
  { id: 87, nombre: "Nivel torpedo", url: "nivel-torpedo.html" },
  { id: 88, nombre: "Nivel de manguera", url: "nivel-de-manguera.html" },
  { id: 89, nombre: "Nivel de mano", url: "nivel-de-mano.html" },
  { id: 90, nombre: "Ojaladora", url: "ojaladora.html" },
  { id: 91, nombre: "Olla de presion para pintura", url: "olla-de-presion-para-pintura.html" },
  { id: 92, nombre: "Organizador de herramientas", url: "organizador-de-herramientas.html" },
  { id: 93, nombre: "Opresor de resortes", url: "opresor-de-resortes.html" },
  { id: 94, nombre: "Ojalillos metalicos", url: "ojalillos-metalicos.html" },
  { id: 95, nombre: "Opacimetro", url: "opacimetro.html" },
  { id: 96, nombre: "Alicate de presion", url: "alicate-de-presion.html" },
  { id: 97, nombre: "Pico", url: "pico.html" },
  { id: 98, nombre: "Pala", url: "pala.html" },
  { id: 99, nombre: "Pistola de calor", url: "pistola-de-calor.html" },
  { id: 100, nombre: "Prensa C", url: "prensa-c.html" },
  { id: 101, nombre: "Pincel", url: "pincel.html" },
  { id: 102, nombre: "Quemador de gas", url: "quemador-de-gas.html" },
  { id: 103, nombre: "Quitapinturas termico", url: "quitapinturas-termico.html" },
  { id: 104, nombre: "Quitaesmalte industrial", url: "quitaesmalte-industrial.html" },
  { id: 105, nombre: "Quitarebabas", url: "quitarebabas.html" },
  { id: 106, nombre: "Quitagrapas pesado", url: "quitagrapas-pesado.html" },
  { id: 107, nombre: "Quitamanchas mecanico", url: "quitamanchas-mecanico.html" },
  { id: 108, nombre: "Remachadora", url: "remachadora.html" },
  { id: 109, nombre: "Rotomartillo", url: "rotomartillo.html" },
  { id: 110, nombre: "Rodillo de pintura", url: "rodillo-de-pintura.html" },
  { id: 111, nombre: "Roscadora", url: "roscadora.html" },
  { id: 112, nombre: "Rastrillo", url: "rastrillo.html" },
  { id: 113, nombre: "Ropa de seguridad", url: "ropa-de-seguridad.html" },
  { id: 114, nombre: "Sierra circular", url: "sierra-circular.html" },
  { id: 115, nombre: "Sierra de calar", url: "sierra-de-calar.html" },
  { id: 116, nombre: "Soldador de estano", url: "soldador-de-estano.html" },
  { id: 117, nombre: "Sargento", url: "sargento.html" },
  { id: 118, nombre: "Soplador de aire", url: "soplador-de-aire.html" },
  { id: 119, nombre: "Sarten de soldadura", url: "sarten-de-soldadura.html" },
  { id: 120, nombre: "Taladro", url: "taladro.html" },
  { id: 121, nombre: "Tijera de hojalatero", url: "tijera-de-hojalatero.html" },
  { id: 122, nombre: "Torno", url: "torno.html" },
  { id: 123, nombre: "Tornillo de banco", url: "tornillo-de-banco.html" },
  { id: 124, nombre: "Tarraja", url: "tarraja.html" },
  { id: 125, nombre: "Tenaza", url: "tenaza.html" },
  { id: 126, nombre: "Uneta de palanca", url: "uneta-de-palanca.html" },
  { id: 127, nombre: "Utilaje de corte", url: "utilaje-de-corte.html" },
  { id: 128, nombre: "Ultrasonido limpiador", url: "ultrasonido-limpiador.html" },
  { id: 129, nombre: "Union rapida neumatica", url: "union-rapida-neumatica.html" },
  { id: 130, nombre: "Unero de mecano", url: "unero-de-mecano.html" },
  { id: 131, nombre: "Unidad de mantenimiento FRL", url: "unidad-de-mantenimiento-frl.html" },
  { id: 132, nombre: "Vernier", url: "vernier.html" },
  { id: 133, nombre: "Ventosa para cristal", url: "ventosa-para-cristal.html" },
  { id: 134, nombre: "Valvula de presion", url: "valvula-de-presion.html" },
  { id: 135, nombre: "Volvedor de machos", url: "volvedor-de-machos.html" },
  { id: 136, nombre: "Vibrador de concreto", url: "vibrador-de-concreto.html" },
  { id: 137, nombre: "Varilla de soldar", url: "varilla-de-soldar.html" },
  { id: 138, nombre: "Winche manual", url: "winche-manual.html" },
  { id: 139, nombre: "Wiggle prensa", url: "wiggle-prensa.html" },
  { id: 140, nombre: "Wire stripper", url: "wire-stripper.html" },
  { id: 141, nombre: "Wrench de cadena", url: "wrench-de-cadena.html" },
  { id: 142, nombre: "Wincha metalica", url: "wincha-metalica.html" },
  { id: 143, nombre: "Waterpas", url: "waterpas.html" },
  { id: 144, nombre: "Xilografo cortador", url: "xilografo-cortador.html" },
  { id: 145, nombre: "Extractor X", url: "extractor-x.html" },
  { id: 146, nombre: "Xilofono comprobador", url: "xilofono-comprobador.html" },
  { id: 147, nombre: "Xeno probador de fugas", url: "xeno-probador-de-fugas.html" },
  { id: 148, nombre: "X-acto bisturi", url: "x-acto-bisturi.html" },
  { id: 149, nombre: "Xenon lampara de tiempo", url: "xenon-lampara-de-tiempo.html" },
  { id: 150, nombre: "Yunque", url: "yunque.html" },
  { id: 151, nombre: "Yugo para resortes", url: "yugo-para-resortes.html" },
  { id: 152, nombre: "Yugular para casco", url: "yugular-para-casco.html" },
  { id: 153, nombre: "Yarda de medir", url: "yarda-de-medir.html" },
  { id: 154, nombre: "Yunque de mano", url: "yunque-de-mano.html" },
  { id: 155, nombre: "Yunta tensor", url: "yunta-tensor.html" },
  { id: 156, nombre: "Zanjadora", url: "zanjadora.html" },
  { id: 157, nombre: "Zapata de prensado", url: "zapata-de-prensado.html" },
  { id: 158, nombre: "Zuncho de fleje", url: "zuncho-de-fleje.html" },
  { id: 159, nombre: "Zunchadora manual", url: "zunchadora-manual.html" },
  { id: 160, nombre: "Zapatilla de lijado", url: "zapatilla-de-lijado.html" },
  { id: 161, nombre: "Zocalo para dados", url: "zocalo-para-dados.html" },
  { id: 162, nombre: "Caja herraminetas pro", url: "cajaherramientas-pro.html" },
  { id: 163, nombre: "Compresor de aire 24L", url: "compresor-de-aire24l.html" },
  { id: 164, nombre: "Cortadora de ceramica", url: "cortadora-de-ceramica.html" },
  { id: 165, nombre: "hidrolavadora ELITE", url: "hidrolavadora-electrica.html" },
  { id: 166, nombre: "Juego de llaves metricas", url: "juegollaves-metrica.html" },
  { id: 167, nombre: "Lijadora orbital", url: "lijadora-orbital.html" }
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
    const enCarpetaHerramientas = window.location.pathname.includes("/herramientas/");

    coincidencias.forEach(item => {
      const li = document.createElement("li");
      li.className = "item-resultado";

      const a = document.createElement("a");
      a.textContent = item.nombre;
      a.style.display = "block";
      a.style.textDecoration = "none";
      a.style.color = "inherit";

      let rutaDestino = enCarpetaHerramientas ? item.url : "herramientas/" + item.url;

      a.href = rutaDestino;
      li.appendChild(a);
      lista.appendChild(li);
    });
  } else {
    lista.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const inputEl = document.getElementById("miBuscador");
  if (inputEl) {
    inputEl.addEventListener("input", filtrarHerramientas);
  }
});

// ================= MENÚ DESPLEGABLE DE USUARIO (HEADER) =================
document.addEventListener("DOMContentLoaded", () => {
  const activeUser = localStorage.getItem("activeUser");
  const userNavLinks = document.querySelectorAll(".nav-item");
  let userLink = null;

  userNavLinks.forEach(link => {
    if (link.innerText.includes("Inicia sesión") || link.innerText.includes("Hola,")) {
      userLink = link;
    }
  });

  if (userLink) {
    if (activeUser) {
      const userMenuWrapper = document.createElement("div");
      userMenuWrapper.className = "user-dropdown-wrapper";

      userMenuWrapper.innerHTML = `
        <button class="nav-item user-btn-toggle" type="button">
          <span class="nav-icon">👤</span> Hola, <strong>${activeUser}</strong> <span class="arrow-user">▾</span>
        </button>
        <ul class="user-dropdown-menu">
          <li><a href="registro.html">➕ Regístrate</a></li>
          <li><a href="iniciarseccion.html">🔄 Agregar cuenta nueva</a></li>
          <li class="divider-user-menu"></li>
          <li><a href="#" id="cerrarSesionHeader">🚪 Cerrar Sesión</a></li>
        </ul>
      `;

      userLink.parentNode.replaceChild(userMenuWrapper, userLink);

      const toggleBtn = userMenuWrapper.querySelector(".user-btn-toggle");
      const dropdownMenu = userMenuWrapper.querySelector(".user-dropdown-menu");

      toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle("show");
      });

      window.addEventListener("click", (e) => {
        if (!userMenuWrapper.contains(e.target)) {
          dropdownMenu.classList.remove("show");
        }
      });

      const logoutItem = userMenuWrapper.querySelector("#cerrarSesionHeader");
      if (logoutItem) {
        logoutItem.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("activeUser");
          window.location.reload();
        });
      }

    } else {
      userLink.innerHTML = `<span class="nav-icon">👤</span> Inicia sesión ▾`;
      userLink.href = "iniciarseccion.html";
    }
  }
});

// ================= EVENTOS GLOBALES DE REAJUSTE =================
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