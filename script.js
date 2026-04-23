/* ====================================================
   ROG FILMES — script.js
   Lógica de interação, animações e carrinho
   ==================================================== */

'use strict';

// ====================================================
// DADOS DOS FILMES
// ====================================================
const FILMES = [
  {
    id: 1,
    titulo: 'The Batman Part II',
    genero: 'acao',
    generoLabel: 'Ação · Suspense',
    sinopse: 'Bruce Wayne enfrenta uma conspiração que atinge as raízes mais profundas de Gotham, enquanto um novo vilão emerge das cinzas — mais cruel e calculista do que tudo que ele já enfrentou.',
    duracao: '2h 58min',
    classificacao: '14',
    rating: '9.1',
    imax: true,
    estreia: false,
    emoji: '🦇',
    bg: 'linear-gradient(135deg, #0a0015 0%, #1a0030 100%)',
    precoBase: 52,
    precoVIP: 110,
    horarios: ['14:30', '17:00', '20:15', '23:00'],
  },
  {
    id: 2,
    titulo: 'Avatar 3: A Semente do Fogo',
    genero: 'scifi',
    generoLabel: 'Sci-Fi · Aventura',
    sinopse: 'Jake Sully e Neytiri enfrentam uma nova ameaça vinda de uma civilização Na\'vi das trevas, os Ash People, enquanto lutam para proteger a lua de Pandora e seus filhos.',
    duracao: '3h 22min',
    classificacao: '12',
    rating: '8.8',
    imax: true,
    estreia: true,
    emoji: '🌿',
    bg: 'linear-gradient(135deg, #001a0a 0%, #002a15 100%)',
    precoBase: 52,
    precoVIP: 110,
    horarios: ['13:00', '16:30', '20:00'],
  },
  {
    id: 3,
    titulo: 'Duna: Messias',
    genero: 'scifi',
    generoLabel: 'Sci-Fi · Drama Épico',
    sinopse: 'Doze anos após assumir o trono imperial, Paulo Atreides navega pelas consequências de seu governo messiânico enquanto novas forças se organizam para destronar o Kwisatz Haderach.',
    duracao: '2h 45min',
    classificacao: '14',
    rating: '9.3',
    imax: true,
    estreia: false,
    emoji: '🏜️',
    bg: 'linear-gradient(135deg, #1a0e00 0%, #2d1800 100%)',
    precoBase: 52,
    precoVIP: 110,
    horarios: ['14:00', '17:30', '21:00'],
  },
  {
    id: 4,
    titulo: 'Superman',
    genero: 'acao',
    generoLabel: 'Ação · Fantasia',
    sinopse: 'Clark Kent equilibra sua vida como repórter do Daily Planet e sua missão como o Homem de Aço, enquanto enfrenta Lex Luthor em uma batalha que irá definir o que significa ser herói.',
    duracao: '2h 12min',
    classificacao: '10',
    rating: '8.5',
    imax: false,
    estreia: true,
    emoji: '🦸',
    bg: 'linear-gradient(135deg, #00101a 0%, #001830 100%)',
    precoBase: 52,
    precoVIP: 110,
    horarios: ['13:30', '16:00', '19:00', '22:00'],
  },
  {
    id: 5,
    titulo: 'Wicked: Para Sempre',
    genero: 'drama',
    generoLabel: 'Drama Musical',
    sinopse: 'A conclusão épica da saga de Elphaba e Glinda aprofunda os laços e escolhas que moldaram o destino das duas bruxas e todo o reino de Oz — com números musicais inesquecíveis.',
    duracao: '2h 35min',
    classificacao: 'L',
    rating: '8.7',
    imax: false,
    estreia: false,
    emoji: '🌟',
    bg: 'linear-gradient(135deg, #150020 0%, #220030 100%)',
    precoBase: 52,
    precoVIP: 110,
    horarios: ['14:15', '17:45', '21:15'],
  },
  {
    id: 6,
    titulo: 'Minecraft: O Filme',
    genero: 'animacao',
    generoLabel: 'Animação · Aventura',
    sinopse: 'Quando um grupo de jogadores é sugado para dentro do universo pixelado de Minecraft, precisam usar criatividade e trabalho em equipe para sobreviver e encontrar o caminho de volta.',
    duracao: '1h 55min',
    classificacao: 'L',
    rating: '7.9',
    imax: false,
    estreia: false,
    emoji: '⛏️',
    bg: 'linear-gradient(135deg, #001005 0%, #002810 100%)',
    precoBase: 45,
    precoVIP: 95,
    horarios: ['11:00', '13:30', '16:00', '18:30'],
  },
  {
    id: 7,
    titulo: 'Missão: Impossível — A Sentença Final',
    genero: 'acao',
    generoLabel: 'Ação · Espionagem',
    sinopse: 'Ethan Hunt e a Força-Tarefa IMF enfrentam a batalha definitiva contra a IA conhecida como "A Entidade" numa corrida contra o tempo que determinará o futuro da humanidade.',
    duracao: '2h 50min',
    classificacao: '12',
    rating: '9.0',
    imax: true,
    estreia: true,
    emoji: '🕵️',
    bg: 'linear-gradient(135deg, #0a0a00 0%, #1a1800 100%)',
    precoBase: 52,
    precoVIP: 110,
    horarios: ['15:00', '18:30', '22:00'],
  },
  {
    id: 8,
    titulo: 'Nemo & Dory: Oceano Perdido',
    genero: 'animacao',
    generoLabel: 'Animação · Família',
    sinopse: 'Em uma nova aventura nos abismos do Pacífico, Nemo e Dory descobrem uma civilização submarina escondida que desafia tudo o que sabiam sobre os oceanos da Terra.',
    duracao: '1h 48min',
    classificacao: 'L',
    rating: '8.2',
    imax: false,
    estreia: false,
    emoji: '🐠',
    bg: 'linear-gradient(135deg, #000d1a 0%, #001530 100%)',
    precoBase: 45,
    precoVIP: 95,
    horarios: ['10:30', '12:30', '15:00', '17:00'],
  },
];

// ====================================================
// ESTADO DA APLICAÇÃO
// ====================================================
let state = {
  filmeAtivo: null,
  assentosSelecionados: [],
  tipoIngresso: 'inteira',
  metodoPagamento: 'cartao',
  ocupados: [],
};

const PRECOS = {
  inteira: { base: 52, vip: 110 },
  meia: { base: 26, vip: 55 },
  vip: { base: 95, vip: 95 },
};

// ====================================================
// INICIALIZAÇÃO
// ====================================================
document.addEventListener('DOMContentLoaded', () => {
  renderFilmes();
  initScrollObserver();
  initNavbarScroll();
  initParticles();
  initCounters();
  initFilters();
  initInputMasks();
  // Ativar reveals visíveis imediatamente
  setTimeout(() => triggerVisible(), 100);
});

// ====================================================
// PARTÍCULAS HERO
// ====================================================
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const N = 22;
  for (let i = 0; i < N; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 18 + 12}s;
      animation-delay: ${Math.random() * 15}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
}

// ====================================================
// NAVBAR SCROLL
// ====================================================
function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ====================================================
// HAMBURGER MENU
// ====================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMobileMenu() {
  hamburger?.classList.remove('open');
  mobileMenu?.classList.remove('open');
}

// ====================================================
// INTERSECTION OBSERVER (REVEAL)
// ====================================================
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function triggerVisible() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('visible');
  });
}

// ====================================================
// CONTADORES ANIMADOS
// ====================================================
function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach(n => observer.observe(n));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(ease * target).toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('pt-BR');
  }
  requestAnimationFrame(step);
}

// ====================================================
// RENDER FILMES
// ====================================================
function renderFilmes(genero = 'todos') {
  const grid = document.getElementById('filmesGrid');
  grid.innerHTML = '';
  const filtrados = genero === 'todos' ? FILMES : FILMES.filter(f => f.genero === genero);

  filtrados.forEach((filme, i) => {
    const card = document.createElement('div');
    card.className = 'filme-card reveal';
    card.style.transitionDelay = `${i * 0.06}s`;
    card.innerHTML = `
      <div class="filme-poster">
        <div class="filme-poster-placeholder" style="background: ${filme.bg};">
          <span style="font-size:5rem">${filme.emoji}</span>
        </div>
        <div class="filme-badges">
          ${filme.imax ? '<span class="badge badge-imax">IMAX</span>' : ''}
          ${filme.estreia ? '<span class="badge badge-estreia">Estreia</span>' : ''}
          <span class="badge badge-classif">${filme.classificacao} anos</span>
        </div>
      </div>
      <div class="filme-info">
        <div class="filme-genre">${filme.generoLabel}</div>
        <h3 class="filme-titulo">${filme.titulo}</h3>
        <p class="filme-sinopse">${filme.sinopse}</p>
        <div class="filme-meta">
          <span class="filme-dur">⏱ ${filme.duracao}</span>
          <span class="filme-rating"><span class="rating-star">★</span> ${filme.rating}</span>
        </div>
        <button class="filme-cta" onclick="abrirSeletor(${filme.id})">
          Comprar Ingressos
        </button>
      </div>
    `;
    grid.appendChild(card);

    // Reobservar novos cards
    setTimeout(() => {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.1 });
      obs.observe(card);
      triggerVisible();
    }, 50);
  });
}

// ====================================================
// FILTROS
// ====================================================
function initFilters() {
  document.querySelectorAll('.filtro').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filtro').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFilmes(btn.dataset.genre);
    });
  });
}

// ====================================================
// MODAL SISTEMA
// ====================================================
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
  document.body.style.overflow = '';
}
function handleOverlayClick(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}
window.openModal = openModal;
window.closeModal = closeModal;
window.handleOverlayClick = handleOverlayClick;

// ====================================================
// SELETOR DE ASSENTOS
// ====================================================
function abrirSeletor(filmeId) {
  const filme = FILMES.find(f => f.id === filmeId);
  if (!filme) return;

  state.filmeAtivo = filme;
  state.assentosSelecionados = [];
  state.tipoIngresso = 'inteira';

  // Reset UI
  document.getElementById('assentoFilmeTitle').textContent = filme.titulo;
  document.getElementById('assentoFilmeSub').textContent =
    `${filme.generoLabel} · ${filme.duracao} · ${filme.classificacao} anos`;

  // Preços
  document.getElementById('price-inteira').textContent = `R$ ${filme.precoBase},00`;
  document.getElementById('price-meia').textContent = `R$ ${Math.floor(filme.precoBase / 2)},00`;
  document.getElementById('price-vip').textContent = `R$ ${filme.precoVIP},00`;

  // Reset tipo btn
  document.querySelectorAll('.tipo-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-tipo="inteira"]')?.classList.add('active');

  gerarAssentos(filme);
  atualizarPreco();

  // Mostrar step de assentos
  document.getElementById('step-assentos').classList.remove('hidden');
  document.getElementById('step-checkout').classList.add('hidden');
  document.getElementById('step-confirmacao').classList.add('hidden');

  openModal('modal-assentos');
}
window.abrirSeletor = abrirSeletor;

function gerarAssentos(filme) {
  const mapa = document.getElementById('mapaAssentos');
  mapa.innerHTML = '';

  const filas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const assentosPorFila = 12;
  const filasVIP = ['K', 'L'];

  // Gerar ocupados aleatórios (seeded para consistência visual)
  state.ocupados = [];
  const seed = filme.id * 137;
  for (let i = 0; i < 35; i++) {
    const fi = Math.floor(((seed * (i + 1) * 9301 + 49297) % 233280) / 233280 * filas.length);
    const ai = Math.floor(((seed * (i + 3) * 1664525 + 1013904223) % 233280) / 233280 * assentosPorFila) + 1;
    state.ocupados.push(`${filas[fi]}${ai}`);
  }

  filas.forEach(fila => {
    const row = document.createElement('div');
    row.className = 'fila';

    const label = document.createElement('div');
    label.className = 'fila-label';
    label.textContent = fila;
    row.appendChild(label);

    const isVIP = filasVIP.includes(fila);

    for (let a = 1; a <= assentosPorFila; a++) {
      if (a === 5) {
        const corredor = document.createElement('div');
        corredor.className = 'corredor';
        row.appendChild(corredor);
      }

      const id = `${fila}${a}`;
      const btn = document.createElement('button');
      btn.className = 'assento' + (isVIP ? ' vip-seat' : '');
      btn.dataset.id = id;
      btn.dataset.vip = isVIP ? '1' : '0';
      btn.setAttribute('aria-label', `Assento ${id}${isVIP ? ' VIP' : ''}`);
      btn.title = id;

      if (state.ocupados.includes(id)) {
        btn.classList.add('ocupado');
        btn.disabled = true;
      } else {
        btn.addEventListener('click', () => toggleAssento(btn));
      }

      row.appendChild(btn);
    }

    mapa.appendChild(row);
  });
}

function toggleAssento(btn) {
  const id = btn.dataset.id;
  if (btn.classList.contains('selecionado')) {
    btn.classList.remove('selecionado');
    state.assentosSelecionados = state.assentosSelecionados.filter(a => a !== id);
  } else {
    if (state.assentosSelecionados.length >= 8) {
      mostrarToast('Máximo de 8 assentos por compra.');
      return;
    }
    btn.classList.add('selecionado');
    state.assentosSelecionados.push(id);
  }
  atualizarPreco();
}

function atualizarPreco() {
  const n = state.assentosSelecionados.length;
  const filme = state.filmeAtivo;
  const tipo = state.tipoIngresso;

  let total = 0;
  let breakdown = '';

  state.assentosSelecionados.forEach(id => {
    const isVip = ['K', 'L'].includes(id[0]);
    let preco;
    if (tipo === 'vip') {
      preco = filme.precoVIP;
    } else if (tipo === 'meia') {
      preco = isVip ? Math.floor(filme.precoVIP / 2) : Math.floor(filme.precoBase / 2);
    } else {
      preco = isVip ? filme.precoVIP : filme.precoBase;
    }
    total += preco;
  });

  document.getElementById('numSelecionados').textContent = n;
  document.getElementById('precoTotal').textContent = formatBRL(total);
  document.getElementById('ctValor').textContent = formatBRL(total);

  const tipoLabel = { inteira: 'Inteira', meia: 'Meia-entrada', vip: 'VIP' }[tipo];
  document.getElementById('precoBreakdown').textContent = n > 0 ? `${n}× ${tipoLabel}` : '';

  const btn = document.getElementById('btnContinuarCheckout');
  btn.disabled = n === 0;
}

function setTipo(tipo, btnEl) {
  state.tipoIngresso = tipo;
  document.querySelectorAll('.tipo-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');
  atualizarPreco();
}
window.setTipo = setTipo;

// ====================================================
// CHECKOUT
// ====================================================
function irParaCheckout() {
  if (state.assentosSelecionados.length === 0) return;

  const filme = state.filmeAtivo;
  const tipo = state.tipoIngresso;
  const tipoLabel = { inteira: 'Inteira', meia: 'Meia-entrada', vip: 'VIP' }[tipo];

  let totalNum = 0;
  const linhasAssentos = state.assentosSelecionados.map(id => {
    const isVip = ['K', 'L'].includes(id[0]);
    let preco;
    if (tipo === 'vip') preco = filme.precoVIP;
    else if (tipo === 'meia') preco = isVip ? Math.floor(filme.precoVIP / 2) : Math.floor(filme.precoBase / 2);
    else preco = isVip ? filme.precoVIP : filme.precoBase;
    totalNum += preco;
    return `<div style="display:flex;justify-content:space-between"><span>Assento <strong>${id}</strong>${isVip ? ' <span style="color:var(--azul);font-size:0.7em">(VIP)</span>' : ''}</span><span>${formatBRL(preco)}</span></div>`;
  }).join('');

  document.getElementById('checkoutResumo').innerHTML = `
    <div style="margin-bottom:0.75rem"><strong>${filme.titulo}</strong></div>
    <div style="font-size:0.8rem;color:var(--cinza-3);margin-bottom:1rem">${filme.generoLabel} · ${tipoLabel}</div>
    ${linhasAssentos}
    <div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between"><span>Total</span><strong style="color:var(--azul)">${formatBRL(totalNum)}</strong></div>
  `;
  document.getElementById('ctValor').textContent = formatBRL(totalNum);

  document.getElementById('step-assentos').classList.add('hidden');
  document.getElementById('step-checkout').classList.remove('hidden');
}
window.irParaCheckout = irParaCheckout;

function voltarAssentos() {
  document.getElementById('step-checkout').classList.add('hidden');
  document.getElementById('step-assentos').classList.remove('hidden');
}
window.voltarAssentos = voltarAssentos;

function setMetodo(metodo, btnEl) {
  state.metodoPagamento = metodo;
  document.querySelectorAll('.metodo-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');
  document.getElementById('cartaoFields').classList.toggle('hidden', metodo !== 'cartao');
  document.getElementById('pixFields').classList.toggle('hidden', metodo !== 'pix');
}
window.setMetodo = setMetodo;

function processarPagamento() {
  const nome = document.getElementById('inputNome').value.trim();
  const email = document.getElementById('inputEmail').value.trim();

  if (!nome || !email) {
    mostrarToast('Preencha seu nome e e-mail para continuar.');
    return;
  }
  if (!email.includes('@')) {
    mostrarToast('Insira um e-mail válido.');
    return;
  }

  const btn = document.getElementById('btnPagar');
  btn.textContent = 'Processando...';
  btn.disabled = true;

  setTimeout(() => {
    mostrarConfirmacao(nome, email);
  }, 1800);
}
window.processarPagamento = processarPagamento;

function mostrarConfirmacao(nome, email) {
  const filme = state.filmeAtivo;
  const assentos = state.assentosSelecionados.join(', ');
  const tipo = { inteira: 'Inteira', meia: 'Meia-entrada', vip: 'VIP' }[state.tipoIngresso];
  const hoje = new Date();
  const dataStr = hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  document.getElementById('confTicket').innerHTML = `
    <div style="font-size:0.95rem;font-weight:500;color:var(--branco);margin-bottom:0.5rem">${filme.titulo}</div>
    <div>Titular: <strong>${nome}</strong></div>
    <div>E-mail: ${email}</div>
    <div>Assentos: <strong style="color:var(--azul)">${assentos}</strong></div>
    <div>Tipo: ${tipo}</div>
    <div>Data: ${dataStr}</div>
    <div>Total: ${document.getElementById('ctValor').textContent}</div>
    <div style="margin-top:0.75rem;font-size:0.72rem;letter-spacing:0.06em;text-transform:uppercase;color:var(--cinza-3)">
      Código: ROG-${Math.random().toString(36).substr(2, 8).toUpperCase()}
    </div>
  `;

  document.getElementById('step-checkout').classList.add('hidden');
  document.getElementById('step-confirmacao').classList.remove('hidden');
}

function resetModal() {
  state.assentosSelecionados = [];
  state.filmeAtivo = null;

  const btn = document.getElementById('btnPagar');
  btn.textContent = '✓ Confirmar e Pagar';
  btn.disabled = false;

  document.getElementById('inputNome').value = '';
  document.getElementById('inputEmail').value = '';
  document.getElementById('inputCPF').value = '';
  document.getElementById('inputTelefone').value = '';
  document.getElementById('inputCartao').value = '';
  document.getElementById('inputValidade').value = '';
  document.getElementById('inputCVV').value = '';

  // Reset metodo
  document.querySelectorAll('.metodo-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-metodo="cartao"]')?.classList.add('active');
  document.getElementById('cartaoFields').classList.remove('hidden');
  document.getElementById('pixFields').classList.add('hidden');
}
window.resetModal = resetModal;

// ====================================================
// INPUT MASKS
// ====================================================
function initInputMasks() {
  const cpf = document.getElementById('inputCPF');
  cpf?.addEventListener('input', () => {
    let v = cpf.value.replace(/\D/g, '').substring(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    cpf.value = v;
  });

  const tel = document.getElementById('inputTelefone');
  tel?.addEventListener('input', () => {
    let v = tel.value.replace(/\D/g, '').substring(0, 11);
    if (v.length >= 11) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    else if (v.length >= 7) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else if (v.length >= 3) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    tel.value = v;
  });

  const cartao = document.getElementById('inputCartao');
  cartao?.addEventListener('input', () => {
    let v = cartao.value.replace(/\D/g, '').substring(0, 16);
    v = v.replace(/(\d{4})/g, '$1 ').trim();
    cartao.value = v;
  });

  const validade = document.getElementById('inputValidade');
  validade?.addEventListener('input', () => {
    let v = validade.value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 3) v = v.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    validade.value = v;
  });
}

// ====================================================
// TOAST
// ====================================================
function mostrarToast(msg) {
  let t = document.querySelector('.rog-toast');
  if (t) t.remove();
  t = document.createElement('div');
  t.className = 'rog-toast';
  t.textContent = msg;
  t.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: rgba(20,20,22,0.95);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(0,122,255,0.3);
    color: #fff;
    padding: 0.85rem 1.5rem;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 0.875rem;
    z-index: 9999;
    opacity: 0;
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
    white-space: nowrap;
    box-shadow: 0 8px 30px rgba(0,0,0,0.5), 0 0 20px rgba(0,122,255,0.1);
  `;
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => t.remove(), 400);
  }, 3000);
}

// ====================================================
// UTILITÁRIOS
// ====================================================
function formatBRL(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
