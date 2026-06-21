// JavaScript source code
// DOM elements
// Get elements
/* ENVELOPE */
const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openInvite");
const openingScreen = document.getElementById("openingScreen");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let opened = false;

openBtn.addEventListener("click", async () => {

    if (opened) return;
    opened = true;

    // Open envelope animation
    envelope.classList.add("open");

    // Try to play music
    try { 
        await music.play(); 
        musicBtn.textContent = "♫ Playing";
    } catch(e) {
        console.log("Auto-play prevented. Click play button.");
    }

    // Hide opening screen and show main content
    setTimeout(() => {
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
    }, 1200);

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

/* FALLING PETALS - using your petal images */
const petals = [
    "images/petal1.jpeg",
    "images/petal2.jpeg",
    "images/petal3.jpeg"
];

function createPetal() {
    const img = document.createElement("img");
    const randomPetal = petals[Math.floor(Math.random() * petals.length)];
    img.src = randomPetal;
    img.style.left = Math.random() * 100 + "vw";
    img.style.width = (15 + Math.random() * 20) + "px";
    img.style.animation = `fall ${Math.random() * 4 + 5}s linear`;
    img.style.transform = `rotate(${Math.random() * 360}deg)`;
    img.style.position = "fixed";
    img.style.top = "-50px";
    img.style.pointerEvents = "none";
    img.style.zIndex = "9998";
    
    document.getElementById("petals").appendChild(img);

    setTimeout(() => {
        if (img.parentNode) img.remove();
    }, 9000);
}

// Create petals every 250ms
setInterval(createPetal, 250);

// Create some initial petals
for (let i = 0; i < 8; i++) {
    setTimeout(createPetal, i * 200);
}

console.log("💍 Tasmirah & Shohaib | Wedding Invitation");
console.log("📍 Musjid Noorul Mustapha, Chatsworth");
console.log("📅 26 September 2026");
console.log("✨ Tap the wax seal to open the invitation!");
