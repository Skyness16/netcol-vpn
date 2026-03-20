// ── CANVAS NETWORK ──
const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const COLORS = ["#00e5ff", "#7b61ff", "#00ff94"];
let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    r: Math.random() * 1.5 + 1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)]
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Líneas entre partículas cercanas
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,229,255,${0.12 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  // Dibujar y mover partículas
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color + "cc";
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;

    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  requestAnimationFrame(draw);
}
draw();

// ── CONTADOR DE USUARIOS ──
let users = 1247;
setInterval(() => {
  const change = Math.floor(Math.random() * 15);
  users += Math.random() > 0.5 ? change : -change;
  if (users < 1000) users = 1000;
  document.getElementById("users").textContent = users.toLocaleString("es-CO");
}, 2000);

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// ── NAVBAR SHRINK AL HACER SCROLL ──
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    nav.style.padding = "12px 60px";
    nav.style.background = "rgba(6,9,16,0.95)";
  } else {
    nav.style.padding = "18px 60px";
    nav.style.background = "rgba(6,9,16,0.7)";
  }
});
```

---

**Estructura de carpetas en Visual Studio:**
```
📁 netcol-vpn/
├── index.html
├── styles.css
├── script.js
└── 📁 assets/
    └── icon.png   ← guarda aquí el ícono de la app