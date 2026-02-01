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
            <span id="zoom-warning-text">Zoom level is too high. Some options have moved to the menu.</span>
        </div>
        <button class="close-warning" onclick="AdaptiveNav.closeWarning()" title="Close">&times;</button>
    </div>`,

            securityWarning: (id, icon, title, text) => `
    <div class="zoom-warning security-warning" id="warning-${id}" style="border-color: var(--neon-pink); background: rgba(255, 0, 128, 0.05); top: calc(110px + (var(--warning-offset, 0) * 50px));">
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas ${icon}" style="color: var(--neon-pink);"></i>
            <span><strong>${title}:</strong> ${text}</span>
        </div>
        <button class="close-warning" onclick="Layout.closeSecurityWarning('${id}')" title="Entendido">&times;</button>
    </div>`,

            // Advertencia especial para modo debug - Diseño Vertical Simple
            debugWarning: (stats) => `
    <div class="zoom-warning security-warning debug-card" id="warning-debug">
        <!-- Fila 1: Título y Cerrar -->
        <div class="debug-top-row">
            <div class="debug-title-simple">
                <i class="fas fa-flask"></i> MODO DEV DEBUG
            </div>
            <button class="close-warning-simple" onclick="Layout.closeSecurityWarning('debug')">&times;</button>
        </div>
        
        <!-- Fila 2: Subtítulo Advertencia -->
        <div class="debug-warning-sub">
            <i class="fas fa-exclamation-triangle"></i> Datos simulados activo
        </div>
        
        <!-- Fila 3: Stats Grid -->
        <div class="debug-stats-simple">
            <div class="stat-pill">
                <i class="fas fa-robot" style="color:var(--neon-cyan)"></i>
                <span><b>${stats.totalBots || 25}</b> Bots</span>
            </div>
            <div class="stat-pill">
                <i class="fas fa-trophy" style="color:#f1c40f"></i>
                <span><b>${stats.leaderboardEntries || 0}</b> Rank</span>
            </div>
            <div class="stat-pill">
                <i class="fas fa-star" style="color:#e74c3c"></i>
                <span><b>${stats.fakeReviews || 5}</b> Revs</span>
            </div>
            <div class="stat-pill">
                <i class="fas fa-chart-line" style="color:#2ecc71"></i>
                <span>Stats Fake</span>
            </div>
        </div>
    </div>`,

            navOverlay: `
    <div class="menu-backdrop" onclick="AdaptiveNav.toggleMenu(false)"></div>
    <div class="nav-overlay">
        <div class="nav-overlay-header">
            <h3>MAIN MENU</h3>
        </div>
        <div class="nav-overlay-content">
            <a href="${bp}index.html" class="nav-menu-item" data-page="index.html">
                <div class="nav-menu-item-header"><i class="fas fa-home"></i> <span>Home</span></div>
            </a>
            <a href="${bp}play.html" class="nav-menu-item" data-page="play.html">
                <div class="nav-menu-item-header"><i class="fas fa-gamepad"></i> <span>Play</span></div>
            </a>
            <a href="${bp}leaderboard.html" class="nav-menu-item" data-page="leaderboard.html">
                <div class="nav-menu-item-header"><i class="fas fa-trophy"></i> <span>Leaderboard</span></div>
            </a>
            <a href="${bp}stats.html" class="nav-menu-item" data-page="stats.html">
                <div class="nav-menu-item-header"><i class="fas fa-chart-bar"></i> <span>Stats</span></div>
            </a>
            <a href="${bp}changelog.html" class="nav-menu-item" data-page="changelog.html">
                <div class="nav-menu-item-header"><i class="fas fa-history"></i> <span>Changelog</span></div>
            </a>
            <a href="${bp}about.html" class="nav-menu-item" data-page="about.html">
                <div class="nav-menu-item-header"><i class="fas fa-info-circle"></i> <span>Information</span></div>
            </a>
            
            <div style="border-top: 1px solid rgba(255,255,255,0.1); margin: 10px 0;"></div>
            
            <!-- Info Sub-items (Inside Information) -->
            <a href="${bp}team.html" class="nav-menu-item" data-page="team.html">
                <div class="nav-menu-item-header"><i class="fas fa-users-cog"></i> <span>Team</span></div>
            </a>
            <a href="${bp}help.html" class="nav-menu-item" data-page="help.html">
                <div class="nav-menu-item-header"><i class="fas fa-question-circle"></i> <span>Help</span></div>
            </a>
            <a href="${bp}faq.html" class="nav-menu-item" data-page="faq.html">
                <div class="nav-menu-item-header"><i class="fas fa-comments"></i> <span>FAQ</span></div>
            </a>
            <a href="${bp}guidelines.html" class="nav-menu-item" data-page="guidelines.html">
                <div class="nav-menu-item-header"><i class="fas fa-map-signs"></i> <span>Guidelines</span></div>
            </a>
            <a href="${bp}rules.html" class="nav-menu-item" data-page="rules.html">
                <div class="nav-menu-item-header"><i class="fas fa-gavel"></i> <span>Rules</span></div>
            </a>
            <a href="${bp}policy.html" class="nav-menu-item" data-page="policy.html">
                <div class="nav-menu-item-header"><i class="fas fa-shield-alt"></i> <span>Policy</span></div>
            </a>
            <a href="${bp}terms.html" class="nav-menu-item" data-page="terms.html">
                <div class="nav-menu-item-header"><i class="fas fa-file-contract"></i> <span>Terms</span></div>
            </a>
            
            <div style="border-top: 1px solid rgba(255,255,255,0.1); margin: 10px 0;"></div>

            <a href="${bp}contact.html" class="nav-menu-item" data-page="contact.html">
                <div class="nav-menu-item-header"><i class="fas fa-envelope"></i> <span>Contact</span></div>
            </a>
            <a href="${bp}support.html" class="nav-menu-item" data-page="support.html">
                <div class="nav-menu-item-header"><i class="fas fa-headset"></i> <span>Support</span></div>
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
                    <li><a href="${bp}index.html" data-page="index.html"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="${bp}play.html" data-page="play.html"><i class="fas fa-gamepad"></i> Play</a></li>
                    <li><a href="${bp}leaderboard.html" data-page="leaderboard.html"><i class="fas fa-trophy"></i> Leaderboard</a></li>
                    <li><a href="${bp}stats.html" data-page="stats.html"><i class="fas fa-chart-bar"></i> Stats</a></li>
                    <li><a href="${bp}changelog.html" data-page="changelog.html"><i class="fas fa-history"></i> Changelog</a></li>
                    
                    <!-- Dropdown de Información -->
                    <li class="nav-dropdown">
                        <a href="${bp}about.html" class="nav-dropdown-trigger" data-page="about.html" style="text-decoration: none; color: #ccc; font-weight: bold; transition: 0.3s;">
                            <i class="fas fa-info-circle"></i> Information <i class="fas fa-chevron-down dropdown-arrow"></i>
                        </a>
                        <div class="nav-dropdown-menu">
                            <a href="${bp}team.html" class="nav-dropdown-item" data-page="team.html"><i class="fas fa-users-cog"></i> Team</a>
                            <a href="${bp}help.html" class="nav-dropdown-item" data-page="help.html"><i class="fas fa-question-circle"></i> Help</a>
                            <a href="${bp}faq.html" class="nav-dropdown-item" data-page="faq.html"><i class="fas fa-comments"></i> FAQ</a>
                            <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 5px 0;"></div>
                            <a href="${bp}guidelines.html" class="nav-dropdown-item" data-page="guidelines.html"><i class="fas fa-map-signs"></i> Guidelines</a>
                            <a href="${bp}rules.html" class="nav-dropdown-item" data-page="rules.html"><i class="fas fa-gavel"></i> Rules</a>
                            <a href="${bp}policy.html" class="nav-dropdown-item" data-page="policy.html"><i class="fas fa-shield-alt"></i> Policy</a>
                            <a href="${bp}terms.html" class="nav-dropdown-item" data-page="terms.html"><i class="fas fa-file-contract"></i> Terms</a>
                        </div>
                    </li>

                    <li><a href="${bp}contact.html" data-page="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
                    <li><a href="${bp}support.html" data-page="support.html"><i class="fas fa-headset"></i> Support</a></li>
                </ul>
                <div id="auth-section"></div>
                <!-- Acciones de Cabecera (Search + Menu) -->
                <div class="header-actions">
                    <div class="search-wrapper">
                        <div class="search-input-container">
                            <input type="text" class="search-input" placeholder="Buscar canción, artista...">
                        </div>
                        <button class="search-btn" title="Buscar"><i class="fas fa-search"></i></button>
                        <div class="search-results-dropdown"></div>
                    </div>

                    <button class="menu-toggle-btn" onclick="AdaptiveNav.toggleMenu()" title="Menú">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </nav>
        </div>
    </header>`,

            footer: `
    <footer>
        <div class="footer-content">
            <div class="footer-grid">
                <div class="footer-section main-brand">
                    <a href="${bp}index.html" class="footer-brand">
                        <img src="${bp}assets/logo.png" alt="Logo" class="logo-img footer-logo-sync">
                        <h3>MUZICMANIA</h3>
                    </a>
                    <p>The best futuristic rhythm game. Dominating the neon since 2026.</p>
                </div>

                <div class="footer-section divider">
                    <h4>Navigation</h4>
                    <ul class="footer-comprehensive-list" style="columns: 2; gap: 2rem; list-style: none; padding: 0;">
                        <li><a href="${bp}index.html" data-page="index.html"><i class="fas fa-home"></i> Home</a></li>
                        <li><a href="${bp}play.html" data-page="play.html"><i class="fas fa-gamepad"></i> Play</a></li>
                        <li><a href="${bp}leaderboard.html" data-page="leaderboard.html"><i class="fas fa-trophy"></i> Leaderboard</a></li>
                        <li><a href="${bp}stats.html" data-page="stats.html"><i class="fas fa-chart-bar"></i> Stats</a></li>
                        <li><a href="${bp}changelog.html" data-page="changelog.html"><i class="fas fa-history"></i> Changelog</a></li>
                        <li><a href="${bp}about.html" data-page="about.html"><i class="fas fa-info-circle"></i> About</a></li>
                        
                        <!-- Info Children -->
                        <li><a href="${bp}team.html" data-page="team.html"><i class="fas fa-users-cog"></i> Team</a></li>
                        <li><a href="${bp}help.html" data-page="help.html"><i class="fas fa-question-circle"></i> Help</a></li>
                        <li><a href="${bp}faq.html" data-page="faq.html"><i class="fas fa-comments"></i> FAQ</a></li>
                        <li><a href="${bp}guidelines.html" data-page="guidelines.html"><i class="fas fa-map-signs"></i> Guidelines</a></li>
                        <li><a href="${bp}rules.html" data-page="rules.html"><i class="fas fa-gavel"></i> Rules</a></li>
                        <li><a href="${bp}policy.html" data-page="policy.html"><i class="fas fa-shield-alt"></i> Policy</a></li>
                        <li><a href="${bp}terms.html" data-page="terms.html"><i class="fas fa-file-contract"></i> Terms</a></li>
                        
                        <!-- Contact/Support Last -->
                        <li><a href="${bp}contact.html" data-page="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
                        <li><a href="${bp}support.html" data-page="support.html"><i class="fas fa-headset"></i> Support</a></li>
                    </ul>
                </div>

                <div class="footer-section divider">
                    <h4>Community</h4>
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
                    <p>Join our growing tech and music community.</p>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2026 MuzicMania. Created by Ciszuko Antony. All rights reserved.</p>
            </div>
        </div>
        <style>
            .footer-grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 0; /* Removido para que el divisor se pegue */
                text-align: center;
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
            }
            .social-icons a i {
                font-size: 1.1rem;
                transition: color 0.3s ease;
            }
            .social-icons a:hover {
                transform: translateY(-5px) scale(1.1);
                border-color: transparent;
            }
            .social-icons a:hover i {
                color: #000 !important;
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

            /* Brand Circle & Hover Effects */
            .social-icons a[title*="X"]:hover { background-color: #ffffff; box-shadow: 0 0 15px #fff; }
            .social-icons a[title*="Discord"]:hover { background-color: #5865F2; box-shadow: 0 0 15px #5865F2; }
            .social-icons a[title*="GitHub"]:hover { background-color: #ffffff; box-shadow: 0 0 15px #fff; }
            .social-icons a[title*="Reddit"]:hover { background-color: #FF4500; box-shadow: 0 0 15px #FF4500; }
            .social-icons a[title*="YouTube"]:hover { background-color: #ff0000; box-shadow: 0 0 15px #ff0000; }
            .social-icons a[title*="Instagram"]:hover { background-color: #E4405F; box-shadow: 0 0 15px #E4405F; }
            .social-icons a[title*="TikTok"]:hover { background-color: #00f2ea; box-shadow: 0 0 15px #00f2ea; }
            .social-icons a[title*="Twitch"]:hover { background-color: #9146FF; box-shadow: 0 0 15px #9146FF; }
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

    injectQuickDock: function() {
        const infoPages = [
            'about.html', 'team.html', 'help.html', 'faq.html', 
            'rules.html', 'policy.html', 'terms.html', 'guidelines.html',
            'changelog.html', 'contact.html', 'support.html', 'index.html', 'stats.html'
        ];
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        if (infoPages.includes(currentPage)) {
            const bp = this.basePath;
            const dockHTML = `
                <!-- Quick Access Dock (Premium & Unified) -->
                <div class="quick-access-dock">
                    <a href="${bp}index.html" class="qa-btn qa-home" data-page="index.html">
                        <i class="fas fa-home"></i> <span>Home</span>
                    </a>
                    <a href="${bp}contact.html" class="qa-btn qa-contact" data-page="contact.html">
                        <i class="fas fa-envelope"></i> <span>Contact</span>
                    </a>
                    <a href="${bp}support.html" class="qa-btn qa-support" data-page="support.html">
                        <i class="fas fa-headset"></i> <span>Support</span>
                    </a>
                    <a href="${bp}about.html" class="qa-btn qa-about" data-page="about.html">
                        <i class="fas fa-info-circle"></i> <span>About</span>
                    </a>
                    <a href="${bp}team.html" class="qa-btn qa-team" data-page="team.html">
                        <i class="fas fa-users-cog"></i> <span>Team</span>
                    </a>
                    <a href="${bp}help.html" class="qa-btn qa-help" data-page="help.html">
                        <i class="fas fa-question-circle"></i> <span>Help</span>
                    </a>
                    <a href="${bp}faq.html" class="qa-btn qa-faq" data-page="faq.html">
                        <i class="fas fa-comments"></i> <span>FAQ</span>
                    </a>
                    <a href="${bp}guidelines.html" class="qa-btn qa-guidelines" data-page="guidelines.html">
                        <i class="fas fa-map-signs"></i> <span>Guidelines</span>
                    </a>
                    <a href="${bp}rules.html" class="qa-btn qa-rules" data-page="rules.html">
                        <i class="fas fa-gavel"></i> <span>Rules</span>
                    </a>
                    <a href="${bp}policy.html" class="qa-btn qa-policy" data-page="policy.html">
                        <i class="fas fa-shield-alt"></i> <span>Policy</span>
                    </a>
                    <a href="${bp}terms.html" class="qa-btn qa-terms" data-page="terms.html">
                        <i class="fas fa-file-contract"></i> <span>Terms</span>
                    </a>
                </div>
            `;

            const disclaimerHTML = `
                <!-- Support Disclaimer -->
                <div class="support-disclaimer text-center mt-4 mb-5" id="support-disclaimer">
                     <p style="color: #ccc; font-size: 0.95rem;">
                        ¿No encontraste lo que buscabas? 
                        <a href="${bp}support.html" style="color: var(--neon-pink); text-decoration: none; font-weight: bold; margin-left: 5px; transition: text-shadow 0.3s;">
                            Contacta a soporte directamente <i class="fas fa-arrow-right" style="font-size: 0.8em;"></i>
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
    }
};

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => {
    Layout.init();
});

