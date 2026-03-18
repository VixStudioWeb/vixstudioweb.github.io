/* ============================================
   VIX STUDIO WEB — Custom Cursor
   Smooth cursor with trail and magnetic effects
   ============================================ */

class VixCursor {
  constructor() {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.cursor = document.querySelector('.cursor');
    this.dot = document.querySelector('.cursor-dot');
    this.ring = document.querySelector('.cursor-ring');
    if (!this.cursor) return;

    this.pos = { x: -100, y: -100 };
    this.target = { x: -100, y: -100 };
    this.velocity = { x: 0, y: 0 };
    this.trail = [];
    this.trailCanvas = null;
    this.trailCtx = null;
    this.active = false;
    this.hovering = false;
    this.lerp = 0.15;
    this.trailLerp = 0.08;

    this._init();
  }

  _init() {
    // Create trail canvas
    this.trailCanvas = document.createElement('canvas');
    this.trailCanvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9997;';
    document.body.appendChild(this.trailCanvas);
    this.trailCtx = this.trailCanvas.getContext('2d');
    this._resizeTrail();

    // Trail points
    for (let i = 0; i < 12; i++) {
      this.trail.push({ x: -100, y: -100 });
    }

    // Events
    document.addEventListener('mousemove', (e) => {
      this.target.x = e.clientX;
      this.target.y = e.clientY;
      if (!this.active) {
        this.pos.x = e.clientX;
        this.pos.y = e.clientY;
        this.trail.forEach(p => { p.x = e.clientX; p.y = e.clientY; });
        this.active = true;
      }
    }, { passive: true });

    document.addEventListener('mousedown', () => document.body.classList.add('cursor-active'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-active'));

    // Hover detection
    this._bindHoverables();
    window.addEventListener('resize', () => this._resizeTrail());

    this._animate();
  }

  _resizeTrail() {
    if (!this.trailCanvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.trailCanvas.width = window.innerWidth * dpr;
    this.trailCanvas.height = window.innerHeight * dpr;
    this.trailCanvas.style.width = window.innerWidth + 'px';
    this.trailCanvas.style.height = window.innerHeight + 'px';
    this.trailCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  _bindHoverables() {
    const hoverables = 'a, button, .magnetic-btn, .magnetic-area, .service-card, .audience-card, input, textarea, [role="button"]';

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverables)) {
        document.body.classList.add('cursor-hover');
        this.hovering = true;
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverables)) {
        document.body.classList.remove('cursor-hover');
        this.hovering = false;
      }
    });
  }

  _animate() {
    // Lerp cursor position
    this.velocity.x = this.target.x - this.pos.x;
    this.velocity.y = this.target.y - this.pos.y;
    this.pos.x += this.velocity.x * this.lerp;
    this.pos.y += this.velocity.y * this.lerp;

    // Update cursor element
    if (this.cursor) {
      this.cursor.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;
    }

    // Update trail
    for (let i = 0; i < this.trail.length; i++) {
      const prev = i === 0 ? this.pos : this.trail[i - 1];
      const lerpFactor = this.trailLerp * (1 - i * 0.06);
      this.trail[i].x += (prev.x - this.trail[i].x) * lerpFactor;
      this.trail[i].y += (prev.y - this.trail[i].y) * lerpFactor;
    }

    // Draw trail
    if (this.trailCtx && this.active) {
      this.trailCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
      const trailOpacity = Math.min(speed / 80, 0.35);

      if (trailOpacity > 0.02) {
        this.trailCtx.beginPath();
        this.trailCtx.moveTo(this.trail[0].x, this.trail[0].y);
        for (let i = 1; i < this.trail.length - 1; i++) {
          const xc = (this.trail[i].x + this.trail[i + 1].x) / 2;
          const yc = (this.trail[i].y + this.trail[i + 1].y) / 2;
          this.trailCtx.quadraticCurveTo(this.trail[i].x, this.trail[i].y, xc, yc);
        }
        this.trailCtx.strokeStyle = `rgba(255, 204, 0, ${trailOpacity})`;
        this.trailCtx.lineWidth = Math.max(1, 3 - speed * 0.02);
        this.trailCtx.lineCap = 'round';
        this.trailCtx.stroke();
      }
    }

    requestAnimationFrame(() => this._animate());
  }

  // Magnetic effect for buttons
  static initMagnetic() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.querySelectorAll('.magnetic-btn').forEach(btn => {
      const strength = 0.3;
      const radius = 100;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          const force = (1 - dist / radius) * strength;
          btn.style.transform = `translate3d(${dx * force}px, ${dy * force}px, 0)`;
        }
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => { btn.style.transition = ''; }, 500);
      });
    });

    // Magnetic area (cards)
    document.querySelectorAll('.magnetic-area').forEach(area => {
      const strength = 0.05;

      area.addEventListener('mousemove', (e) => {
        const rect = area.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        area.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      });

      area.addEventListener('mouseleave', () => {
        area.style.transform = '';
        area.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => { area.style.transition = ''; }, 600);
      });
    });
  }
}

window.VixCursor = VixCursor;
