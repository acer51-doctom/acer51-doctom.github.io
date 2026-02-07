// --- AUDIO ENGINE ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

function playTone(freq, type, duration) {
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
}

// --- UI LOGIC ---
const startScreen = document.getElementById('start-screen');
const apps = document.querySelectorAll('.app-container');

// Initialize tone listeners on tiles
document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('mouseenter', () => playTone(400, 'sine', 0.1));
    tile.addEventListener('click', () => playTone(300, 'triangle', 0.15));
});

function openApp(appId) {
    const targetApp = document.getElementById(appId);
    if (!targetApp) return;
    
    // Close any currently active apps just in case
    apps.forEach(app => {
        if(app.id !== appId) app.classList.remove('active');
    });

    startScreen.classList.add('zoom-out');
    targetApp.classList.add('active');
}

function goHome() {
    playTone(200, 'sine', 0.2);
    startScreen.classList.remove('zoom-out');
    apps.forEach(app => app.classList.remove('active'));
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const clockEl = document.getElementById('clock');
    if(clockEl) clockEl.textContent = timeString;
}

// Start clock
setInterval(updateClock, 1000);
updateClock();

// --- MOBILE POPUP LOGIC ---
function checkMobile() {
    // Checks if the window width is 800px or less (matching your CSS mobile breakpoint)
    if (window.innerWidth <= 800) {
        document.getElementById('mobile-popup').classList.add('show');
    }
}

function closePopup() {
    document.getElementById('mobile-popup').classList.remove('show');
}

// Run check when page loads
window.addEventListener('load', checkMobile);
