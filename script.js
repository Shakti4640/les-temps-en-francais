
// Smooth scroll progress indicator
const progressBar = document.getElementById('section-progress-bar');
const percentageDisplay = document.getElementById('section-progress-percentage');

function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    
    progressBar.style.height = scrolled + '%';
    percentageDisplay.textContent = Math.round(scrolled) + '%';
}

window.addEventListener('scroll', updateProgress);
updateProgress();

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
let touchStartY = 0;

const touchArea = document.body;

touchArea.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });

touchArea.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    const thresholdX = 80; // Minimum horizontal distance
    
    // Calculate scroll position
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    // Buffer of 5px to account for sub-pixel rendering/rounding issues
    const isAtBottom = (scrollTop + windowHeight) >= (docHeight - 5);
    const isAtTop = scrollTop <= 5;

    // Check if horizontal movement is dominant
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > thresholdX) {
        const prev = document.querySelector('.nav-button.prev');
        const next = document.querySelector('.nav-button.next');

        // 👉 Swipe left → Next Page (Only if at the bottom)
        if (diffX > 0 && isAtBottom && next && !next.classList.contains('disabled')) {
            window.location.href = next.href;
        }

        // 👉 Swipe right → Previous Page (Only if at the top)
        if (diffX < 0 && isAtTop && prev && !prev.classList.contains('disabled')) {
            window.location.href = prev.href;
        }
    }
}, { passive: true });
