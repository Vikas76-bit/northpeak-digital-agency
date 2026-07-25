/**
 * NorthPeak Digital - Scroll Reveal & Particle Canvas Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundParticleCanvas();
  initScrollReveal();
  initStatCounters();
  initHeroChartAnimation();
});

/**
 * 1. Background Particle Node Constellation Canvas
 */
function initBackgroundParticleCanvas() {
  const canvas = document.getElementById('bgParticleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = Math.min(45, Math.floor(width / 30));

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

/**
 * 2. IntersectionObserver for Reveal Elements on Scroll
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-element');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

/**
 * 3. Animated Counter Numbers
 */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  if (statNumbers.length === 0) return;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000;
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(target * easeOutQuad(progress));

        stat.textContent = `${prefix}${currentCount}${suffix}`;

        if (frame === totalFrames) {
          clearInterval(counter);
          stat.textContent = `${prefix}${target}${suffix}`;
        }
      }, frameDuration);
    });
  };

  const easeOutQuad = t => t * (2 - t);

  const statsSection = document.querySelector('.stats-grid');
  if (!statsSection) return;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  statsObserver.observe(statsSection);
}

/**
 * 4. Hero Visual Revenue Growth Canvas Animation
 */
function initHeroChartAnimation() {
  const canvas = document.getElementById('heroChartCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.parentElement.clientWidth;
  let height = canvas.height = canvas.parentElement.clientHeight || 160;

  const dataPoints = [30, 45, 38, 62, 55, 80, 95, 110, 140, 160];
  let animationProgress = 0;

  function drawChart() {
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
      let y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

    const stepX = width / (dataPoints.length - 1);

    ctx.beginPath();
    ctx.moveTo(0, height);

    for (let i = 0; i < dataPoints.length; i++) {
      let currentProgress = Math.min(1, animationProgress * (dataPoints.length / (i + 1)));
      let x = i * stepX;
      let targetY = height - (dataPoints[i] / 180) * height;
      let y = height - (height - targetY) * currentProgress;

      if (i === 0) {
        ctx.lineTo(x, y);
      } else {
        let prevX = (i - 1) * stepX;
        let prevTargetY = height - (dataPoints[i - 1] / 180) * height;
        let prevY = height - (height - prevTargetY) * currentProgress;
        let cpX1 = prevX + stepX / 2;
        let cpX2 = x - stepX / 2;
        ctx.bezierCurveTo(cpX1, prevY, cpX2, y, x, y);
      }
    }

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;

    for (let i = 0; i < dataPoints.length; i++) {
      let currentProgress = Math.min(1, animationProgress * (dataPoints.length / (i + 1)));
      let x = i * stepX;
      let targetY = height - (dataPoints[i] / 180) * height;
      let y = height - (height - targetY) * currentProgress;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        let prevX = (i - 1) * stepX;
        let prevTargetY = height - (dataPoints[i - 1] / 180) * height;
        let prevY = height - (height - prevTargetY) * currentProgress;
        let cpX1 = prevX + stepX / 2;
        let cpX2 = x - stepX / 2;
        ctx.bezierCurveTo(cpX1, prevY, cpX2, y, x, y);
      }
    }
    ctx.stroke();

    if (animationProgress < 1) {
      animationProgress += 0.02;
      requestAnimationFrame(drawChart);
    }
  }

  requestAnimationFrame(drawChart);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight || 160;
    animationProgress = 1;
    drawChart();
  });
}
