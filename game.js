// ================================
// MUZICMANIA - GAME ENGINE
// ================================

// === CONFIGURACIÓN DEL JUEGO ===
const GAME_CONFIG = {
    lanes: 4, // 4 flechas (left, down, up, right)
    fallSpeed: 3, // Velocidad de caída de las flechas
    hitZoneY: 520, // Posición Y de la zona de golpeo
    hitTolerance: {
        perfect: 30,
        great: 60,
        good: 90
    },
    comboMultiplier: 10,
    scoreValues: {
        perfect: 300,
        great: 200,
        good: 100,
        miss: 0
    }
};

// === MAPEO DE TECLAS ===
const KEY_MAP = {
    'ArrowLeft': 0,
    'KeyA': 0,
    'ArrowDown': 1,
    'KeyS': 1,
    'ArrowUp': 2,
    'KeyW': 2,
    'ArrowRight': 3,
    'KeyD': 3
};

// === ESTADO DEL JUEGO ===
let gameState = {
    isPlaying: false,
    isPaused: false,
    score: 0,
    combo: 0,
    maxCombo: 0,
    hits: { perfect: 0, great: 0, good: 0, miss: 0 },
    currentSong: null,
    notes: [],
    currentTime: 0,
    startTime: 0
};

// === CANCIONES (DATOS DE EJEMPLO) ===
const SONGS = [
    {
        id: 1,
        title: 'Neon Nights',
        difficulty: 'Fácil',
        bpm: 120,
        duration: 60, // segundos
        // Patrones de notas: [tiempo, carril]
        notePattern: generateNotePattern(60, 2, 120)
    },
    {
        id: 2,
        title: 'Synthwave Dreams',
        difficulty: 'Medio',
        bpm: 140,
        duration: 80,
        notePattern: generateNotePattern(80, 3, 140)
    },
    {
        id: 3,
        title: 'Cyberpunk Rush',
        difficulty: 'Difícil',
        bpm: 160,
        duration: 90,
        notePattern: generateNotePattern(90, 4, 160)
    },
    {
        id: 4,
        title: 'Electric Paradise',
        difficulty: 'Extremo',
        bpm: 180,
        duration: 100,
        notePattern: generateNotePattern(100, 5, 180)
    }
];

// === CANVAS & CONTEXT ===
let canvas, ctx;
let animationFrameId;

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    
    // Ajustar tamaño del canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Cargar lista de canciones
    loadSongList();
    
    // Event listeners para teclas
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    // Inicializar visualizador
    initVisualizer();

    // Verificar si es invitado y mostrar advertencia
    if (typeof AuthSystem !== 'undefined') {
        AuthSystem.checkGameAccess();
    }
    
    console.log('🎮 Game Engine initialized!');
});

function resizeCanvas() {
    const wrapper = canvas.parentElement;
    canvas.width = wrapper.clientWidth - 40;
    canvas.height = 600;
}

// === GENERADOR DE PATRONES DE NOTAS ===
function generateNotePattern(duration, density, bpm) {
    const notes = [];
    const beatInterval = 60 / bpm; // Intervalo entre beats en segundos
    const notesPerBeat = density;
    
    for (let time = 1; time < duration; time += beatInterval / notesPerBeat) {
        const lane = Math.floor(Math.random() * 4);
        notes.push({ time, lane });
    }
    
    return notes.sort((a, b) => a.time - b.time);
}

// === CARGA DE LISTA DE CANCIONES ===
function loadSongList() {
    const container = document.getElementById('song-list-container');
    container.innerHTML = '';
    
    SONGS.forEach(song => {
        const songItem = document.createElement('div');
        songItem.className = 'song-item';
        songItem.innerHTML = `
            <div class="song-title">${song.title}</div>
            <div class="song-difficulty">Dificultad: ${song.difficulty} | BPM: ${song.bpm}</div>
        `;
        songItem.onclick = () => selectSong(song);
        container.appendChild(songItem);
    });
}

function selectSong(song) {
    gameState.currentSong = song;
    
    // Actualizar UI
    document.querySelectorAll('.song-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.song-item').classList.add('active');
    
    console.log(`🎵 Selected: ${song.title}`);
}

// === CONTROL DEL JUEGO ===
function startGame() {
    if (!gameState.currentSong) {
        showNotification('¡Selecciona una canción primero!', 'error');
        return;
    }
    
    if (gameState.isPlaying) return;
    
    // Reset estado
    gameState = {
        isPlaying: true,
        isPaused: false,
        score: 0,
        combo: 0,
        maxCombo: 0,
        hits: { perfect: 0, great: 0, good: 0, miss: 0 },
        currentSong: gameState.currentSong,
        notes: JSON.parse(JSON.stringify(gameState.currentSong.notePattern)),
        currentTime: 0,
        startTime: Date.now()
    };
    
    // Actualizar UI
    document.getElementById('btn-start').disabled = true;
    document.getElementById('btn-pause').disabled = false;
    updateUI();
    
    // Iniciar el loop del juego
    gameLoop();
    
    console.log('🎮 Game started!');
}

function pauseGame() {
    if (!gameState.isPlaying) return;
    
    gameState.isPaused = !gameState.isPaused;
    document.getElementById('btn-pause').textContent = gameState.isPaused ? '▶ Reanudar' : '⏸ Pausa';
    
    if (!gameState.isPaused) {
        gameState.startTime = Date.now() - (gameState.currentTime * 1000);
        gameLoop();
    }
}

function restartGame() {
    gameState.isPlaying = false;
    gameState.isPaused = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    document.getElementById('btn-start').disabled = false;
    document.getElementById('btn-pause').disabled = true;
    document.getElementById('btn-pause').textContent = '⏸ Pausa';
    
    updateUI();
    clearCanvas();
}

// === GAME LOOP ===
function gameLoop() {
    if (!gameState.isPlaying || gameState.isPaused) return;
    
    // Calcular tiempo actual
    gameState.currentTime = (Date.now() - gameState.startTime) / 1000;
    
    // Limpiar canvas
    clearCanvas();
    
    // Dibujar carriles
    drawLanes();
    
    // Actualizar y dibujar notas
    updateNotes();
    drawNotes();
    
    // Verificar fin del juego
    if (gameState.currentTime >= gameState.currentSong.duration) {
        endGame();
        return;
    }
    
    // Actualizar UI
    updateUI();
    
    // Actualizar visualizador
    updateVisualizer();
    
    // Siguiente frame
    animationFrameId = requestAnimationFrame(gameLoop);
}

// === DIBUJADO ===
function clearCanvas() {
    ctx.fillStyle = 'rgba(0, 0, 10, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawLanes() {
    const laneWidth = canvas.width / 4;
    
    for (let i = 0; i < 4; i++) {
        const x = i * laneWidth;
        
        // Línea divisoria
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Línea de la zona de hit
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 4;
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#00d4ff';
    ctx.beginPath();
    ctx.moveTo(0, GAME_CONFIG.hitZoneY);
    ctx.lineTo(canvas.width, GAME_CONFIG.hitZoneY);
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function updateNotes() {
    gameState.notes.forEach(note => {
        if (!note.active && note.time <= gameState.currentTime + 3) {
            note.active = true;
            note.y = -50;
        }
        
        if (note.active && !note.hit) {
            note.y += GAME_CONFIG.fallSpeed;
            
            // Auto-miss si la nota pasó de largo
            if (note.y > GAME_CONFIG.hitZoneY + GAME_CONFIG.hitTolerance.good) {
                note.hit = true;
                registerHit('miss');
            }
        }
    });
}

function drawNotes() {
    const laneWidth = canvas.width / 4;
    const noteSize = 60;
    const arrows = ['←', '↓', '↑', '→'];
    
    gameState.notes.forEach(note => {
        if (note.active && !note.hit) {
            const x = (note.lane * laneWidth) + (laneWidth / 2);
            
            // Gradiente de la nota
            const gradient = ctx.createLinearGradient(x - 30, note.y - 30, x + 30, note.y + 30);
            gradient.addColorStop(0, '#00d4ff');
            gradient.addColorStop(0.5, '#ff0080');
            gradient.addColorStop(1, '#8000ff');
            
            // Cuadrado de fondo
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(x - noteSize/2, note.y - noteSize/2, noteSize, noteSize);
            
            // Borde con gradiente
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00d4ff';
            ctx.strokeRect(x - noteSize/2, note.y - noteSize/2, noteSize, noteSize);
            
            // Flecha
            ctx.fillStyle = gradient;
            ctx.font = 'bold 40px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(arrows[note.lane], x, note.y);
            
            ctx.shadowBlur = 0;
        }
    });
}

// === MANEJO DE TECLAS ===
function handleKeyDown(e) {
    const lane = KEY_MAP[e.code];
    if (lane === undefined || !gameState.isPlaying || gameState.isPaused) return;
    
    // Highlight de la tecla
    const keyElements = ['key-left', 'key-down', 'key-up', 'key-right'];
    document.getElementById(keyElements[lane]).classList.add('active');
    
    // Buscar nota más cercana en ese carril
    checkHit(lane);
}

function handleKeyUp(e) {
    const lane = KEY_MAP[e.code];
    if (lane === undefined) return;
    
    const keyElements = ['key-left', 'key-down', 'key-up', 'key-right'];
    document.getElementById(keyElements[lane]).classList.remove('active');
}

function checkHit(lane) {
    const hitZone = GAME_CONFIG.hitZoneY;
    
    // Encontrar la nota más cercana en este carril que aún no ha sido golpeada
    let closestNote = null;
    let minDist = Infinity;
    
    gameState.notes.forEach(note => {
        if (note.lane === lane && note.active && !note.hit) {
            const dist = Math.abs(note.y - hitZone);
            if (dist < minDist) {
                minDist = dist;
                closestNote = note;
            }
        }
    });
    
    // Evaluar el hit
    if (closestNote) {
        let judgment;
        
        if (minDist <= GAME_CONFIG.hitTolerance.perfect) {
            judgment = 'perfect';
        } else if (minDist <= GAME_CONFIG.hitTolerance.great) {
            judgment = 'great';
        } else if (minDist <= GAME_CONFIG.hitTolerance.good) {
            judgment = 'good';
        } else {
            return; // Demasiado lejos
        }
        
        closestNote.hit = true;
        registerHit(judgment);
    }
}

function registerHit(judgment) {
    gameState.hits[judgment]++;
    
    if (judgment === 'miss') {
        gameState.combo = 0;
    } else {
        gameState.combo++;
        if (gameState.combo > gameState.maxCombo) {
            gameState.maxCombo = gameState.combo;
        }
        
        // Calcular puntuación
        const baseScore = GAME_CONFIG.scoreValues[judgment];
        const comboBonus = Math.floor(gameState.combo / 10) * GAME_CONFIG.comboMultiplier;
        gameState.score += baseScore + comboBonus;
    }
    
    // Mostrar judgment
    showJudgment(judgment);
    
    // Mostrar combo si es mayor a 10
    if (gameState.combo >= 10) {
        showComboPopup();
    }
}

// === UI UPDATES ===
function updateUI() {
    document.getElementById('score-display').textContent = gameState.score.toLocaleString();
    document.getElementById('combo-display-header').textContent = `${gameState.combo}x`;
    
    const totalHits = gameState.hits.perfect + gameState.hits.great + gameState.hits.good + gameState.hits.miss;
    const accuracy = totalHits > 0 
        ? Math.round(((gameState.hits.perfect + gameState.hits.great + gameState.hits.good) / totalHits) * 100)
        : 100;
    document.getElementById('accuracy-display').textContent = `${accuracy}%`;
}

function showJudgment(judgment) {
    const popup = document.getElementById('judgment-popup');
    popup.textContent = judgment.toUpperCase();
    popup.className = `judgment-display judgment-${judgment} show`;
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 500);
}

function showComboPopup() {
    const popup = document.getElementById('combo-popup');
    popup.textContent = `${gameState.combo}x COMBO!`;
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 800);
}

// === VISUALIZADOR DE AUDIO ===
function initVisualizer() {
    const visualizer = document.getElementById('visualizer');
    for (let i = 0; i < 50; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        bar.style.height = '10px';
        visualizer.appendChild(bar);
    }
}

function updateVisualizer() {
    const bars = document.querySelectorAll('.visualizer-bar');
    bars.forEach((bar, i) => {
        // Simulación de visualizador (random con algo de coherencia)
        const height = Math.random() * 60 + 20 + Math.sin(gameState.currentTime * 5 + i * 0.5) * 20;
        bar.style.height = `${height}px`;
    });
}

// === FIN DEL JUEGO ===
function endGame() {
    gameState.isPlaying = false;
    
    const finalScore = gameState.score;
    const accuracy = Math.round(
        ((gameState.hits.perfect + gameState.hits.great + gameState.hits.good) / 
        (gameState.hits.perfect + gameState.hits.great + gameState.hits.good + gameState.hits.miss)) * 100
    );
    
    // Guardar puntuación si hay usuario logueado
    if (typeof AuthSystem !== 'undefined' && AuthSystem.getCurrentUser()) {
        AuthSystem.updateUserScore(finalScore, accuracy);
        showNotification('¡Puntuación guardada!', 'success');
    }
    
    // Mostrar resultado
    setTimeout(() => {
        alert(`🎵 ¡Juego Terminado!\n\nPuntuación: ${finalScore.toLocaleString()}\nPrecisión: ${accuracy}%\nCombo Máximo: ${gameState.maxCombo}x\n\nPerfect: ${gameState.hits.perfect}\nGreat: ${gameState.hits.great}\nGood: ${gameState.hits.good}\nMiss: ${gameState.hits.miss}`);
        
        restartGame();
    }, 500);
}

// saveScore eliminada porque AuthSystem maneja la lógica centralizada
// Si necesitamos una función local, podemos hacer esto:
function saveScore(score, accuracy) {
    if (AuthSystem) AuthSystem.updateUserScore(score, accuracy);
}

// Exportar funciones globales
window.startGame = startGame;
window.pauseGame = pauseGame;
window.restartGame = restartGame;
