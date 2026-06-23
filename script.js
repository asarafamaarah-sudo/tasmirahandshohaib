// JavaScript source code
// DOM elements
// Get elements
/* ENVELOPE VIDEO */
const envelope = document.getElementById("envelope");
const envelopeVideo = document.getElementById("envelopeVideo");
const openBtn = document.getElementById("openInvite");
const openingScreen = document.getElementById("openingScreen");
const mainContent = document.getElementById("mainContent");
const petalsVideo = document.getElementById("petalsVideo");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const scrollToTopBtn = document.getElementById("scrollToTop");

let opened = false;

// Make sure petals video plays
if (petalsVideo) {
    petalsVideo.play().catch(e => console.log("Petals video autoplay prevented"));
}

openBtn.addEventListener("click", async () => {

    if (opened) return;
    opened = true;

    // Play envelope opening video
    envelopeVideo.play();

    // Try to play music
    try { 
        await music.play(); 
        musicBtn.textContent = "♫ Playing";
    } catch(e) {
        console.log("Auto-play prevented. Click play button.");
    }

    // Add opened class to envelope
    envelope.classList.add("opened");

    // Listen for video to end
    envelopeVideo.addEventListener("ended", () => {
        // Hide opening screen and show main content
        openingScreen.style.opacity = "0";
        openingScreen.style.transition = "opacity 0.8s ease";
        
        setTimeout(() => {
            openingScreen.style.display = "none";
            mainContent.style.display = "block";
            
            // Trigger fade-in animations
            document.querySelectorAll(".fade-in").forEach(el => {
                setTimeout(() => {
                    el.classList.add("show");
                }, 200);
            });
            
        }, 800);
    });

    // After content appears, show scroll indicator
            setTimeout(() => {
                const indicator = document.getElementById("scrollIndicator");
                if (indicator) {
                    indicator.style.opacity = "1";
                }
            }, 1000);
            
        }, 800);
    });

    // Fallback: if video doesn't end (error or short video), show content after 3 seconds
    setTimeout(() => {
        if (openingScreen.style.display !== "none") {
            openingScreen.style.opacity = "0";
            setTimeout(() => {
                openingScreen.style.display = "none";
                mainContent.style.display = "block";
                document.querySelectorAll(".fade-in").forEach(el => {
                    el.classList.add("show");
                });
            }, 800);
        }
    }, 5000);

});

/* MUSIC TOGGLE */
musicBtn.addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();
            musicBtn.textContent = "♫ Playing";
        } catch(e) {
            musicBtn.textContent = "♫ Play Nasheed";
        }
    } else {
        music.pause();
        musicBtn.textContent = "♫ Play Nasheed";
    }
});

/* SCROLL TO TOP BUTTON */
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* Hide/Show Scroll to Top button based on scroll position */
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.display = "block";
        scrollToTopBtn.style.opacity = "1";
    } else {
        scrollToTopBtn.style.opacity = "0";
        setTimeout(() => {
            if (window.scrollY <= 500) {
                scrollToTopBtn.style.display = "none";
            }
        }, 300);
    }
});

// Initially hide scroll to top button
scrollToTopBtn.style.display = "none";
scrollToTopBtn.style.opacity = "0";
scrollToTopBtn.style.transition = "opacity 0.3s";

/* COUNTDOWN TIMER */
const weddingDate = new Date("September 26, 2026 17:00:00").getTime();

setInterval(() => {

    let now = new Date().getTime();
    let distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";
        return;
    }

    document.getElementById("days").textContent = Math.floor(distance / 86400000);
    document.getElementById("hours").textContent = Math.floor((distance % 86400000) / 3600000);
    document.getElementById("minutes").textContent = Math.floor((distance % 3600000) / 60000);
    document.getElementById("seconds").textContent = Math.floor((distance % 60000) / 1000);

}, 1000);

/* FADE IN ON SCROLL */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

console.log("💍 Tasmirah & Shohaib | Wedding Invitation");
console.log("📍 Musjid Noorul Mustapha, Chatsworth");
console.log("📅 26 September 2026");
console.log("🎬 Tap the wax seal to watch the envelope open!");
console.log("📜 Scroll down to see the full invitation!");
