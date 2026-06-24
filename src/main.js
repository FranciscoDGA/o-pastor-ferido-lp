// NAVBAR scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// COUNTDOWN — persists via sessionStorage
function startCountdown() {
  const ch = document.getElementById('ch');
  const cm = document.getElementById('cm');
  const cs = document.getElementById('cs');
  if (!ch) return;

  const KEY = 'opf-end-v2';
  let end = parseInt(sessionStorage.getItem(KEY) || '0', 10);
  if (!end || end < Date.now()) {
    end = Date.now() + 4 * 3600000 + 59 * 60000;
    sessionStorage.setItem(KEY, end);
  }

  function tick() {
    const d = Math.max(0, end - Date.now());
    const h = Math.floor(d / 3600000);
    const m = Math.floor((d % 3600000) / 60000);
    const s = Math.floor((d % 60000) / 1000);
    ch.textContent = String(h).padStart(2, '0');
    cm.textContent = String(m).padStart(2, '0');
    cs.textContent = String(s).padStart(2, '0');
    requestAnimationFrame(tick);
  }
  tick();
}
startCountdown();

// SCROLL REVEAL
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      revealObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 5) * 80}ms`;
  revealObserver.observe(el);
});

// BOOK 3D mouse parallax on hero
const book3d = document.getElementById('book3d');
if (book3d) {
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    book3d.style.transform = `rotateY(${-25 + dx * 8}deg) rotateX(${5 - dy * 4}deg)`;
  }, { passive: true });
}

// PARTICLES
const particlesEl = document.getElementById('particles');
if (particlesEl) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(201,168,76,${Math.random() * 0.25 + 0.05});
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: particleDrift ${8 + Math.random() * 12}s ease-in-out infinite;
      animation-delay: ${Math.random() * -15}s;
    `;
    particlesEl.appendChild(p);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleDrift {
      0%, 100% { transform: translate(0, 0); opacity: 0.3; }
      33% { transform: translate(${Math.random() > .5 ? '' : '-'}${20 + Math.random() * 30}px, -${20 + Math.random() * 40}px); opacity: 0.7; }
      66% { transform: translate(${Math.random() > .5 ? '' : '-'}${10 + Math.random() * 20}px, -${10 + Math.random() * 20}px); opacity: 0.4; }
    }
  `;
  document.head.appendChild(style);
}
