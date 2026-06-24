// NAVBAR scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// COUNTDOWN — persists across refresh
function startCountdown() {
  const ch = document.getElementById('ch');
  const cm = document.getElementById('cm');
  const cs = document.getElementById('cs');
  if (!ch) return;

  const KEY = 'opf-end';
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
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); observer.unobserve(e.target); } }),
  { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
