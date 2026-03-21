/* ════════════════════════════════════════════════════════
   NETCOL VPN — Script Principal
   Animaciones estilo Apple / iOS
════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   1. CANVAS NETWORK — Partículas premium
   con atracción al mouse
───────────────────────────────────────── */
const canvas = document.getElementById("network");
const ctx    = canvas.getContext("2d");

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const COLORS = ["#00e5ff", "#7b61ff", "#00ff94"];
let particles = [];
let mouse = { x: null, y: null };

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

for (let i = 0; i < 90; i++) {
  particles.push({
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    vx:    (Math.random() - 0.5) * 0.5,
    vy:    (Math.random() - 0.5) * 0.5,
    r:     Math.random() * 1.8 + 0.8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    pulse: Math.random() * Math.PI * 2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* Líneas entre partículas cercanas */
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,229,255,${0.1 * (1 - dist / 120)})`;
        ctx.lineWidth   = 0.7;
        ctx.stroke();
      }
    }
  }

  /* Líneas hacia el mouse */
  if (mouse.x !== null) {
    particles.forEach(p => {
      const dx   = p.x - mouse.x;
      const dy   = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 160) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(0,229,255,${0.15 * (1 - dist / 160)})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    });
  }

  /* Dibujar partículas con pulso */
  particles.forEach(p => {
    p.pulse += 0.02;
    const pulsedR = p.r + Math.sin(p.pulse) * 0.4;

    ctx.beginPath();
    ctx.arc(p.x, p.y, pulsedR, 0, Math.PI * 2);
    ctx.fillStyle   = p.color + "cc";
    ctx.shadowColor = p.color;
    ctx.shadowBlur  = 8;
    ctx.fill();
    ctx.shadowBlur  = 0;

    /* Repeler del mouse suavemente */
    if (mouse.x !== null) {
      const dx   = p.x - mouse.x;
      const dy   = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        p.vx += (dx / dist) * force * 0.3;
        p.vy += (dy / dist) * force * 0.3;
      }
    }

    /* Fricción */
    p.vx *= 0.98;
    p.vy *= 0.98;

    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  requestAnimationFrame(draw);
}
draw();

/* ─────────────────────────────────────────
   2. CONTADOR DE USUARIOS — Animado
───────────────────────────────────────── */
let users = 1247;
const usersEl = document.getElementById("users");

function animateCounter(el, from, to, duration) {
  const start = performance.now();
  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(from + (to - from) * ease).toLocaleString("es-CO");
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* Cuenta desde 0 al cargar */
animateCounter(usersEl, 0, users, 2000);

/* Actualiza cada 3s con animación suave */
setInterval(() => {
  const change  = Math.floor(Math.random() * 15);
  const newVal  = Math.max(1000, users + (Math.random() > 0.5 ? change : -change));
  animateCounter(usersEl, users, newVal, 800);
  users = newVal;
}, 3000);

/* ─────────────────────────────────────────
   3. SCROLL REVEAL — Estilo Apple
   Timing diferenciado por elemento
───────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = parseFloat(entry.target.dataset.delay || 0);
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, delay * 1000 + i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────
   4. NAVBAR — Shrink + blur dinámico
───────────────────────────────────────── */
const nav = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.style.padding    = "12px 60px";
    nav.style.background = "rgba(6,9,16,0.92)";
    nav.style.boxShadow  = "0 1px 0 rgba(0,229,255,0.06)";
  } else {
    nav.style.padding    = "18px 60px";
    nav.style.background = "rgba(6,9,16,0.7)";
    nav.style.boxShadow  = "none";
  }
}, { passive: true });

/* ─────────────────────────────────────────
   5. MAGNETIC BUTTONS — Efecto Apple
   Los botones se atraen magnéticamente al cursor
───────────────────────────────────────── */
document.querySelectorAll(".btn-primary, .btn-secondary, .plan-btn-solid").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect     = btn.getBoundingClientRect();
    const x        = e.clientX - rect.left  - rect.width  / 2;
    const y        = e.clientY - rect.top   - rect.height / 2;
    btn.style.transform  = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    btn.style.transition = "transform 0.1s ease";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform  = "";
    btn.style.transition = "transform 0.5s cubic-bezier(0.175,0.885,0.32,1.275)";
  });
});

/* ─────────────────────────────────────────
   6. TILT 3D — Efecto profundidad en cards
   Exactamente como iOS con perspectiva
───────────────────────────────────────── */
document.querySelectorAll(".benefit-card, .plan-card, .support-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect  = card.getBoundingClientRect();
    const x     = (e.clientX - rect.left) / rect.width  - 0.5;
    const y     = (e.clientY - rect.top)  / rect.height - 0.5;
    const tiltX = y * -10;
    const tiltY = x *  10;

    card.style.transform  = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(8px)`;
    card.style.transition = "transform 0.1s ease";

    /* Brillo dinámico en el punto del cursor */
    const glowX = (x + 0.5) * 100;
    const glowY = (y + 0.5) * 100;
    if (card.classList.contains("featured-plan")) {
      card.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0,229,255,0.15), rgba(123,97,255,0.12))`;
    } else {
      card.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.07), rgba(255,255,255,0.03))`;
    }
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform  = "";
    card.style.background = "";
    card.style.transition = "transform 0.6s cubic-bezier(0.175,0.885,0.32,1.275), background 0.4s ease";
  });
});

/* ─────────────────────────────────────────
   7. STATS — Contador animado al entrar
───────────────────────────────────────── */
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".stat-number").forEach((num, i) => {
        const text    = num.textContent.trim();
        const hasPlus = text.includes("+");
        const hasPerc = text.includes("%");
        const hasStar = text.includes("★");
        const isFloat = text.includes(".");
        const raw     = parseFloat(text.replace(/[^\d.]/g, ""));

        if (!isNaN(raw)) {
          setTimeout(() => {
            const start    = performance.now();
            const duration = 1800;
            (function tick(now) {
              const p    = Math.min((now - start) / duration, 1);
              const ease = 1 - Math.pow(1 - p, 4);
              const cur  = raw * ease;
              num.textContent =
                (isFloat ? cur.toFixed(1) : Math.floor(cur).toLocaleString("es-CO")) +
                (hasPlus ? "+" : "") +
                (hasPerc ? "%" : "") +
                (hasStar ? "★" : "");
              if (p < 1) requestAnimationFrame(tick);
            })(performance.now());
          }, i * 150);
        }
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector(".stats");
if (statsSection) statObserver.observe(statsSection);

/* ─────────────────────────────────────────
   8. PARALLAX HERO — Capas a distinta velocidad
───────────────────────────────────────── */
const heroInner = document.querySelector(".hero-inner");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (heroInner && y < window.innerHeight) {
    heroInner.style.transform = `translateY(${y * 0.22}px)`;
    heroInner.style.opacity   = `${1 - y / (window.innerHeight * 0.9)}`;
  }
}, { passive: true });

/* ─────────────────────────────────────────
   9. RIPPLE — En botones al hacer click
───────────────────────────────────────── */
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `@keyframes ripple-anim { to { transform: scale(2.5); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

document.querySelectorAll(".btn-primary, .plan-btn-solid, .btn-whatsapp").forEach(btn => {
  btn.style.position = "relative";
  btn.style.overflow = "hidden";

  btn.addEventListener("click", e => {
    const ripple = document.createElement("span");
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top:  ${e.clientY - rect.top  - size / 2}px;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-anim 0.6s ease-out forwards;
      pointer-events: none;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

/* ─────────────────────────────────────────
   10. GRADIENT CURSOR GLOW — Halo de luz
───────────────────────────────────────── */
const cursorGlow = document.createElement("div");
cursorGlow.style.cssText = `
  position: fixed;
  width: 500px; height: 500px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle, rgba(0,229,255,0.035) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
  transition: opacity 0.3s;
`;
document.body.appendChild(cursorGlow);

let cx = 0, cy = 0, tx = 0, ty = 0;
window.addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; });

(function moveCursor() {
  cx += (tx - cx) * 0.07;
  cy += (ty - cy) * 0.07;
  cursorGlow.style.left = cx + "px";
  cursorGlow.style.top  = cy + "px";
  requestAnimationFrame(moveCursor);
})();

/* ─────────────────────────────────────────
   11. PHONE MOCKUP — Velocidad animada
───────────────────────────────────────── */
const upEl   = document.querySelector(".phone-speed-item:first-child .phone-speed-val");
const downEl = document.querySelector(".phone-speed-item:last-child .phone-speed-val");

setInterval(() => {
  if (upEl)   upEl.textContent   = "↑ " + (Math.floor(Math.random() * 30) + 30);
  if (downEl) downEl.textContent = "↓ " + (Math.floor(Math.random() * 40) + 70);
}, 2500);

/* ─────────────────────────────────────────
   12. PLAN CARDS — Entrada escalonada
───────────────────────────────────────── */
const planObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".plan-card").forEach((card, i) => {
        card.style.opacity   = "0";
        card.style.transform = "translateY(40px) scale(0.96)";
        setTimeout(() => {
          card.style.transition = "all 0.7s cubic-bezier(0.175,0.885,0.32,1.275)";
          card.style.opacity    = "1";
          card.style.transform  = card.classList.contains("featured-plan")
            ? "scale(1.04)"
            : "translateY(0) scale(1)";
        }, i * 160);
      });
      planObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const pricingGrid = document.querySelector(".pricing-grid");
if (pricingGrid) planObserver.observe(pricingGrid);

/* ─────────────────────────────────────────
   13. STEPS — Entrada secuencial desde la izquierda
───────────────────────────────────────── */
const stepsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".step-row").forEach((row, i) => {
        row.style.opacity   = "0";
        row.style.transform = "translateX(-30px)";
        setTimeout(() => {
          row.style.transition = "all 0.6s cubic-bezier(0.175,0.885,0.32,1.275)";
          row.style.opacity    = "1";
          row.style.transform  = "translateX(0)";
        }, i * 180);
      });
      stepsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

const stepsEl = document.querySelector(".steps-vertical");
if (stepsEl) stepsObserver.observe(stepsEl);

/* ─────────────────────────────────────────
   14. SMOOTH ANCHOR SCROLL — Con offset
───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

/* ─────────────────────────────────────────
   15. SUPPORT CARDS — Entrada desde abajo escalonada
───────────────────────────────────────── */
const supportObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".support-card").forEach((card, i) => {
        card.style.opacity   = "0";
        card.style.transform = "translateY(30px)";
        setTimeout(() => {
          card.style.transition = "all 0.65s cubic-bezier(0.175,0.885,0.32,1.275)";
          card.style.opacity    = "1";
          card.style.transform  = "translateY(0)";
        }, i * 130);
      });
      supportObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const supportGrid = document.querySelector(".support-grid");
if (supportGrid) supportObserver.observe(supportGrid);