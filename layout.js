/**
 * MuzicMania Layout System
 * Centralizes Header, Footer, NavOverlay and shared UI elements.
 */

const ICONS_LIB = {
    // Navigation
    home: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10v11h6v-6h6v6h6v-11L12 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="rgba(0,0,0,0.2)"/></svg>`,
    play: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H9v2H7v-2H5v-2h2V9h2v2h2v2zm6 1c-.83 0-1.5-.67-1.5-1.5S16.17 11 17 11s1.5.67 1.5 1.5S17.83 14 17 14zm-3-3c-.83 0-1.5-.67-1.5-1.5S13.17 8 14 8s1.5.67 1.5 1.5S14.83 11 14 11z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" fill="rgba(0,0,0,0.2)"/></svg>`,
    leaderboard: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="rgba(0,0,0,0.2)"/></svg>`,
    stats: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="rgba(0,0,0,0.2)"/><path d="M7 12h2v5H7zm4-3h2v8h-2zm4-3h2v11h-2z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    changelog: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 22h12a2 2 0 0 0 2-2V8l-6-6-6 6v12a2 2 0 0 0 2 2zm1-2V9.17l5-5 5 5V20H7z M12 11v6 M9 15h6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="rgba(0,0,0,0.2)"/><path d="M9 13h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    info: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="rgba(0,0,0,0.2)"/><path d="M12 16v-4 M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    team: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" stroke="currentColor" stroke-width="1.5" fill="rgba(0,0,0,0.2)"/></svg>`,
    help: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="rgba(0,0,0,0.2)"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    policy: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 18c-4.31-1.16-7-5.21-7-9.2V8l7-4 7 4v2.8c0 3.99-2.69 8.04-7 9.2z" stroke="currentColor" stroke-width="1.5" fill="rgba(0,0,0,0.2)"/></svg>`,
    contact: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="rgba(0,0,0,0.2)"/></svg>`,
    support: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 16.5c-1.25.11-2.45-.63-2.94-1.81l-2.05-4.94c-.95-2.28-3.14-3.75-5.61-3.75s-4.66 1.47-5.61 3.75L2.74 14.69c-.49 1.18-1.69 1.92-2.94 1.81V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-2.5z" stroke="currentColor" stroke-width="1.5" fill="rgba(0,0,0,0.2)"/></svg>`,
    faq: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z M11 10h2v2h-2z M11 6h2v2h-2z" stroke="currentColor" stroke-width="1.5" fill="rgba(0,0,0,0.2)"/></svg>`,
    
    // Social Media (Neon)
    social_x: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4l16 16M20 4L4 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    social_discord: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h.5l-.5 2h6l-.5-2h.5c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2H9zm-2-4C5 8 4 9 4 10v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2H7z" stroke="currentColor" stroke-width="1.5" fill="rgba(0,0,0,0.2)"/></svg>`,
    social_github: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-1.55 1.02-2.13-.15-.25-.44-1.03.1-2.13 0 0 .85-.27 2.8.79.81-.23 1.69-.35 2.57-.35.88 0 1.76.13 2.57.35 1.93-1.06 2.77-.79 2.77-.79.55 1.1.33 1.88.13 2.13.63.58 1.03 1.02 1.03 2.13 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" stroke="currentColor" stroke-width="1.5" fill="rgba(0,0,0,0.2)"/></svg>`,
    social_reddit: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="11" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="15" cy="11" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M16 16c-.5 1-2.5 1.5-4 1.5s-3.5-.5-4-1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    social_youtube: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" stroke-width="1.5" fill="rgba(0,0,0,0.2)"/><path d="M10 9l5 3-5 3V9z" stroke="currentColor" stroke-width="1.5" fill="currentColor"/></svg>`,
    social_instagram: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" stroke-width="1.5" fill="rgba(0,0,0,0.2)"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="7" r="1" fill="currentColor"/></svg>`,
    social_tiktok: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
    social_twitch: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4v16h6v-2h2v-2h4v-2h2V4H4zm12 8h-2V7h2v5zm-4 0h-2V7h2v5z" stroke="currentColor" stroke-width="1.5" fill="rgba(0,0,0,0.2)"/></svg>`,
    
    // UI Utilities
    search: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    user: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5" fill="rgba(0,0,0,0.2)"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    menu: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    close: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    arrow_right: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    chevron_down: `<svg width="20" height="20" viewBox="0 0 24 24" class="nav-icon-svg dropdown-arrow" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

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
        
        // --- ICONS SVG (Ref from Global) ---
        const ICONS = ICONS_LIB;
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
    <div class="menu-backdrop"></div>
    <div class="nav-overlay">
        <div class="nav-overlay-header">
            <h3>MAIN MENU</h3>
        </div>
        <div class="nav-overlay-content">
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
            <a href="${bp}about.html" class="nav-menu-item" data-page="about.html">
                <div class="nav-menu-item-header">${ICONS.info} <span>Information</span></div>
            </a>
            
            <div style="border-top: 1px solid rgba(255,255,255,0.1); margin: 10px 0;"></div>
            
            <!-- Info Sub-items (Inside Information) -->
            <a href="${bp}team.html" class="nav-menu-item" data-page="team.html">
                <div class="nav-menu-item-header">${ICONS.team} <span>Team</span></div>
            </a>
            <a href="${bp}help.html" class="nav-menu-item" data-page="help.html">
                <div class="nav-menu-item-header">${ICONS.help} <span>Help</span></div>
            </a>
            <a href="${bp}faq.html" class="nav-menu-item" data-page="faq.html">
                <div class="nav-menu-item-header">${ICONS.faq} <span>FAQ</span></div>
            </a>
            <a href="${bp}guidelines.html" class="nav-menu-item" data-page="guidelines.html">
                <div class="nav-menu-item-header">${ICONS.policy} <span>Guidelines</span></div>
            </a>
            <a href="${bp}rules.html" class="nav-menu-item" data-page="rules.html">
                <div class="nav-menu-item-header">${ICONS.policy} <span>Rules</span></div>
            </a>
            <a href="${bp}policy.html" class="nav-menu-item" data-page="policy.html">
                <div class="nav-menu-item-header">${ICONS.policy} <span>Policy</span></div>
            </a>
            <a href="${bp}terms.html" class="nav-menu-item" data-page="terms.html">
                <div class="nav-menu-item-header">${ICONS.policy} <span>Terms</span></div>
            </a>
            
            <div style="border-top: 1px solid rgba(255,255,255,0.1); margin: 10px 0;"></div>

            <a href="${bp}contact.html" class="nav-menu-item" data-page="contact.html">
                <div class="nav-menu-item-header">${ICONS.contact} <span>Contact</span></div>
            </a>
            <a href="${bp}support.html" class="nav-menu-item" data-page="support.html">
                <div class="nav-menu-item-header">${ICONS.support} <span>Support</span></div>
            </a>
        </div>
    </div>`,

            header: `
    <header>
        <div class="header-content">
            <a href="${bp}index.html" class="logo-container">
                <img src="${bp}content/logos/imagen/not outline/logotipo/degradado/color/muzicmania_logotipo_degradado_color.svg" alt="MuzicMania" class="header-text-logotipo" style="margin-right: 8px;">
                <img src="${bp}content/logos/imagen/not outline/isotipo/degradado/color/muzicmania_logo_isotipo_notoutline_degradado_color.svg" alt="MuzicMania Logo" class="logo-img">
            </a>
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
                            <a href="${bp}help.html" class="nav-dropdown-item" data-page="help.html">${ICONS.help} Help</a>
                            <a href="${bp}faq.html" class="nav-dropdown-item" data-page="faq.html">${ICONS.faq} FAQ</a>
                            <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 5px 0;"></div>
                            <a href="${bp}guidelines.html" class="nav-dropdown-item" data-page="guidelines.html">${ICONS.policy} Guidelines</a>
                            <a href="${bp}rules.html" class="nav-dropdown-item" data-page="rules.html">${ICONS.policy} Rules</a>
                            <a href="${bp}policy.html" class="nav-dropdown-item" data-page="policy.html">${ICONS.policy} Policy</a>
                            <a href="${bp}terms.html" class="nav-dropdown-item" data-page="terms.html">${ICONS.policy} Terms</a>
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
        <div class="footer-content">
            <div class="footer-grid">
                <div class="footer-section main-brand">
                    <a href="${bp}index.html" class="footer-brand">
                        <img src="${bp}content/logos/imagen/not outline/logotipo/degradado/color/muzicmania_logotipo_degradado_color.svg" alt="MuzicMania" class="footer-text-logotipo" style="margin-right: 8px;">
                        <img src="${bp}content/logos/imagen/not outline/isotipo/degradado/color/muzicmania_logo_isotipo_notoutline_degradado_color.svg" alt="Logo" class="logo-img footer-logo-sync">
                    </a>
                    <p>The best futuristic rhythm game. Dominating the neon since 2026.</p>
                </div>

                <div class="footer-section divider">
                    <h4>Navigation</h4>
                    <ul class="footer-comprehensive-list" style="columns: 2; gap: 2rem; list-style: none; padding: 0;">
                        <li><a href="${bp}index.html" data-page="index.html">${ICONS.home} Home</a></li>
                        <li><a href="${bp}play.html" data-page="play.html">${ICONS.play} Play</a></li>
                        <li><a href="${bp}leaderboard.html" data-page="leaderboard.html">${ICONS.leaderboard} Leaderboard</a></li>
                        <li><a href="${bp}stats.html" data-page="stats.html">${ICONS.stats} Stats</a></li>
                        <li><a href="${bp}changelog.html" data-page="changelog.html">${ICONS.changelog} Changelog</a></li>
                        <li><a href="${bp}about.html" data-page="about.html">${ICONS.info} About</a></li>
                        
                        <!-- Info Children -->
                        <li><a href="${bp}team.html" data-page="team.html">${ICONS.team} Team</a></li>
                        <li><a href="${bp}help.html" data-page="help.html">${ICONS.help} Help</a></li>
                        <li><a href="${bp}faq.html" data-page="faq.html">${ICONS.faq} FAQ</a></li>
                        <li><a href="${bp}guidelines.html" data-page="guidelines.html">${ICONS.policy} Guidelines</a></li>
                        <li><a href="${bp}rules.html" data-page="rules.html">${ICONS.policy} Rules</a></li>
                        <li><a href="${bp}policy.html" data-page="policy.html">${ICONS.policy} Policy</a></li>
                        <li><a href="${bp}terms.html" data-page="terms.html">${ICONS.policy} Terms</a></li>
                        
                        <!-- Contact/Support Last -->
                        <li><a href="${bp}contact.html" data-page="contact.html">${ICONS.contact} Contact</a></li>
                        <li><a href="${bp}support.html" data-page="support.html">${ICONS.support} Support</a></li>
                    </ul>
                </div>

                <div class="footer-section divider">
                    <h4>Community</h4>
                    <div class="social-icons">
                        <a href="https://x.com" target="_blank" title="X (Twitter)">${ICONS.social_x}</a>
                        <a href="https://discord.com" target="_blank" title="Discord">${ICONS.social_discord}</a>
                        <a href="https://github.com/CiszukoAntony/MuzicMania" target="_blank" title="GitHub">${ICONS.social_github}</a>
                        <a href="https://reddit.com" target="_blank" title="Reddit">${ICONS.social_reddit}</a>
                        <a href="https://youtube.com" target="_blank" title="YouTube">${ICONS.social_youtube}</a>
                        <a href="https://instagram.com" target="_blank" title="Instagram">${ICONS.social_instagram}</a>
                        <a href="https://tiktok.com" target="_blank" title="TikTok">${ICONS.social_tiktok}</a>
                        <a href="https://twitch.tv" target="_blank" title="Twitch">${ICONS.social_twitch}</a>
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
            const ICONS = ICONS_LIB; // Use Global Icons
            
            const dockHTML = `
                <!-- Quick Access Dock (Premium & Unified) -->
                <div class="quick-access-dock">
                    <a href="${bp}index.html" class="qa-btn qa-home" data-page="index.html">
                        ${ICONS.home} <span>Home</span>
                    </a>
                    <a href="${bp}contact.html" class="qa-btn qa-contact" data-page="contact.html">
                        ${ICONS.contact} <span>Contact</span>
                    </a>
                    <a href="${bp}support.html" class="qa-btn qa-support" data-page="support.html">
                        ${ICONS.support} <span>Support</span>
                    </a>
                    <a href="${bp}about.html" class="qa-btn qa-about" data-page="about.html">
                        ${ICONS.info} <span>About</span>
                    </a>
                    <a href="${bp}team.html" class="qa-btn qa-team" data-page="team.html">
                        ${ICONS.team} <span>Team</span>
                    </a>
                    <a href="${bp}help.html" class="qa-btn qa-help" data-page="help.html">
                        ${ICONS.help} <span>Help</span>
                    </a>
                    <a href="${bp}faq.html" class="qa-btn qa-faq" data-page="faq.html">
                        ${ICONS.faq} <span>FAQ</span>
                    </a>
                    <a href="${bp}guidelines.html" class="qa-btn qa-guidelines" data-page="guidelines.html">
                        ${ICONS.policy} <span>Guidelines</span>
                    </a>
                    <a href="${bp}rules.html" class="qa-btn qa-rules" data-page="rules.html">
                        ${ICONS.policy} <span>Rules</span>
                    </a>
                    <a href="${bp}policy.html" class="qa-btn qa-policy" data-page="policy.html">
                        ${ICONS.policy} <span>Policy</span>
                    </a>
                    <a href="${bp}terms.html" class="qa-btn qa-terms" data-page="terms.html">
                        ${ICONS.policy} <span>Terms</span>
                    </a>
                </div>
            `;

            const disclaimerHTML = `
                <!-- Support Disclaimer -->
                <div class="support-disclaimer text-center mt-4 mb-5" id="support-disclaimer">
                     <p style="color: #ccc; font-size: 0.95rem;">
                        ¿No encontraste lo que buscabas? 
                        <a href="${bp}support.html" style="color: var(--neon-pink); text-decoration: none; font-weight: bold; margin-left: 5px; transition: text-shadow 0.3s;">
                            Contacta a soporte directamente ${ICONS.arrow_right}
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

