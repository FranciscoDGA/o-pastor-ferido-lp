// ============ NAVBAR SCROLL ============
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============ COUNTDOWN — Urgency Bar ============
function startCountdown(hours, mins, secs) {
  const hoursEl = document.getElementById('c-hours');
  const minsEl  = document.getElementById('c-mins');
  const secsEl  = document.getElementById('c-secs');
  if (!hoursEl) return;

  // Persist across refresh using sessionStorage
  let saved = sessionStorage.getItem('countdown-end');
  let endTime;

  if (saved) {
    endTime = parseInt(saved, 10);
  } else {
    endTime = Date.now() + ((hours * 3600 + mins * 60 + secs) * 1000);
    sessionStorage.setItem('countdown-end', endTime);
  }

  function update() {
    const diff = endTime - Date.now();
    if (diff <= 0) {
      hoursEl.textContent = '00';
      minsEl.textContent  = '00';
      secsEl.textContent  = '00';
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent  = String(m).padStart(2, '0');
    secsEl.textContent  = String(s).padStart(2, '0');
    requestAnimationFrame(update);
  }
  update();
}
startCountdown(4, 59, 0);

// ============ SCROLL REVEAL ============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll(
  '.reveal, .reveal-right, .content-card, .deliverable-card, .reveal-card'
).forEach(el => revealObserver.observe(el));

// ============ TABS (Best Seller) ============
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
