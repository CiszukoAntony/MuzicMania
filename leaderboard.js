// ================================
// MUZICMANIA - LEADERBOARD CONTROLLER (REFINDED)
// ================================

let state = {
    sortBy: 'highScore',
    sortDir: 'desc', // 'desc' o 'asc'
    currentPage: 1,
    itemsPerPage: 10,
    data: []
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof AuthSystem === 'undefined') {
        console.error('AuthSystem no cargado');
        return;
    }

    initLeaderboard();
});

function initLeaderboard() {
    state.data = AuthSystem.getLeaderboard();

    // Simular datos de bots si es necesario para QA
    fillEmptyStats();

    render();
}

function fillEmptyStats() {
    state.data = state.data.map(user => {
        if (user.isBot) {
            // Bots simulados con stats creíbles
            if (!user.playTime) user.playTime = Math.floor(Math.random() * 5000) + 1000;
            if (!user.maxCombo) user.maxCombo = Math.floor(user.highScore / 500);
            if (!user.accuracy) user.accuracy = Math.floor(Math.random() * 20) + 80;
        }
        return user;
    });
}

function setSort(criteria) {
    state.sortBy = criteria;
    state.currentPage = 1; // Reset a pág 1 al cambiar filtro

    // Actualizar botones UI
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(criteria)) {
            btn.classList.add('active');
        }
    });

    render();
}

function toggleSortDir() {
    state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc';
    state.currentPage = 1;

    // Actualizar icono del botón
    if (icon) {
        icon.innerHTML = Layout.ICONS_LIB.get(state.sortDir === 'desc' ? 'fa-filled-arrow-down-wide-short' : 'fa-filled-arrow-up-short-wide');
    }

    render();
}

function render() {
    const container = document.getElementById('leaderboard-body');

    // 1. Ordenar datos
    let sortedData = [...state.data].sort((a, b) => {
        const valA = a[state.sortBy] || 0;
        const valB = b[state.sortBy] || 0;
        return state.sortDir === 'desc' ? valB - valA : valA - valB;
    });

    // 2. Paginación
    const totalPages = Math.ceil(sortedData.length / state.itemsPerPage);
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + state.itemsPerPage);

    // 3. Renderizar Filas
    if (paginatedData.length === 0) {
        container.innerHTML = '<div style="padding: 3rem; text-align: center; color: #666;">No hay registros para mostrar.</div>';
        return;
    }

    container.innerHTML = paginatedData.map((user, index) => {
        const absoluteRank = startIndex + index + 1;
        const topClass = absoluteRank <= 3 ? `top-${absoluteRank}` : '';
        const initials = user.displayName.substring(0, 2).toUpperCase();

        // Formato para tiempo (Solo minutos para el leaderboard según petición)
        const formatTimeMin = (seconds) => {
            const m = Math.floor((seconds || 0) / 60);
            return `${m}m`;
        };

        const isBot = user.isBot;
        const cleanHandle = user.username.startsWith('@') ? user.username : `@${user.username}`;

        return `
            <div class="ranking-row ${topClass}">
                <div class="rank-badge">${absoluteRank}</div>
                <div class="hide-mobile" style="display: flex; justify-content: center;">
                    <div class="profile-icon" onclick="Layout.showDevelopmentWarning('Perfil de Jugador (En Proceso)')" style="width: 45px; height: 45px; font-size: 0.9rem; cursor: pointer;">
                        <span class="user-initials">${initials}</span>
                    </div>
                </div>
                <div class="player-info" onclick="Layout.showDevelopmentWarning('Perfil de Jugador (En Proceso)')" style="cursor: pointer;">
                    <span class="display-name">${user.displayName} ${isBot ? '<svg class="icon bot-icon" style="width: 1.1em; height: 1.1em; vertical-align: middle; margin-left: 5px;"><use href="content/icons/sprites/sprite-filled.svg#fa-filled-robot"></use></svg>' : ''}</span>
                    <span class="user-handle">${cleanHandle}</span>
                </div>
                <div class="stat-value score-val">${(user.highScore || 0).toLocaleString()}</div>
                <div class="stat-value hide-mobile" style="color: var(--neon-pink); opacity: 0.8;">${(user.maxCombo || 0)}x</div>
                <div class="stat-value hide-mobile" style="color: var(--neon-cyan); opacity: 0.7;">${formatTimeMin(user.playTime)}</div>
                <div class="stat-value accuracy-val">${(user.accuracy || 0)}%</div>
            </div>
        `;
    }).join('');

    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = '';

    // Botón Anterior
    html += `<div class="page-btn ${state.currentPage === 1 ? 'disabled' : ''}" onclick="changePage(${state.currentPage - 1})">${Layout.ICONS_LIB.get('fa-filled-angle-left')}</div>`;

    // Botones numéricos
    for (let i = 1; i <= totalPages; i++) {
        if (totalPages > 7) {
            if (i > 2 && i < totalPages - 1 && Math.abs(i - state.currentPage) > 1) {
                if (i === 3 || i === totalPages - 2) html += `<div class="page-btn disabled">...</div>`;
                continue;
            }
        }
        html += `<div class="page-btn ${state.currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</div>`;
    }

    // Botón Siguiente
    html += `<div class="page-btn ${state.currentPage === totalPages ? 'disabled' : ''}" onclick="changePage(${state.currentPage + 1})">${Layout.ICONS_LIB.get('fa-filled-angle-right')}</div>`;

    pagination.innerHTML = html;
}

function changePage(page) {
    const totalPages = Math.ceil(state.data.length / state.itemsPerPage);
    if (page < 1 || page > totalPages) return;

    state.currentPage = page;
    render();

    document.querySelector('.leaderboard-table-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Globales
window.setSort = setSort;
window.toggleSortDir = toggleSortDir;
window.changePage = changePage;
