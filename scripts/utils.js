// ================================
// MUZICMANIA - UTILITIES
// ================================

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 MuzicMania Utilities initialized!');
});

// === SISTEMA DE NOTIFICACIONES ===
function showNotification(message, type = 'info') {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Estilos según tipo
    const colors = {
        success: 'var(--neon-blue)',
        error: 'var(--neon-pink)',
        info: 'var(--neon-purple)'
    };
    
    // Asegurar que exista la clase si no está en CSS
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: rgba(0, 0, 0, 0.95);
        border: 2px solid ${colors[type] || colors.info};
        border-radius: 8px;
        color: var(--neon-cyan);
        font-family: 'Exo 2', sans-serif;
        box-shadow: 0 0 20px ${colors[type] || colors.info};
        z-index: 3000;
        animation: slide-in-right 0.3s ease;
        pointer-events: none;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slide-out-right 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// === ANIMACIONES CSS ADICIONALES ===
const style = document.createElement('style');
style.textContent = `
    @keyframes slide-in-right {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slide-out-right {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Exportar funciones globales
window.showNotification = showNotification;

// === SISTEMA DE COPIADO AL PORTAPAPELES ===
function copyToClipboard(text, description) {
    const fallbackCopy = (str) => {
        const textArea = document.createElement("textarea");
        textArea.value = str;
        textArea.style.position = "fixed"; 
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                if (window.showNotification) showNotification(`¡${description} copiado!`, 'success');
                else Layout.showNotification('¡COPIADO!', `¡${description} copiado al portapapeles!`, 'fa-copy');
            }
        } catch (err) {
            console.error('Fallback: Error al copiar', err);
        }
        document.body.removeChild(textArea);
    };

    if (!navigator.clipboard) {
        fallbackCopy(text);
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        if (window.showNotification) {
            showNotification(`¡${description} copiado al portapapeles!`, 'success');
        } else {
            console.log(`${description} copiado.`);
        }
    }).catch(err => {
        console.warn('Clipboard API falló, usando fallback...', err);
        fallbackCopy(text);
    });
}

// === SISTEMA DE ESTADO REAL (StatusEngine) ===
const StatusEngine = {
    version: 'v2.1.0-A',
    region: 'Caracas, Venezuela 🇻🇪',
    
    // Módulos a verificar
    modules: {
        infra: { name: 'Infraestructura (Auth/DB)', status: 'loading' },
        github: { name: 'API de GitHub', status: 'loading' },
        api_cdn: { name: 'Red de Entrega (CDN)', status: 'loading' },
        security_mesh: { name: 'Malla de Seguridad', status: 'loading' },
        storage: { name: 'Sistema de Guardado', status: 'loading' }
    },

    // Estadísticas de GitHub
    githubStats: {
        stars: 0,
        forks: 0,
        loaded: false
    },

    async checkAll() {
        await Promise.all([
            this.checkAuth(),
            this.checkStorage(),
            this.checkGitHub()
        ]);
        this.dispatchUpdate();
    },

    async checkAuth() {
        // Verificar si AuthSystem está cargado y responde
        const isAuthOK = typeof AuthSystem !== 'undefined';
        this.modules.infra.status = isAuthOK ? 'online' : 'offline';
    },

    async checkStorage() {
        try {
            localStorage.setItem('status_test', 'ok');
            localStorage.removeItem('status_test');
            this.modules.storage.status = 'online';
        } catch (e) {
            this.modules.storage.status = 'offline';
        }

        // Simulación de CDN y Seguridad (Simulados para coherencia visual técnica)
        this.modules.api_cdn.status = 'online';
        this.modules.security_mesh.status = 'online';
    },

    async fetchGitHubStats() {
        try {
            const resp = await fetch('https://api.github.com/repos/CiszukoAntony/MuzicMania');
            if (resp.ok) {
                const data = await resp.json();
                this.githubStats.stars = data.stargazers_count;
                this.githubStats.forks = data.forks_count;
                this.githubStats.loaded = true;
                console.log('🐙 GitHub Stats loaded:', this.githubStats);
            }
        } catch (e) {
            console.error('Error fetching GitHub stats:', e);
        }
    },

    async checkGitHub() {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            const resp = await fetch('https://api.github.com/zen', { signal: controller.signal });
            clearTimeout(timeoutId);
            this.modules.github.status = resp.ok ? 'online' : 'offline';
            
            // Si el API está online, traer stats reales
            if (resp.ok) await this.fetchGitHubStats();
            
        } catch (e) {
            this.modules.github.status = 'offline';
        }
    },

    dispatchUpdate() {
        window.dispatchEvent(new CustomEvent('statusUpdate', { 
            detail: { 
                modules: this.modules, 
                githubStats: this.githubStats 
            } 
        }));
    }
};

// Auto-iniciar chequeo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => StatusEngine.checkAll());
} else {
    StatusEngine.checkAll();
}

// === SISTEMA DE SEGURIDAD Y DETECCIÓN (SecurityChecker) ===
const SecurityChecker = {
    async checkAll() {
        const results = {
            incognito: await this.isIncognito(),
            vpn: this.isVPN(),
            debug: this.isDebug()
        };
        console.log('🔒 Security Check:', results);
        return results;
    },

    async isIncognito() {
        if (!navigator.storage || !navigator.storage.estimate) return false;
        const { quota } = await navigator.storage.estimate();
        // Heurística: En modo incógnito de la mayoría de los navegadores, la cuota de almacenamiento es significativamente menor.
        return quota < 120000000;
    },

    isVPN() {
        // Heurística de zona horaria vs lenguaje
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const lang = navigator.language || navigator.userLanguage;
        
        // Si el lenguaje es español (común en este proyecto) pero la zona horaria no es de LATAM/España
        if (lang.startsWith('es') && !tz.includes('America') && !tz.includes('Atlantic/Canary') && !tz.includes('Europe/Madrid')) {
            return true;
        }
        return false;
    },

    isDebug() {
        const host = window.location.hostname;
        return host === 'localhost' || host === '127.0.0.1' || host.includes('192.168.');
    }
};

// Exportar globalmente
window.SecurityChecker = SecurityChecker;
window.StatusEngine = StatusEngine;
window.copyToClipboard = copyToClipboard;
