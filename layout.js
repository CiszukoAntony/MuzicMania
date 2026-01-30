/**
 * MuzicMania Layout System
 * Centralizes Header, Footer, NavOverlay and shared UI elements.
 */

const Layout = {
    basePath: '',

    // Detectar profundidad de la carpeta para ajustar rutas relativas
    setBasePath: function() {
        const path = window.location.pathname;
        const parts = path.split('/').filter(p => p.length > 0);
        // Si hay más de un segmento (ej: /debug/base.html), necesitamos subir niveles
        // El último segmento suele ser el nombre del archivo
        const depth = parts.length > 0 ? parts.length - 1 : 0;
        this.basePath = '../'.repeat(depth);
        console.log(`Layout: Profundidad detectada: ${depth}, basePath: "${this.basePath}"`);
    },

    // Templates (Centralizados)
    getTemplates: function() {
        const bp = this.basePath;
        return {
            zoomWarning: `
    <div class="zoom-warning">
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-search-plus"></i>
            <span id="zoom-warning-text">El zoom es demasiado alto. Algunas opciones se han movido al menú.</span>
        </div>
        <button class="close-warning" onclick="AdaptiveNav.closeWarning()" title="Cerrar">&times;</button>
    </div>`,

            navOverlay: `
    <div class="menu-backdrop" onclick="AdaptiveNav.toggleMenu(false)"></div>
    <div class="nav-overlay">
        <div class="nav-overlay-header">
            <h3>MENÚ PRINCIPAL</h3>
            <button class="close-menu-btn" onclick="AdaptiveNav.toggleMenu(false)"><i class="fas fa-times"></i></button>
        </div>
        <div class="nav-overlay-content">
            <a href="${bp}index.html" class="nav-menu-item" data-page="index.html">
                <div class="nav-menu-item-header"><i class="fas fa-home"></i> <span>Inicio</span></div>
                <p>Volver a la base. Noticias y estadísticas globales.</p>
            </a>
            <a href="${bp}game.html" class="nav-menu-item" data-page="game.html">
                <div class="nav-menu-item-header"><i class="fas fa-gamepad"></i> <span>Jugar</span></div>
                <p>Pon a prueba tu ritmo con nuestra selección de canciones.</p>
            </a>
            <a href="${bp}leaderboard.html" class="nav-menu-item" data-page="leaderboard.html">
                <div class="nav-menu-item-header"><i class="fas fa-trophy"></i> <span>Leaderboard</span></div>
                <p>Compite por el top mundial de puntuaciones.</p>
            </a>
            <a href="${bp}changelog.html" class="nav-menu-item" data-page="changelog.html">
                <div class="nav-menu-item-header"><i class="fas fa-list-ul"></i> <span>Changelog</span></div>
                <p>Historial de actualizaciones, parches y novedades.</p>
            </a>
            <a href="${bp}soporte.html" class="nav-menu-item" data-page="soporte.html">
                <div class="nav-menu-item-header"><i class="fas fa-headset"></i> <span>Soporte</span></div>
                <p>¿Tienes problemas? Nuestro equipo de ayuda está aquí.</p>
            </a>
            <a href="${bp}contactanos.html" class="nav-menu-item" data-page="contactanos.html">
                <div class="nav-menu-item-header"><i class="fas fa-envelope"></i> <span>Contacto</span></div>
                <p>Envíanos tus sugerencias o propuestas de negocio.</p>
            </a>
            <a href="${bp}terms.html" class="nav-menu-item" data-page="terms.html">
                <div class="nav-menu-item-header"><i class="fas fa-file-contract"></i> <span>Términos</span></div>
                <p>Reglas de la comunidad y políticas de privacidad.</p>
            </a>
            <a href="${bp}profile.html" class="nav-menu-item" data-page="profile.html">
                <div class="nav-menu-item-header"><i class="fas fa-user"></i> <span>Mi Perfil</span></div>
                <p>Revisa tus estadísticas y logros.</p>
            </a>
        </div>
    </div>`,

            header: `
    <header>
        <div class="header-content">
            <a href="${bp}index.html" class="logo-container">
                <img src="${bp}assets/logo.png" alt="MuzicMania Logo" class="logo-img">
                <span class="logo-text">MUZICMANIA</span>
            </a>
            <nav>
                <ul>
                    <li><a href="${bp}index.html" data-page="index.html"><i class="fas fa-home"></i> Inicio</a></li>
                    <li><a href="${bp}game.html" data-page="game.html"><i class="fas fa-gamepad"></i> Jugar</a></li>
                    <li><a href="${bp}leaderboard.html" data-page="leaderboard.html"><i class="fas fa-trophy"></i> Leaderboard</a></li>
                    <li><a href="${bp}changelog.html" data-page="changelog.html"><i class="fas fa-list-ul"></i> Changelog</a></li>
                    <li><a href="${bp}soporte.html" data-page="soporte.html"><i class="fas fa-headset"></i> Soporte</a></li>
                    <li><a href="${bp}contactanos.html" data-page="contactanos.html"><i class="fas fa-envelope"></i> Contacto</a></li>
                    <li><a href="${bp}terms.html" data-page="terms.html"><i class="fas fa-file-contract"></i> Términos</a></li>
                </ul>
                <div id="auth-section"></div>
                <div class="search-wrapper">
                    <button class="search-btn" title="Buscar"><i class="fas fa-search"></i></button>
                    <div class="search-input-container">
                        <input type="text" class="search-input" placeholder="Buscar en MuzicMania...">
                    </div>
                    <div class="search-results-dropdown"></div>
                    <button class="menu-toggle-btn" title="Menú" onclick="AdaptiveNav.toggleMenu(true)"><i class="fas fa-bars"></i></button>
                </div>
            </nav>
        </div>
    </header>`,

            footer: `
    <footer>
        <div class="footer-content">
            <div class="footer-grid">
                <div class="footer-section">
                    <a href="${bp}index.html" class="footer-brand">
                        <img src="${bp}assets/logo.png" alt="Logo" class="footer-logo">
                        <h3>MUZICMANIA</h3>
                    </a>
                    <p style="margin-top: 0.5rem; color: #888;">El mejor juego de ritmo futurista. Pon a prueba tus habilidades y compite con jugadores de todo el mundo.</p>
                </div>

                <div class="footer-section">
                    <h4>Navegación</h4>
                    <ul>
                        <li><a href="${bp}index.html">Inicio</a></li>
                        <li><a href="${bp}game.html">Jugar</a></li>
                        <li><a href="${bp}leaderboard.html">Leaderboard</a></li>
                        <li><a href="${bp}terms.html">Términos y Condiciones</a></li>
                        <li><a href="${bp}changelog.html">Blog de Cambios</a></li>
                        <li><a href="${bp}contactanos.html">Contacto</a></li>
                        <li><a href="${bp}profile.html">Mi Perfil</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4>Síguenos</h4>
                    <div class="social-icons">
                        <a href="#" title="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" title="Discord"><i class="fab fa-discord"></i></a>
                        <a href="#" title="YouTube"><i class="fab fa-youtube"></i></a>
                        <a href="#" title="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" title="TikTok"><i class="fab fa-tiktok"></i></a>
                    </div>
                    <p style="margin-top: 1rem; color: #888;">Únete a nuestra comunidad y mantente al día con las últimas novedades.</p>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2026 MuzicMania. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>`
        };
    },

    init: function() {
        console.log("Iniciando Layout System...");
        
        // Calcular ruta base antes de nada
        this.setBasePath();
        const templates = this.getTemplates();
        
        // 1. Insertar Zoom Warning y Nav Overlay al principio del body
        document.body.insertAdjacentHTML('afterbegin', templates.navOverlay);
        document.body.insertAdjacentHTML('afterbegin', templates.zoomWarning);

        // 2. Insertar Header antes del Main (si existe main, sino al principio)
        const main = document.querySelector('main');
        if (main) {
            main.insertAdjacentHTML('beforebegin', templates.header);
        } else {
            document.body.insertAdjacentHTML('afterbegin', templates.header);
        }

        // 3. Insertar Footer al final del body
        document.body.insertAdjacentHTML('beforeend', templates.footer);

        // 4. Marcar página activa
        this.highlightActivePage();

        // 5. Reinicializar Auth UI
        if (typeof AuthSystem !== 'undefined' && AuthSystem.updateAuthUI) {
            setTimeout(() => AuthSystem.updateAuthUI(), 100);
        }
    },

    highlightActivePage: function() {
        const path = window.location.pathname;
        const page = path.split("/").pop() || 'index.html';

        document.querySelectorAll('nav a, .nav-menu-item').forEach(el => el.classList.remove('active'));

        const links = document.querySelectorAll(`[data-page="${page}"]`);
        
        if (links.length === 0 && (page === '' || page === '/')) {
             document.querySelectorAll(`[data-page="index.html"]`).forEach(el => el.classList.add('active'));
        } else {
             links.forEach(el => el.classList.add('active'));
        }
    }
};

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => {
    Layout.init();
});

