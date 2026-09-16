// Array con la lista de herramientas/páginas a buscar
const herramientas = [
  { "id": 6, "nombre": "Alicate", "url": "alicate.html" },
  { "id": 7, "nombre": "Azada", "url": "azada.html" },
  { "id": 8, "nombre": "Arco de sierra", "url": "arco-de-sierra.html" },
  { "id": 9, "nombre": "Aplanadora manual", "url": "aplanadora-manual.html" },
  { "id": 10, "nombre": "Azadon", "url": "azadon.html" },
  { "id": 11, "nombre": "Alezna", "url": "alezna.html" },
  { "id": 12, "nombre": "Berbiqui", "url": "berbiqui.html" },
  { "id": 13, "nombre": "Bomba de aire", "url": "bomba-de-aire.html" },
  { "id": 14, "nombre": "Broca", "url": "broca.html" },
  { "id": 15, "nombre": "Biseladora", "url": "biseladora.html" },
  { "id": 16, "nombre": "Buril", "url": "buril.html" },
  { "id": 17, "nombre": "Botador", "url": "botador.html" },
  { "id": 18, "nombre": "Cinta metrica", "url": "cinta-metrica.html" },
  { "id": 19, "nombre": "Cincel", "url": "cincel.html" },
  { "id": 20, "nombre": "Compresor de aire", "url": "compresor-de-aire.html" },
  { "id": 21, "nombre": "Cortafrios", "url": "cortafrios.html" },
  { "id": 22, "nombre": "Cuter", "url": "cuter.html" },
  { "id": 23, "nombre": "Clavadora", "url": "clavadora.html" },
  { "id": 24, "nombre": "Destornillador", "url": "destornillador.html" },
  { "id": 25, "nombre": "Dado de impacto", "url": "dado-de-impacto.html" },
  { "id": 26, "nombre": "Decapador termico", "url": "decapador-termico.html" },
  { "id": 27, "nombre": "Detector de cables", "url": "detector-de-cables.html" },
  { "id": 28, "nombre": "Discos de corte", "url": "discos-de-corte.html" },
  { "id": 29, "nombre": "Dobladora de tubos", "url": "dobladora-de-tubos.html" },
  { "id": 30, "nombre": "Esmeriladora", "url": "esmeriladora.html" },
  { "id": 31, "nombre": "Escuadra de carpintero", "url": "escuadra-de-carpintero.html" },
  { "id": 32, "nombre": "Escofina", "url": "escofina.html" },
  { "id": 33, "nombre": "Espatula", "url": "espatula.html" },
  { "id": 34, "nombre": "Engrapadora manual", "url": "engrapadora-manual.html" },
  { "id": 35, "nombre": "Extractor de tornillos", "url": "extractor-de-tornillos.html" },
  { "id": 36, "nombre": "Formon", "url": "formon.html" },
  { "id": 37, "nombre": "Fresadora", "url": "fresadora.html" },
  { "id": 38, "nombre": "Flexometro", "url": "flexometro.html" },
  { "id": 39, "nombre": "Filtradora de aceite", "url": "filtradora-de-aceite.html" },
  { "id": 40, "nombre": "Fresa para taladro", "url": "fresa-para-taladro.html" },
  { "id": 41, "nombre": "Fratas", "url": "fratas.html" },
  { "id": 42, "nombre": "Gato hidraulico", "url": "gato-hidraulico.html" },
  { "id": 43, "nombre": "Grapa industrial", "url": "grapa-industrial.html" },
  { "id": 44, "nombre": "Guantes de trabajo", "url": "guantes-de-trabajo.html" },
  { "id": 45, "nombre": "Gubia", "url": "gubia.html" },
  { "id": 46, "nombre": "Gramil", "url": "gramil.html" },
  { "id": 47, "nombre": "Generador electrico", "url": "generador-electrico.html" },
  { "id": 48, "nombre": "Hacha", "url": "hacha.html" },
  { "id": 49, "nombre": "Hoe", "url": "hoe.html" },
  { "id": 50, "nombre": "Herramienta rotativa", "url": "herramienta-rotativa.html" },
  { "id": 51, "nombre": "Hormigonera", "url": "hormigonera.html" },
  { "id": 52, "nombre": "Hoja de sierra", "url": "hoja-de-sierra.html" },
  { "id": 53, "nombre": "Hijuela", "url": "hijuela.html" },
  { "id": 54, "nombre": "Inversor de soldadura", "url": "inversor-de-soldadura.html" },
  { "id": 55, "nombre": "Inyector de grasa", "url": "inyector-de-grasa.html" },
  { "id": 56, "nombre": "Iman telescopico", "url": "iman-telescopico.html" },
  { "id": 57, "nombre": "Inclinometro", "url": "inclinometro.html" },
  { "id": 58, "nombre": "Indicador de caratula", "url": "indicador-de-caratula.html" },
  { "id": 59, "nombre": "Izadora de cable", "url": "izadora-de-cable.html" },
  { "id": 60, "nombre": "Juego de llaves", "url": "juego-de-llaves.html" },
  { "id": 61, "nombre": "Juego de tubos", "url": "juego-de-tubos.html" },
  { "id": 62, "nombre": "Jeringa de succion", "url": "jeringa-de-succion.html" },
  { "id": 63, "nombre": "Junta universal", "url": "junta-universal.html" },
  { "id": 64, "nombre": "Juego de brocas", "url": "juego-de-brocas.html" },
  { "id": 65, "nombre": "Junta torica extractor", "url": "junta-torica-extractor.html" },
  { "id": 66, "nombre": "Kit de herramientas", "url": "kit-de-herramientas.html" },
  { "id": 67, "nombre": "Kit de roscado", "url": "kit-de-roscado.html" },
  { "id": 68, "nombre": "Kit de autocentrante", "url": "kit-de-autocentrante.html" },
  { "id": 69, "nombre": "Knipex alicate", "url": "knipex-alicate.html" },
  { "id": 70, "nombre": "Kit de soldado", "url": "kit-de-soldado.html" },
  { "id": 71, "nombre": "Kit de carrocero", "url": "kit-de-carrocero.html" },
  { "id": 72, "nombre": "Llave inglesa", "url": "llave-inglesa.html" },
  { "id": 73, "nombre": "Llave Allen", "url": "llave-allen.html" },
  { "id": 74, "nombre": "Lijadora", "url": "lijadora.html" },
  { "id": 75, "nombre": "Lima", "url": "lima.html" },
  { "id": 76, "nombre": "Llave fija", "url": "llave-fija.html" },
  { "id": 77, "nombre": "Llave de trinquete", "url": "llave-de-trinquete.html" },
  { "id": 78, "nombre": "Martillo", "url": "martillo.html" },
  { "id": 79, "nombre": "Maza", "url": "maza.html" },
  { "id": 80, "nombre": "Multimetro", "url": "multimetro.html" },
  { "id": 81, "nombre": "Mini esmeriladora", "url": "mini-esmeriladora.html" },
  { "id": 82, "nombre": "Mortero", "url": "mortero.html" },
  { "id": 83, "nombre": "Manguera de presion", "url": "manguera-de-presion.html" },
  { "id": 84, "nombre": "Nivel de burbuja", "url": "nivel-de-burbuja.html" },
  { "id": 85, "nombre": "Nivel laser", "url": "nivel-laser.html" },
  { "id": 86, "nombre": "Nibbler electrico", "url": "nibbler-electrico.html" },
  { "id": 87, "nombre": "Nivel torpedo", "url": "nivel-torpedo.html" },
  { "id": 88, "nombre": "Nivel de manguera", "url": "nivel-de-manguera.html" },
  { "id": 89, "nombre": "Nivel de mano", "url": "nivel-de-mano.html" },
  { "id": 90, "nombre": "Ojaladora", "url": "ojaladora.html" },
  { "id": 91, "nombre": "Olla de presion para pintura", "url": "olla-de-presion-para-pintura.html" },
  { "id": 92, "nombre": "Organizador de herramientas", "url": "organizador-de-herramientas.html" },
  { "id": 93, "nombre": "Opresor de resortes", "url": "opresor-de-resortes.html" },
  { "id": 94, "nombre": "Ojalillos metalicos", "url": "ojalillos-metalicos.html" },
  { "id": 95, "nombre": "Opacimetro", "url": "opacimetro.html" },
  { "id": 96, "nombre": "Alicate de presion", "url": "alicate-de-presion.html" },
  { "id": 97, "nombre": "Pico", "url": "pico.html" },
  { "id": 98, "nombre": "Pala", "url": "pala.html" },
  { "id": 99, "nombre": "Pistola de calor", "url": "pistola-de-calor.html" },
  { "id": 100, "nombre": "Prensa C", "url": "prensa-c.html" },
  { "id": 101, "nombre": "Pincel", "url": "pincel.html" },
  { "id": 102, "nombre": "Quemador de gas", "url": "quemador-de-gas.html" },
  { "id": 103, "nombre": "Quitapinturas termico", "url": "quitapinturas-termico.html" },
  { "id": 104, "nombre": "Quitaesmalte industrial", "url": "quitaesmalte-industrial.html" },
  { "id": 105, "nombre": "Quitarebabas", "url": "quitarebabas.html" },
  { "id": 106, "nombre": "Quitagrapas pesado", "url": "quitagrapas-pesado.html" },
  { "id": 107, "nombre": "Quitamanchas mecanico", "url": "quitamanchas-mecanico.html" },
  { "id": 108, "nombre": "Remachadora", "url": "remachadora.html" },
  { "id": 109, "nombre": "Rotomartillo", "url": "rotomartillo.html" },
  { "id": 110, "nombre": "Rodillo de pintura", "url": "rodillo-de-pintura.html" },
  { "id": 111, "nombre": "Roscadora", "url": "roscadora.html" },
  { "id": 112, "nombre": "Rastrillo", "url": "rastrillo.html" },
  { "id": 113, "nombre": "Ropa de seguridad", "url": "ropa-de-seguridad.html" },
  { "id": 114, "nombre": "Sierra circular", "url": "sierra-circular.html" },
  { "id": 115, "nombre": "Sierra de calar", "url": "sierra-de-calar.html" },
  { "id": 116, "nombre": "Soldador de estano", "url": "soldador-de-estano.html" },
  { "id": 117, "nombre": "Sargento", "url": "sargento.html" },
  { "id": 118, "nombre": "Soplador de aire", "url": "soplador-de-aire.html" },
  { "id": 119, "nombre": "Sarten de soldadura", "url": "sarten-de-soldadura.html" },
  { "id": 120, "nombre": "Taladro", "url": "taladro.html" },
  { "id": 121, "nombre": "Tijera de hojalatero", "url": "tijera-de-hojalatero.html" },
  { "id": 122, "nombre": "Torno", "url": "torno.html" },
  { "id": 123, "nombre": "Tornillo de banco", "url": "tornillo-de-banco.html" },
  { "id": 124, "nombre": "Tarraja", "url": "tarraja.html" },
  { "id": 125, "nombre": "Tenaza", "url": "tenaza.html" },
  { "id": 126, "nombre": "Uneta de palanca", "url": "uneta-de-palanca.html" },
  { "id": 127, "nombre": "Utilaje de corte", "url": "utilaje-de-corte.html" },
  { "id": 128, "nombre": "Ultrasonido limpiador", "url": "ultrasonido-limpiador.html" },
  { "id": 129, "nombre": "Union rapida neumatica", "url": "union-rapida-neumatica.html" },
  { "id": 130, "nombre": "Unero de mecano", "url": "unero-de-mecano.html" },
  { "id": 131, "nombre": "Unidad de mantenimiento FRL", "url": "unidad-de-mantenimiento-frl.html" },
  { "id": 132, "nombre": "Vernier", "url": "vernier.html" },
  { "id": 133, "nombre": "Ventosa para cristal", "url": "ventosa-para-cristal.html" },
  { "id": 134, "nombre": "Valvula de presion", "url": "valvula-de-presion.html" },
  { "id": 135, "nombre": "Volvedor de machos", "url": "volvedor-de-machos.html" },
  { "id": 136, "nombre": "Vibrador de concreto", "url": "vibrador-de-concreto.html" },
  { "id": 137, "nombre": "Varilla de soldar", "url": "varilla-de-soldar.html" },
  { "id": 138, "nombre": "Winche manual", "url": "winche-manual.html" },
  { "id": 139, "nombre": "Wiggle prensa", "url": "wiggle-prensa.html" },
  { "id": 140, "nombre": "Wire stripper", "url": "wire-stripper.html" },
  { "id": 141, "nombre": "Wrench de cadena", "url": "wrench-de-cadena.html" },
  { "id": 142, "nombre": "Wincha metalica", "url": "wincha-metalica.html" },
  { "id": 143, "nombre": "Waterpas", "url": "waterpas.html" },
  { "id": 144, "nombre": "Xilografo cortador", "url": "xilografo-cortador.html" },
  { "id": 145, "nombre": "Extractor X", "url": "extractor-x.html" },
  { "id": 146, "nombre": "Xilofono comprobador", "url": "xilofono-comprobador.html" },
  { "id": 147, "nombre": "Xeno probador de fugas", "url": "xeno-probador-de-fugas.html" },
  { "id": 148, "nombre": "X-acto bisturi", "url": "x-acto-bisturi.html" },
  { "id": 149, "nombre": "Xenon lampara de tiempo", "url": "xenon-lampara-de-tiempo.html" },
  { "id": 150, "nombre": "Yunque", "url": "yunque.html" },
  { "id": 151, "nombre": "Yugo para resortes", "url": "yugo-para-resortes.html" },
  { "id": 152, "nombre": "Yugular para casco", "url": "yugular-para-casco.html" },
  { "id": 153, "nombre": "Yarda de medir", "url": "yarda-de-medir.html" },
  { "id": 154, "nombre": "Yunque de mano", "url": "yunque-de-mano.html" },
  { "id": 155, "nombre": "Yunta tensor", "url": "yunta-tensor.html" },
  { "id": 156, "nombre": "Zanjadora", "url": "zanjadora.html" },
  { "id": 157, "nombre": "Zapata de prensado", "url": "zapata-de-prensado.html" },
  { "id": 158, "nombre": "Zuncho de fleje", "url": "zuncho-de-fleje.html" },
  { "id": 159, "nombre": "Zunchadora manual", "url": "zunchadora-manual.html" },
  { "id": 160, "nombre": "Zapatilla de lijado", "url": "zapatilla-de-lijado.html" },
  { "id": 161, "nombre": "Zocalo para dados", "url": "zocalo-para-dados.html" }
];

// Función para filtrar y mostrar los resultados en tiempo real
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

// Conectar el buscador al escribir y ocultar la lista si se hace clic fuera
document.addEventListener("DOMContentLoaded", () => {
  const inputEl = document.getElementById("miBuscador");
  if (inputEl) {
    inputEl.addEventListener("input", filtrarHerramientas);
  }
});

document.addEventListener("click", function (e) {
  const buscador = document.querySelector(".search-box");
  const lista = document.getElementById("listaResultados");

  if (buscador && lista && !buscador.contains(e.target)) {
    lista.style.display = "none";
  }
});