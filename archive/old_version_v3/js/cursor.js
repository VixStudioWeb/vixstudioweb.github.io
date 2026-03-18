/* ============================================================
   VIX STUDIO — Custom Cursor System
   Smooth trailing cursor with magnetic effects and glow trail
   ============================================================ */

class VixCursor {
  constructor() {
    this.dot = document.getElementById('cursorDot');
    this.outline = document.getElementById('cursorOutline');
    this.trailCanvas = document.getElementById('cursorTrail');
    this.ctx = this.trailCanvas ? this.trailCanvas.getContext('2d') : null;

    // State
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.dotPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.outlinePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.velocity = { x: 0, y: 0 };
    this.prevMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.isHovering = false;
    this.isHidden = false;
    this.trail = [];
    this.maxTrail = 30;
    this.isInitialized = false;

    // Check for mobile
    if (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window) {
      return;
    }

    this.init();
  }

  init() {
    this.resizeCanvas();
    this.bindEvents();
    this.animate();
    this.isInitialized = true;
  }

  resizeCanvas() {
    if (!this.trailCanvas) return;
    this.trailCanvas.width = window.innerWidth;
    this.trailCanvas.height = window.innerHeight;
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });
    window.addEventListener('resize', () => this.resizeCanvas(), { passive: true });
    document.addEventListener('mouseenter', () => this.show());
    document.addEventListener('mouseleave', () => this.hide());

    // Magnetic elements
    this.setupMagneticElements();

    // Hover targets
    this.setupHoverTargets();
  }

  setupMagneticElements() {
    const magneticEls = document.querySelectorAll('.magnetic-btn');
    magneticEls.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
        setTimeout(() => { el.style.transition = ''; }, 500);
      });
    });
  }

  setupHoverTargets() {
    const hoverTargets = document.querySelectorAll(
      'a, button, .portfolio-card, .expertise-card, .stat-card, .magnetic-btn, [data-hover]'
    );

    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.isHovering = true;
        if (this.dot) this.dot.classList.add('hovering');
        if (this.outline) this.outline.classList.add('hovering');
      });

      el.addEventListener('mouseleave', () => {
        this.isHovering = false;
        if (this.dot) this.dot.classList.remove('hovering');
        if (this.outline) this.outline.classList.remove('hovering');
      });
    });
  }

  onMouseMove(e) {
    this.prevMouse.x = this.mouse.x;
    this.prevMouse.y = this.mouse.y;
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;

    this.velocity.x = this.mouse.x - this.prevMouse.x;
    this.velocity.y = this.mouse.y - this.prevMouse.y;

    const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);

    // Add trail point when moving fast enough
    if (speed > 2) {
      this.trail.push({
        x: this.mouse.x,
        y: this.mouse.y,
        age: 0,
        speed: Math.min(speed, 50)
      });

      if (this.trail.length > this.maxTrail) {
        this.trail.shift();
      }
    }
  }

  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  show() {
    this.isHidden = false;
    if (this.dot) this.dot.style.opacity = '1';
    if (this.outline) this.outline.style.opacity = '1';
  }

  hide() {
    this.isHidden = true;
    if (this.dot) this.dot.style.opacity = '0';
    if (this.outline) this.outline.style.opacity = '0';
  }

  drawTrail() {
    if (!this.ctx || !this.trailCanvas) return;

    this.ctx.clearRect(0, 0, this.trailCanvas.width, this.trailCanvas.height);

    // Age and remove old trail points
    for (let i = this.trail.length - 1; i >= 0; i--) {
      this.trail[i].age += 1;
      if (this.trail[i].age > 20) {
        this.trail.splice(i, 1);
      }
    }

    if (this.trail.length < 2) return;

    // Draw trail
    this.ctx.beginPath();
    this.ctx.moveTo(this.trail[0].x, this.trail[0].y);

    for (let i = 1; i < this.trail.length; i++) {
      const p = this.trail[i];
      const alpha = Math.max(0, 1 - p.age / 20) * 0.4;
      const width = Math.max(0.5, (1 - p.age / 20) * (p.speed / 15));

      this.ctx.lineTo(p.x, p.y);
      this.ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
      this.ctx.lineWidth = width;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
    }

    this.ctx.stroke();

    // Glow effect on trail
    if (this.trail.length > 3) {
      const last = this.trail[this.trail.length - 1];
      const glow = this.ctx.createRadialGradient(last.x, last.y, 0, last.x, last.y, 15);
      glow.addColorStop(0, 'rgba(0, 212, 255, 0.15)');
      glow.addColorStop(1, 'rgba(0, 212, 255, 0)');
      this.ctx.fillStyle = glow;
      this.ctx.fillRect(last.x - 15, last.y - 15, 30, 30);
    }
  }

  animate() {
    // Smooth lerp for cursor elements
    this.dotPos.x = this.lerp(this.dotPos.x, this.mouse.x, 0.2);
    this.dotPos.y = this.lerp(this.dotPos.y, this.mouse.y, 0.2);
    this.outlinePos.x = this.lerp(this.outlinePos.x, this.mouse.x, 0.08);
    this.outlinePos.y = this.lerp(this.outlinePos.y, this.mouse.y, 0.08);

    if (this.dot) {
      this.dot.style.left = `${this.dotPos.x}px`;
      this.dot.style.top = `${this.dotPos.y}px`;
    }

    if (this.outline) {
      this.outline.style.left = `${this.outlinePos.x}px`;
      this.outline.style.top = `${this.outlinePos.y}px`;
    }

    // Draw trail
    this.drawTrail();

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is ready
window.VixCursor = VixCursor;
