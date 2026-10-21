const GINE_URL = 'https://juan-jose-melo.github.io/ProyectoSena/index.html';
const products = [
 {id:1,name:'Taladro percutor 20V',category:'herramientas',tag:'PARA CONSTRUIR',emoji:'🔩',image:'../menu/taladro.png',description:'Potencia y precisión para perforaciones y montajes.',price:'$89.900',tone:'sand'},
 {id:2,name:'Kit de pintura impermeable',category:'hogar',tag:'RENUEVA TU ESPACIO',emoji:'🎨',description:'Una forma práctica de dar nueva vida a tus paredes.',price:'$45.000',tone:'peach'},
 {id:3,name:'Sierra circular industrial',category:'herramientas',tag:'CORTE PRECISO',emoji:'🪚',image:'../menu/sierracircular.webp',description:'Una aliada para tus trabajos de corte y carpintería.',price:'$125.000',tone:'mint'},
 {id:4,name:'Porcelanato estilo Carrara',category:'acabados',tag:'DETALLES QUE INSPIRAN',emoji:'◫',description:'Un acabado elegante para transformar tus ambientes.',price:'$38.000',tone:'stone'},
 {id:5,name:'Lijadora eléctrica',category:'herramientas',tag:'ACABADOS FINOS',emoji:'🪛',image:'../menu/lijadora.webp',description:'Un acabado uniforme para mejorar tus proyectos.',price:'$18.500',tone:'yellow'},
 {id:6,name:'Lámpara estilo industrial',category:'acabados',tag:'DALE TU ESTILO',emoji:'💡',description:'Iluminación con personalidad para tus espacios.',price:'$52.000',tone:'lavender'}
];
let activeFilter='todos'; let selection=[]; let toastTimer;
const $=s=>document.querySelector(s); const $$=s=>document.querySelectorAll(s);
function renderProducts(){const query=$('#searchInput').value.trim().toLocaleLowerCase('es');const list=products.filter(p=>(activeFilter==='todos'||p.category===activeFilter)&&`${p.name} ${p.description} ${p.tag}`.toLocaleLowerCase('es').includes(query));$('#productsGrid').innerHTML=list.map((p,i)=>`<article class="product-card" style="--delay:${i*65}ms"><div class="product-visual ${p.tone}"><span class="product-tag">${p.tag}</span>${p.image?`<img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy">`:`<span class="product-emoji" aria-hidden="true">${p.emoji}</span>`}<span class="visual-index">0${p.id}</span><button class="quick-add" data-add="${p.id}" aria-label="Añadir ${p.name}" title="Añadir a mi selección">＋</button></div><div class="product-info"><div class="product-category">${p.category==='herramientas'?'HERRAMIENTAS':p.category==='hogar'?'HOGAR Y REPARACIÓN':'ACABADOS'}</div><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><strong>${p.price}</strong><button class="add-button" data-add="${p.id}">Me interesa <span>↗</span></button></div></div></article>`).join('');$('#productTotal').textContent=String(list.length).padStart(2,'0');$('#emptyState').hidden=list.length!==0;$('#productsGrid').hidden=list.length===0;}
function showToast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2400)}
function addProduct(id){const p=products.find(x=>x.id===Number(id));if(!p)return;selection.push(p);updateDrawer();showToast(`${p.name} añadido a tu selección`);const count=$('#cartCount');count.classList.remove('bump');void count.offsetWidth;count.classList.add('bump')}
function removeProduct(index){selection.splice(index,1);updateDrawer()}
function updateDrawer(){const count=selection.length;$('#cartCount').textContent=count;$('#drawerCount').textContent=`(${count})`;$('#drawerItems').innerHTML=selection.map((p,i)=>`<div class="drawer-item"><span class="drawer-item-emoji">${p.emoji}</span><div><strong>${p.name}</strong><small>${p.price}</small></div><button data-remove="${i}" aria-label="Quitar ${p.name}">×</button></div>`).join('');$('#drawerHint').textContent=count?`Tienes ${count} producto${count===1?'':'s'} en tu lista. Los precios son referenciales.`:'Aún no has añadido productos.';}
function openDrawer(){document.body.classList.add('drawer-open');$('#selectionDrawer').setAttribute('aria-hidden','false');$('#closeCart').focus()}
function closeDrawer(){document.body.classList.remove('drawer-open');$('#selectionDrawer').setAttribute('aria-hidden','true')}
function setFilter(filter){activeFilter=filter;$$('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===filter));renderProducts();$('#catalogo').scrollIntoView({behavior:'smooth',block:'start'})}
document.addEventListener('click',e=>{const add=e.target.closest('[data-add]');if(add){addProduct(add.dataset.add);return}const remove=e.target.closest('[data-remove]');if(remove){removeProduct(Number(remove.dataset.remove));return}const filter=e.target.closest('[data-filter]');if(filter){activeFilter=filter.dataset.filter;$$('.filter').forEach(b=>b.classList.toggle('active',b===filter));renderProducts();return}const idea=e.target.closest('[data-idea]');if(idea){activeFilter=idea.dataset.idea;$$('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===activeFilter));renderProducts();$('#catalogo').scrollIntoView({behavior:'smooth'});showToast('Catálogo adaptado a tu idea');}});
$('#searchInput').addEventListener('input',renderProducts);$('#resetSearch').addEventListener('click',()=>{$('#searchInput').value='';activeFilter='todos';$$('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter==='todos'));renderProducts()});$('#openCart').addEventListener('click',openDrawer);$('#closeCart').addEventListener('click',closeDrawer);$('#drawerBackdrop').addEventListener('click',closeDrawer);$('#mobileMenu').addEventListener('click',()=>{$('.main-nav').classList.toggle('nav-open');$('#mobileMenu').textContent=$('.main-nav').classList.contains('nav-open')?'✕':'☰'});$$('.main-nav a').forEach(a=>a.addEventListener('click',()=>$('.main-nav').classList.remove('nav-open')));const depthSlides=Array.from(document.querySelectorAll('.depth-slide'));let depthIndex=0;let depthTimer;function paintDepth(){depthSlides.forEach((slide,i)=>{let d=(i-depthIndex+depthSlides.length)%depthSlides.length;if(d>depthSlides.length/2)d-=depthSlides.length;slide.style.setProperty('--depth',d);slide.classList.toggle('is-active',i===depthIndex);slide.setAttribute('aria-hidden',i===depthIndex?'false':'true')});$('#depthCounter').textContent=`0${depthIndex+1} / 0${depthSlides.length}`;$('#depthProgress').style.width=`${(depthIndex+1)/depthSlides.length*100}%`}function goDepth(step){depthIndex=(depthIndex+step+depthSlides.length)%depthSlides.length;paintDepth();restartDepth()}function restartDepth(){clearInterval(depthTimer);if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)depthTimer=setInterval(()=>goDepth(1),5200)}$('#depthPrev').addEventListener('click',()=>goDepth(-1));$('#depthNext').addEventListener('click',()=>goDepth(1));$('#depthStage').addEventListener('keydown',e=>{if(e.key==='ArrowLeft')goDepth(-1);if(e.key==='ArrowRight')goDepth(1)});$('#depthStage').addEventListener('mouseenter',()=>clearInterval(depthTimer));$('#depthStage').addEventListener('mouseleave',restartDepth);let touchStartX=0;$('#depthStage').addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0].screenX;clearInterval(depthTimer)},{passive:true});$('#depthStage').addEventListener('touchend',e=>{let dx=e.changedTouches[0].screenX-touchStartX;if(Math.abs(dx)>45)goDepth(dx<0?1:-1);else restartDepth()},{passive:true});paintDepth();restartDepth();$('#year').textContent=new Date().getFullYear();renderProducts();updateDrawer();
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

  // La tarjeta de cada aliado abre una vista individual identificada por ?aliada=1..6.
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

  function renderSlides() {
    const total = slides.length;
    slides.forEach((slide, index) => {
      slide.classList.remove('is-active', 'is-prev', 'is-next');
      slide.setAttribute('aria-hidden', index === current ? 'false' : 'true');
      if (index === current) slide.classList.add('is-active');
      else if (index === (current - 1 + total) % total) slide.classList.add('is-prev');
      else if (index === (current + 1) % total) slide.classList.add('is-next');
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

  previous?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  next?.addEventListener('click', () => { goTo(current + 1); startAuto(); });
  carousel?.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(current - 1); startAuto(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(current + 1); startAuto(); }
  });
  carousel?.addEventListener('mouseenter', stopAuto);
  carousel?.addEventListener('mouseleave', startAuto);
  carousel?.addEventListener('focusin', stopAuto);
  carousel?.addEventListener('focusout', startAuto);
  carousel?.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].screenX; stopAuto(); }, { passive: true });
  carousel?.addEventListener('touchend', event => {
    touchEndX = event.changedTouches[0].screenX;
    const distance = touchStartX - touchEndX;
    if (Math.abs(distance) > 45) goTo(current + (distance > 0 ? 1 : -1));
    startAuto();
  }, { passive: true });

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

  renderSlides();
  startAuto();
})();
