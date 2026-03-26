    document.addEventListener('keydown', function(e) {
        if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
        if (e.key === 'ArrowLeft') {
            const b = document.querySelector('.nav-button.prev');
            if (b && !b.classList.contains('disabled')) window.location.href = b.href;
        }
        if (e.key === 'ArrowRight') {
            const b = document.querySelector('.nav-button.next');
            if (b && !b.classList.contains('disabled')) window.location.href = b.href;
        }
    });
    let touchStartX = 0;
let touchEndX = 0;

const touchArea = document.body;

touchArea.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

touchArea.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].clientX;

  const diff = touchStartX - touchEndX;
  const threshold = 50;

  const prev = document.querySelector('.nav-button.prev');
  const next = document.querySelector('.nav-button.next');

  // 👉 Swipe left → next page
  if (diff > threshold && next && !next.classList.contains('disabled')) {
    window.location.href = next.href;
  }

  // 👉 Swipe right → previous page
  if (diff < -threshold && prev && !prev.classList.contains('disabled')) {
    window.location.href = prev.href;
  }

}, { passive: true });