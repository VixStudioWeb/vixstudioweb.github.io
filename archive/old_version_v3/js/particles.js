/* ============================================================
   VIX STUDIO — Interactive Particle System
   Canvas-based particle sandbox with mouse interactions,
   color shifts, explosions, gravity wells, and text formation
   ============================================================ */

class VixParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 800;
    this.isActive = false;
    this.isVisible = false;

    // Mouse state
    this.mouse = {
      x: 0, y: 0,
      prevX: 0, prevY: 0,
      isDown: false,
      holdTime: 0,
      speed: 0
    };

    // Text formation
    this.textPoints = [];
    this.isFormingText = false;
    this.formationProgress = 0;

    // Color palette
    this.colors = [
      { r: 0, g: 212, b: 255 },    // Cyan
      { r: 139, g: 92, b: 246 },   // Purple
      { r: 16, g: 185, b: 129 },   // Green
      { r: 245, g: 158, b: 11 },   // Amber
      { r: 236, g: 72, b: 153 },   // Pink
    ];

    // Time tracking
    this.time = 0;
    this.lastTime = 0;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.getTextPoints('VIX');
    this.bindEvents();
  }

  resize() {
    const parent = this.canvas.parentElement;
    const rect = parent.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
  }

  createParticles() {
    // Adjust count for mobile
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 400 : this.particleCount;

    this.particles = [];

    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(
        Math.random() * this.width,
        Math.random() * this.height
      ));
    }
  }

  createParticle(x, y, vx, vy) {
    const colorIndex = Math.floor(Math.random() * this.colors.length);
    const color = this.colors[colorIndex];
    const z = 0.3 + Math.random() * 0.7; // Z-depth simulation

    return {
      x, y,
      originX: x,
      originY: y,
      vx: vx || (Math.random() - 0.5) * 1,
      vy: vy || (Math.random() - 0.5) * 1,
      radius: (1 + Math.random() * 2.5) * z,
      baseRadius: (1 + Math.random() * 2.5) * z,
      color: { ...color },
      baseColor: { ...color },
      alpha: (0.3 + Math.random() * 0.5) * z,
      baseAlpha: (0.3 + Math.random() * 0.5) * z,
      z, // depth
      targetX: null,
      targetY: null,
      friction: 0.96,
      spring: 0.01 + Math.random() * 0.02,
      life: 1,
      maxLife: Infinity,
      pulse: Math.random() * Math.PI * 2
    };
  }

  getTextPoints(text) {
    // Create offscreen canvas to render text
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');
    const fontSize = Math.min(this.width * 0.25, 200);
    offCanvas.width = this.width;
    offCanvas.height = this.height;

    offCtx.fillStyle = '#fff';
    offCtx.font = `bold ${fontSize}px "Space Grotesk", sans-serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText(text, this.width / 2, this.height / 2);

    // Sample points from rendered text
    const imageData = offCtx.getImageData(0, 0, this.width, this.height);
    const data = imageData.data;
    this.textPoints = [];
    const gap = 4;

    for (let y = 0; y < this.height; y += gap) {
      for (let x = 0; x < this.width; x += gap) {
        const i = (y * this.width + x) * 4;
        if (data[i + 3] > 128) {
          this.textPoints.push({ x, y });
        }
      }
    }
  }

  bindEvents() {
    // Mouse events
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.prevX = this.mouse.x;
      this.mouse.prevY = this.mouse.y;
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.mouse.speed = Math.sqrt(
        (this.mouse.x - this.mouse.prevX) ** 2 +
        (this.mouse.y - this.mouse.prevY) ** 2
      );
    }, { passive: true });

    this.canvas.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.mouse.isDown = true;
      this.mouse.holdTime = 0;
      this.explode(this.mouse.x, this.mouse.y);
    });

    this.canvas.addEventListener('mouseup', () => {
      if (this.mouse.holdTime > 30) {
        this.releaseGravity();
      }
      this.mouse.isDown = false;
      this.mouse.holdTime = 0;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.isDown = false;
      this.mouse.holdTime = 0;
    });

    // Touch events
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = touch.clientX - rect.left;
      this.mouse.y = touch.clientY - rect.top;
      this.mouse.isDown = true;
      this.mouse.holdTime = 0;
      this.explode(this.mouse.x, this.mouse.y);
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.prevX = this.mouse.x;
      this.mouse.prevY = this.mouse.y;
      this.mouse.x = touch.clientX - rect.left;
      this.mouse.y = touch.clientY - rect.top;
      this.mouse.speed = Math.sqrt(
        (this.mouse.x - this.mouse.prevX) ** 2 +
        (this.mouse.y - this.mouse.prevY) ** 2
      );
    }, { passive: false });

    this.canvas.addEventListener('touchend', () => {
      this.mouse.isDown = false;
      this.mouse.holdTime = 0;
    });

    // Resize - debounced
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.resize();
        this.getTextPoints('VIX');
      }, 200);
    }, { passive: true });
  }

  explode(x, y) {
    const burstCount = 30;
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 / burstCount) * i;
      const force = 3 + Math.random() * 6;
      const particle = this.createParticle(
        x, y,
        Math.cos(angle) * force,
        Math.sin(angle) * force
      );
      particle.maxLife = 60 + Math.random() * 40;
      particle.life = particle.maxLife;
      particle.radius = 1 + Math.random() * 3;
      particle.alpha = 0.8 + Math.random() * 0.2;
      this.particles.push(particle);
    }
  }

  releaseGravity() {
    // Release particles with outward velocity from gravity point
    this.particles.forEach(p => {
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const angle = Math.atan2(dy, dx);
        const force = (200 - dist) / 200 * 5;
        p.vx += Math.cos(angle) * force;
        p.vy += Math.sin(angle) * force;
      }
    });
  }

  toggleTextFormation() {
    this.isFormingText = !this.isFormingText;
    if (this.isFormingText && this.textPoints.length > 0) {
      // Assign text point targets to particles
      const step = Math.max(1, Math.floor(this.textPoints.length / this.particles.length));
      this.particles.forEach((p, i) => {
        const tIdx = (i * step) % this.textPoints.length;
        p.targetX = this.textPoints[tIdx].x;
        p.targetY = this.textPoints[tIdx].y;
      });
    } else {
      this.particles.forEach(p => {
        p.targetX = null;
        p.targetY = null;
      });
    }
  }

  update(dt) {
    this.time += dt;

    if (this.mouse.isDown) {
      this.mouse.holdTime++;
    }

    const mouseInfluenceRadius = 150;
    const isHolding = this.mouse.isDown && this.mouse.holdTime > 10;

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Life management
      if (p.maxLife !== Infinity) {
        p.life--;
        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
        p.alpha = p.baseAlpha * (p.life / p.maxLife);
      }

      // Pulse animation
      p.pulse += 0.02;
      p.radius = p.baseRadius * (1 + Math.sin(p.pulse) * 0.15);

      // Mouse interaction
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouseInfluenceRadius && dist > 0) {
        const angle = Math.atan2(dy, dx);
        const normalizedDist = dist / mouseInfluenceRadius;

        if (isHolding) {
          // Gravitational attraction (vortex effect)
          const gravForce = (1 - normalizedDist) * 0.8;
          const vortexAngle = angle + Math.PI / 2; // perpendicular for spiral
          p.vx -= Math.cos(angle) * gravForce * 0.5;
          p.vy -= Math.sin(angle) * gravForce * 0.5;
          p.vx += Math.cos(vortexAngle) * gravForce * 0.3;
          p.vy += Math.sin(vortexAngle) * gravForce * 0.3;
        } else {
          // Repulsion / attraction based on speed
          const force = (1 - normalizedDist) * 0.3;
          if (this.mouse.speed > 5) {
            // Fast movement: repel
            p.vx += Math.cos(angle) * force * 2;
            p.vy += Math.sin(angle) * force * 2;
          } else {
            // Slow movement: gently attract
            p.vx -= Math.cos(angle) * force * 0.3;
            p.vy -= Math.sin(angle) * force * 0.3;
          }
        }

        // Color shift based on proximity and speed
        const speedInfluence = Math.min(this.mouse.speed / 20, 1);
        const proximityInfluence = 1 - normalizedDist;
        const intensity = Math.max(speedInfluence, proximityInfluence * 0.5);

        // Shift towards a brighter, more vivid color
        const targetColor = this.colors[(Math.floor(this.time * 0.5) + Math.floor(dist * 0.01)) % this.colors.length];
        p.color.r = Math.floor(p.baseColor.r + (targetColor.r - p.baseColor.r) * intensity);
        p.color.g = Math.floor(p.baseColor.g + (targetColor.g - p.baseColor.g) * intensity);
        p.color.b = Math.floor(p.baseColor.b + (targetColor.b - p.baseColor.b) * intensity);

        // Increase alpha near mouse
        p.alpha = Math.min(1, p.baseAlpha + proximityInfluence * 0.5);
        p.radius = p.baseRadius * (1 + proximityInfluence * 0.5);
      } else {
        // Return to base color
        p.color.r += (p.baseColor.r - p.color.r) * 0.02;
        p.color.g += (p.baseColor.g - p.color.g) * 0.02;
        p.color.b += (p.baseColor.b - p.color.b) * 0.02;
        p.alpha += (p.baseAlpha - p.alpha) * 0.02;
      }

      // Text formation
      if (p.targetX !== null && p.targetY !== null) {
        const tdx = p.targetX - p.x;
        const tdy = p.targetY - p.y;
        p.vx += tdx * p.spring;
        p.vy += tdy * p.spring;
        p.vx *= 0.9;
        p.vy *= 0.9;
      }

      // Apply velocity
      p.x += p.vx * p.z; // depth affects speed
      p.y += p.vy * p.z;
      p.vx *= p.friction;
      p.vy *= p.friction;

      // Boundary wrapping
      const margin = 20;
      if (p.x < -margin) p.x = this.width + margin;
      if (p.x > this.width + margin) p.x = -margin;
      if (p.y < -margin) p.y = this.height + margin;
      if (p.y > this.height + margin) p.y = -margin;

      // Gentle drift when idle
      if (Math.abs(p.vx) < 0.01 && Math.abs(p.vy) < 0.01 && p.targetX === null) {
        p.vx += (Math.random() - 0.5) * 0.1;
        p.vy += (Math.random() - 0.5) * 0.1;
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Sort by Z for depth effect
    const sorted = this.particles.slice().sort((a, b) => a.z - b.z);

    // Draw connections between nearby particles
    this.drawConnections(sorted);

    // Draw particles
    for (const p of sorted) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
      this.ctx.fill();

      // Glow for brighter particles
      if (p.alpha > 0.5 && p.radius > 2) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.1})`;
        this.ctx.fill();
      }
    }

    // Draw gravity well indicator
    if (this.mouse.isDown && this.mouse.holdTime > 10) {
      this.drawGravityWell();
    }

    // Draw speed trails
    if (this.mouse.speed > 15) {
      this.drawSpeedTrails();
    }
  }

  drawConnections(particles) {
    const connectionRadius = 80;
    const maxConnections = 200;
    let connections = 0;

    for (let i = 0; i < particles.length && connections < maxConnections; i++) {
      const a = particles[i];
      if (a.z < 0.5) continue; // Only connect foreground particles

      for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
        const b = particles[j];
        if (b.z < 0.5) continue;

        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionRadius) {
          const alpha = (1 - dist / connectionRadius) * 0.1 * Math.min(a.alpha, b.alpha);
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, ${alpha})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
          connections++;
        }
      }
    }
  }

  drawGravityWell() {
    const intensity = Math.min(this.mouse.holdTime / 60, 1);
    const radius = 30 + intensity * 70;

    // Outer glow
    const gradient = this.ctx.createRadialGradient(
      this.mouse.x, this.mouse.y, 0,
      this.mouse.x, this.mouse.y, radius
    );
    gradient.addColorStop(0, `rgba(139, 92, 246, ${0.3 * intensity})`);
    gradient.addColorStop(0.5, `rgba(0, 212, 255, ${0.1 * intensity})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.beginPath();
    this.ctx.arc(this.mouse.x, this.mouse.y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    // Spinning ring
    this.ctx.save();
    this.ctx.translate(this.mouse.x, this.mouse.y);
    this.ctx.rotate(this.time * 2);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, radius * 0.7, 0, Math.PI * 1.5);
    this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.4 * intensity})`;
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawSpeedTrails() {
    const trailLength = Math.min(this.mouse.speed * 0.5, 15);
    const dx = this.mouse.x - this.mouse.prevX;
    const dy = this.mouse.y - this.mouse.prevY;
    const angle = Math.atan2(dy, dx);

    for (let i = 0; i < 3; i++) {
      const offset = (Math.random() - 0.5) * 20;
      const px = this.mouse.x + Math.cos(angle + Math.PI / 2) * offset;
      const py = this.mouse.y + Math.sin(angle + Math.PI / 2) * offset;
      const tx = px - Math.cos(angle) * trailLength;
      const ty = py - Math.sin(angle) * trailLength;

      const gradient = this.ctx.createLinearGradient(tx, ty, px, py);
      gradient.addColorStop(0, 'rgba(0, 212, 255, 0)');
      gradient.addColorStop(1, `rgba(0, 212, 255, ${0.2 + Math.random() * 0.2})`);

      this.ctx.beginPath();
      this.ctx.moveTo(tx, ty);
      this.ctx.lineTo(px, py);
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = 1 + Math.random();
      this.ctx.stroke();
    }
  }

  start() {
    if (this.isActive) return;
    this.isActive = true;
    this.lastTime = performance.now();
    this.loop();
  }

  stop() {
    this.isActive = false;
  }

  loop() {
    if (!this.isActive) return;

    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 16.67, 3); // Normalize to ~60fps, cap at 3 frames
    this.lastTime = now;

    this.update(dt);
    this.draw();

    requestAnimationFrame(() => this.loop());
  }

  // Auto-trigger text formation for dramatic effect
  autoFormText() {
    if (!this.isActive) return;

    setTimeout(() => {
      this.toggleTextFormation();
      setTimeout(() => {
        this.toggleTextFormation(); // Release
      }, 3000);
    }, 2000);
  }
}

// Export for app.js
window.VixParticles = VixParticles;
