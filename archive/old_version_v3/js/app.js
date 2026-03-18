/* ============================================================
   VIX STUDIO — Main Application
   GSAP ScrollTrigger orchestration, animations, interactions
   ============================================================ */

(function () {
  'use strict';

  // ---------- Wait for GSAP ----------
  function waitForGSAP(callback) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      callback();
    } else {
      requestAnimationFrame(() => waitForGSAP(callback));
    }
  }

  waitForGSAP(initApp);

  function initApp() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // ---------- Loader ----------
    const loader = document.getElementById('loader');
    const loaderLogo = document.getElementById('loaderLogo');
    const loaderBarTrack = document.getElementById('loaderBarTrack');
    const loaderBar = document.getElementById('loaderBar');
    const loaderText = document.getElementById('loaderText');

    const loaderTl = gsap.timeline({
      onComplete: () => {
        initAllAnimations();
      }
    });

    if (prefersReducedMotion) {
      // Skip loader
      gsap.set(loader, { display: 'none' });
      initAllAnimations();
      return;
    }

    loaderTl
      .to(loaderLogo, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' })
      .to(loaderBarTrack, { opacity: 1, duration: 0.3 }, '-=0.3')
      .to(loaderText, { opacity: 1, duration: 0.3 }, '-=0.2')
      .to(loaderBar, { width: '100%', duration: 1.5, ease: 'power2.inOut' }, '-=0.1')
      .to(loaderLogo, { scale: 1.1, duration: 0.3, ease: 'power2.in' })
      .to(loader, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          loader.style.display = 'none';
        }
      })
      .set(loader, { display: 'none' });

    // ---------- Init All Animations ----------
    function initAllAnimations() {
      // Initialize cursor
      const cursor = new window.VixCursor();

      // Scroll progress bar
      initScrollProgress();

      // Navigation
      initNavigation();

      // Hero animations
      animateHero();

      // Scroll reveal animations
      initScrollReveals();

      // Counter animations
      initCounters();

      // Stat card mouse tracking
      initCardMouseTracking();

      // Section 2 - Horizontal scroll left (Services)
      if (!isMobile) {
        initHorizontalLeft();
      }

      // Section 4 - Horizontal scroll right (Process)
      if (!isMobile) {
        initHorizontalRight();
      }

      // Portfolio interactions
      initPortfolio();

      // Particles section observer
      initParticlesObserver();

      // Parallax effects
      initParallax();

      // Depth layers animation for process section
      initDepthLayers();

      // Panel animations for both horizontal sections
      initPanelAnimations();

      // Panel mouse tracking for distortion effect
      initPanelMouseTracking();

      // Background gradient animation on scroll
      initScrollPalette();

      // Smooth scroll for anchor links
      initSmoothScroll();

      // Mobile navigation
      initMobileNav();

      // Refresh ScrollTrigger after everything is set up
      ScrollTrigger.refresh();
    }

    // ---------- Scroll Progress ----------
    function initScrollProgress() {
      const progressBar = document.getElementById('scrollProgress');
      if (!progressBar) return;

      gsap.to(progressBar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3
        }
      });
    }

    // ---------- Navigation ----------
    function initNavigation() {
      const nav = document.getElementById('nav');

      ScrollTrigger.create({
        start: 100,
        onUpdate: (self) => {
          if (self.scroll() > 100) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
        }
      });

      // Active section tracking
      const sections = ['hero', 'intro', 'services', 'portfolio', 'process', 'contact'];
      sections.forEach(id => {
        const section = document.getElementById(id);
        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveNav(id),
          onEnterBack: () => setActiveNav(id)
        });
      });
    }

    function setActiveNav(sectionId) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionId);
      });
    }

    // ---------- Hero Animation ----------
    function animateHero() {
      const heroTl = gsap.timeline({ delay: 0.3 });

      heroTl
        .fromTo('#heroBadge', 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        )
        .set('#heroTitle', { opacity: 1 })
        .to('#heroTitle .line-inner', {
          y: '0%',
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out'
        }, '-=0.4')
        .fromTo('#heroSubtitle', 
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo('#heroCta', 
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo('#heroScroll', 
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.2'
        );

      // Hero parallax on scroll
      gsap.to('.hero-content', {
        y: -100,
        opacity: 0.3,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to('.hero-bg-gradient', {
        scale: 1.2,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // ---------- Scroll Reveals ----------
    function initScrollReveals() {
      // Fade up reveals
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Fade left reveals
      gsap.utils.toArray('.reveal-left').forEach(el => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Fade right reveals
      gsap.utils.toArray('.reveal-right').forEach(el => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Scale reveals
      gsap.utils.toArray('.reveal-scale').forEach(el => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Stagger children animation for grids
      gsap.utils.toArray('.expertise-grid, .portfolio-grid').forEach(grid => {
        const cards = grid.children;
        gsap.fromTo(cards, {
          opacity: 0,
          y: 60
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      });
    }

    // ---------- Counter Animation ----------
    function initCounters() {
      document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.count);
        if (isNaN(target)) return;

        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            el.textContent = Math.floor(counter.val) + '+';
          }
        });
      });
    }

    // ---------- Card Mouse Tracking ----------
    function initCardMouseTracking() {
      document.querySelectorAll('.stat-card, .expertise-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--mouse-x', x + '%');
          card.style.setProperty('--mouse-y', y + '%');
        });
      });
    }

    // ---------- Horizontal Scroll Left (Services) ----------
    function initHorizontalLeft() {
      const section = document.getElementById('services');
      const track = document.getElementById('servicesTrack');
      if (!section || !track) return;

      const panels = gsap.utils.toArray('#servicesTrack .h-panel');
      const totalWidth = panels.length * window.innerWidth;

      gsap.set(track, { width: totalWidth });

      gsap.to(track, {
        x: () => -(totalWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + (totalWidth - window.innerWidth),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    }

    // ---------- Horizontal Scroll Right (Process) ----------
    function initHorizontalRight() {
      const section = document.getElementById('process');
      const track = document.getElementById('processTrack');
      if (!section || !track) return;

      const panels = gsap.utils.toArray('#processTrack .h-panel');
      const totalWidth = panels.length * window.innerWidth;

      gsap.set(track, { width: totalWidth });

      // Start from right side, scroll reveals content from left
      gsap.fromTo(track, {
        x: -(totalWidth - window.innerWidth)
      }, {
        x: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + (totalWidth - window.innerWidth),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    }

    // ---------- Panel Animations ----------
    function initPanelAnimations() {
      if (isMobile) return;

      // Use IntersectionObserver to animate panel content as it enters viewport
      // This works for horizontal panels since they move into the viewport
      const panelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const panel = entry.target;
            const panelText = panel.querySelector('.panel-text');
            const panelVisual = panel.querySelector('.panel-visual');
            const panelNumber = panel.querySelector('.panel-number');
            const features = panel.querySelectorAll('.panel-feature');
            const dot = panel.querySelector('.timeline-dot');

            const tl = gsap.timeline();

            if (panelNumber) {
              tl.fromTo(panelNumber, { opacity: 0, scale: 0.8 },
                { opacity: 0.3, scale: 1, duration: 0.8, ease: 'power3.out' }, 0);
            }

            if (panelText) {
              tl.fromTo(panelText, { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.1);
            }

            if (panelVisual) {
              tl.fromTo(panelVisual, { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, 0.2);
            }

            if (features.length > 0) {
              tl.fromTo(features, { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, 0.4);
            }

            if (dot) {
              tl.fromTo(dot, { scale: 0 },
                { scale: 1, duration: 0.5, ease: 'back.out(2)' }, 0.3);
            }
          }
        });
      }, { threshold: 0.3 });

      document.querySelectorAll('.h-panel').forEach(panel => {
        panelObserver.observe(panel);
      });
    }

    // ---------- Portfolio ----------
    function initPortfolio() {
      const cards = document.querySelectorAll('.portfolio-card');
      const expanded = document.getElementById('portfolioExpanded');
      const expandedContent = document.getElementById('portfolioExpandedContent');
      const expandedInner = document.getElementById('portfolioExpandedInner');
      const expandedClose = document.getElementById('portfolioExpandedClose');
      const expandedBackdrop = document.getElementById('portfolioExpandedBackdrop');

      if (!expanded) return;

      cards.forEach(card => {
        card.addEventListener('click', () => {
          const img = card.querySelector('img');
          const info = card.querySelector('.portfolio-card-info');

          // FLIP animation manually
          const cardRect = card.getBoundingClientRect();

          // Populate expanded content
          expandedInner.innerHTML = `
            <div style="width: 100%;">
              ${img ? `<img src="${img.src}" alt="${img.alt}" style="width: 100%; height: 400px; object-fit: cover;">` : ''}
              <div style="padding: 40px;">
                <h3 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: 12px;">${info.querySelector('h3').textContent}</h3>
                <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.8;">${info.querySelector('p').textContent}</p>
                <div style="margin-top: 20px; display: flex; gap: 8px; flex-wrap: wrap;">
                  ${Array.from(info.querySelectorAll('.portfolio-tag')).map(tag =>
                    `<span class="portfolio-tag">${tag.textContent}</span>`
                  ).join('')}
                </div>
              </div>
            </div>
          `;

          // Animate in
          expanded.classList.add('active');
          document.body.style.overflow = 'hidden';

          gsap.fromTo(expandedContent,
            { scale: 0.85, opacity: 0, y: 40 },
            { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
          );

          gsap.fromTo(expandedBackdrop,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: 'power2.out' }
          );
        });
      });

      // Close
      function closeExpanded() {
        gsap.to(expandedContent, {
          scale: 0.9, opacity: 0, y: 20, duration: 0.4, ease: 'power3.in'
        });
        gsap.to(expandedBackdrop, {
          opacity: 0, duration: 0.3, ease: 'power2.in',
          onComplete: () => {
            expanded.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      }

      if (expandedClose) expandedClose.addEventListener('click', closeExpanded);
      if (expandedBackdrop) expandedBackdrop.addEventListener('click', closeExpanded);

      // ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && expanded.classList.contains('active')) {
          closeExpanded();
        }
      });
    }

    // ---------- Particles Observer ----------
    function initParticlesObserver() {
      const particlesSection = document.getElementById('particles');
      if (!particlesSection) return;

      let particleSystem = null;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!particleSystem) {
              particleSystem = new window.VixParticles('particlesCanvas');
            }
            particleSystem.start();
            particleSystem.autoFormText();
          } else {
            if (particleSystem) {
              particleSystem.stop();
            }
          }
        });
      }, { threshold: 0.2 });

      observer.observe(particlesSection);
    }

    // ---------- Parallax ----------
    function initParallax() {
      // Hero cheetah
      gsap.to('.hero-cheetah', {
        y: -100,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Background texture
      gsap.to('.hero-bg-texture', {
        y: 80,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Section decorations
      gsap.utils.toArray('.panel-decoration').forEach(el => {
        gsap.to(el, {
          y: gsap.utils.random(-50, 50),
          x: gsap.utils.random(-30, 30),
          scrollTrigger: {
            trigger: el.closest('.section'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      });
    }

    // ---------- Depth Layers (Process Section) ----------
    function initDepthLayers() {
      if (isMobile) return;

      const processSection = document.getElementById('process');
      if (!processSection) return;

      document.querySelectorAll('.depth-layer').forEach(layer => {
        const speed = parseFloat(layer.dataset.depthSpeed) || 0.1;
        const isFront = layer.classList.contains('front');

        // Mouse parallax for depth effect
        processSection.addEventListener('mousemove', (e) => {
          const rect = processSection.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(layer, {
            x: x * (isFront ? 40 : 15),
            y: y * (isFront ? 40 : 15),
            duration: 1,
            ease: 'power2.out'
          });
        });
      });
    }

    // ---------- Panel Mouse Tracking ----------
    function initPanelMouseTracking() {
      document.querySelectorAll('.h-panel').forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
          const rect = panel.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          panel.style.setProperty('--mx', x + '%');
          panel.style.setProperty('--my', y + '%');
        }, { passive: true });
      });
    }

    // ---------- Scroll Palette ----------
    function initScrollPalette() {
      // Subtle background color shifts between sections
      const sections = [
        { trigger: '#hero', bg: '#050510' },
        { trigger: '#intro', bg: '#060614' },
        { trigger: '#expertise', bg: '#080818' },
        { trigger: '#services', bg: '#0a0a1a' },
        { trigger: '#portfolio', bg: '#0a0812' },
        { trigger: '#particles', bg: '#080815' },
        { trigger: '#process', bg: '#08100f' },
        { trigger: '#contact', bg: '#060612' }
      ];

      sections.forEach(({ trigger, bg }) => {
        const el = document.querySelector(trigger);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => gsap.to('body', { backgroundColor: bg, duration: 1, ease: 'power2.inOut' }),
          onEnterBack: () => gsap.to('body', { backgroundColor: bg, duration: 1, ease: 'power2.inOut' })
        });
      });
    }

    // ---------- Smooth Scroll ----------
    function initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const target = document.querySelector(targetId);
          if (!target) return;

          gsap.to(window, {
            scrollTo: { y: target, offsetY: 0 },
            duration: 1.2,
            ease: 'power3.inOut'
          });

          // Close mobile nav if open
          const navLinks = document.getElementById('navLinks');
          if (navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
          }
        });
      });
    }

    // ---------- Mobile Navigation ----------
    function initMobileNav() {
      const toggle = document.getElementById('navToggle');
      const navLinks = document.getElementById('navLinks');
      if (!toggle || !navLinks) return;

      toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        // Animate hamburger
        const spans = toggle.querySelectorAll('span');
        if (navLinks.classList.contains('open')) {
          gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
          gsap.to(spans[1], { opacity: 0, duration: 0.2 });
          gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });
        } else {
          gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
          gsap.to(spans[1], { opacity: 1, duration: 0.2 });
          gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        }
      });
    }

    // ---------- Window Resize ----------
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }, { passive: true });

    // ---------- Animated Background Gradient ----------
    (function initBgGradient() {
      const canvas = document.createElement('canvas');
      canvas.id = 'bgGradientCanvas';
      canvas.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:0.5;';
      document.body.prepend(canvas);
      const ctx = canvas.getContext('2d');
      let w, h;

      function resize() {
        w = canvas.width = window.innerWidth / 4;
        h = canvas.height = window.innerHeight / 4;
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.imageRendering = 'auto';
      }
      resize();
      window.addEventListener('resize', resize, { passive: true });

      let t = 0;
      function draw() {
        t += 0.003;
        ctx.clearRect(0, 0, w, h);

        // Animated gradient blobs
        const cx1 = w * (0.3 + 0.2 * Math.sin(t * 0.7));
        const cy1 = h * (0.4 + 0.2 * Math.cos(t * 0.5));
        const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, w * 0.5);
        g1.addColorStop(0, 'rgba(0, 212, 255, 0.04)');
        g1.addColorStop(1, 'transparent');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, w, h);

        const cx2 = w * (0.7 + 0.15 * Math.cos(t * 0.6));
        const cy2 = h * (0.6 + 0.15 * Math.sin(t * 0.8));
        const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, w * 0.4);
        g2.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
        g2.addColorStop(1, 'transparent');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, w, h);

        const cx3 = w * (0.5 + 0.2 * Math.sin(t * 0.9 + 1));
        const cy3 = h * (0.3 + 0.2 * Math.cos(t * 0.4 + 2));
        const g3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, w * 0.35);
        g3.addColorStop(0, 'rgba(16, 185, 129, 0.025)');
        g3.addColorStop(1, 'transparent');
        ctx.fillStyle = g3;
        ctx.fillRect(0, 0, w, h);

        requestAnimationFrame(draw);
      }

      if (!prefersReducedMotion) {
        draw();
      }
    })();
  }
})();
