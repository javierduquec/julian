/**
 * LEGAL & BUSINESS - JULIÁN FAJARDO
 * Client-Side Interactivity, Responsive Logic & Diagnostic Assessment Tool
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
});

/* -------------------------------------------------------------
 * 1. Mobile Drawer Navigation
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    const isHidden = drawer.classList.contains('hidden');
    if (isHidden) {
      drawer.classList.remove('hidden');
    } else {
      drawer.classList.add('hidden');
    }
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.add('hidden');
    });
  });
}

/* -------------------------------------------------------------
 * 2. Sticky Header Blur & Shadow on Scroll
 * ------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shadow-xl', 'bg-primary/98');
      header.classList.remove('bg-primary/95');
    } else {
      header.classList.remove('shadow-xl', 'bg-primary/98');
      header.classList.add('bg-primary/95');
    }
  });
}

/* -------------------------------------------------------------
 * 3. Smooth Scrolling for Internal Links
 * ------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* -------------------------------------------------------------
 * 4. Practice Areas Dual Tab Switcher
 * ------------------------------------------------------------- */
function switchPracticeTab(tab) {
  const businessBtn = document.getElementById('tabBusinessBtn');
  const laborBtn = document.getElementById('tabLaborBtn');
  const businessContent = document.getElementById('tabBusinessContent');
  const laborContent = document.getElementById('tabLaborContent');

  if (!businessBtn || !laborBtn || !businessContent || !laborContent) return;

  if (tab === 'business') {
    businessBtn.classList.add('active');
    businessBtn.classList.remove('text-slate-600');
    laborBtn.classList.remove('active');
    laborBtn.classList.add('text-slate-600');

    businessContent.classList.remove('hidden');
    laborContent.classList.add('hidden');
  } else if (tab === 'labor') {
    laborBtn.classList.add('active');
    laborBtn.classList.remove('text-slate-600');
    businessBtn.classList.remove('active');
    businessBtn.classList.add('text-slate-600');

    laborContent.classList.remove('hidden');
    businessContent.classList.add('hidden');
  }
}

/* -------------------------------------------------------------
 * 5. Interactive Legal Risk Diagnostic Quiz
 * ------------------------------------------------------------- */
const answers = {
  q1: null,
  q2: null,
  q3: null,
  q4: null
};

function enableNext(step) {
  const selected = document.querySelector(`input[name="q${step}"]:checked`);
  if (selected) {
    answers[`q${step}`] = parseInt(selected.value, 10);
    const nextBtn = document.getElementById(`btnNext${step}`);
    if (nextBtn) {
      nextBtn.disabled = false;
    }
  }
}

function goToStep(step) {
  // Hide all steps
  for (let i = 1; i <= 4; i++) {
    const s = document.getElementById(`diagStep${i}`);
    if (s) s.classList.add('hidden');
  }

  // Show target step
  const target = document.getElementById(`diagStep${step}`);
  if (target) target.classList.remove('hidden');

  // Update dots indicator
  for (let i = 2; i <= 4; i++) {
    const dot = document.getElementById(`dot${i}`);
    if (dot) {
      if (i <= step) {
        dot.classList.remove('bg-slate-300');
        dot.classList.add('bg-gold-500');
      } else {
        dot.classList.remove('bg-gold-500');
        dot.classList.add('bg-slate-300');
      }
    }
  }
}

function calculateRisk() {
  // Total possible score: 0 (perfect) to 16 (high risk)
  const total = (answers.q1 || 0) + (answers.q2 || 0) + (answers.q3 || 0) + (answers.q4 || 0);

  // Hide step 4
  const step4 = document.getElementById('diagStep4');
  if (step4) step4.classList.add('hidden');

  const resultContainer = document.getElementById('diagResult');
  const badge = document.getElementById('riskBadge');
  const title = document.getElementById('riskTitle');
  const desc = document.getElementById('riskDesc');
  const action = document.getElementById('riskAction');
  const waBtn = document.getElementById('riskWhatsappBtn');

  if (!resultContainer) return;

  resultContainer.classList.remove('hidden');

  let riskLevel = '';
  let riskColorClass = '';
  let titleText = '';
  let descText = '';
  let actionText = '';

  if (total <= 3) {
    riskLevel = 'Riesgo Bajo / Saludable';
    riskColorClass = 'bg-emerald-100 text-emerald-800 border border-emerald-300';
    titleText = 'Su estructura jurídica presenta un nivel óptimo de prevención';
    descText = 'Sus operaciones demuestran buenas prácticas en formalización mercantil y laboral. No obstante, las recientes reformas laborales y tributarias en Colombia exigen revisiones periódicas anuales.';
    actionText = 'Mantenga sus políticas blindadas. Le sugerimos una auditoría de control preventivo semestral para verificar actualizaciones del CST y nuevos lineamientos de la UGPP.';
  } else if (total <= 8) {
    riskLevel = 'Riesgo Moderado / Alerta Preventiva';
    riskColorClass = 'bg-amber-100 text-amber-800 border border-amber-300';
    titleText = 'Existen vulnerabilidades contractuales y laborales detectables';
    descText = 'Presenta vacíos en contratos comerciales o posibles discrepancias en contratación de colaboradores que podrían desencadenar demandas laborales de primacía de la realidad o dificultades de cobro mercantil.';
    actionText = 'Se recomienda una revisión inmediata de los otrosíes laborales y la formalización de pactos estatutarios con sus socios antes de que surja una controversia abierta.';
  } else {
    riskLevel = 'Riesgo Crítico / Contingencia Inminente';
    riskColorClass = 'bg-rose-100 text-rose-800 border border-rose-300';
    titleText = 'Alta exposición legal y financiera para su patrimonio';
    descText = 'Su empresa se encuentra en una zona de alta contingencia frente a juzgados laborales, el Ministerio del Trabajo o la UGPP. Una sola demanda o requerimiento sancionatorio podría comprometer seriamente la liquidez del negocio.';
    actionText = 'URGENTE: Se recomienda una intervención jurídica estratégica inmediata con el abogado Julián Fajardo para mitigar sanciones y estructurar defensas perentorias.';
  }

  badge.className = `inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${riskColorClass}`;
  badge.innerHTML = `<span>●</span> ${riskLevel}`;
  title.innerText = titleText;
  desc.innerText = descText;
  action.innerText = actionText;

  // WhatsApp personalized message
  const waMessage = encodeURIComponent(
    `Hola Dr. Julián Fajardo. Acabo de realizar el Diagnóstico Legal en su página web y obtuve un resultado de "${riskLevel}". Quisiera agendar una consulta confidencial para evaluar mi caso.`
  );
  waBtn.href = `https://wa.me/573223106909?text=${waMessage}`;
}

function resetQuiz() {
  answers.q1 = null;
  answers.q2 = null;
  answers.q3 = null;
  answers.q4 = null;

  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.checked = false;
  });

  for (let i = 1; i <= 4; i++) {
    const btn = document.getElementById(`btnNext${i}`);
    if (btn) btn.disabled = true;
  }

  const resultContainer = document.getElementById('diagResult');
  if (resultContainer) resultContainer.classList.add('hidden');

  goToStep(1);
}

/* -------------------------------------------------------------
 * 6. FAQ Accordion Toggle
 * ------------------------------------------------------------- */
function toggleFaq(button) {
  const item = button.closest('.faq-item');
  if (!item) return;

  const isActive = item.classList.contains('active');

  // Close all other FAQs for accordion purity
  document.querySelectorAll('.faq-item').forEach(other => {
    if (other !== item) {
      other.classList.remove('active');
    }
  });

  if (isActive) {
    item.classList.remove('active');
  } else {
    item.classList.add('active');
  }
}

/* -------------------------------------------------------------
 * 7. Intake Consultation Form Submission
 * ------------------------------------------------------------- */
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('formName').value.trim();
  const company = document.getElementById('formCompany').value.trim();
  const phone = document.getElementById('formPhone').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const area = document.getElementById('formArea').value;
  const city = document.getElementById('formCity').value.trim();
  const message = document.getElementById('formMessage').value.trim();
  const successBox = document.getElementById('formSuccessMessage');
  const submitBtn = document.getElementById('submitBtn');

  if (!name || !phone || !email || !area || !message) {
    alert('Por favor complete todos los campos obligatorios (*)');
    return;
  }

  // Visual submission state
  submitBtn.disabled = true;
  submitBtn.innerText = 'Enviando Consulta...';

  setTimeout(() => {
    submitBtn.classList.add('hidden');
    successBox.classList.remove('hidden');

    // Also prepare a WhatsApp dispatch bridge if user wants instant conversation
    const waText = encodeURIComponent(
      `*Nueva Consulta desde legalandbusiness.com.co*\n\n` +
      `*Nombre:* ${name}\n` +
      `*Empresa:* ${company || 'Particular / En formación'}\n` +
      `*Ciudad:* ${city}\n` +
      `*Teléfono:* ${phone}\n` +
      `*Área de Interés:* ${area}\n` +
      `*Resumen:* ${message}\n\n` +
      `_Solicitud de atención prioritaria con el Dr. Julián Fajardo_`
    );

    // Option to open WhatsApp directly with formatted case intake
    const openDirect = confirm(
      `¡Gracias ${name}! Su mensaje fue registrado. ¿Desea además abrir un chat prioritario directo por WhatsApp con el Dr. Julián Fajardo ahora mismo?`
    );

    if (openDirect) {
      window.open(`https://wa.me/573223106909?text=${waText}`, '_blank');
    }

    // Reset form after delay
    setTimeout(() => {
      document.getElementById('contactForm').reset();
      submitBtn.disabled = false;
      submitBtn.innerText = 'Enviar Consulta para Evaluación Prioritaria';
      submitBtn.classList.remove('hidden');
    }, 6000);
  }, 900);
}

