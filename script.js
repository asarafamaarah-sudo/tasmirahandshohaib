// JavaScript source code
// DOM elements
// Get elements
document.getElementById('openInvite').addEventListener('click', () => {

    const inviteSection = document.querySelector('.invite-section');

    inviteSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

});

// ===== COUNTDOWN TIMER =====

const weddingDate = new Date('September 26, 2026 17:00:00').getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const distance = weddingDate - now;

    // If wedding date has passed
    if (distance < 0) {

        clearInterval(timer);

        document.getElementById('countdown').innerHTML =
            '<h2 style="color: #8c6a22; font-size: 2rem;">Our Special Day Has Arrived ❤️</h2>';

        return;
    }

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM with padding for single digits
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

}

// Start countdown
const timer = setInterval(updateCountdown, 1000);

// Initial call to avoid 1-second delay
updateCountdown();

// ===== MUSIC TOGGLE (Optional Feature) =====

let isMusicPlaying = false;
let audio = null;

const musicToggle = document.getElementById('musicToggle');

musicToggle.addEventListener('click', () => {

    if (!audio) {
        // Create audio element with a royalty-free track
        // You can replace this URL with your own audio file
        audio = new Audio('your-nasheed.mp3.mpeg');
        audio.loop = true;
        audio.volume = 0.5;
    }

    if (isMusicPlaying) {
        audio.pause();
        musicToggle.textContent = '🎵';
        musicToggle.style.background = '#9d7b2f';
    } else {
        audio.play().catch(() => {
            // Auto-play was blocked - show a message or do nothing
            console.log('Please interact with the page to play music.');
        });
        musicToggle.textContent = '🔊';
        musicToggle.style.background = '#234d37';
    }

    isMusicPlaying = !isMusicPlaying;

});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function(e) {

        const href = this.getAttribute('href');

        if (href !== '#') {

            e.preventDefault();

            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }

        }

    });

});

// ===== SHOW HERO SECTION ON PAGE LOAD =====

window.addEventListener('load', () => {
    // Small animation delay for hero content
    document.querySelector('.hero-content').style.animation = 'fadeIn 1.5s ease';
});

// ===== KEYBOARD SHORTCUTS =====

document.addEventListener('keydown', (e) => {

    // Press 'I' to open invitation
    if (e.key === 'i' || e.key === 'I') {
        document.getElementById('openInvite').click();
    }

    // Press 'M' to toggle music
    if (e.key === 'm' || e.key === 'M') {
        musicToggle.click();
    }

});  
