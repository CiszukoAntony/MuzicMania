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
            </a>
            <a href="${bp}game.html" class="nav-menu-item" data-page="game.html">
                <div class="nav-menu-item-header"><i class="fas fa-gamepad"></i> <span>Jugar</span></div>
            </a>
            <a href="${bp}stats.html" class="nav-menu-item" data-page="stats.html">
                <div class="nav-menu-item-header"><i class="fas fa-chart-bar"></i> <span>Estadísticas</span></div>
            </a>
            <a href="${bp}leaderboard.html" class="nav-menu-item" data-page="leaderboard.html">
                <div class="nav-menu-item-header"><i class="fas fa-trophy"></i> <span>Leaderboard</span></div>
            </a>
            <a href="${bp}help.html" class="nav-menu-item" data-page="help.html">
                <div class="nav-menu-item-header"><i class="fas fa-question-circle"></i> <span>Ayuda</span></div>
            </a>
            <a href="${bp}about.html" class="nav-menu-item" data-page="about.html">
                <div class="nav-menu-item-header"><i class="fas fa-info-circle"></i> <span>Información</span></div>
            </a>
            <a href="${bp}faq.html" class="nav-menu-item" data-page="faq.html">
                <div class="nav-menu-item-header"><i class="fas fa-comments"></i> <span>FAQ</span></div>
            </a>
            <a href="${bp}team.html" class="nav-menu-item" data-page="team.html">
                <div class="nav-menu-item-header"><i class="fas fa-users-cog"></i> <span>Equipo</span></div>
            </a>
            <a href="${bp}directrices.html" class="nav-menu-item" data-page="directrices.html">
                <div class="nav-menu-item-header"><i class="fas fa-map-signs"></i> <span>Directrices</span></div>
            </a>
            <a href="${bp}rules.html" class="nav-menu-item" data-page="rules.html">
                <div class="nav-menu-item-header"><i class="fas fa-gavel"></i> <span>Reglamentos</span></div>
            </a>
            <a href="${bp}policy.html" class="nav-menu-item" data-page="policy.html">
                <div class="nav-menu-item-header"><i class="fas fa-shield-alt"></i> <span>Políticas</span></div>
            </a>
            <a href="${bp}terms.html" class="nav-menu-item" data-page="terms.html">
                <div class="nav-menu-item-header"><i class="fas fa-file-contract"></i> <span>Términos Legales</span></div>
            </a>
            <a href="${bp}soporte.html" class="nav-menu-item" data-page="soporte.html">
                <div class="nav-menu-item-header"><i class="fas fa-headset"></i> <span>Soporte</span></div>
            </a>
            <a href="${bp}changelog.html" class="nav-menu-item" data-page="changelog.html">
                <div class="nav-menu-item-header"><i class="fas fa-history"></i> <span>Changelog</span></div>
            </a>
            <a href="${bp}soporte.html#contacto" class="nav-menu-item" data-page="contactanos.html">
                <div class="nav-menu-item-header"><i class="fas fa-envelope"></i> <span>Contacto</span></div>
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
            <nav id="main-nav" class="nav-comprehensive">
                <ul>
                    <li><a href="${bp}index.html" data-page="index.html"><i class="fas fa-home"></i> Inicio</a></li>
                    <li><a href="${bp}game.html" data-page="game.html"><i class="fas fa-gamepad"></i> Jugar</a></li>
                    <li><a href="${bp}stats.html" data-page="stats.html"><i class="fas fa-chart-bar"></i> Stats</a></li>
                    <li><a href="${bp}leaderboard.html" data-page="leaderboard.html"><i class="fas fa-trophy"></i> Ranking</a></li>
                    <li><a href="${bp}soporte.html" data-page="soporte.html"><i class="fas fa-headset"></i> Soporte</a></li>
                    
                    <!-- Dropdown de Información -->
                    <li class="nav-dropdown">
                        <a href="${bp}about.html" class="nav-dropdown-trigger" data-page="about.html" style="text-decoration: none; color: #ccc; font-weight: bold; transition: 0.3s;">
                            <i class="fas fa-info-circle"></i> Información <i class="fas fa-chevron-down dropdown-arrow"></i>
                        </a>
                        <div class="nav-dropdown-menu">
                            <a href="${bp}team.html" class="nav-dropdown-item" data-page="team.html"><i class="fas fa-users-cog"></i> Equipo</a>
                            <a href="${bp}help.html" class="nav-dropdown-item" data-page="help.html"><i class="fas fa-question-circle"></i> Ayuda</a>
                            <a href="${bp}faq.html" class="nav-dropdown-item" data-page="faq.html"><i class="fas fa-comments"></i> FAQ</a>
                            <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 5px 0;"></div>
                            <a href="${bp}rules.html" class="nav-dropdown-item" data-page="rules.html"><i class="fas fa-gavel"></i> Reglas</a>
                            <a href="${bp}policy.html" class="nav-dropdown-item" data-page="policy.html"><i class="fas fa-shield-alt"></i> Políticas</a>
                            <a href="${bp}terms.html" class="nav-dropdown-item" data-page="terms.html"><i class="fas fa-file-contract"></i> Términos</a>
                            <a href="${bp}directrices.html" class="nav-dropdown-item" data-page="directrices.html"><i class="fas fa-map-signs"></i> Directrices</a>
                        </div>
                    </li>
                </ul>
                <div id="auth-section"></div>
                <div class="search-wrapper">
                    <button class="search-btn" title="Buscar"><i class="fas fa-search"></i></button>
                    <div class="search-input-container">
                        <input type="text" class="search-input" placeholder="Buscar...">
                    </div>
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
                        <img src="${bp}assets/logo.png" alt="Logo" class="logo-img footer-logo-sync">
                        <h3>MUZICMANIA</h3>
                    </a>
                    <p style="margin-top: 0.5rem; color: #888;">El mejor juego de ritmo futurista. Dominando el neón desde 2026.</p>
                </div>

                <div class="footer-section">
                    <h4>Navegación</h4>
                    <ul class="footer-comprehensive-list" style="columns: 2; gap: 2rem; list-style: none; padding: 0;">
                        <li><a href="${bp}index.html" data-page="index.html"><i class="fas fa-home"></i> Inicio</a></li>
                        <li><a href="${bp}game.html" data-page="game.html"><i class="fas fa-gamepad"></i> Jugar</a></li>
                        <li><a href="${bp}stats.html" data-page="stats.html"><i class="fas fa-chart-bar"></i> Estadísticas</a></li>
                        <li><a href="${bp}leaderboard.html" data-page="leaderboard.html"><i class="fas fa-trophy"></i> Leaderboard</a></li>
                        <li><a href="${bp}help.html" data-page="help.html"><i class="fas fa-question-circle"></i> Help</a></li>
                        <li><a href="${bp}faq.html" data-page="faq.html"><i class="fas fa-comments"></i> FAQ</a></li>
                        <li><a href="${bp}about.html" data-page="about.html"><i class="fas fa-info-circle"></i> About</a></li>
                        <li><a href="${bp}team.html" data-page="team.html"><i class="fas fa-users-cog"></i> Team</a></li>
                        <li><a href="${bp}directrices.html" data-page="directrices.html"><i class="fas fa-map-signs"></i> Directrices</a></li>
                        <li><a href="${bp}rules.html" data-page="rules.html"><i class="fas fa-gavel"></i> Reglamentos</a></li>
                        <li><a href="${bp}policy.html" data-page="policy.html"><i class="fas fa-shield-alt"></i> Policy</a></li>
                        <li><a href="${bp}terms.html" data-page="terms.html"><i class="fas fa-file-contract"></i> Terms</a></li>
                        <li><a href="${bp}soporte.html" data-page="soporte.html"><i class="fas fa-headset"></i> Soporte</a></li>
                        <li><a href="${bp}changelog.html" data-page="changelog.html"><i class="fas fa-history"></i> Changelog</a></li>
                        <li><a href="${bp}soporte.html#contacto" data-page="contactanos.html"><i class="fas fa-envelope"></i> Contacto</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4>Comunidad</h4>
                    <div class="social-icons">
                        <a href="https://x.com" target="_blank" title="X (Twitter)"><i class="fab fa-x-twitter"></i></a>
                        <a href="https://discord.com" target="_blank" title="Discord"><i class="fab fa-discord"></i></a>
                        <a href="https://github.com/CiszukoAntony/MuzicMania" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
                        <a href="https://reddit.com" target="_blank" title="Reddit"><i class="fab fa-reddit"></i></a>
                        <a href="https://youtube.com" target="_blank" title="YouTube"><i class="fab fa-youtube"></i></a>
                        <a href="https://instagram.com" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="https://tiktok.com" target="_blank" title="TikTok"><i class="fab fa-tiktok"></i></a>
                        <a href="https://twitch.tv" target="_blank" title="Twitch"><i class="fab fa-twitch"></i></a>
                    </div>
                    <p style="margin-top: 1rem; color: #888;">Únete a nuestra creciente comunidad tecnológica y musical.</p>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2026 MuzicMania. Creado por Ciszuko Antony. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>`
        };
    },

    init: function() {
        console.log("Iniciando Layout System...");
        
        // Calcular ruta base antes de nada
        this.setBasePath();

        // 0. Cargar Centinela de Errores
        if (!window.MuzicError) {
            const script = document.createElement('script');
            script.src = `${this.basePath}errors.js`;
            document.head.prepend(script);
        }

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

