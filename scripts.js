// Elementos flotantes
const floatingContainer = document.getElementById('floatingElements');
const floatingEmojis = ['💚', '💜',];

function createFloatingItem() {
    const item = document.createElement('div');
    item.className = 'floating-item';
    item.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
    item.style.left = Math.random() * 100 + '%';
    item.style.animationDuration = (Math.random() * 4 + 6) + 's';
    item.style.animationDelay = Math.random() * 3 + 's';
    item.style.fontSize = (Math.random() * 20 + 20) + 'px';
    floatingContainer.appendChild(item);

    setTimeout(() => {
        item.remove();
    }, 10000);
}

// Crear elementos continuamente
setInterval(createFloatingItem, 400);

// Control de música mejorado
const bgMusic = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeBtn = document.getElementById('volumeBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const progressDot = document.getElementById('progressDot');
const timeCurrent = document.querySelector('.time-current');
const timeTotal = document.querySelector('.time-total');
const vinylDisc = document.querySelector('.vinyl-disc');

let isPlaying = true;
let isMuted = false;

// Función para formatear tiempo
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        vinylDisc.classList.remove('playing');
        isPlaying = false;
    } else {
        bgMusic.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        vinylDisc.classList.add('playing');
        isPlaying = true;
    }
});

// Volumen
volumeBtn.addEventListener('click', () => {
    if (isMuted) {
        bgMusic.muted = false;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        isMuted = false;
    } else {
        bgMusic.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        isMuted = true;
    }
});

// Actualizar duración total cuando se carga la metadata
bgMusic.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = formatTime(bgMusic.duration);
});

// Actualizar progreso
bgMusic.addEventListener('timeupdate', () => {
    const percent = (bgMusic.currentTime / bgMusic.duration) * 100;
    progressFill.style.width = percent + '%';
    progressDot.style.left = percent + '%';
    timeCurrent.textContent = formatTime(bgMusic.currentTime);
});

// Hacer click en la barra de progreso
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    bgMusic.currentTime = percent * bgMusic.duration;
});

// Arrastrar el punto de progreso
let isDragging = false;

progressDot.addEventListener('mousedown', () => {
    isDragging = true;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const rect = progressBar.getBoundingClientRect();
        let percent = (e.clientX - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        bgMusic.currentTime = percent * bgMusic.duration;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Crear confeti inicial
function createConfetti() {
    const colors = ['#ff66cc', '#b875d9', '#ffd6f0', '#e6b3ff', '#ffb3e6'];
    const emojis = ['🟧', '🟦', '🟥', '🟪', '🟩', '🟨'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.fontSize = '20px';
            confetti.style.zIndex = '9999';
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];

            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 2000 + 3000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            document.body.appendChild(confetti);

            animation.onfinish = () => confetti.remove();
        }, i * 100);
    }
}

// Confeti al cargar
window.addEventListener('load', () => {
    setTimeout(createConfetti, 500);
});