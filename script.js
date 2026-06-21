// JavaScript source code
// DOM elements
// Get elements
// ===== OPEN SITE (Opening Overlay) =====
function enterSite() {
    document.getElementById("opening").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    
    // Auto-play music (if browser allows)
    const music = document.getElementById("bgMusic");
    music.play().catch(e => {
        console.log("Click music button to play");
    });
    document.getElementById("musicBtn").innerHTML = "⏸️";
}

// ===== MUSIC TOGGLE (New) =====
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

btn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        btn.innerHTML = "⏸️";
    } else {
        music.pause();
        btn.innerHTML = "🎵";
    }
});

// ===== OPEN INVITATION BUTTON (Hero Section) =====
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

// ===== MUSIC TOGGLE (Original - Optional Feature) =====
// This is kept for compatibility but hidden since we have the new music button
let isMusicPlaying = false;
let audio = null;

const musicToggle = document.getElementById('musicToggle');

if (musicToggle) {
    musicToggle.addEventListener('click', () => {
        if (!audio) {
            // Create audio element with a royalty-free track
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
                console.log('Please interact with the page to play music.');
            });
            musicToggle.textContent = '🔊';
            musicToggle.style.background = '#234d37';
        }

        isMusicPlaying = !isMusicPlaying;
    });
}

// ===== FADE IN ON SCROLL =====
const sections = document.querySelectorAll(".invite-section, .countdown-section, .buttons-section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.1 });

sections.forEach(sec => observer.observe(sec));

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
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeIn 1.5s ease';
    }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Press 'I' to open invitation
    if (e.key === 'i' || e.key === 'I') {
        const openInviteBtn = document.getElementById('openInvite');
        if (openInviteBtn) {
            openInviteBtn.click();
        }
    }

    // Press 'M' to toggle music (new music button)
    if (e.key === 'm' || e.key === 'M') {
        btn.click();
    }
});

// ===== ADDITIONAL: Hide main content initially =====
// This ensures the opening overlay is visible first
document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.style.display = 'none';
    }
});




