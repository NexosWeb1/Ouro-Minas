const WA_NUMBER = '5531000000000';

const fleet = [
  { name: 'Fiat Mobi', cat: 'Compacto', versions: ['Mobi Like 1.0'], img: 'assets/Mobi.jpg' },
  { name: 'Fiat Argo', cat: 'Hatch', versions: ['Argo 1.0', 'Argo Drive 1.0', 'Argo Drive 1.3 Automático', 'Argo Trekking 1.3'], img: 'assets/Argo.jpg' },
  { name: 'Fiat Cronos', cat: 'Sedan', versions: ['Cronos Drive 1.3 Automático'], img: 'assets/Cronos.jpg' },
  { name: 'Fiat Strada', cat: 'Picape', versions: ['Strada Endurance 1.3 CS', 'Strada Freedom 1.3 CD'], img: 'assets/Strada.jpg' },
  { name: 'Renault Kwid', cat: 'Compacto', versions: ['Kwid Zen'], img: 'assets/Kwid.jpg' },
  { name: 'Volkswagen Gol', cat: 'Hatch', versions: ['Novo Gol 1.0 G7 TL MCV'], img: 'assets/Gol.jpg' },
  { name: 'Volkswagen Polo', cat: 'Hatch', versions: ['Polo MPI 1.0', 'Polo CL TSI', 'Polo HL AD', 'Polo Track 1.0', 'Polo Track Rock in Rio', 'Polo TSI Manual'], img: 'assets/Polo.jpg' },
  { name: 'Volkswagen Saveiro', cat: 'Picape', versions: ['Saveiro CS RB MF', 'Saveiro Robust 1.6 16V CS'], img: 'assets/Saveiro.jpg' },
  { name: 'Volkswagen T-Cross', cat: 'SUV', versions: ['T-Cross TSI Automático'], img: 'assets/T-Cross.jpg' },
  { name: 'Chevrolet Onix', cat: 'Hatch', versions: ['Onix 1.0 MT'], img: 'assets/Onix.jpg' },
  { name: 'Chevrolet Spin', cat: 'Minivan', versions: ['Spin LTZ', 'Spin LT 7 Lugares'], img: 'assets/Spin.jpg' },
  { name: 'Chevrolet Montana', cat: 'Picape', versions: ['Montana LTZ'], img: 'assets/Montana.JPG' },
  { name: 'Toyota Yaris', cat: 'Hatch / Sedan', versions: ['Hatch XL 1.5 AT', 'Sedan XL 1.5 AT'], img: 'assets/Yaris.jpg' },
  { name: 'Toyota Hilux', cat: 'Picape Diesel', versions: ['Hilux STD 2.8 Diesel Cabine Dupla'], img: 'assets/Hilux.jpg' },
];

const faqs = [
  { q: 'A Ouro Minas atende pessoa física?', a: 'Nosso foco é o atendimento corporativo (pessoa jurídica), com soluções de terceirização e gestão de frotas pensadas para empresas. Fale com a gente para avaliar o seu caso.' },
  { q: 'Quais regiões do Brasil são atendidas?', a: 'Atendemos empresas em todo o território nacional, com sede em Belo Horizonte / MG e suporte logístico em diversas regiões do país.' },
  { q: 'Como funciona a manutenção dos veículos?', a: 'A manutenção preventiva e corretiva é totalmente gerida por nós, com planos específicos por modelo e reposição de veículo para evitar tempo ocioso na sua operação.' },
  { q: 'É possível personalizar a frota conforme a operação?', a: 'Sim. Montamos a composição de modelos, versões e quantidade de veículos de acordo com o perfil de uso e as rotas da sua empresa.' },
  { q: 'Como solicitar uma cotação?', a: 'Basta preencher o formulário na seção de contato ou falar diretamente com um consultor pelo WhatsApp. Retornamos com uma proposta personalizada em poucos minutos.' },
];

function buildFleet() {
  const grid = document.getElementById('fleetGrid');
  if (!grid) return;
  grid.innerHTML = fleet.map((car, i) => {
    const label = car.versions.length + (car.versions.length > 1 ? ' versões' : ' versão');
    const items = car.versions.map(v => `<li>${v}</li>`).join('');
    const media = car.img
      ? `<img src="${car.img}" alt="${car.name}" loading="lazy">`
      : `<span class="fleet-ph">[ ${car.name} ]</span>`;
    const delay = (i % 3) * 0.08;
    return `
      <div class="fleet-card reveal" style="transition-delay:${delay}s">
        <div class="fleet-img">
          <span class="fleet-cat">${car.cat}</span>
          ${media}
        </div>
        <div class="fleet-body">
          <h3>${car.name}</h3>
          <p class="fleet-versions-label">${label}</p>
          <ul class="fleet-versions">${items}</ul>
        </div>
      </div>`;
  }).join('');
}

function buildFaq() {
  const list = document.getElementById('faqList');
  if (!list) return;
  list.innerHTML = faqs.map((f, i) => `
    <div class="faq-item reveal" style="transition-delay:${i * 0.06}s">
      <button class="faq-btn" aria-expanded="false" data-idx="${i}">
        <span class="faq-q">${f.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer" id="faq-ans-${i}">${f.a}</div>
    </div>`).join('');

  list.addEventListener('click', e => {
    const btn = e.target.closest('.faq-btn');
    if (!btn) return;
    const idx = btn.dataset.idx;
    const answer = document.getElementById(`faq-ans-${idx}`);
    const icon = btn.querySelector('.faq-icon');
    const isOpen = answer.classList.contains('open');

    document.querySelectorAll('.faq-answer.open').forEach(el => {
      el.classList.remove('open');
      el.closest('.faq-item').querySelector('.faq-icon').classList.remove('open');
    });

    if (!isOpen) {
      answer.classList.add('open');
      icon.classList.add('open');
    }
  });
}

function buildContactForm() {
  const btn = document.getElementById('submitBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const name = document.getElementById('fname').value.trim();
    const company = document.getElementById('fcompany').value.trim();
    const phone = document.getElementById('fphone').value.trim();
    const qty = document.getElementById('fqty').value.trim();
    const msg = document.getElementById('fmsg').value.trim();
    const text = `Olá! Gostaria de solicitar uma cotação de frota corporativa.\n\nNome: ${name || '-'}\nEmpresa: ${company || '-'}\nTelefone: ${phone || '-'}\nQuantidade de veículos: ${qty || '-'}\nMensagem: ${msg || '-'}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
}

function buildNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', links.classList.contains('open'));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  targets.forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  buildFleet();
  buildFaq();
  buildContactForm();
  buildNav();
  initScrollReveal();
});
