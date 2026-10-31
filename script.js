/**
 * LEGAL & BUSINESS - JULIÁN FAJARDO
<<<<<<< HEAD
 * UI/UX Pro Max Engine: Client-Side Interactivity, Responsive Logic,
 * Motion Library Spring Dynamics & Micro-Interactions (motion.dev)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMotionAnimations();
=======
 * Client-Side Interactivity, Responsive Logic & Diagnostic Assessment Tool
 */

document.addEventListener('DOMContentLoaded', () => {
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
});

/* -------------------------------------------------------------
<<<<<<< HEAD
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
=======
 * 1. Mobile Drawer Navigation
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
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
<<<<<<< HEAD
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
=======
    } else {
      drawer.classList.add('hidden');
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
    }
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.add('hidden');
<<<<<<< HEAD
      menuBtn.setAttribute('aria-expanded', 'false');
=======
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
    });
  });
}

/* -------------------------------------------------------------
<<<<<<< HEAD
 * 3. Sticky Header Blur & Dynamic Styling on Scroll
=======
 * 2. Sticky Header Blur & Shadow on Scroll
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
 * ------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
<<<<<<< HEAD
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
=======
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
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
 * ------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
<<<<<<< HEAD
        const headerOffset = 85;
=======
        const headerOffset = 80;
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
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
<<<<<<< HEAD
 * 5. Practice Areas Dual Tab Switcher with Motion Cross-Fade
=======
 * 4. Practice Areas Dual Tab Switcher
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
 * ------------------------------------------------------------- */
function switchPracticeTab(tab) {
  const businessBtn = document.getElementById('tabBusinessBtn');
  const laborBtn = document.getElementById('tabLaborBtn');
  const businessContent = document.getElementById('tabBusinessContent');
  const laborContent = document.getElementById('tabLaborContent');

  if (!businessBtn || !laborBtn || !businessContent || !laborContent) return;

<<<<<<< HEAD
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
=======
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
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
  }
}

/* -------------------------------------------------------------
<<<<<<< HEAD
 * 6. Interactive Legal Risk Diagnostic Quiz
=======
 * 5. Interactive Legal Risk Diagnostic Quiz
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
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
<<<<<<< HEAD
      if (typeof window.Motion !== 'undefined') {
        window.Motion.animate(nextBtn, { scale: [0.97, 1.02, 1] }, { type: "spring", stiffness: 450, damping: 15 });
      }
=======
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
    }
  }
}

function goToStep(step) {
<<<<<<< HEAD
=======
  // Hide all steps
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
  for (let i = 1; i <= 4; i++) {
    const s = document.getElementById(`diagStep${i}`);
    if (s) s.classList.add('hidden');
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
      }
    }
  }
}

function calculateRisk() {
<<<<<<< HEAD
  const total = (answers.q1 || 0) + (answers.q2 || 0) + (answers.q3 || 0) + (answers.q4 || 0);

=======
  // Total possible score: 0 (perfect) to 16 (high risk)
  const total = (answers.q1 || 0) + (answers.q2 || 0) + (answers.q3 || 0) + (answers.q4 || 0);

  // Hide step 4
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
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
<<<<<<< HEAD
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
=======
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
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
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
<<<<<<< HEAD

  if (typeof window.Motion !== 'undefined') {
    window.Motion.animate(resultContainer, { opacity: [0, 1], scale: [0.96, 1] }, {
      type: "spring",
      stiffness: 300,
      damping: 22
    });
  }
=======
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
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
<<<<<<< HEAD
 * 7. FAQ Accordion Toggle with Motion Smooth Springs
=======
 * 6. FAQ Accordion Toggle
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
 * ------------------------------------------------------------- */
function toggleFaq(button) {
  const item = button.closest('.faq-item');
  if (!item) return;

  const isActive = item.classList.contains('active');

<<<<<<< HEAD
  // Close all other FAQs
  document.querySelectorAll('.faq-item').forEach(other => {
    if (other !== item) {
      other.classList.remove('active');
      const trigger = other.querySelector('.faq-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
=======
  // Close all other FAQs for accordion purity
  document.querySelectorAll('.faq-item').forEach(other => {
    if (other !== item) {
      other.classList.remove('active');
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
    }
  });

  if (isActive) {
    item.classList.remove('active');
<<<<<<< HEAD
    button.setAttribute('aria-expanded', 'false');
  } else {
    item.classList.add('active');
    button.setAttribute('aria-expanded', 'true');
    const content = item.querySelector('.faq-content');
    if (content && typeof window.Motion !== 'undefined') {
      window.Motion.animate(content, { opacity: [0, 1], y: [-6, 0] }, { duration: 0.25, ease: "easeOut" });
    }
=======
  } else {
    item.classList.add('active');
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
  }
}

/* -------------------------------------------------------------
<<<<<<< HEAD
 * 8. Intake Consultation Form Submission
=======
 * 7. Intake Consultation Form Submission
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
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
<<<<<<< HEAD
  submitBtn.innerText = 'Enviando Consulta Prioritaria...';
=======
  submitBtn.innerText = 'Enviando Consulta...';
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c

  setTimeout(() => {
    submitBtn.classList.add('hidden');
    successBox.classList.remove('hidden');

<<<<<<< HEAD
    if (typeof window.Motion !== 'undefined') {
      window.Motion.animate(successBox, { opacity: [0, 1], scale: [0.95, 1] }, { type: "spring", stiffness: 350, damping: 20 });
    }

    const waText = encodeURIComponent(
      `*Nueva Consulta desde legalandbusiness.com.co*\n\n` +
      `*Nombre:* ${name}\n` +
      `*Empresa:* ${company || 'Particular / En proceso'}\n` +
=======
    // Also prepare a WhatsApp dispatch bridge if user wants instant conversation
    const waText = encodeURIComponent(
      `*Nueva Consulta desde legalandbusiness.com.co*\n\n` +
      `*Nombre:* ${name}\n` +
      `*Empresa:* ${company || 'Particular / En formación'}\n` +
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
      `*Ciudad:* ${city}\n` +
      `*Teléfono:* ${phone}\n` +
      `*Área de Interés:* ${area}\n` +
      `*Resumen:* ${message}\n\n` +
<<<<<<< HEAD
      `_Solicitud de asesoría prioritaria con el Dr. Julián Fajardo_`
    );

    const openDirect = confirm(
      `¡Gracias ${name}! Su solicitud fue registrada. ¿Desea además abrir un chat prioritario directo por WhatsApp con el Dr. Julián Fajardo ahora mismo?`
=======
      `_Solicitud de atención prioritaria con el Dr. Julián Fajardo_`
    );

    // Option to open WhatsApp directly with formatted case intake
    const openDirect = confirm(
      `¡Gracias ${name}! Su mensaje fue registrado. ¿Desea además abrir un chat prioritario directo por WhatsApp con el Dr. Julián Fajardo ahora mismo?`
>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
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
<<<<<<< HEAD
      successBox.classList.add('hidden');
    }, 7000);
  }, 750);
}
=======
    }, 6000);
  }, 900);
}

>>>>>>> c76677fb61e4c4441ab9ab5d88821cd083e7231c
