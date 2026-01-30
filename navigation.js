// ================================
// MUZICMANIA - NAVIGATION SYSTEM
// ================================

class AdaptiveNav {
    static init() {
        this.checkZoom();
        this.setupMenu();
        window.addEventListener('resize', () => this.checkZoom());

        // Detectar recarga o navegación interna
        this.setupPageTransition();
    }
    static setupPageTransition() {
        // Crear icono flotante si no existe
        let icon = document.getElementById('transition-icon');
        if (!icon) {
            icon = document.createElement('div');
            icon.id = 'transition-icon';
            icon.className = 'transition-icon';
            document.body.appendChild(icon);
        }

        // Detectar navegación interna
        let isNavigation = false;
        document.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', e => {
                // Solo enlaces internos
                if (a.hostname === location.hostname && a.pathname !== location.pathname) {
                    isNavigation = true;
                    AdaptiveNav.showTransition('arrow');
                }
            });
        });

        // Detectar recarga (F5, Ctrl+R, etc.)
        window.addEventListener('beforeunload', (e) => {
            if (!isNavigation) {
                AdaptiveNav.showTransition('reload');
            }
            document.body.classList.add('page-transitioning');
        });

        // Al cargar, quitar transición después de breve tiempo
        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                document.body.classList.remove('page-transitioning');
                AdaptiveNav.hideTransition();
            }, 900);
        });
    }

    static showTransition(type) {
        const icon = document.getElementById('transition-icon');
        if (!icon) return;
        icon.innerHTML = type === 'reload'
            ? '<i class="fas fa-rotate-right"></i>'
            : '<i class="fas fa-arrow-right"></i>';
        icon.classList.add('visible');
    }

    static hideTransition() {
        const icon = document.getElementById('transition-icon');
        if (icon) icon.classList.remove('visible');
    }

    static checkZoom() {
        const zoom = window.devicePixelRatio || 1;
        const warning = document.querySelector('.zoom-warning');
        if (zoom > 1.25) {
            warning.classList.add('visible');
        } else {
            warning.classList.remove('visible');
        }
    }

    static closeWarning() {
        document.querySelector('.zoom-warning').classList.remove('visible');
    }

    static setupMenu() {
        const menuBtn = document.querySelector('.menu-toggle-btn');
        const closeBtn = document.querySelector('.close-menu-btn');
        const backdrop = document.querySelector('.menu-backdrop');
        const overlay = document.querySelector('.nav-overlay');

        if (menuBtn) {
            menuBtn.addEventListener('click', () => this.toggleMenu(true));
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.toggleMenu(false));
        }
        if (backdrop) {
            backdrop.addEventListener('click', () => this.toggleMenu(false));
        }
    }

    static toggleMenu(show) {
        const backdrop = document.querySelector('.menu-backdrop');
        const overlay = document.querySelector('.nav-overlay');

        if (show) {
            backdrop.style.display = 'block';
            overlay.classList.add('active');
        } else {
            backdrop.style.display = 'none';
            overlay.classList.remove('active');
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    AdaptiveNav.init();
});

// Exportar globalmente
window.AdaptiveNav = AdaptiveNav;

