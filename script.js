/**
 * LEGAL & BUSINESS - JULIÁN FAJARDO
 * UI/UX Pro Max Engine: Client-Side Interactivity, Responsive Logic,
 * Motion Library Spring Dynamics & Micro-Interactions (motion.dev)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMotionAnimations();
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
});

/* -------------------------------------------------------------
 * 1. Motion Library Spring Dynamics & Micro-Interactions
 * ------------------------------------------------------------- */
function initMotionAnimations() {
  const hasMotion = typeof window.Motion !== 'undefined';

  if (!hasMotion) {
    console.warn('Motion library loaded via fallback. Using CSS transitions.');
    return;
  }

  const { animate, inView, scroll, stagger, hover, press } = window.Motion;

  // 1.1 Reading Scroll Progress Bar
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    scroll(animate(progressBar, { scaleX: [0, 1] }, { ease: "linear" }));
  }

  // 1.2 Spring Physics for Buttons & Interactive Triggers
  const springButtons = document.querySelectorAll('[data-spring-btn], .btn-gold-solid, .btn-gold-outline, .btn-whatsapp-icon, .btn-diag-next, .btn-diag-calculate');
  springButtons.forEach(btn => {
    // Hover spring physics
    hover(btn, (element) => {
      animate(element, { scale: 1.035, y: -2 }, { type: "spring", stiffness: 450, damping: 20 });
      return () => animate(element, { scale: 1, y: 0 }, { type: "spring", stiffness: 450, damping: 20 });
    });

    // Press feedback spring physics
    press(btn, (element) => {
      animate(element, { scale: 0.95 }, { type: "spring", stiffness: 550, damping: 15 });
      return () => animate(element, { scale: 1 }, { type: "spring", stiffness: 550, damping: 15 });
    });
  });

  // 1.3 Spring Physics for Cards (Pillars, Services, Cases)
  const springCards = document.querySelectorAll('[data-spring-card], .pillar-card, .service-detail-card, .case-card');
  springCards.forEach(card => {
    hover(card, (element) => {
      animate(element, { y: -6, scale: 1.01 }, { type: "spring", stiffness: 350, damping: 22 });
      return () => animate(element, { y: 0, scale: 1 }, { type: "spring", stiffness: 350, damping: 22 });
    });
  });

  // 1.4 Staggered In-View Entrance Animations
  inView('.reveal-group', (info) => {
    const items = info.target.querySelectorAll('.reveal-item');
    if (items.length > 0) {
      animate(items, { opacity: [0, 1], y: [28, 0] }, {
        delay: stagger(0.08),
        type: "spring",
        stiffness: 260,
        damping: 22
      });
    }
  }, { margin: "-60px" });

  // 1.5 Section Entrance Elements
  inView('[data-motion="fade-up"]', (info) => {
    animate(info.target, { opacity: [0, 1], y: [30, 0] }, {
      type: "spring",
      stiffness: 220,
      damping: 24,
      duration: 0.8
    });
  }, { margin: "-50px" });

  // 1.6 Floating WhatsApp button breath animation
  const floatBtn = document.querySelector('.floating-btn-whatsapp');
  if (floatBtn) {
    animate(floatBtn, { scale: [1, 1.06, 1] }, {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    });
  }
}

/* -------------------------------------------------------------
 * 2. Mobile Drawer Navigation
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
      menuBtn.setAttribute('aria-expanded', 'true');
      if (typeof window.Motion !== 'undefined') {
        window.Motion.animate(drawer, { opacity: [0, 1], y: [-15, 0] }, { type: "spring", stiffness: 350, damping: 25 });
      }
    } else {
      if (typeof window.Motion !== 'undefined') {
        window.Motion.animate(drawer, { opacity: [1, 0], y: [0, -10] }, { duration: 0.2 }).finished.then(() => {
          drawer.classList.add('hidden');
          menuBtn.setAttribute('aria-expanded', 'false');
        });
      } else {
        drawer.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* -------------------------------------------------------------
 * 3. Sticky Header Blur & Dynamic Styling on Scroll
 * ------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shadow-2xl', 'bg-[#0B1320]/95', 'py-1');
      header.classList.remove('bg-primary/85');
    } else {
      header.classList.remove('shadow-2xl', 'bg-[#0B1320]/95', 'py-1');
      header.classList.add('bg-primary/85');
    }
  }, { passive: true });
}

/* -------------------------------------------------------------
 * 4. Smooth Scrolling for Internal Links
 * ------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 85;
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
 * 5. Practice Areas Dual Tab Switcher with Motion Cross-Fade
 * ------------------------------------------------------------- */
function switchPracticeTab(tab) {
  const businessBtn = document.getElementById('tabBusinessBtn');
  const laborBtn = document.getElementById('tabLaborBtn');
  const businessContent = document.getElementById('tabBusinessContent');
  const laborContent = document.getElementById('tabLaborContent');

  if (!businessBtn || !laborBtn || !businessContent || !laborContent) return;

  const targetContent = tab === 'business' ? businessContent : laborContent;
  const hideContent = tab === 'business' ? laborContent : businessContent;

  if (tab === 'business') {
    businessBtn.classList.add('active');
    businessBtn.classList.remove('text-slate-400');
    laborBtn.classList.remove('active');
    laborBtn.classList.add('text-slate-400');
  } else {
    laborBtn.classList.add('active');
    laborBtn.classList.remove('text-slate-400');
    businessBtn.classList.remove('active');
    businessBtn.classList.add('text-slate-400');
  }

  hideContent.classList.add('hidden');
  targetContent.classList.remove('hidden');

  if (typeof window.Motion !== 'undefined') {
    window.Motion.animate(targetContent, { opacity: [0, 1], y: [16, 0] }, {
      type: "spring",
      stiffness: 300,
      damping: 24
    });
  }
}

/* -------------------------------------------------------------
 * 6. Interactive Legal Risk Diagnostic Quiz
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
      if (typeof window.Motion !== 'undefined') {
        window.Motion.animate(nextBtn, { scale: [0.97, 1.02, 1] }, { type: "spring", stiffness: 450, damping: 15 });
      }
    }
  }
}

function goToStep(step) {
  for (let i = 1; i <= 4; i++) {
    const s = document.getElementById(`diagStep${i}`);
    if (s) s.classList.add('hidden');
  }

  const target = document.getElementById(`diagStep${step}`);
  if (target) {
    target.classList.remove('hidden');
    if (typeof window.Motion !== 'undefined') {
      window.Motion.animate(target, { opacity: [0, 1], x: [18, 0] }, { type: "spring", stiffness: 350, damping: 25 });
    }
  }

  // Update dots indicator
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`dot${i}`);
    if (dot) {
      if (i <= step) {
        dot.classList.remove('bg-slate-700');
        dot.classList.add('bg-gold-400');
      } else {
        dot.classList.remove('bg-gold-400');
        dot.classList.add('bg-slate-700');
      }
    }
  }
}

function calculateRisk() {
  const total = (answers.q1 || 0) + (answers.q2 || 0) + (answers.q3 || 0) + (answers.q4 || 0);

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
    riskLevel = 'Riesgo Bajo / Estructura Preventiva Óptima';
    riskColorClass = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
    titleText = 'Su empresa mantiene buenas prácticas de prevención jurídica';
    descText = 'Sus operaciones demuestran formalización mercantil y laboral adecuada. No obstante, las recientes reformas laborales y fiscales en Colombia exigen auditorías de control periódicas.';
    actionText = 'Mantenga su blindaje al día. Sugerimos una revisión preventiva semestral de contratos de prestación de servicios y novedades de la UGPP.';
  } else if (total <= 8) {
    riskLevel = 'Riesgo Moderado / Alerta de Exposición';
    riskColorClass = 'bg-amber-500/20 text-amber-300 border border-amber-500/40';
    titleText = 'Se detectaron vulnerabilidades contractuales y laborales sensibles';
    descText = 'Presenta vacíos en contratos comerciales o discrepancias en la contratación de colaboradores que podrían derivar en demandas laborales por contrato realidad o dificultades en el cobro coactivo de cartera.';
    actionText = 'Se recomienda una auditoría inmediata de los otrosíes laborales y la formalización de pactos estatutarios con sus socios antes de que surja una controversia abierta.';
  } else {
    riskLevel = 'Riesgo Crítico / Contingencia Inminente';
    riskColorClass = 'bg-rose-500/20 text-rose-300 border border-rose-500/40';
    titleText = 'Alta exposición legal y financiera para su patrimonio';
    descText = 'Su empresa se encuentra en una zona de alta contingencia frente a juzgados laborales, el Ministerio del Trabajo o la UGPP. Una sola demanda o requerimiento sancionatorio podría comprometer seriamente la liquidez del negocio.';
    actionText = 'URGENTE: Se recomienda una intervención jurídica estratégica inmediata con el abogado Julián Fajardo para estructurar defensas y mitigar sanciones económicas.';
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

  if (typeof window.Motion !== 'undefined') {
    window.Motion.animate(resultContainer, { opacity: [0, 1], scale: [0.96, 1] }, {
      type: "spring",
      stiffness: 300,
      damping: 22
    });
  }
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
 * 7. FAQ Accordion Toggle with Motion Smooth Springs
 * ------------------------------------------------------------- */
function toggleFaq(button) {
  const item = button.closest('.faq-item');
  if (!item) return;

  const isActive = item.classList.contains('active');

  // Close all other FAQs
  document.querySelectorAll('.faq-item').forEach(other => {
    if (other !== item) {
      other.classList.remove('active');
      const trigger = other.querySelector('.faq-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  });

  if (isActive) {
    item.classList.remove('active');
    button.setAttribute('aria-expanded', 'false');
  } else {
    item.classList.add('active');
    button.setAttribute('aria-expanded', 'true');
    const content = item.querySelector('.faq-content');
    if (content && typeof window.Motion !== 'undefined') {
      window.Motion.animate(content, { opacity: [0, 1], y: [-6, 0] }, { duration: 0.25, ease: "easeOut" });
    }
  }
}

/* -------------------------------------------------------------
 * 8. Intake Consultation Form Submission
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
  submitBtn.innerText = 'Enviando Consulta Prioritaria...';

  setTimeout(() => {
    submitBtn.classList.add('hidden');
    successBox.classList.remove('hidden');

    if (typeof window.Motion !== 'undefined') {
      window.Motion.animate(successBox, { opacity: [0, 1], scale: [0.95, 1] }, { type: "spring", stiffness: 350, damping: 20 });
    }

    const waText = encodeURIComponent(
      `*Nueva Consulta desde legalandbusiness.com.co*\n\n` +
      `*Nombre:* ${name}\n` +
      `*Empresa:* ${company || 'Particular / En proceso'}\n` +
      `*Ciudad:* ${city}\n` +
      `*Teléfono:* ${phone}\n` +
      `*Área de Interés:* ${area}\n` +
      `*Resumen:* ${message}\n\n` +
      `_Solicitud de asesoría prioritaria con el Dr. Julián Fajardo_`
    );

    const openDirect = confirm(
      `¡Gracias ${name}! Su solicitud fue registrada. ¿Desea además abrir un chat prioritario directo por WhatsApp con el Dr. Julián Fajardo ahora mismo?`
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
      successBox.classList.add('hidden');
    }, 7000);
  }, 750);
}
