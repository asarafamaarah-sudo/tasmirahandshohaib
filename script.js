// JavaScript source code
// DOM elements
// Get elements
const rsvpModal = document.getElementById('rsvpModal');
const rsvpBtn = document.getElementById('rsvpButton');
const closeModal = document.getElementById('closeModal');
const rsvpForm = document.getElementById('rsvpForm');
const toast = document.getElementById('toast');
const downloadBtn = document.getElementById('downloadBtn');
const clearBtn = document.getElementById('clearBtn');
const rsvpCountSpan = document.getElementById('rsvpCount');

// Storage key
const STORAGE_KEY = 'tasmirah_shohaib_rsvps';

// Show toast notification
function showToast(message, duration = 3000) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Update RSVP counter
function updateRSVPCounter() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const rsvps = JSON.parse(saved);
            rsvpCountSpan.textContent = rsvps.length;
        } catch (e) {
            rsvpCountSpan.textContent = '0';
        }
    } else {
        rsvpCountSpan.textContent = '0';
    }
}

// Get all RSVPs
function getRSVPs() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    try {
        return JSON.parse(saved);
    } catch (e) {
        return [];
    }
}

// Save RSVP
function saveRSVP(name, email, attending, guests) {
    const rsvpEntry = {
        name: name.trim(),
        email: email.trim(),
        attending: attending === 'yes' ? 'Attending' : 'Not attending',
        guests: parseInt(guests) || 1,
        date: new Date().toLocaleString()
    };

    let rsvps = getRSVPs();
    rsvps.push(rsvpEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rsvps));
    updateRSVPCounter();
    return rsvps.length;
}

// Download RSVPs as text file
function downloadRSVPs() {
    const rsvps = getRSVPs();

    if (rsvps.length === 0) {
        showToast('📭 No RSVPs have been submitted yet.');
        return;
    }

    let attendingCount = 0;
    let notAttendingCount = 0;
    let totalGuests = 0;

    let output = "═══════════════════════════════════════════════════════════════\n";
    output += "          WEDDING RSVP LIST — Tasmirah & Shohaib\n";
    output += "═══════════════════════════════════════════════════════════════\n\n";
    output += `📆 Generated: ${new Date().toLocaleString()}\n`;
    output += `👥 Total Responses: ${rsvps.length}\n`;
    output += "───────────────────────────────────────────────────────────────\n\n";

    rsvps.forEach((rsvp, idx) => {
        if (rsvp.attending === 'Attending') {
            attendingCount++;
            totalGuests += rsvp.guests || 1;
        } else {
            notAttendingCount++;
        }

        const statusSymbol = rsvp.attending === 'Attending' ? '✅ ATTENDING' : '❌ NOT ATTENDING';

        output += `[${idx + 1}] 👤 ${rsvp.name}\n`;
        output += `    📋 Status: ${statusSymbol}\n`;
        output += `    👥 Guests: ${rsvp.guests || 1}\n`;
        output += `    📧 Email: ${rsvp.email || '— not provided —'}\n`;
        output += `    🕊️ Submitted: ${rsvp.date}\n`;
        output += `    ${"~".repeat(63)}\n\n`;
    });

    output += "───────────────────────────────────────────────────────────────\n";
    output += `📊 SUMMARY:\n`;
    output += `   ✅ Attending: ${attendingCount} (${totalGuests} total guests)\n`;
    output += `   ❌ Not Attending: ${notAttendingCount}\n`;
    output += `   📝 Total Responses: ${rsvps.length}\n`;
    output += "═══════════════════════════════════════════════════════════════\n";
    output += `✨ May Allah bless this union — Thank you for your warm wishes. ✨\n`;
    output += "═══════════════════════════════════════════════════════════════\n";

    // Create and download file
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    link.download = `tasmirah_shohaib_rsvps_${timestamp}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`📁 Downloaded ${rsvps.length} RSVP(s) as text file`);
}

// Clear all RSVPs
function clearAllRSVPs() {
    const rsvps = getRSVPs();
    if (rsvps.length === 0) {
        showToast('No RSVPs to clear');
        return;
    }

    if (confirm('⚠️ Are you sure you want to permanently DELETE all RSVP responses? This cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEY);
        updateRSVPCounter();
        showToast('🗑️ All RSVPs have been cleared');
    }
}

// Open RSVP modal
rsvpBtn.onclick = () => {
    rsvpModal.style.display = 'flex';
};

// Close modal
closeModal.onclick = () => {
    rsvpModal.style.display = 'none';
};

// Close modal when clicking outside
window.onclick = (e) => {
    if (e.target === rsvpModal) {
        rsvpModal.style.display = 'none';
    }
};

// Handle RSVP form submission
rsvpForm.onsubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const attending = document.getElementById('attending').value;
    const guests = document.getElementById('guests').value || 1;

    if (!name) {
        showToast('💌 Please enter your name', 2000);
        return;
    }

    const total = saveRSVP(name, email, attending, guests);
    const attendanceMsg = attending === 'yes' ? 'join us in celebration ✨' : 'we will miss you 💐';

    showToast(`🌸 Thank you ${name}! You will ${attendanceMsg} (${total} total RSVPs)`, 3500);

    rsvpForm.reset();
    document.getElementById('guests').value = '1';
    rsvpModal.style.display = 'none';
};

// Download button
downloadBtn.onclick = downloadRSVPs;

// Clear button
clearBtn.onclick = clearAllRSVPs;

// Keyboard shortcut: Press 'D' to download
document.onkeydown = (e) => {
    if (e.key === 'd' || e.key === 'D') {
        const activeTag = document.activeElement?.tagName?.toLowerCase();
        if (activeTag !== 'input' && activeTag !== 'textarea' && activeTag !== 'select') {
            e.preventDefault();
            downloadRSVPs();
        }
    }
};

// Initialize counter
updateRSVPCounter();

console.log('💍 Tasmirah & Shohaib Wedding Invitation ready!');
console.log('📍 Venue: Musjid Noorul Mustapha, Chatsworth');
console.log('📥 Click "Download RSVPs" or press D key to save responses');