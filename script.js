/* ===========================
   ROMANTIC LOVE LETTER — JS
   =========================== */

// ─── Configuration ────────────────────────────────────────────
const PARTNER_NAME = "My Love"; // ← Change this to your partner's name!

const MESSAGES = [
  { heart: "🌸", text: "You make my world softer." },
  { heart: "✨", text: "You are my happiest thought." },
  { heart: "💫", text: "Every little moment with you matters." },
  { heart: "🌙", text: "I smile more because of you." },
  { heart: "🏠", text: "You are my home." },
  { heart: "♥",  text: "I love you, deeply and endlessly." },
];

// ─── State ────────────────────────────────────────────────────
let currentCard = 0;

// ─── Init ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("partner-name").textContent = PARTNER_NAME;
  buildCards();
  buildDots();
  initParticles();
});

// ─── Build Message Cards ───────────────────────────────────────
function buildCards() {
  const stage = document.getElementById("card-stage");
  MESSAGES.forEach((msg, i) => {
    const card = document.createElement("div");
    card.className = "message-card" + (i === 0 ? " card-visible" : "");
    card.id = `card-${i}`;
    card.innerHTML = `
      <p class="card-num">${String(i + 1).padStart(2, "0")} / ${MESSAGES.length}</p>
      <span class="card-heart">${msg.heart}</span>
      <p class="card-quote">"${msg.text}"</p>
    `;
    stage.appendChild(card);
  });
}

function buildDots() {
  const container = document.getElementById("progress-dots");
  MESSAGES.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.id = `dot-${i}`;
    container.appendChild(dot);
  });
}

function updateDots(index) {
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}

// ─── Journey Flow ─────────────────────────────────────────────
function startJourney() {
  const opening = document.getElementById("screen-opening");
  const cards   = document.getElementById("screen-cards");

  opening.classList.remove("active");
  opening.classList.add("exit");

  setTimeout(() => {
    opening.style.display = "none";
    cards.classList.add("active");
    spawnMiniHearts(cards.querySelector(".card-stage"));
  }, 600);
}

function nextCard() {
  const old = document.getElementById(`card-${currentCard}`);
  old.classList.remove("card-visible");
  old.classList.add("card-exit");
  setTimeout(() => { old.classList.remove("card-exit"); }, 700);

  currentCard++;

  if (currentCard < MESSAGES.length) {
    const next = document.getElementById(`card-${currentCard}`);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        next.classList.add("card-visible");
        spawnMiniHearts(next);
        updateDots(currentCard);
        // On last card, change button label
        if (currentCard === MESSAGES.length - 1) {
          const btn = document.getElementById("btn-next-card");
          btn.innerHTML = `<span>Feel it</span><span class="nav-arrow">→</span>`;
        }
      });
    });
  } else {
    showReveal();
  }
}

function showReveal() {
  const cards  = document.getElementById("screen-cards");
  const reveal = document.getElementById("screen-reveal");

  cards.classList.remove("active");
  cards.classList.add("exit");

  setTimeout(() => {
    cards.style.display = "none";
    reveal.classList.add("active");
    setTimeout(() => triggerHeartBurst(), 400);
  }, 600);
}

function showFinal() {
  const reveal = document.getElementById("screen-reveal");
  const final  = document.getElementById("screen-final");

  reveal.classList.remove("active");
  reveal.classList.add("exit");

  setTimeout(() => {
    reveal.style.display = "none";
    final.classList.add("active");
    setTimeout(() => triggerFinalHearts(), 500);
  }, 600);
}

function playAgain() {
  // Reset state
  currentCard = 0;

  document.querySelectorAll(".message-card").forEach((c, i) => {
    c.className = "message-card" + (i === 0 ? " card-visible" : "");
  });
  updateDots(0);

  const btn = document.getElementById("btn-next-card");
  if (btn) btn.innerHTML = `<span>Next</span><span class="nav-arrow">→</span>`;

  ["screen-final", "screen-reveal", "screen-cards"].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove("active", "exit");
    el.style.display = "";
  });

  const opening = document.getElementById("screen-opening");
  opening.style.display = "";
  opening.classList.remove("exit");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      opening.classList.add("active");
    });
  });
}

// ─── Mini Heart Burst (on card reveal) ────────────────────────
function spawnMiniHearts(parent) {
  const hearts = ["♥", "💕", "✨", "🌸", "💖"];
  const cx = parent.offsetWidth / 2;
  const cy = parent.offsetHeight / 2;

  for (let i = 0; i < 10; i++) {
    const h = document.createElement("span");
    h.className = "mini-heart";
    h.textContent = hearts[i % hearts.length];
    const angle = (i / 10) * Math.PI * 2;
    const dist  = 55 + Math.random() * 55;
    h.style.left   = cx + "px";
    h.style.top    = cy + "px";
    h.style.setProperty("--tx", (Math.cos(angle) * dist) + "px");
    h.style.setProperty("--ty", (Math.sin(angle) * dist - 30) + "px");
    h.style.animationDelay = (i * 50) + "ms";

    parent.appendChild(h);
    setTimeout(() => h.remove(), 1500);
  }
}

// ─── Reveal Heart Burst ────────────────────────────────────────
function triggerHeartBurst() {
  const container = document.getElementById("heart-burst");
  container.innerHTML = "";
  const hearts = ["💕", "♥", "🌹", "✨", "💖", "🌸", "💗", "💓"];

  for (let i = 0; i < 20; i++) {
    const h = document.createElement("span");
    h.className = "burst-heart";
    h.textContent = hearts[i % hearts.length];
    h.style.left = (10 + Math.random() * 80) + "%";
    h.style.top  = (60 + Math.random() * 35) + "%";
    h.style.setProperty("--rot", (Math.random() * 60 - 30) + "deg");
    h.style.animationDelay = (Math.random() * 1.2) + "s";
    h.style.fontSize = (1 + Math.random() * 0.8) + "rem";
    container.appendChild(h);
  }
}

// ─── Final Heart Burst ─────────────────────────────────────────
function triggerFinalHearts() {
  const container = document.getElementById("final-hearts");
  container.innerHTML = "";
  const hearts = ["💕", "♥", "💗", "💖", "💝", "🌹", "✨"];

  for (let i = 0; i < 28; i++) {
    const h = document.createElement("span");
    h.className = "final-heart";
    h.textContent = hearts[i % hearts.length];
    h.style.left = (5 + Math.random() * 90) + "%";
    h.style.top  = "90%";
    h.style.setProperty("--rot", (Math.random() * 80 - 40) + "deg");
    h.style.animationDelay = (Math.random() * 2.5) + "s";
    h.style.fontSize = (1 + Math.random() * 1.2) + "rem";
    h.style.animationDuration = (3 + Math.random() * 2) + "s";
    container.appendChild(h);
  }
}

// ─── Say It Back ──────────────────────────────────────────────
function sayBack() {
  const modal = document.getElementById("say-back-modal");
  modal.style.display = "flex";
}

function closeModal(e) {
  if (e.target === document.getElementById("say-back-modal")) closeSayBack();
}

function closeSayBack() {
  const modal = document.getElementById("say-back-modal");
  modal.style.opacity = "0";
  modal.style.transition = "opacity 0.3s ease";
  setTimeout(() => {
    modal.style.display = "none";
    modal.style.opacity = "";
    modal.style.transition = "";
  }, 300);
}

// ─── Particle System ──────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  const ctx    = canvas.getContext("2d");
  let W, H, particles;

  const PARTICLE_COLORS = [
    "rgba(214,96,138,",
    "rgba(247,168,192,",
    "rgba(255,214,224,",
    "rgba(193,68,106,",
    "rgba(240,192,138,",
  ];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles(count = 55) {
    particles = Array.from({ length: count }, () => ({
      x:   Math.random() * W,
      y:   Math.random() * H,
      r:   0.5 + Math.random() * 2,
      vx:  (Math.random() - 0.5) * 0.25,
      vy:  -(0.1 + Math.random() * 0.35),
      a:   Math.random(),
      va:  0.002 + Math.random() * 0.003,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.a  += p.va;
      const alpha = 0.3 + 0.4 * Math.abs(Math.sin(p.a));

      if (p.y < -6)  p.y = H + 6;
      if (p.x < -6)  p.x = W + 6;
      if (p.x > W+6) p.x = -6;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + alpha + ")";
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => { resize(); });
  resize();
  createParticles();
  draw();
}
