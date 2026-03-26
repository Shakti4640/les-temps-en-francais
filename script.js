
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
let touchStartY = 0; // Added to track vertical start

const touchArea = document.body;

touchArea.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY; // Capture vertical start
}, { passive: true });

touchArea.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY; // Capture vertical end

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // 1. Increase threshold from 50 to 100 for less sensitivity
    const thresholdX = 100; 
    
    // 2. Vertical Restraint: Ensure horizontal swipe is much larger than vertical movement
    // This prevents accidental triggers while scrolling up/down
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > thresholdX) {
        const prev = document.querySelector('.nav-button.prev');
        const next = document.querySelector('.nav-button.next');

        // Swipe left (positive diffX) → next page
        if (diffX > 0 && next && !next.classList.contains('disabled')) {
            window.location.href = next.href;
        }
        // Swipe right (negative diffX) → previous page
        else if (diffX < 0 && prev && !prev.classList.contains('disabled')) {
            window.location.href = prev.href;
        }
    }
}, { passive: true });
