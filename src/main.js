// Simple Countdown Logic for Deals of the day
document.addEventListener('DOMContentLoaded', () => {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('mins');
  const secsEl = document.getElementById('secs');

  // Let's set a target date a few days from now just for visual effect
  let targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 617); // Using the exact number from the image
  targetDate.setHours(targetDate.getHours() + 4);
  targetDate.setMinutes(targetDate.getMinutes() + 55);
  targetDate.setSeconds(targetDate.getSeconds() + 8);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.innerText = days.toString().padStart(3, '0');
    if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
    if (minsEl) minsEl.innerText = minutes.toString().padStart(2, '0');
    if (secsEl) secsEl.innerText = seconds.toString().padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
});
