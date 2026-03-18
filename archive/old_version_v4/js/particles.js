/* ============================================
   VIX STUDIO WEB — Particle System
   Canvas-based particle engine forming the VIX logo
   ============================================ */

class ParticleSystem {
  constructor(canvasId, logoSrc) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.logoSrc = logoSrc;
    this.particles = [];
    this.mouse = { x: -9999, y: -9999, vx: 0, vy: 0, prevX: -9999, prevY: -9999, down: false, speed: 0 };
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dispersed = false;
    this.disperseProgress = 0;
    this.animId = null;
    this.time = 0;
    this.ready = false;

    // Config
    this.config = {
      particleCount: 2500,
      mouseRadius: 120,
      mouseForce: 0.08,
      clickForce: 12,
      vortexForce: 0.03,
      returnForce: 0.04,
      friction: 0.92,
      sizeMin: 1.2,
      sizeMax: 3,
      trailLength: 6,
      speedColorShift: true
    };

    // Reduce particles on mobile
    if (window.innerWidth < 768) {
      this.config.particleCount = 1200;
      this.config.mouseRadius = 80;
    }

    this._resize = this._resize.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._animate = this._animate.bind(this);

    this._init();
  }

  async _init() {
    this._resize();
    this._bindEvents();
    const positions = await this._sampleLogo();
    this._createParticles(positions);
    this.ready = true;
    this._animate();
  }

  _resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  _bindEvents() {
    window.addEventListener('resize', () => {
      this._resize();
      if (this.ready) this._repositionTargets();
    });
    this.canvas.addEventListener('mousemove', this._onMouseMove, { passive: true });
    this.canvas.addEventListener('mousedown', this._onMouseDown);
    this.canvas.addEventListener('mouseup', this._onMouseUp);
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -9999;
      this.mouse.y = -9999;
      this.mouse.down = false;
    });
    this.canvas.addEventListener('touchstart', this._onTouchStart, { passive: true });
    this.canvas.addEventListener('touchmove', this._onTouchMove, { passive: true });
    this.canvas.addEventListener('touchend', this._onTouchEnd);
  }

  _onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.prevX = this.mouse.x;
    this.mouse.prevY = this.mouse.y;
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
    this.mouse.vx = this.mouse.x - this.mouse.prevX;
    this.mouse.vy = this.mouse.y - this.mouse.prevY;
    this.mouse.speed = Math.sqrt(this.mouse.vx * this.mouse.vx + this.mouse.vy * this.mouse.vy);
  }

  _onMouseDown(e) {
    this.mouse.down = true;
    this._explode();
  }

  _onMouseUp() {
    this.mouse.down = false;
  }

  _onTouchStart(e) {
    const t = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = t.clientX - rect.left;
    this.mouse.y = t.clientY - rect.top;
    this.mouse.down = true;
    this._explode();
  }

  _onTouchMove(e) {
    const t = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.prevX = this.mouse.x;
    this.mouse.prevY = this.mouse.y;
    this.mouse.x = t.clientX - rect.left;
    this.mouse.y = t.clientY - rect.top;
    this.mouse.vx = this.mouse.x - this.mouse.prevX;
    this.mouse.vy = this.mouse.y - this.mouse.prevY;
    this.mouse.speed = Math.sqrt(this.mouse.vx * this.mouse.vx + this.mouse.vy * this.mouse.vy);
  }

  _onTouchEnd() {
    this.mouse.down = false;
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  }

  async _sampleLogo() {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const sampleSize = 200;
        const offscreen = document.createElement('canvas');
        const octx = offscreen.getContext('2d');
        const aspect = img.width / img.height;
        let sw, sh;
        if (aspect > 1) {
          sw = sampleSize;
          sh = sampleSize / aspect;
        } else {
          sh = sampleSize;
          sw = sampleSize * aspect;
        }
        offscreen.width = sw;
        offscreen.height = sh;
        octx.drawImage(img, 0, 0, sw, sh);
        const data = octx.getImageData(0, 0, sw, sh).data;
        const positions = [];
        const step = 2;
        for (let y = 0; y < sh; y += step) {
          for (let x = 0; x < sw; x += step) {
            const i = (y * sw + x) * 4;
            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
            if (a > 50) {
              positions.push({
                x: (x / sw - 0.5),
                y: (y / sh - 0.5),
                r, g, b, a
              });
            }
          }
        }
        resolve(positions);
      };
      img.onerror = () => {
        // Fallback: create "VIX" text positions
        const fallbackPositions = this._createTextPositions();
        resolve(fallbackPositions);
      };
      img.src = this.logoSrc;
    });
  }

  _createTextPositions() {
    const offscreen = document.createElement('canvas');
    const octx = offscreen.getContext('2d');
    const w = 300, h = 120;
    offscreen.width = w;
    offscreen.height = h;
    octx.fillStyle = '#ffcc00';
    octx.font = 'bold 90px "Space Grotesk", sans-serif';
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    octx.fillText('VIX', w / 2, h / 2);
    const data = octx.getImageData(0, 0, w, h).data;
    const positions = [];
    const step = 2;
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4;
        if (data[i + 3] > 50) {
          positions.push({
            x: (x / w - 0.5),
            y: (y / h - 0.5),
            r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3]
          });
        }
      }
    }
    return positions;
  }

  _createParticles(positions) {
    const count = Math.min(this.config.particleCount, positions.length);
    // Shuffle and pick
    const shuffled = positions.sort(() => Math.random() - 0.5).slice(0, count);
    const logoScale = Math.min(this.width, this.height) * 0.55;
    const cx = this.width / 2;
    const cy = this.height / 2;

    this.particles = shuffled.map(pos => {
      const tx = cx + pos.x * logoScale;
      const ty = cy + pos.y * logoScale;
      // Start from random positions
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * Math.max(this.width, this.height) * 0.8;
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        tx, ty,
        vx: 0,
        vy: 0,
        size: this.config.sizeMin + Math.random() * (this.config.sizeMax - this.config.sizeMin),
        baseR: pos.r,
        baseG: pos.g,
        baseB: pos.b,
        r: pos.r,
        g: pos.g,
        b: pos.b,
        alpha: (pos.a / 255) * (0.6 + Math.random() * 0.4),
        baseAlpha: (pos.a / 255) * (0.6 + Math.random() * 0.4),
        life: 1,
        angle: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() - 0.5) * 0.02,
        depth: 0.5 + Math.random() * 0.5
      };
    });

    // Add ambient particles
    const ambientCount = Math.floor(count * 0.15);
    for (let i = 0; i < ambientCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        tx: Math.random() * this.width,
        ty: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 0.5 + Math.random() * 1.5,
        baseR: 255, baseG: 204, baseB: 0,
        r: 255, g: 204, b: 0,
        alpha: 0.1 + Math.random() * 0.2,
        baseAlpha: 0.1 + Math.random() * 0.2,
        life: 1,
        angle: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() - 0.5) * 0.01,
        depth: 0.3 + Math.random() * 0.3,
        ambient: true
      });
    }

    this._logoPositions = shuffled;
  }

  _repositionTargets() {
    const logoScale = Math.min(this.width, this.height) * 0.55;
    const cx = this.width / 2;
    const cy = this.height / 2;
    this.particles.forEach((p, i) => {
      if (!p.ambient && this._logoPositions[i]) {
        p.tx = cx + this._logoPositions[i].x * logoScale;
        p.ty = cy + this._logoPositions[i].y * logoScale;
      } else if (p.ambient) {
        p.tx = Math.random() * this.width;
        p.ty = Math.random() * this.height;
      }
    });
  }

  _explode() {
    const mx = this.mouse.x;
    const my = this.mouse.y;
    const radius = this.config.mouseRadius * 2;
    this.particles.forEach(p => {
      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        const force = (1 - dist / radius) * this.config.clickForce;
        const angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * force;
        p.vy += Math.sin(angle) * force;
      }
    });
  }

  disperse(progress) {
    this.disperseProgress = Math.max(0, Math.min(1, progress));
    this.dispersed = progress > 0.01;
  }

  reformLogo() {
    this.dispersed = false;
    this.disperseProgress = 0;
  }

  _animate() {
    this.time++;
    this.ctx.clearRect(0, 0, this.width, this.height);

    const mx = this.mouse.x;
    const my = this.mouse.y;
    const mouseRadius = this.config.mouseRadius;
    const isHolding = this.mouse.down;
    const speed = this.mouse.speed;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Disperse effect
      if (this.dispersed && !p.ambient) {
        const disperseForce = this.disperseProgress * 0.02;
        const angle = Math.atan2(p.y - this.height / 2, p.x - this.width / 2);
        const drift = this.disperseProgress * 2;
        p.vx += Math.cos(angle) * disperseForce + (Math.random() - 0.5) * drift * 0.1;
        p.vy += Math.sin(angle) * disperseForce + (Math.random() - 0.5) * drift * 0.1;
        p.alpha = p.baseAlpha * (1 - this.disperseProgress * 0.8);
      }

      // Return to target (logo formation)
      if (!this.dispersed || p.ambient) {
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx += dx * this.config.returnForce * p.depth;
        p.vy += dy * this.config.returnForce * p.depth;
        p.alpha += (p.baseAlpha - p.alpha) * 0.05;
      }

      // Mouse interaction
      const dmx = p.x - mx;
      const dmy = p.y - my;
      const distMouse = Math.sqrt(dmx * dmx + dmy * dmy);

      if (distMouse < mouseRadius && mx > 0 && my > 0) {
        if (isHolding) {
          // Vortex: attract + orbit
          const angle = Math.atan2(dmy, dmx);
          const force = (1 - distMouse / mouseRadius) * this.config.vortexForce;
          p.vx -= Math.cos(angle) * force * 3;
          p.vy -= Math.sin(angle) * force * 3;
          // Orbit component
          const perpAngle = angle + Math.PI / 2;
          p.vx += Math.cos(perpAngle) * force * 5;
          p.vy += Math.sin(perpAngle) * force * 5;
        } else {
          // Repulsion
          const angle = Math.atan2(dmy, dmx);
          const force = (1 - distMouse / mouseRadius) * this.config.mouseForce;
          p.vx += Math.cos(angle) * force * 8;
          p.vy += Math.sin(angle) * force * 8;
        }
      }

      // Apply velocity
      p.vx *= this.config.friction;
      p.vy *= this.config.friction;
      p.x += p.vx;
      p.y += p.vy;

      // Ambient particles float
      if (p.ambient) {
        p.angle += p.orbitSpeed;
        p.x += Math.sin(p.angle) * 0.3;
        p.y += Math.cos(p.angle * 0.7) * 0.2;
        // Wrap around
        if (p.x < -20) p.x = this.width + 20;
        if (p.x > this.width + 20) p.x = -20;
        if (p.y < -20) p.y = this.height + 20;
        if (p.y > this.height + 20) p.y = -20;
      }

      // Color shift by velocity
      const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (this.config.speedColorShift) {
        const shift = Math.min(vel / 10, 1);
        p.r = Math.round(p.baseR + (255 - p.baseR) * shift);
        p.g = Math.round(p.baseG + (204 - p.baseG) * shift * 0.5);
        p.b = Math.round(p.baseB + (100 - p.baseB) * shift);
      }

      // Draw particle
      const alpha = p.alpha * (p.ambient ? (0.5 + Math.sin(this.time * 0.02 + i) * 0.3) : 1);
      if (alpha < 0.01) continue;

      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * (p.ambient ? 1 : (1 + vel * 0.05)), 0, Math.PI * 2);
      this.ctx.fill();

      // Glow for fast particles
      if (vel > 3) {
        this.ctx.globalAlpha = alpha * 0.3;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    // Trail for fast mouse movement
    if (speed > 15 && mx > 0 && my > 0) {
      const trailCount = Math.min(Math.floor(speed / 5), 8);
      for (let t = 0; t < trailCount; t++) {
        this.ctx.globalAlpha = 0.15 - t * 0.02;
        this.ctx.fillStyle = '#ffcc00';
        this.ctx.beginPath();
        this.ctx.arc(
          mx - this.mouse.vx * t * 0.3 + (Math.random() - 0.5) * 10,
          my - this.mouse.vy * t * 0.3 + (Math.random() - 0.5) * 10,
          2 + Math.random() * 3,
          0, Math.PI * 2
        );
        this.ctx.fill();
      }
    }

    this.ctx.globalAlpha = 1;
    this.animId = requestAnimationFrame(this._animate);
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this._resize);
  }
}

// Export globally
window.ParticleSystem = ParticleSystem;
