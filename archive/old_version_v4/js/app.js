/* ============================================
   VIX STUDIO WEB — Main Application
   GSAP ScrollTrigger animations, diagonal scroll,
   reveal system, and section orchestration
   ============================================ */

(function () {
  'use strict';

  // ── Utilities ─────────────────────────────
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Wait for DOM + GSAP ───────────────────
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded');
      // Fallback: show all content
      document.querySelectorAll('.reveal-text > span').forEach(el => el.style.transform = 'translateY(0)');
      document.querySelectorAll('.reveal-fade').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);

    // ── Initialize Systems ──────────────────
    initParticles();
    initCursor();
    initNav();
    initRevealSystem();
    initHeroAnimations();
    initServicesAnimations();
    initProcessSection();
    initAudienceAnimations();
    initPortfolioSection();
    initAboutAnimations();
    initCTASection();
    initMobileMenu();
  });

  // ── Particle System ───────────────────────
  function initParticles() {
    if (prefersReducedMotion) return;
    const ps = new ParticleSystem('particles-canvas', 'images/logo.png');

    // Disperse particles on scroll
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        ps.disperse(self.progress);
      }
    });

    // Global access for logo reconstruction
    window.vixParticles = ps;
    window.reformVixLogo = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => ps.reformLogo(), 500);
    };
  }

  // ── Cursor ────────────────────────────────
  function initCursor() {
    if (prefersReducedMotion) return;
    new VixCursor();
    VixCursor.initMagnetic();
  }

  // ── Navigation ────────────────────────────
  function initNav() {
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const scrollY = self.scroll();
        if (scrollY > 80) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        lastScroll = scrollY;
      }
    });

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          // Close mobile menu if open
          document.getElementById('mobile-menu')?.classList.remove('active');
          document.getElementById('nav-hamburger')?.classList.remove('active');

          if (typeof ScrollToPlugin !== 'undefined') {
            gsap.to(window, {
              scrollTo: { y: target, offsetY: 0 },
              duration: 1.2,
              ease: 'power3.inOut'
            });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // ── Mobile Menu ───────────────────────────
  function initMobileMenu() {
    const hamburger = document.getElementById('nav-hamburger');
    const menu = document.getElementById('mobile-menu');
    if (!hamburger || !menu) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
    });

    menu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
      });
    });
  }

  // ── Reveal System ─────────────────────────
  function initRevealSystem() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-text, .reveal-fade').forEach(el => el.classList.add('revealed'));
      return;
    }

    // Reveal text (slide up)
    document.querySelectorAll('.reveal-text').forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          el.classList.add('revealed');
        }
      });
    });

    // Reveal fade
    document.querySelectorAll('.reveal-fade').forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          const delay = parseFloat(el.dataset.delay || 0) * 1000;
          setTimeout(() => el.classList.add('revealed'), delay);
        }
      });
    });
  }

  // ── Hero Animations ───────────────────────
  function initHeroAnimations() {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to('.hero-overline', {
      duration: 0,
      onComplete: () => document.querySelector('.hero-overline')?.classList.add('revealed')
    })
      .to('.hero-title .title-line', {
        duration: 0,
        stagger: 0.12,
        onComplete: function () {
          document.querySelectorAll('.hero-title .reveal-text').forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 120);
          });
        }
      }, '+=0.2')
      .to('.hero-subtitle', {
        duration: 0,
        delay: 0.6,
        onComplete: () => document.querySelector('.hero-subtitle')?.classList.add('revealed')
      })
      .to('.hero-scroll-hint', {
        duration: 0,
        delay: 0.3,
        onComplete: () => document.querySelector('.hero-scroll-hint')?.classList.add('revealed')
      });

    // Parallax hero content on scroll
    gsap.to('.hero-content', {
      y: -100,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '60% top',
        scrub: 1
      }
    });
  }

  // ── Services Animations ───────────────────
  function initServicesAnimations() {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        }
      });
    });
  }

  // ── Process Section (Diagonal Scroll) ─────
  function initProcessSection() {
    const section = document.querySelector('#process');
    const track = document.querySelector('.process-track');
    const steps = document.querySelectorAll('.process-step');
    if (!section || !track || !steps.length) return;

    // Calculate track width
    const getTrackWidth = () => track.scrollWidth - window.innerWidth;

    // Horizontal + diagonal scroll
    const scrollTween = gsap.to(track, {
      x: () => -getTrackWidth(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => '+=' + (getTrackWidth() + window.innerWidth * 0.5),
        pin: true,
        scrub: 1.5,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    // Diagonal effect: slight vertical movement + rotation
    if (!prefersReducedMotion) {
      gsap.to(track, {
        y: 40,
        rotation: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + (getTrackWidth() + window.innerWidth * 0.5),
          scrub: 2
        }
      });
    }

    // Step activation
    steps.forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        containerAnimation: scrollTween,
        start: 'left 70%',
        end: 'right 30%',
        onEnter: () => step.classList.add('active'),
        onLeave: () => step.classList.remove('active'),
        onEnterBack: () => step.classList.add('active'),
        onLeaveBack: () => step.classList.remove('active')
      });

      // Stagger reveal
      if (!prefersReducedMotion) {
        gsap.from(step, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            containerAnimation: scrollTween,
            start: 'left 85%',
            once: true
          }
        });
      }
    });

    // Draw line between steps
    _drawProcessLine(steps);
  }

  function _drawProcessLine(steps) {
    const svg = document.querySelector('.process-line');
    const path = document.querySelector('.process-line-path');
    if (!svg || !path || !steps.length) return;

    function updateLine() {
      const track = document.querySelector('.process-track');
      if (!track) return;
      const trackRect = track.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();

      svg.setAttribute('width', track.scrollWidth);
      svg.setAttribute('height', track.offsetHeight);
      svg.style.width = track.scrollWidth + 'px';
      svg.style.height = track.offsetHeight + 'px';

      let d = '';
      steps.forEach((step, i) => {
        const rect = step.getBoundingClientRect();
        const x = step.offsetLeft + step.offsetWidth / 2;
        const y = step.offsetTop + step.offsetHeight / 2;
        if (i === 0) {
          d += `M ${x} ${y}`;
        } else {
          const prevStep = steps[i - 1];
          const px = prevStep.offsetLeft + prevStep.offsetWidth / 2;
          const py = prevStep.offsetTop + prevStep.offsetHeight / 2;
          const cpx = (px + x) / 2;
          d += ` C ${cpx} ${py}, ${cpx} ${y}, ${x} ${y}`;
        }
      });
      path.setAttribute('d', d);
    }

    updateLine();
    window.addEventListener('resize', updateLine);
  }

  // ── Audience Animations ───────────────────
  function initAudienceAnimations() {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.audience-card');
    cards.forEach((card, i) => {
      // Asymmetric entrance: alternate from left/right
      const xOffset = i % 2 === 0 ? -40 : 40;
      gsap.from(card, {
        x: xOffset,
        y: 50,
        opacity: 0,
        duration: 0.9,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        }
      });
    });
  }

  // ── Portfolio Section ─────────────────────
  function initPortfolioSection() {
    const projects = document.querySelectorAll('.portfolio-project');
    if (!projects.length) return;

    projects.forEach((project) => {
      // Theme transition on scroll
      ScrollTrigger.create({
        trigger: project,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => project.classList.add('in-view'),
        onLeave: () => project.classList.remove('in-view'),
        onEnterBack: () => project.classList.add('in-view'),
        onLeaveBack: () => project.classList.remove('in-view')
      });

      // Parallax images
      if (!prefersReducedMotion) {
        const images = project.querySelectorAll('.parallax-img');
        images.forEach(img => {
          const speed = parseFloat(img.dataset.speed || 1);
          const yMove = (speed - 1) * 150;
          gsap.fromTo(img, {
            y: yMove
          }, {
            y: -yMove,
            ease: 'none',
            scrollTrigger: {
              trigger: project,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            }
          });
        });

        // Content reveal
        const info = project.querySelector('.project-info');
        if (info) {
          gsap.from(info, {
            x: -40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 65%',
              once: true
            }
          });
        }

        // Images reveal
        const imgs = project.querySelectorAll('.project-img');
        imgs.forEach((img, i) => {
          gsap.from(img, {
            y: 60 + i * 20,
            opacity: 0,
            duration: 0.9,
            delay: 0.15 + i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 65%',
              once: true
            }
          });
        });
      }
    });
  }

  // ── About Animations ──────────────────────
  function initAboutAnimations() {
    if (prefersReducedMotion) return;

    const values = document.querySelectorAll('.value-item');
    values.forEach((item, i) => {
      gsap.from(item, {
        x: 30,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          once: true
        }
      });
    });
  }

  // ── CTA Section ───────────────────────────
  function initCTASection() {
    if (prefersReducedMotion) return;

    const btn = document.getElementById('cta-btn');
    if (!btn) return;

    // Spring animation on hover
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.4,
        ease: 'back.out(3)'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)'
      });
    });

    // Click spring
    btn.addEventListener('mousedown', () => {
      gsap.to(btn, { scale: 0.95, duration: 0.15, ease: 'power2.out' });
    });

    btn.addEventListener('mouseup', () => {
      gsap.to(btn, { scale: 1.05, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    });
  }

})();
