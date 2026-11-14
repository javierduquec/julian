/**
 * LEGAL & BUSINESS - JULIÁN FAJARDO
 * UI/UX Pro Max Engine & Grail-Inspired Kinetic Motion Suite (grail-app.com)
 * - Motion Library Spring Physics (motion.dev)
 * - Interactive 3D Perspective Tilt & Cursor Spotlight
 * - Ambient Stardust Particle Engine
 * - Kinetic HUD Number Counters
 * - Magnetic Button Physics & Click Ripples
 * - Client-Side Interactivity (Diagnostics, Tabs, Accordions, Intake)
 * - Defensive Hardening: Frame-busting, Input Sanitization & Bounds Checking
 */

// Defensive Frame-busting / Anti-Clickjacking protection
try {
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }
} catch (e) {
  // Handled silently if cross-origin frame restriction applies
}

document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initAwwwardsHero();
  initMagneticFrostedButton();
  initSpykerPreloader();
  initSpykerScrollReveals();
  initMotionAnimations();
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initAmbientCanvas();
  initKineticCounters();
  initCardTiltAndSpotlight();
  initMagneticButtons();
  initClickRipples();
});

/* -------------------------------------------------------------
 * 0. Spyker Cars Inspired Preloader & Scroll Revealer (spykercars.com)
 * ------------------------------------------------------------- */
function initSpykerPreloader() {
  const preloader = document.getElementById('spykerPreloader');
  const fillWrap = document.getElementById('preloaderFillWrap');
  const percentEl = document.getElementById('preloaderPercent');
  const barEl = document.getElementById('preloaderBar');

  if (!preloader) return;

  // Prevent scroll temporarily while logo fills
  document.body.classList.add('overflow-hidden');

  let currentPercent = 0;
  const targetPercent = 100;
  const duration = 1200; // 1.2s smooth luxury pacing
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progressRatio = Math.min(elapsed / duration, 1);
    
    // Smooth cubic ease out curve
    const easeProgress = 1 - Math.pow(1 - progressRatio, 3);
    currentPercent = Math.min(Math.floor(easeProgress * targetPercent), 100);

    // Liquid fill wipe from bottom to top
    const insetTop = 100 - currentPercent;
    if (fillWrap) {
      fillWrap.style.clipPath = `inset(${insetTop}% 0 0 0)`;
    }
    if (percentEl) {
      percentEl.textContent = `${currentPercent}%`;
    }
    if (barEl) {
      barEl.style.width = `${currentPercent}%`;
    }

    if (progressRatio < 1) {
      requestAnimationFrame(step);
    } else {
      setTimeout(dismissPreloader, 100);
    }
  }

  requestAnimationFrame(step);

  function dismissPreloader() {
    document.body.classList.remove('overflow-hidden');
    preloader.classList.add('preloader-hidden');
    preloader.style.opacity = '0';
    preloader.style.pointerEvents = 'none';

    if (typeof window.Motion !== 'undefined' && window.Motion.animate) {
      try {
        window.Motion.animate(
          preloader,
          { opacity: [1, 0], scale: [1, 1.05] },
          { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        );
      } catch (e) {}
    }

    // Trigger Awwwards Hero Entrance (Text Reveal + Kinetic Mask Intro)
    triggerHeroEntrance();

    // Safely remove the preloader overlay completely from DOM so it can never obscure the view
    setTimeout(() => {
      if (preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 550);
  }
}

function initSpykerScrollReveals() {
  const scrollItems = document.querySelectorAll('.spyker-scroll-item');
  if (scrollItems.length === 0) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.spykerDelay ? parseFloat(el.dataset.spykerDelay) : 0;
          
          if (delay > 0) {
            setTimeout(() => {
              el.classList.add('is-visible');
            }, delay * 1000);
          } else {
            el.classList.add('is-visible');
          }

          obs.unobserve(el);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    scrollItems.forEach(item => observer.observe(item));
  } else {
    // Immediate fallback if IntersectionObserver is unsupported
    scrollItems.forEach(item => item.classList.add('is-visible'));
  }

  // Viewport scroll verification: activates any items crossing into view during fast scrolling
  window.addEventListener('scroll', () => {
    const vh = window.innerHeight;
    document.querySelectorAll('.spyker-scroll-item:not(.is-visible)').forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < vh - 20 && rect.bottom > 0) {
        const delay = item.dataset.spykerDelay ? parseFloat(item.dataset.spykerDelay) : 0;
        if (delay > 0) {
          setTimeout(() => {
            item.classList.add('is-visible');
          }, delay * 1000);
        } else {
          item.classList.add('is-visible');
        }
      }
    });
  }, { passive: true });
}

/* -------------------------------------------------------------
 * 0.1 Lenis Smooth Scroll Engine (@studio-freight/lenis)
 * ------------------------------------------------------------- */
function initLenis() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  window.lenisInstance = lenis;

  // Synchronize Lenis with GSAP ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

/* -------------------------------------------------------------
 * 0.2 Awwwards-Level Kinetic Hero: Text Reveal & SVG Video Mask
 * ------------------------------------------------------------- */
function triggerHeroEntrance() {
  if (typeof gsap === 'undefined') return;

  // Mechanical Text Reveal: Lines slide up from beneath overflow:hidden with stagger 0.08s
  gsap.fromTo(".hero-line-inner", 
    { y: "115%" },
    { y: "0%", duration: 1.15, ease: "power4.out", stagger: 0.08, delay: 0.1 }
  );

  // Mask intro focus
  const maskGroup = document.getElementById('heroMaskScaleGroup');
  if (maskGroup) {
    gsap.fromTo(maskGroup,
      { scale: 0.88, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.3, ease: "power3.out" }
    );
  }

  // Floating controls entrance
  gsap.fromTo(".hero-ui-stagger",
    { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, delay: 0.45, ease: "power3.out" }
  );
}

function initAwwwardsHero() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const heroStage = document.getElementById('heroStage');
  const maskGroup = document.getElementById('heroMaskScaleGroup');
  const heroVideo = document.getElementById('heroVideo');

  if (!heroStage || !maskGroup) return;

  // Ensure video attempts autoplay
  if (heroVideo) {
    heroVideo.play().catch(() => {
      heroVideo.muted = true;
      heroVideo.play().catch(() => {});
    });
  }

  // Master GSAP ScrollTrigger Timeline for Hero Zoom
  const heroTL = gsap.timeline({
    scrollTrigger: {
      trigger: heroStage,
      start: "top top",
      end: "+=180%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  // A. Fade out UI badges, subtitle lines and buttons as scroll commences
  heroTL.to(".hero-ui-fade", {
    opacity: 0,
    y: -35,
    duration: 0.35,
    ease: "power2.out"
  }, 0);

  // B. Enormously scale the SVG text mask with ease: "power3.inOut" to reveal 100vw and 100vh full-screen video
  heroTL.to(maskGroup, {
    scale: 75,
    transformOrigin: "960px 540px",
    ease: "power3.inOut",
    duration: 1
  }, 0);

  // C. Soften the dark video tint as it expands into full cinema mode
  heroTL.to(".hero-video-tint", {
    opacity: 0.2,
    duration: 0.5,
    ease: "power2.inOut"
  }, 0.4);

  // D. Fullscreen cinematic caption smoothly reveals once video is completely unveiled
  heroTL.fromTo(".hero-fullscreen-caption", 
    { opacity: 0, y: 35 },
    { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
    0.65
  );
}

/* -------------------------------------------------------------
 * 0.3 Magnetic Frosted Glass Button Physics
 * ------------------------------------------------------------- */
function initMagneticFrostedButton() {
  const btn = document.getElementById('heroMagneticBtn');
  if (!btn || typeof gsap === 'undefined') return;

  window.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const distX = e.clientX - btnCenterX;
    const distY = e.clientY - btnCenterY;
    const distance = Math.hypot(distX, distY);

    // Magnetic proximity attraction radius (180px)
    if (distance < 180) {
      const pull = (180 - distance) / 180;
      gsap.to(btn, {
        x: distX * 0.32 * pull,
        y: distY * 0.32 * pull,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto"
      });
    } else {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.45)",
        overwrite: "auto"
      });
    }
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.45)",
      overwrite: "auto"
    });
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const video = document.getElementById('heroVideo');
    const soundIndicator = btn.querySelector('.sound-indicator');
    if (video) {
      video.muted = !video.muted;
      if (soundIndicator) {
        soundIndicator.textContent = video.muted ? '🔇' : '🔊';
      }
    }

    // Smoothly scroll down to the full-screen video stage view via Lenis
    if (window.lenisInstance) {
      window.lenisInstance.scrollTo('#heroStage', { offset: window.innerHeight * 0.9, duration: 1.5 });
    }
  });
}

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
    hover(btn, (element) => {
      animate(element, { scale: 1.035, y: -2 }, { type: "spring", stiffness: 450, damping: 20 });
      return () => animate(element, { scale: 1, y: 0 }, { type: "spring", stiffness: 450, damping: 20 });
    });

    press(btn, (element) => {
      animate(element, { scale: 0.95 }, { type: "spring", stiffness: 550, damping: 15 });
      return () => animate(element, { scale: 1 }, { type: "spring", stiffness: 550, damping: 15 });
    });
  });

  // 1.3 Spring Physics for Cards
  const springCards = document.querySelectorAll('[data-spring-card], .pillar-card, .service-detail-card, .case-card');
  springCards.forEach(card => {
    hover(card, (element) => {
      animate(element, { y: -6, scale: 1.01 }, { type: "spring", stiffness: 350, damping: 22 });
      return () => animate(element, { y: 0, scale: 1 }, { type: "spring", stiffness: 350, damping: 22 });
    });
  });

  // 1.4 Staggered In-View Entrance Animations for non-spyker legacy elements
  inView('.reveal-group:not(.spyker-stagger-group)', (info) => {
    const items = info.target.querySelectorAll('.reveal-item:not(.spyker-stagger-item)');
    if (items.length > 0) {
      animate(items, { opacity: [0, 1], y: [28, 0] }, {
        delay: stagger(0.08),
        type: "spring",
        stiffness: 260,
        damping: 22
      });
    }
  }, { margin: "-60px" });

  // 1.5 Section Entrance Elements for non-spyker legacy elements
  inView('[data-motion="fade-up"]:not(.spyker-reveal)', (info) => {
    animate(info.target, { opacity: [0, 1], y: [30, 0] }, {
      type: "spring",
      stiffness: 220,
      damping: 24,
      duration: 0.8
    });
  }, { margin: "-50px" });
}

/* -------------------------------------------------------------
 * 2. Grail-Inspired Ambient Stardust Canvas Engine
 * ------------------------------------------------------------- */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  const mouse = { x: -1000, y: -1000, radius: 140 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  const particleCount = Math.min(Math.floor((width * height) / 28000), 45);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.4 + 0.15),
      alpha: Math.random() * 0.45 + 0.2,
      baseAlpha: Math.random() * 0.45 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.y < 0) {
        p.y = height;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      // Mouse distance repulsion/glow
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        p.x -= (dx / dist) * force * 1.5;
        p.y -= (dy / dist) * force * 1.5;
        p.alpha = Math.min(p.baseAlpha + force * 0.5, 0.9);
      } else {
        p.alpha += (p.baseAlpha - p.alpha) * 0.05;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 119, ${p.alpha})`;
      ctx.fill();

      // Subtle constellation links
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist2 < 85) {
          const lineAlpha = (1 - dist2 / 85) * 0.08 * Math.min(p.alpha, p2.alpha);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(212, 175, 119, ${lineAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* -------------------------------------------------------------
 * 3. Kinetic HUD Number Counters (Scroll-Driven Ticker)
 * ------------------------------------------------------------- */
function initKineticCounters() {
  const counterElements = document.querySelectorAll('.stat-number[data-target]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target')) || 0;
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800; // 1.8s
        const startTime = performance.now();

        function animateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out exponential
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = Math.floor(ease * target);

          el.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(animateCount);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
            if (typeof window.Motion !== 'undefined') {
              window.Motion.animate(el, { scale: [1, 1.12, 1] }, { duration: 0.4, ease: "easeOut" });
            }
          }
        }

        requestAnimationFrame(animateCount);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------
 * 4. 3D Card Perspective Tilt & Dynamic Cursor Spotlight
 * ------------------------------------------------------------- */
function initCardTiltAndSpotlight() {
  const cards = document.querySelectorAll(
    '.pillar-card, .service-detail-card, .executive-dossier-card, .case-card, .diag-card, .faq-item, .grail-spotlight-card'
  );

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Pass coordinates to CSS variables for radial spotlight
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D perspective tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6.5; // Max 6.5 deg
      const rotateY = ((x - centerX) / centerX) * 6.5;  // Max 6.5 deg

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* -------------------------------------------------------------
 * 5. Magnetic Button Physics (Grail-Style Attraction)
 * ------------------------------------------------------------- */
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll(
    '.btn-gold-solid, .btn-gold-outline, .btn-ghost-light, .btn-whatsapp-icon, .floating-btn-whatsapp, .grail-magnetic'
  );

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.24;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.24;
      btn.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(1.03)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });
}

/* -------------------------------------------------------------
 * 6. Click Ripple Wave Animation
 * ------------------------------------------------------------- */
function initClickRipples() {
  const hosts = document.querySelectorAll('.btn-gold-solid, .btn-gold-outline, .btn-diag-next, .btn-diag-calculate');
  hosts.forEach(host => {
    host.classList.add('grail-ripple-host');
    host.addEventListener('click', (e) => {
      const rect = host.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'grail-ripple-circle';
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      host.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
}

/* -------------------------------------------------------------
 * 7. Mobile Drawer Navigation
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
 * 8. Sticky Header Blur & Dynamic Styling on Scroll
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
 * 9. Smooth Scrolling for Internal Links
 * ------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        if (window.lenisInstance) {
          window.lenisInstance.scrollTo(targetElement, { offset: -85, duration: 1.2 });
        } else {
          const headerOffset = 85;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* -------------------------------------------------------------
 * 10. Practice Areas Dual Tab Switcher with Motion Cross-Fade
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

  // Stagger emergence for the newly revealed tab cards
  targetContent.querySelectorAll('.spyker-scroll-item').forEach((item, idx) => {
    item.classList.remove('is-visible');
    setTimeout(() => {
      item.classList.add('is-visible');
    }, 40 + (idx * 60));
  });

  if (typeof window.Motion !== 'undefined') {
    window.Motion.animate(targetContent, { opacity: [0, 1], y: [16, 0] }, {
      type: "spring",
      stiffness: 300,
      damping: 24
    });
  }
}

/* -------------------------------------------------------------
 * 11. Interactive Legal Risk Diagnostic Quiz
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
 * 12. FAQ Accordion Toggle with Motion Smooth Springs
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
 * 13. Intake Consultation Form Submission
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

  // Defensive input length boundary checks (prevent URI buffer overflow)
  if (name.length > 80 || company.length > 100 || phone.length > 25 || email.length > 100 || city.length > 80 || message.length > 1500) {
    alert('Uno de los campos supera la longitud máxima permitida.');
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
      window.open(`https://wa.me/573223106909?text=${waText}`, '_blank', 'noopener,noreferrer');
    }

    setTimeout(() => {
      document.getElementById('contactForm').reset();
      submitBtn.disabled = false;
      submitBtn.innerText = 'Enviar Consulta para Evaluación Prioritaria';
      submitBtn.classList.remove('hidden');
      successBox.classList.add('hidden');
    }, 7000);
  }, 750);
}
