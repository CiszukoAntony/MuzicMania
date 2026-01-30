/**
 * MUZICMANIA - Global Search System v1.0
 * Features site-wide indexing and smart redirection.
 */

const SearchSystem = {
    // Database of searchable pages and keywords
    index: [
        { title: 'Inicio', url: 'index.html', keywords: ['home', 'empezar', 'novedades', 'estadisticas', 'bienvenido'], desc: 'Página principal con noticias y estadísticas.' },
        { title: 'Jugar Ahora', url: 'game.html', keywords: ['play', 'game', 'canciones', 'ritmo', 'mania', 'gameplay'], desc: 'Sección del juego con selección de canciones.' },
        { title: 'Leaderboard', url: 'leaderboard.html', keywords: ['ranking', 'mejores', 'puntuaciones', 'top', 'global'], desc: 'Tabla de clasificación mundial de MuzicMania.' },
        { title: 'Contacto y Soporte', url: 'contactanos.html', keywords: ['ayuda', 'soporte', 'staff', 'equipo', 'valoraciones'], desc: 'Formulario de contacto y soporte técnico.' },
        { title: 'Tu Perfil', url: 'profile.html', keywords: ['cuenta', 'user', 'records', 'ajustes', 'mis datos'], desc: 'Gestiona tu cuenta y revisa tus récords personales.' },
        { title: 'Términos y Condiciones', url: 'terms.html', keywords: ['reglas', 'privacidad', 'legal', 'normas'], desc: 'Información legal y normas de la comunidad.' },
        { title: 'Changelog', url: 'changelog.html', keywords: ['updates', 'parches', 'novedades', 'roadmap', 'versiones'], desc: 'Historial de actualizaciones y parches de MuzicMania.' }
    ],

    init() {
        const searchBtn = document.querySelector('.search-btn');
        const searchInput = document.querySelector('.search-input');
        const resultsDropdown = document.querySelector('.search-results-dropdown');

        if (!searchBtn || !searchInput) return;

        searchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSearch();
        });

        searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value.trim());
        });

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-wrapper')) {
                this.closeSearch();
            }
        });

        // Handle Enter key for the first result
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const firstResult = resultsDropdown.querySelector('.search-result-item');
                if (firstResult) firstResult.click();
            }
        });
    },

    toggleSearch() {
        const wrapper = document.querySelector('.search-input-container');
        const btn = document.querySelector('.search-btn');
        const navUl = document.querySelector('nav ul');
        const input = document.querySelector('.search-input');

        wrapper.classList.toggle('active');
        btn.classList.toggle('active');
        
        if (wrapper.classList.contains('active')) {
            navUl.classList.add('nav-hidden');
            input.focus();
            // Cerrar menú de acceso si está abierto
            if (window.AdaptiveNav && AdaptiveNav.closeAccessMenu) {
                AdaptiveNav.closeAccessMenu();
            }
        } else {
            navUl.classList.remove('nav-hidden');
            this.closeResults();
        }
    },

    closeSearch() {
        const wrapper = document.querySelector('.search-input-container');
        const btn = document.querySelector('.search-btn');
        const navUl = document.querySelector('nav ul');
        
        if (wrapper) wrapper.classList.remove('active');
        if (btn) btn.classList.remove('active');
        if (navUl) navUl.classList.remove('nav-hidden');
        this.closeResults();
    },

    performSearch(query) {
        if (!query || query.length < 2) {
            this.closeResults();
            return;
        }

        const results = this.index.filter(item => {
            const lowQuery = query.toLowerCase();
            return item.title.toLowerCase().includes(lowQuery) || 
                   item.keywords.some(k => k.includes(lowQuery)) ||
                   item.desc.toLowerCase().includes(lowQuery);
        });

        this.renderResults(results, query);
    },

    renderResults(results, query) {
        const dropdown = document.querySelector('.search-results-dropdown');
        dropdown.innerHTML = '';

        if (results.length === 0) {
            dropdown.innerHTML = `<div class="search-result-item" style="cursor: default;">
                <span class="search-result-title">No hay resultados para "${query}"</span>
            </div>`;
        } else {
            results.forEach(item => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.innerHTML = `
                    <div class="search-result-title">${item.title}</div>
                    <div class="search-result-desc">${item.desc}</div>
                    <div class="search-result-count">${this.countMatches(item, query)} coincidencias</div>
                `;
                div.onclick = () => window.location.href = item.url;
                dropdown.appendChild(div);
            });
        }

        dropdown.classList.add('active');
    },

    countMatches(item, query) {
        const text = (item.title + ' ' + item.keywords.join(' ') + ' ' + item.desc).toLowerCase();
        const matches = text.split(query.toLowerCase()).length - 1;
        return matches > 0 ? matches : 1;
    },

    closeResults() {
        const dropdown = document.querySelector('.search-results-dropdown');
        if (dropdown) dropdown.classList.remove('active');
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => SearchSystem.init());
