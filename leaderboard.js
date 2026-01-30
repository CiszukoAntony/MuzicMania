// ================================
// MUZICMANIA - LEADERBOARD CONTROLLER
// ================================

let currentFilter = 'all';

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
    // Asegurar que AuthSystem esté inicializado
    if (typeof AuthSystem === 'undefined') {
        console.error('AuthSystem no cargado');
        return;
    }
    
    // Inicializar Auth si no lo ha hecho por su cuenta (aunque debería)
    // AuthSystem.init(); // Ya se llama en auth.js al cargar
    
    loadLeaderboard();
    updateStats();
});

// === CARGAR LEADERBOARD ===
function loadLeaderboard() {
    // Obtener datos unificados del AuthSystem
    const leaderboardData = AuthSystem.getLeaderboard();
    
    displayLeaderboard(leaderboardData);
}

function displayLeaderboard(data) {
    const tbody = document.getElementById('leaderboard-body');
    const currentUser = AuthSystem.getCurrentUser();
    
    // Simular que los bots jugaron diferentes canciones para el filtro
    const songs = ['Neon Nights', 'Synthwave Dreams', 'Cyberpunk Rush', 'Electric Paradise'];
    
    // Asignar canciones aleatorias a los bots si no tienen (solo para visualización)
    const processedData = data.map(entry => {
        if (!entry.song) {
            // Determinista basado en el nombre para que no cambie al recargar
            const nameSum = entry.username.split('').reduce((a,c) => a + c.charCodeAt(0), 0);
            entry.song = songs[nameSum % songs.length];
        }
        
        // Simular fecha si no tiene
        if (!entry.date) {
            entry.date = new Date().toISOString();
        }
        
        return entry;
    });

    // Filtrar por canción si aplica
    let filteredData = currentFilter === 'all' 
        ? processedData 
        : processedData.filter(entry => entry.song === currentFilter);
    
    // Asegurar ordenamiento
    filteredData.sort((a, b) => b.highScore - a.highScore);
    
    // Mostrar mensaje si no hay datos
    if (filteredData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No hay datos disponibles para este filtro</td></tr>';
        return;
    }
    
    // Generar filas
    tbody.innerHTML = '';
    
    // Limitar a top 100 para rendimiento
    const displayData = filteredData.slice(0, 100);
    
    displayData.forEach((entry, index) => {
        const rank = index + 1;
        const isCurrentUser = currentUser && entry.username === currentUser.username;
        const date = new Date(entry.createdAt || Date.now()).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        const row = document.createElement('tr');
        if (isCurrentUser) {
            row.classList.add('user-row');
        }
        
        let rankClass = '';
        if (rank === 1) rankClass = 'rank-1';
        else if (rank === 2) rankClass = 'rank-2';
        else if (rank === 3) rankClass = 'rank-3';
        
        let botBadge = entry.isBot ? '<i class="fas fa-robot" title="Bot" style="color: #888; font-size: 0.8rem; margin-right: 5px;"></i>' : '';
        
        row.innerHTML = `
            <td class="rank ${rankClass}">#${rank}</td>
            <td class="username">${botBadge}${entry.username}${isCurrentUser ? ' (Tú)' : ''}</td>
            <td class="score">${entry.highScore.toLocaleString()}</td>
            <td class="accuracy">${entry.accuracy || 0}%</td>
            <td>${entry.song}</td>
            <td class="date">${date}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// === FILTROS ===
function filterBySong(song) {
    currentFilter = song;
    
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Encontrar el botón clickeado
    const clickedBtn = Array.from(document.querySelectorAll('.filter-btn')).find(b => b.innerText.includes(song === 'all' ? 'Todas' : song));
    if (clickedBtn) clickedBtn.classList.add('active');
    
    // Recargar leaderboard
    loadLeaderboard();
}

// === ACTUALIZAR STATS ===
function updateStats() {
    const data = AuthSystem.getLeaderboard();
    
    // Total de jugadores únicos
    document.getElementById('total-players').textContent = data.length.toLocaleString();
    
    // Total de partidas (suma de todos)
    const totalGames = data.reduce((sum, p) => sum + (p.gamesPlayed || 0), 0);
    document.getElementById('total-games').textContent = totalGames.toLocaleString();
    
    // Puntuación más alta
    const highestScore = data.length > 0 ? data[0].highScore : 0;
    document.getElementById('highest-score').textContent = highestScore.toLocaleString();
}

// Exportar funciones globales
window.filterBySong = filterBySong;
