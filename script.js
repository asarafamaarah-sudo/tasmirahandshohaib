// JavaScript source code
// DOM elements
// Get elements
/* ENVELOPE */
const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openInvite");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let opened = false;

openBtn.addEventListener("click", async () => {

    if (opened) return;
    opened = true;

    envelope.classList.add("open");

    try { 
        await music.play(); 
        musicBtn.textContent = "♫ Playing";
    } catch(e) {
        // Auto-play blocked - user will click play button
        console.log("Auto-play prevented. Click play button.");
    }

    setTimeout(() => {
        document.getElementById("openingScreen").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("openingScreen").style.display = "none";
        }, 1500);
    }, 1200);

});

/* MUSIC */
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

/* COUNTDOWN */
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

/* REAL PETALS */
const petals = [
    "petal1.jpeg",
    "petal2.jpeg",
    "petal3.jpeg"
];

function createPetal() {
    const img = document.createElement("img");
    const randomPetal = petals[Math.floor(Math.random() * petals.length)];
    img.src = randomPetal;
    img.style.left = Math.random() * 100 + "vw";
    img.style.width = (15 + Math.random() * 20) + "px";
    img.style.animation = `fall ${Math.random() * 4 + 5}s linear`;
    img.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    document.getElementById("petals").appendChild(img);

    setTimeout(() => img.remove(), 9000);
}

// Create petals every 250ms
setInterval(createPetal, 250);

// Create some petals immediately
for (let i = 0; i < 8; i++) {
    setTimeout(createPetal, i * 200);
}

console.log("💍 Tasmirah & Shohaib | Wedding Invitation");
console.log("📍 Musjid Noorul Mustapha, Chatsworth");
console.log("📅 26 September 2026");
