/**
 * MuzicMania Layout System
 * Centralizes Header, Footer, NavOverlay and shared UI elements.
 */

const ICONS_LIB = {
    // Helper to generate sprite reference with dynamic base path
    get: (id, bp = '') => `<svg class="nav-icon-svg"><use href="${bp}content/icons/sprites/sprite-filled.svg#${id}"></use></svg>`,
    flag: (code, bp = '') => `<svg class="flag-icon-svg"><use href="${bp}content/icons/sprites/sprite-flags.svg#flag-${code}"></use></svg>`,

    // Navigation (Mapping to library icons)
    home: 'ri-filled-home-4',
    play: 'ri-filled-play-large',
    leaderboard: 'ri-filled-trophy',
    stats: 'ri-filled-bar-chart-box',
    changelog: 'ri-filled-history',
    info: 'ri-filled-information',
    team: 'ri-filled-group',
    help: 'ri-filled-question',
    policy: 'ri-filled-shield-check',
    contact: 'ri-filled-mail',
    support: 'ri-filled-customer-service-2',
    faq: 'ri-filled-message-2',
    documentation: 'ri-filled-booklet',
    credits: 'ri-filled-star',
    guidelines: 'ri-filled-file-list-2',
    rules: 'fa-filled-list-check',
    license: 'fa-filled-file-contract',
    terms: 'fa-filled-file-lines',

    // Social Media
    social_x: 'ri-filled-twitter-x',
    social_discord: 'ri-filled-discord',
    social_github: 'ri-filled-github',
    social_reddit: 'ri-filled-reddit',
    social_youtube: 'ri-filled-youtube',
    social_instagram: 'ri-filled-instagram',
    social_tiktok: 'ri-filled-tiktok',
    social_twitch: 'ri-filled-twitch',
    social_facebook: 'ri-filled-facebook-circle',
    whatsapp: 'ri-filled-whatsapp',

    // UI Utilities
    search: 'ri-filled-search',
    user: 'ri-filled-user-3',
    menu: 'ri-filled-menu-4',
    close: 'ri-filled-close-large',
    arrow_right: 'fa-filled-arrow-right',
    chevron_down: 'fa-filled-angle-down',
    chevron_up: 'fa-filled-angle-up',
    sun: 'ri-filled-sun',
    moon: 'ri-filled-moon',
    language: 'ri-filled-global',
    zoom_in: 'ri-filled-zoom-in',
    flask: 'ri-filled-flask',
    robot: 'ri-filled-robot',
    trophy: 'ri-filled-trophy',
    terminal: 'ri-filled-terminal-box',
    code: 'ri-filled-code',
    tools: 'ri-filled-tools',
    user_lock: 'ri-filled-user-settings',
    logout: 'ri-filled-logout-box-r',
    login: 'ri-filled-login-box-r',
    user_add: 'ri-filled-user-add',
    restart: 'fa-filled-arrow-rotate-right',
};

const Layout = {
    basePath: '',

    // Detectar profundidad de la carpeta para ajustar rutas relativas
    setBasePath: function() {
        const path = window.location.pathname.replace(/\\/g, '/');
        const parts = path.split('/').filter(p => p.length > 0);

        // Buscar el índice de la carpeta raíz del proyecto
        const rootIndex = parts.findIndex(p => p.toLowerCase() === 'muzicmania');

        if (rootIndex !== -1) {
            // El número de niveles por debajo de la raíz es: (total de partes - 1) - índice de la raíz
            const depth = (parts.length - 1) - rootIndex;
            // Solo aplicamos si estamos en una subcarpeta
            this.basePath = depth > 0 ? '../'.repeat(depth) : '';
        } else {
            // Fallback: si no encuentra "MuzicMania", asumimos que está en la raíz
            // a menos que detectemos una carpeta conocida de subnivel (como /debug/)
            this.basePath = path.includes('/debug/') ? '../' : '';
        }
        console.log(`Layout: basePath set to "${this.basePath}" (depth calculation)`);
    },

    // Templates (Centralizados)
    getTemplates: function() {
        const bp = this.basePath;

        // --- ICONS SVG (Ref from Global) ---
        const ICONS = {};
        for (const key in ICONS_LIB) {
            if (key !== 'get') {
                ICONS[key] = ICONS_LIB.get(ICONS_LIB[key], bp);
            }
        }
        return {
            zoomWarning: `
    <div class="zoom-warning">
        <div style="display: flex; align-items: center; gap: 10px;">
            ${ICONS.zoom_in}
            <span id="zoom-warning-text">Zoom level is too high. Some options have moved to the menu.</span>
        </div>
        <button class="close-warning" onclick="AdaptiveNav.closeWarning()" title="Close">&times;</button>
    </div>`,

            securityWarning: (id, icon, title, text) => `
    <div class="zoom-warning security-warning" id="warning-${id}" style="border-color: var(--neon-pink); background: rgba(255, 0, 128, 0.05); top: calc(110px + (var(--warning-offset, 0) * 50px));">
        <div style="display: flex; align-items: center; gap: 10px;">
            ${ICONS.policy}
            <span><strong>${title}:</strong> ${text}</span>
        </div>
        <button class="close-warning" onclick="Layout.closeSecurityWarning('${id}')" title="Entendido">&times;</button>
    </div>`,

            // Advertencia especial para modo debug - Diseño Vertical Premium
            debugWarning: (stats) => `
    <div class="zoom-warning security-warning debug-card" id="warning-debug">
        <div class="debug-top-row">
            <div class="debug-title-simple">
                ${ICONS.flask} MODO DEV DEBUG
            </div>
            <button class="close-warning-simple" onclick="Layout.closeSecurityWarning('debug')" title="Cerrar" style="position: absolute; top: 10px; right: 15px;">&times;</button>
        </div>

        <div class="debug-warning-sub">
            ${ICONS.info} Datos simulados y herramientas de prueba activas
        </div>

        <div class="debug-stats-simple">
            <div class="stat-pill">
                ${ICONS.robot}
                <span><b>${stats.botsCreated || 25}</b> Bots</span>
            </div>
            <div class="stat-pill">
                ${ICONS.trophy}
                <span><b>${stats.leaderboardEntries || 0}</b> Rank</span>
            </div>
            <div class="stat-pill">
                ${ICONS.terminal}
                <span>Console Logs</span>
            </div>
            <div class="stat-pill">
                ${ICONS.code}
                <span>v${stats.version || '2.1.0-A'}</span>
            </div>
        </div>
    </div>`,

            authModal: (action) => `
    <div class="auth-required-backdrop" id="auth-modal-backdrop">
        <div class="auth-required-modal">
            <button class="close-auth-modal" onclick="Layout.closeAuthModal()">&times;</button>
            <div class="auth-modal-icon">
                ${ICONS.user_lock}
            </div>
            <h2 class="auth-modal-title">¡Acceso Requerido!</h2>
            <p class="auth-modal-text">Debes iniciar sesión o registrarte para poder <strong>${action}</strong>.</p>
            <div class="auth-modal-actions">
                <button class="btn btn-full" onclick="Layout.closeAuthModal(); AuthSystem.openModal('login')">INGRESAR</button>
                <button class="btn btn-red-gradient btn-full" onclick="Layout.closeAuthModal(); AuthSystem.openModal('register')">REGISTRARSE</button>
            </div>
        </div>
    </div>`,

            navOverlay: `
    <div class="menu-backdrop"></div>
    <div class="nav-overlay">
        <div class="nav-overlay-header">
            <button class="menu-header-btn theme-toggle-btn moon-mode" onclick="Layout.toggleMenuTheme()" title="Cambiar Tema">
                ${ICONS.moon}
            </button>
            <h3>MAIN MENU</h3>
            <button class="menu-header-btn lang-toggle-btn" onclick="Layout.toggleMenuLanguage()" title="Cambiar Idioma">
                ${ICONS.language}
            </button>
        </div>
        <div class="nav-overlay-content">
            <div id="main-menu-sections" class="menu-transition-container active">
                <a href="${bp}index.html" class="nav-menu-item" data-page="index.html">
                    <div class="nav-menu-item-header">${ICONS.home} <span>Home</span></div>
                </a>
                <a href="${bp}play.html" class="nav-menu-item" data-page="play.html">
                    <div class="nav-menu-item-header">${ICONS.play} <span>Play</span></div>
                </a>
                <a href="${bp}leaderboard.html" class="nav-menu-item" data-page="leaderboard.html">
                    <div class="nav-menu-item-header">${ICONS.leaderboard} <span>Leaderboard</span></div>
                </a>
                <a href="${bp}stats.html" class="nav-menu-item" data-page="stats.html">
                    <div class="nav-menu-item-header">${ICONS.stats} <span>Stats</span></div>
                </a>
                <a href="${bp}changelog.html" class="nav-menu-item" data-page="changelog.html">
                    <div class="nav-menu-item-header">${ICONS.changelog} <span>Changelog</span></div>
                </a>

                <div style="border-top: 1px solid rgba(255,255,255,0.1); margin: 10px 0;"></div>

                <a href="${bp}about.html" class="nav-menu-item" data-page="about.html">
                    <div class="nav-menu-item-header">${ICONS.info} <span>Information</span></div>
                </a>

                <a href="${bp}team.html" class="nav-menu-item" data-page="team.html">
                    <div class="nav-menu-item-header">${ICONS.team} <span>Team</span></div>
                </a>
                <a href="${bp}credits.html" class="nav-menu-item" data-page="credits.html">
                    <div class="nav-menu-item-header">${ICONS.credits} <span>Credits</span></div>
                </a>
                <a href="${bp}help.html" class="nav-menu-item" data-page="help.html">
                    <div class="nav-menu-item-header">${ICONS.help} <span>Help</span></div>
                </a>
                <a href="${bp}documentation.html" class="nav-menu-item" data-page="documentation.html">
                    <div class="nav-menu-item-header">${ICONS.documentation} <span>Documentation</span></div>
                </a>
                <a href="${bp}faq.html" class="nav-menu-item" data-page="faq.html">
                    <div class="nav-menu-item-header">${ICONS.faq} <span>FAQ</span></div>
                </a>

                <div style="border-top: 1px solid rgba(255,255,255,0.1); margin: 10px 0;"></div>

                <a href="${bp}contact.html" class="nav-menu-item" data-page="contact.html">
                    <div class="nav-menu-item-header">${ICONS.contact} <span>Contact</span></div>
                </a>
                <a href="${bp}support.html" class="nav-menu-item" data-page="support.html">
                    <div class="nav-menu-item-header">${ICONS.support} <span>Support</span></div>
                </a>
            </div>

            <!-- Language Selection Grid -->
            <div id="lang-menu-list" class="menu-transition-container">
                <div class="lang-grid">
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Español')">${ICONS_LIB.flag('es', bp)} Español</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: English (US)')">${ICONS_LIB.flag('us', bp)} English (US)</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: English (UK)')">${ICONS_LIB.flag('gb', bp)} English (UK)</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Português (BR)')">${ICONS_LIB.flag('br', bp)} Português (BR)</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Português (PT)')">${ICONS_LIB.flag('pt', bp)} Português (PT)</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Français')">${ICONS_LIB.flag('fr', bp)} Français</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Deutsch')">${ICONS_LIB.flag('de', bp)} Deutsch</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Italiano')">${ICONS_LIB.flag('it', bp)} Italiano</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: 日本語')">${ICONS_LIB.flag('jp', bp)} 日本語</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Korean')">${ICONS_LIB.flag('kr', bp)} Korean</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Chinese')">${ICONS_LIB.flag('cn', bp)} Chinese</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Русский')">${ICONS_LIB.flag('ru', bp)} Русский</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Argentina')">${ICONS_LIB.flag('ar', bp)} Argentina</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Colombia')">${ICONS_LIB.flag('co', bp)} Colombia</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: México')">${ICONS_LIB.flag('mx', bp)} México</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Chile')">${ICONS_LIB.flag('cl', bp)} Chile</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Perú')">${ICONS_LIB.flag('pe', bp)} Perú</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Venezuela')">${ICONS_LIB.flag('ve', bp)} Venezuela</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: India')">${ICONS_LIB.flag('in', bp)} India</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Canada')">${ICONS_LIB.flag('ca', bp)} Canada</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Australia')">${ICONS_LIB.flag('au', bp)} Australia</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Arabic')">${ICONS_LIB.flag('sa', bp)} Arabic</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Turkish')">${ICONS_LIB.flag('tr', bp)} Turkish</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Nederlands')">${ICONS_LIB.flag('nl', bp)} Nederlands</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Polski')">${ICONS_LIB.flag('pl', bp)} Polski</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Svenska')">${ICONS_LIB.flag('se', bp)} Svenska</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Tiếng Việt')">${ICONS_LIB.flag('vn', bp)} Tiếng Việt</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: ภาษาไทย')">${ICONS_LIB.flag('th', bp)} ภาษาไทย</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Bahasa Indonesia')">${ICONS_LIB.flag('id', bp)} Bahasa Indonesia</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Filipino')">${ICONS_LIB.flag('ph', bp)} Filipino</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Idioma: Català')">${ICONS_LIB.flag('es-ct', bp)} Català</div>
                    <div class="lang-item" onclick="Layout.showDevelopmentWarning('Otros')">${ICONS_LIB.flag('other', bp)} Otros</div>
                </div>
            </div>
        </div>
    </div>`,

            header: `
    <header>
        <div class="header-content">
            <a href="${bp}index.html" class="logo-container">
                <img src="${bp}content/logos/imagen/not outline/isotipo/degradado/color/muzicmania_logo_isotipo_notoutline_degradado_color.svg" alt="MuzicMania Logo" class="logo-img">
                <img src="${bp}content/logos/imagen/not outline/logotipo/degradado/color/muzicmania_logotipo_degradado_color.svg" alt="MuzicMania" class="header-text-logotipo">
            </a>
            <div class="header-divider"></div>
            <nav id="main-nav" class="nav-comprehensive">
                <ul>
                    <li><a href="${bp}index.html" data-page="index.html">${ICONS.home} Home</a></li>
                    <li><a href="${bp}play.html" data-page="play.html">${ICONS.play} Play</a></li>
                    <li><a href="${bp}leaderboard.html" data-page="leaderboard.html">${ICONS.leaderboard} Leaderboard</a></li>
                    <li><a href="${bp}stats.html" data-page="stats.html">${ICONS.stats} Stats</a></li>
                    <li><a href="${bp}changelog.html" data-page="changelog.html">${ICONS.changelog} Changelog</a></li>

                    <!-- Dropdown de Información -->
                    <li class="nav-dropdown">
                        <a href="${bp}about.html" class="nav-dropdown-trigger" data-page="about.html" style="text-decoration: none; font-weight: bold; transition: 0.3s;">
                            ${ICONS.info} Information ${ICONS.chevron_down}
                        </a>
                        <div class="nav-dropdown-menu">
                            <a href="${bp}team.html" class="nav-dropdown-item" data-page="team.html">${ICONS.team} Team</a>
                            <a href="${bp}credits.html" class="nav-dropdown-item" data-page="credits.html">${ICONS.credits} Credits</a>
                            <a href="${bp}documentation.html" class="nav-dropdown-item" data-page="documentation.html">${ICONS.documentation} Documentation</a>
                            <a href="${bp}help.html" class="nav-dropdown-item" data-page="help.html">${ICONS.help} Help</a>
                            <a href="${bp}faq.html" class="nav-dropdown-item" data-page="faq.html">${ICONS.faq} FAQ</a>
                            <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 5px 0;"></div>
                            <a href="${bp}guidelines.html" class="nav-dropdown-item" data-page="guidelines.html">${ICONS.guidelines} Guidelines</a>
                            <a href="${bp}rules.html" class="nav-dropdown-item" data-page="rules.html">${ICONS.rules} Rules</a>
                            <a href="${bp}license.html" class="nav-dropdown-item" data-page="license.html">${ICONS.license} License</a>
                            <a href="${bp}policy.html" class="nav-dropdown-item" data-page="policy.html">${ICONS.policy} Policy</a>
                            <a href="${bp}terms.html" class="nav-dropdown-item" data-page="terms.html">${ICONS.terms} Terms and Conditions</a>
                        </div>
                    </li>

                    <li><a href="${bp}contact.html" data-page="contact.html">${ICONS.contact} Contact</a></li>
                    <li><a href="${bp}support.html" data-page="support.html">${ICONS.support} Support</a></li>
                </ul>
                <div id="auth-section"></div>
                <!-- Acciones de Cabecera (Search + Menu) -->
                <div class="header-actions">
                    <div class="search-wrapper">
                        <div class="search-input-container">
                            <input type="text" class="search-input" placeholder="Buscar canción, artista...">
                        </div>
                        <button class="search-btn" title="Buscar">${ICONS.search}</button>
                        <div class="search-results-dropdown"></div>
                    </div>

                    <button class="menu-toggle-btn" title="Menú">
                        ${ICONS.menu}
                    </button>
                </div>
            </nav>
        </div>
    </header>`,

            footer: `
    <footer>
        <!-- Navigation Buttons -->
        <a href="#" class="back-to-top" onclick="event.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'});" title="Ir arriba">
            ${ICONS.chevron_up}
        </a>
        <a href="#" class="go-to-bottom" onclick="event.preventDefault(); window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});" title="Ir abajo">
            ${ICONS.chevron_down}
        </a>
        <div class="footer-content">
            <div class="footer-grid">
                <div class="footer-section main-brand">
                    <a href="${bp}index.html" class="footer-brand">
                        <img src="${bp}content/logos/imagen/not outline/isotipo/degradado/color/muzicmania_logo_isotipo_notoutline_degradado_color.svg" alt="Logo" class="logo-img footer-logo-sync">
                        <img src="${bp}content/logos/imagen/not outline/logotipo/degradado/color/muzicmania_logotipo_degradado_color.svg" alt="MuzicMania" class="footer-text-logotipo">
                    </a>
                    <p>The best futuristic rhythm game. Dominating the neon since 2026.</p>
                </div>

                <div class="footer-section divider">
                    <h4>Navigation</h4>
                    <ul class="footer-comprehensive-list">
                        <li><a href="${bp}index.html" data-page="index.html">${ICONS.home} Home</a></li>
                        <li><a href="${bp}play.html" data-page="play.html">${ICONS.play} Play</a></li>
                        <li><a href="${bp}leaderboard.html" data-page="leaderboard.html">${ICONS.leaderboard} Leaderboard</a></li>
                        <li><a href="${bp}stats.html" data-page="stats.html">${ICONS.stats} Stats</a></li>
                        <li><a href="${bp}changelog.html" data-page="changelog.html">${ICONS.changelog} Changelog</a></li>
                        <li><a href="${bp}about.html" data-page="about.html">${ICONS.info} About</a></li>

                        <!-- Info Children -->
                        <li><a href="${bp}team.html" data-page="team.html">${ICONS.team} Team</a></li>
                        <li><a href="${bp}credits.html" data-page="credits.html">${ICONS.credits} Credits</a></li>
                        <li><a href="${bp}help.html" data-page="help.html">${ICONS.help} Help</a></li>
                        <li><a href="${bp}faq.html" data-page="faq.html">${ICONS.faq} FAQ</a></li>
                        <li><a href="${bp}documentation.html" data-page="documentation.html">${ICONS.documentation} Documentation</a></li>
                        <li><a href="${bp}guidelines.html" data-page="guidelines.html">${ICONS.guidelines} Guidelines</a></li>
                        <li><a href="${bp}rules.html" data-page="rules.html">${ICONS.rules} Rules</a></li>
                        <li><a href="${bp}license.html" data-page="license.html">${ICONS.license} License</a></li>
                        <li><a href="${bp}policy.html" data-page="policy.html">${ICONS.policy} Policy</a></li>
                        <li><a href="${bp}terms.html" data-page="terms.html">${ICONS.terms} Terms and Conditions</a></li>

                        <!-- Contact/Support Last -->
                        <li><a href="${bp}contact.html" data-page="contact.html">${ICONS.contact} Contact</a></li>
                        <li><a href="${bp}support.html" data-page="support.html">${ICONS.support} Support</a></li>
                    </ul>
                </div>

                <div class="footer-section divider">
                    <h4>Community</h4>
                    <div class="social-icons">
                        <a href="https://x.com/muzicmaniaofficial" target="_blank" title="X (Twitter)" class="social-x">${ICONS.social_x}</a>
                        <a href="https://discord.gg/muzicmaniaofficial" target="_blank" title="Discord" class="social-discord">${ICONS.social_discord}</a>
                        <a href="https://github.com/CiszukoAntony/MuzicMania" target="_blank" title="GitHub" class="social-github">${ICONS.social_github}</a>
                        <a href="https://facebook.com/muzicmaniaofficial" target="_blank" title="Facebook" class="social-facebook">${ICONS.social_facebook}</a>
                        <a href="https://reddit.com/r/muzicmania" target="_blank" title="Reddit" class="social-reddit">${ICONS.social_reddit}</a>
                        <a href="https://youtube.com/@muzicmania" target="_blank" title="YouTube" class="social-youtube">${ICONS.social_youtube}</a>
                        <a href="https://instagram.com/muzicmaniaofficial" target="_blank" title="Instagram" class="social-instagram">${ICONS.social_instagram}</a>
                        <a href="https://tiktok.com/@muzicmania" target="_blank" title="TikTok" class="social-tiktok">${ICONS.social_tiktok}</a>
                        <a href="https://twitch.tv/muzicmania" target="_blank" title="Twitch" class="social-twitch">${ICONS.social_twitch}</a>
                    </div>

                    <div class="footer-contact-line" style="margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1.5rem;">
                        <a href="https://wa.me/584126858111" target="_blank" class="contact-pill" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: #fff; background: rgba(37, 211, 102, 0.1); padding: 0.8rem 1.2rem; border-radius: 50px; border: 1px solid rgba(37, 211, 102, 0.3); width: fit-content; transition: 0.3s;">
                            <span style="width: 20px; height: 20px; display: flex; align-items: center;">${ICONS.whatsapp}</span>
                            <span style="font-weight: 600; letter-spacing: 0.5px;">+58 4126858111</span>
                        </a>
                    </div>
                    <p>Join our growing tech and music community.</p>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="footer-actions-left">
                    <button class="menu-header-btn theme-toggle-btn moon-mode footer-sync-btn" onclick="Layout.toggleFooterTheme(this)" title="Cambiar Tema">
                        ${ICONS.moon}
                    </button>
                    <button class="menu-header-btn lang-toggle-btn footer-sync-btn" onclick="Layout.toggleFooterLanguage(this)" title="Cambiar Idioma">
                        ${ICONS.language}
                    </button>
                </div>
                <p>&copy; 2026 MuzicMania. Created by Ciszuko Antony. All rights reserved.</p>
            </div>
        </div>
        <style>
            footer {
                background: var(--bg-dark);
                padding: 4rem 2rem 2rem;
                border-top: 1px solid rgba(255, 255, 255, 0.05);
                margin-top: 5rem;
                position: relative; /* Para el botón flotante */
            }
            .back-to-top,
            .go-to-bottom {
                position: fixed;
                right: 2rem;
                width: 45px;
                height: 45px;
                background: var(--bg-darker);
                border: 2px solid var(--neon-blue);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 !important;
                color: var(--neon-blue);
                cursor: pointer;
                z-index: 100;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
                text-decoration: none;
            }
            .back-to-top {
                bottom: 5.5rem !important;
                background: var(--bg-darker) !important;
            }
            .go-to-bottom {
                bottom: 2rem !important;
                background: var(--bg-darker) !important;
            }
            .back-to-top:hover,
            .go-to-bottom:hover {
                transform: translateY(-5px) scale(1.1) !important;
                color: var(--neon-pink) !important;
                border-color: var(--neon-pink) !important;
                background: #000 !important; /* Asegurar fondo negro en hover */
                box-shadow: 0 0 20px rgba(255, 0, 128, 0.5) !important;
                text-decoration: none !important;
            }
            .back-to-top i,
            .go-to-bottom i {
                font-size: 1.1rem !important;
                margin: 0 !important;
                transition: color 0.3s ease !important;
            }
            .back-to-top:hover i,
            .go-to-bottom:hover i {
                color: var(--neon-pink) !important;
            }
            .back-to-top svg,
            .back-to-top .nav-icon-svg,
            .go-to-bottom svg,
            .go-to-bottom .nav-icon-svg {
                width: 20px !important;
                height: 20px !important;
                display: block !important;
                margin: 0 !important;
                transition: fill 0.3s ease !important;
                fill: var(--neon-cyan) !important; /* Color base cyan */
            }
            .back-to-top:hover svg,
            .back-to-top:hover .nav-icon-svg,
            .go-to-bottom:hover svg,
            .go-to-bottom:hover .nav-icon-svg {
                fill: var(--neon-pink) !important;
            }
            .footer-grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 0;
                text-align: center;
            }
            /* Flag Icons Styles */
            .flag-icon-svg {
                width: 20px !important;
                height: 15px !important;
                display: inline-block !important;
                vertical-align: middle !important;
                margin-right: 8px !important;
                border: 1px solid rgba(255,255,255,0.1) !important;
                border-radius: 2px !important;
                pointer-events: none !important;
            }
            /* Animación de Logos al presionar */
            .logo-container, .footer-brand {
                transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                display: inline-flex;
                align-items: center;
                cursor: pointer;
            }
            .logo-container:active, .footer-brand:active {
                transform: scale(0.92) !important;
            }
            .logo-img {
                transition: filter 0.3s;
            }
            .logo-container:hover .logo-img, .footer-brand:hover .logo-img {
                filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.4));
            }
            .footer-section {
                padding: 1.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .footer-section h4 {
                color: var(--neon-cyan);
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 1.5rem;
            }
            .footer-section p {
                margin-top: 0.8rem;
                color: #888;
                font-size: 0.9rem;
            }
            .footer-section.divider {
                border-left: 1px solid rgba(255, 255, 255, 0.05);
            }
            .footer-comprehensive-list {
                text-align: left;
                width: 100%;
                max-width: 400px;
                margin: 0 auto;
            }
            .social-icons {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1.2rem;
                margin-top: 0.5rem;
                flex-wrap: wrap;
            }
            .social-icons a {
                width: 42px;
                height: 42px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative;
                color: #888;
                text-decoration: none;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden; /* Para el degradado de Instagram */
            }
            .social-icons a:hover {
                color: #fff;
                transform: scale(1.1) translateY(-3px);
                border-color: var(--neon-blue);
                background: rgba(0, 212, 255, 0.1);
            }
            /* Colores específicos de redes sociales */
            .social-icons a.social-instagram:hover {
                background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important;
                border: none !important;
                box-shadow: 0 0 15px rgba(220, 39, 67, 0.4);
            }
            .social-icons a.social-discord:hover {
                background: #5865F2 !important;
                border: none !important;
                box-shadow: 0 0 15px rgba(88, 101, 242, 0.4);
            }
            .social-icons a.social-x:hover {
                background: #fff !important;
                border: 1px solid #fff !important;
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
            }
            .social-icons a.social-x:hover i, .social-icons a.social-x:hover svg {
                color: #000 !important;
                fill: #000 !important;
            }

            /* Estilos de hover para navegación unificada (Header, Footer, Menu, Dock) */
            nav a:hover:not(.active),
            .footer-comprehensive-list a:hover:not(.active),
            .nav-dropdown-item:hover:not(.active),
            .nav-menu-item:hover:not(.active),
            .qa-btn:hover:not(.active) {
                color: var(--neon-blue) !important; /* Azul normal sin glow exagerado */
                text-shadow: none !important;
            }
            /* Asegurar que el icono también cambie a cyan en hover inactivo */
            nav a:hover:not(.active) i, .nav-menu-item:hover:not(.active) i, .qa-btn:hover:not(.active) i {
                color: var(--neon-cyan) !important;
            }

            /* COMPORTAMIENTO PARA ELEMENTOS ACTIVOS (Sincronización Final) */
            /* El texto se queda en blanco, SOLO el logo/icono cambia a azul */
            nav a.active:hover,
            .footer-comprehensive-list a.active:hover,
            .nav-dropdown-item.active:hover,
            .nav-menu-item.active:hover,
            .qa-btn.active:hover {
                color: #fff !important;
                border-color: var(--neon-blue);
                background: rgba(0, 212, 255, 0.1);
            }

            nav a.active:hover i,
            .footer-comprehensive-list a.active:hover i,
            .nav-dropdown-item.active:hover i,
            .nav-menu-item.active:hover i,
            nav a.active:hover svg,
            .nav-menu-item.active:hover svg {
                color: var(--neon-blue) !important;
                fill: var(--neon-blue) !important;
            }

            /* Solo el botón de QuickDock (QA) mantiene el negro sobre azul en hover */
            .qa-btn.active:hover i,
            .qa-btn.active:hover svg {
                color: #000 !important;
                fill: #000 !important;
            }

            /* Asegurar que el span (texto) del menú principal se quede blanco */
            .nav-menu-item.active:hover .nav-menu-item-header span,
            .qa-btn.active:hover span {
                color: #fff !important;
            }
            /* Responsive Dividers */
            @media (max-width: 768px) {
                .footer-grid {
                    grid-template-columns: 1fr;
                }
                .footer-section.divider {
                    border-left: none;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
            }
            /* --- Debug Card Redesign --- */
            .debug-card {
                flex-direction: column !important;
                align-items: flex-start !important;
                padding: 1.2rem !important;
                border: 2px solid var(--neon-purple);
                background: rgba(145, 70, 255, 0.08) !important;
                backdrop-filter: blur(15px);
                max-width: 320px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(145, 70, 255, 0.2);
                border-radius: 12px;
                position: fixed;
                left: 20px;
                bottom: 20px;
                top: auto !important;
                transform: none !important;
            }
            .debug-top-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-bottom: 0.8rem;
            }
            .debug-title-simple {
                font-weight: 800;
                letter-spacing: 1px;
                color: var(--neon-purple);
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .close-warning-simple {
                background: none;
                border: none;
                color: #888;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
                transition: color 0.3s;
                order: -1; /* Mover a la izquierda visualmente */
            }
            .close-warning-simple:hover {
                color: #fff !important;
                opacity: 1 !important;
            }
            .debug-warning-sub {
                font-size: 0.75rem;
                color: #ccc;
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 6px;
                opacity: 0.8;
            }
            .debug-stats-simple {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
                width: 100%;
            }
            .stat-pill {
                background: rgba(0,0,0,0.3);
                padding: 6px 10px;
                border-radius: 6px;
                font-size: 0.7rem;
                display: flex;
                align-items: center;
                gap: 8px;
                border: 1px solid rgba(255,255,255,0.05);
            }
            .stat-pill b {
                color: #fff;
            }

            /* --- Auth Modal (Centered) --- */
            .auth-required-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                backdrop-filter: blur(8px);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .auth-required-backdrop.active {
                opacity: 1;
            }
            .auth-required-modal {
                background: var(--bg-darker);
                border: 2px solid var(--neon-cyan);
                border-radius: 20px;
                padding: 2.5rem;
                max-width: 400px;
                width: 90%;
                text-align: center;
                box-shadow: 0 0 50px rgba(0, 212, 255, 0.2);
                transform: scale(0.8);
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .auth-required-backdrop.active .auth-required-modal {
                transform: scale(1);
            }
            .auth-modal-icon {
                font-size: 3.5rem;
                color: var(--neon-cyan);
                margin-bottom: 1.5rem;
                text-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
            }
            .auth-modal-title {
                margin-bottom: 1rem;
                color: #fff;
                font-size: 1.5rem;
                letter-spacing: 1px;
            }
            .auth-modal-text {
                color: #aaa;
                margin-bottom: 2rem;
                line-height: 1.5;
            }
            .auth-modal-actions {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            .close-auth-modal {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                color: #555;
                font-size: 1.5rem;
                cursor: pointer;
                transition: color 0.3s;
            }
            .close-auth-modal:hover {
                color: var(--neon-pink);
            }

            /* --- Advanced Menu Header & Transitions --- */
            .nav-overlay-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1.5rem;
                border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            .menu-header-btn {
                background: rgba(255,255,255,0.03);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 12px;
                width: 45px;
                height: 45px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #888;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .menu-header-btn svg {
                width: 22px;
                height: 22px;
                fill: currentColor;
            }
            .menu-header-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
                border-color: #fff;
                transform: scale(1.1);
            }
            .menu-header-btn.theme-toggle-btn.moon-mode {
                background: var(--neon-purple) !important;
                border-color: var(--neon-purple) !important;
                box-shadow: 0 0 15px rgba(145, 70, 255, 0.4) !important;
            }
            .menu-header-btn.theme-toggle-btn.sun-mode {
                background: #f1c40f !important;
                border-color: #f1c40f !important;
                box-shadow: 0 0 15px rgba(241, 196, 15, 0.4) !important;
            }
            .menu-header-btn.lang-toggle-btn.active {
                background: var(--neon-blue) !important;
                border-color: var(--neon-blue) !important;
                box-shadow: 0 0 15px rgba(0, 212, 255, 0.4) !important;
                color: #000 !important;
            }
            .menu-header-btn.lang-toggle-btn.active i,
            .menu-header-btn.lang-toggle-btn.active svg {
                color: #000 !important;
                fill: #000 !important;
            }
            /* LEY: Negro sobre Azul al pasar el mouse */
            .menu-header-btn.active:hover i, .menu-header-btn.active:hover svg {
                color: #000 !important;
                fill: #000 !important;
            }

            .menu-header-btn svg, .menu-header-btn i {
                width: 22px;
                height: 22px;
                fill: #fff !important;
                color: #fff !important;
                display: flex !important;
                align-items: center;
                justify-content: center;
            }

            .menu-transition-container {
                transition: all 0.3s ease;
                display: none;
                opacity: 0;
                transform: translateY(10px);
            }
            .menu-transition-container.active {
                display: block;
                opacity: 1;
                transform: translateY(0);
            }

            /* Language Grid */
            .lang-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                padding: 15px;
            }
            .lang-item {
                padding: 10px 15px;
                background: rgba(255,255,255,0.03);
                border: 1px solid rgba(255,255,255,0.05);
                border-radius: 10px;
                color: #fff;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 500;
                font-size: 0.85rem;
            }
            .lang-item span {
                font-size: 1rem;
                width: 20px;
                text-align: center;
            }
            /* Tema y lenguaje: iconos blancos y rotación */
            .menu-header-btn:hover {
                background: rgba(255, 255, 255, 0.1) !important;
                color: #fff !important;
                border-color: #fff !important;
                transform: scale(1.1);
            }
            .menu-header-btn.active {
                background: rgba(255, 255, 255, 0.2) !important;
                color: #fff !important;
                border-color: #fff !important;
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.4) !important;
            }
            .theme-toggle-btn i, .theme-toggle-btn svg {
                transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .theme-toggle-btn.rotating i, .theme-toggle-btn.rotating svg {
                transform: rotate(360deg);
            }

            .lang-item:hover {
                background: rgba(0, 212, 255, 0.1);
                color: var(--neon-cyan);
                border-color: var(--neon-cyan);
                transform: translateY(-2px);
            }
            /* --- Footer Sync Buttons --- */
            .footer-bottom {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 1.5rem;
            }
            .footer-actions-left {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            .footer-sync-btn {
                width: 40px !important;
                height: 40px !important;
                background: rgba(255,255,255,0.05) !important;
                border: 1px solid rgba(255,255,255,0.1) !important;
                border-radius: 50% !important;
            }
            .footer-sync-btn:hover {
                background: rgba(0, 212, 255, 0.1) !important;
                border-color: var(--neon-blue) !important;
                color: var(--neon-cyan) !important;
            }
            @media (max-width: 600px) {
                .footer-bottom {
                    flex-direction: column-reverse;
                    text-align: center;
                }
                .footer-actions-left {
                    justify-content: center;
                }
            }
        </style>
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
            script.src = `${this.basePath}errors.js?v=${Date.now()}`;
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

        // 3.5 Inyectar Quick Access Dock en páginas de Información
        this.injectQuickDock();

        // 4. Marcar página activa
        this.highlightActivePage();

        // 5. Reinicializar Auth UI
        if (typeof AuthSystem !== 'undefined' && AuthSystem.updateAuthUI) {
            setTimeout(() => AuthSystem.updateAuthUI(), 100);
        }

        // 6. Ejecutar chequeos de seguridad (VPN, Incógnito, Debug)
        this.initSecurityChecks();
    },

    toggleMenuLanguage: function() {
        const sections = document.getElementById('main-menu-sections');
        const langList = document.getElementById('lang-menu-list');
        const btn = document.querySelector('.lang-toggle-btn');

        if (!sections || !langList) return;

        const showingLangs = langList.classList.contains('active');

        if (showingLangs) {
            langList.classList.remove('active');
            btn.classList.remove('active');
            setTimeout(() => {
                langList.style.display = 'none';
                sections.style.display = 'block';
                setTimeout(() => sections.classList.add('active'), 10);
            }, 300);
        } else {
            sections.classList.remove('active');
            btn.classList.add('active');
            setTimeout(() => {
                sections.style.display = 'none';
                langList.style.display = 'block';
                setTimeout(() => langList.classList.add('active'), 10);
            }, 300);
        }
    },

    toggleMenuTheme: function() {
        const btn = document.querySelector('.theme-toggle-btn');
        const isMoon = btn.innerHTML.includes('moon');

        this.showDevelopmentWarning('Cambio de Tema');

        // Efecto de rotación
        btn.classList.add('rotating');
        setTimeout(() => btn.classList.remove('rotating'), 600);

        if (isMoon) {
            btn.innerHTML = ICONS_LIB.get(ICONS_LIB.sun, this.basePath);
            btn.classList.remove('moon-mode');
            btn.classList.add('sun-mode');
        } else {
            btn.innerHTML = ICONS_LIB.get(ICONS_LIB.moon, this.basePath);
            btn.classList.remove('sun-mode');
            btn.classList.add('moon-mode');
        }
    },

    injectQuickDock: function() {
        const infoPages = [
            'about.html', 'team.html', 'help.html', 'faq.html',
            'rules.html', 'policy.html', 'terms.html', 'guidelines.html',
            'changelog.html', 'contact.html', 'support.html', 'index.html', 'stats.html',
            'documentation.html', 'license.html', 'credits.html'
        ];
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        if (infoPages.includes(currentPage)) {
            const bp = this.basePath;

            // Generate ICONS mapping locally for the dock
            const ICONS = {};
            for (const key in ICONS_LIB) {
                if (key !== 'get') {
                    ICONS[key] = ICONS_LIB.get(ICONS_LIB[key], bp);
                }
            }

            const dockHTML = `
                <!-- Quick Access Dock (Premium & Unified) -->
                <div class="quick-access-dock">
                    <a href="${bp}index.html" class="qa-btn" title="Home">${ICONS.home} <span>Home</span></a>
                    <a href="${bp}rules.html" class="qa-btn" title="Rules">${ICONS.rules} <span>Rules</span></a>
                    <a href="${bp}guidelines.html" class="qa-btn" title="Guidelines">${ICONS.guidelines} <span>Guidelines</span></a>
                    <a href="${bp}license.html" class="qa-btn" title="License">${ICONS.license} <span>License</span></a>
                    <a href="${bp}policy.html" class="qa-btn" title="Policy">${ICONS.policy} <span>Policy</span></a>
                    <a href="${bp}team.html" class="qa-btn" title="Team">${ICONS.team} <span>Team</span></a>
                    <a href="${bp}credits.html" class="qa-btn" title="Credits">${ICONS.credits} <span>Credits</span></a>
                    <a href="${bp}documentation.html" class="qa-btn" title="Documentation">${ICONS.documentation} <span>Docs</span></a>
                    <a href="${bp}faq.html" class="qa-btn" title="FAQ">${ICONS.faq} <span>FAQ</span></a>
                    <a href="${bp}help.html" class="qa-btn" title="Help">${ICONS.help} <span>Help</span></a>
                    <a href="${bp}terms.html" class="qa-btn" title="Terms and Conditions">${ICONS.terms} <span>Terms</span></a>
                    <a href="${bp}changelog.html" class="qa-btn" title="Changelog">${ICONS.changelog} <span>Changes</span></a>
                </div>
            `;

            const disclaimerHTML = `
                <!-- Support Disclaimer -->
                <div class="support-disclaimer text-center mt-4 mb-5" id="support-disclaimer">
                     <p style="color: #ccc; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        ¿No encontraste lo que buscabas?
                        <a href="${bp}support.html" style="color: var(--neon-pink); text-decoration: none; font-weight: bold; display: inline-flex; align-items: center; gap: 5px; transition: text-shadow 0.3s;">
                            Contacta a soporte directamente <span style="width: 14px; height: 14px; display: flex; align-items: center;">${ICONS.arrow_right || ''}</span>
                        </a>
                    </p>
                </div>
            `;

            const main = document.querySelector('main');
            if (main) {
                // 1. Manejo del Dock
                const existingDock = main.querySelector('.quick-access-dock');
                if (existingDock) existingDock.remove();
                main.insertAdjacentHTML('beforeend', dockHTML);

                // 2. Manejo del Disclaimer (Eliminar viejos duplicados por clase o texto, e insertar el estandarizado)

                // Buscar disclaimers antiguos manuales y eliminarlos para evitar duplicados
                const oldDisclaimers = Array.from(main.querySelectorAll('div')).filter(div =>
                    div.textContent.includes('Contacta a soporte') && !div.classList.contains('support-disclaimer')
                );
                oldDisclaimers.forEach(el => el.remove());

                // Eliminar disclaimer inyectado previamente si existe
                const existingDisclaimer = main.querySelector('#support-disclaimer');
                if (existingDisclaimer) existingDisclaimer.remove();

                // Inyectar el nuevo al final
                main.insertAdjacentHTML('beforeend', disclaimerHTML);
            }
        }
    },

    highlightActivePage: function() {
        const path = window.location.pathname;
        const page = path.split("/").pop() || 'index.html';

        document.querySelectorAll('nav a, .nav-menu-item, .qa-btn').forEach(el => el.classList.remove('active'));

        const links = document.querySelectorAll(`[data-page="${page}"]`);

        if (links.length === 0 && (page === '' || page === '/')) {
             document.querySelectorAll(`[data-page="index.html"]`).forEach(el => el.classList.add('active'));
        } else {
             links.forEach(el => el.classList.add('active'));
        }
    },

    closeSecurityWarning: function(id) {
        const warning = document.getElementById(`warning-${id}`);
        if (warning) {
            warning.style.opacity = '0';
            warning.style.transform = 'translate(-50%, -20px)';
            setTimeout(() => {
                warning.remove();
                this.updateWarningOffsets();
            }, 300);
        }
        try { localStorage.setItem(`dismissed_warning_${id}`, 'true'); } catch(e) {}
    },

    updateWarningOffsets: function() {
        const activeWarnings = document.querySelectorAll('.security-warning');
        activeWarnings.forEach((w, index) => {
            w.style.setProperty('--warning-offset', index);
        });
    },

    initSecurityChecks: async function() {
        if (typeof SecurityChecker === 'undefined') return;

        const results = await SecurityChecker.checkAll();
        let offset = 0;

        // Advertencias estándar (VPN, Incógnito)
        const standardWarnings = [
            { id: 'vpn', check: results.vpn, icon: 'fa-globe', title: 'VPN/PROXY DETECTADO', text: 'La conexión puede ser inestable y afectar la latencia en el juego.' },
            { id: 'incognito', check: results.incognito, icon: 'fa-user-secret', title: 'MODO INCÓGNITO', text: 'El progreso local no se guardará de forma persistente en esta sesión.' }
        ];

        standardWarnings.forEach(w => {
            if (w.check && !localStorage.getItem(`dismissed_warning_${w.id}`)) {
                const html = this.getTemplates().securityWarning(w.id, w.icon, w.title, w.text);
                document.body.insertAdjacentHTML('afterbegin', html);
                const warningEl = document.getElementById(`warning-${w.id}`);
                if (warningEl) {
                    warningEl.style.setProperty('--warning-offset', offset++);
                }
            }
        });

        // Advertencia especial para modo debug (más detallada)
        if (results.debug && !localStorage.getItem('dismissed_warning_debug')) {
            let debugStats = { botsCreated: 0, leaderboardEntries: 0, version: '2.1.0-A' };
            try {
                const stored = JSON.parse(localStorage.getItem('debugStats') || '{}');
                if (stored.botsCreated !== undefined) {
                    debugStats = stored;
                }
            } catch (e) { /* Ignorar errores */ }

            const html = this.getTemplates().debugWarning(debugStats);
            document.body.insertAdjacentHTML('afterbegin', html);
        }
    },

    showDevelopmentWarning: function(feature) {
        const id = 'dev-' + Math.random().toString(36).substr(2, 9);
        const html = this.getTemplates().securityWarning(
            id,
            'fa-tools',
            'FUNCIONALIDAD EN DESARROLLO',
            `La opción "${feature}" estará disponible próximamente.`
        );
        document.body.insertAdjacentHTML('afterbegin', html);
        const warningEl = document.getElementById(`warning-${id}`);
        if (warningEl) {
            // Calcular offset dinámico basado en las advertencias activas
            const offset = document.querySelectorAll('.security-warning').length - 1;
            warningEl.style.setProperty('--warning-offset', offset);
        }

        // Auto-cerrar después de 5 segundos
        setTimeout(() => this.closeSecurityWarning(id), 5000);
    },

    showNotification: function(title, message, icon = 'fa-check-circle') {
        const id = 'notif-' + Math.random().toString(36).substr(2, 9);
        const html = this.getTemplates().securityWarning(id, icon, title, message);
        document.body.insertAdjacentHTML('afterbegin', html);

        const warning = document.getElementById(id);
        const count = document.querySelectorAll('.security-warning').length;
        const offset = (count - 1) * 90 + 20;
        warning.style.top = offset + 'px';

        setTimeout(() => this.closeSecurityWarning(id), 5000);
    },

    showAuthModal: function(action) {
        const html = this.getTemplates().authModal(action);
        document.body.insertAdjacentHTML('beforeend', html);

        const backdrop = document.getElementById('auth-modal-backdrop');
        setTimeout(() => backdrop.classList.add('active'), 10);

        // Cerrar al hacer clic en el backdrop
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) this.closeAuthModal();
        });
    },

    closeAuthModal: function() {
        const backdrop = document.getElementById('auth-modal-backdrop');
        if (backdrop) {
            backdrop.classList.remove('active');
            setTimeout(() => backdrop.remove(), 300);
        }
    },

    // --- Footer Sync Logic ---
    toggleFooterLanguage: function() {
        // 1. Abrir el menú principal si no está abierto
        if (typeof AdaptiveNav !== 'undefined') {
            AdaptiveNav.toggleMenu(true);
        }

        // 2. Si el panel de idiomas no es el activo, cambiarlo
        const langList = document.getElementById('lang-menu-list');
        if (langList && !langList.classList.contains('active')) {
            this.toggleMenuLanguage();
        }
    },

    toggleFooterTheme: function(footerBtn) {
        // 1. Ejecutar el cambio de tema normal
        this.toggleMenuTheme();

        // 2. Sincronizar visualmente el botón del footer con el del menú
        const menuBtn = document.querySelector('.nav-overlay .theme-toggle-btn');
        if (menuBtn && footerBtn) {
            footerBtn.innerHTML = menuBtn.innerHTML;
            footerBtn.className = menuBtn.className + ' footer-sync-btn';

            // Efecto de rotación también en el footer
            footerBtn.classList.add('rotating');
            setTimeout(() => footerBtn.classList.remove('rotating'), 600);
        }
    }
};

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => {
    Layout.init();
});

