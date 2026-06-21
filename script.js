// JavaScript source code
// DOM elements
// Get elements
const openBtn = document.getElementById("openInvite");
const envelope = document.getElementById("envelope");
const openingScreen = document.getElementById("openingScreen");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let opened = false;

/* Open Envelope */
openBtn.addEventListener("click", async () => {
    if (opened) return;
    opened = true;

    envelope.classList.add("open");

    /* Play music automatically */
    try { 
        await music.play(); 
        musicBtn.textContent = "♫ Playing";
    } catch(e) {
        // Auto-play blocked by browser - user will click play
        console.log("Auto-play prevented. Click play button.");
    }

    setTimeout(() => {
        openingScreen.style.opacity = "0";
        setTimeout(() => {
            openingScreen.style.display = "none";
        }, 1500);
    }, 1200);
});

/* Music toggle */
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

/* Countdown Timer */
const weddingDate = new Date("September 26, 2026 17:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";
        return;
    }

    document.getElementById("days").textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("hours").textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("minutes").textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("seconds").textContent = Math.floor((distance % (1000 * 60)) / 1000);

}, 1000);

/* Fade-in animation on scroll */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

/* Floating Petals */
function createPetal() {
    const p = document.createElement("div");
    const petals = ["🌸", "🌹", "🌺", "🌷", "🌻", "🌸", "🌹"];
    p.innerHTML = petals[Math.floor(Math.random() * petals.length)];
    p.style.position = "fixed";
    p.style.left = Math.random() * 100 + "vw";
    p.style.top = "-50px";
    p.style.fontSize = (20 + Math.random() * 20) + "px";
    p.style.zIndex = "9998";
    p.style.pointerEvents = "none";
    p.style.animation = `fall ${5 + Math.random() * 4}s linear forwards`;
    p.style.opacity = 0.6 + Math.random() * 0.4;
    document.body.appendChild(p);
    
    setTimeout(() => {
        if (p.parentNode) p.remove();
    }, 9000);
}

// Create petals every 400ms
setInterval(createPetal, 400);

// Create some petals immediately
for (let i = 0; i < 5; i++) {
    setTimeout(createPetal, i * 200);
}

console.log("💍 Tasmirah & Shohaib | Wedding Invitation");
console.log("📍 Musjid Noorul Mustapha, Chatsworth");
console.log("📅 26 September 2026");
