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
            menuBtn.addEventListener('click', () => this.toggleMenu());
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
        const menuBtn = document.querySelector('.menu-toggle-btn');

        if (!overlay || !backdrop) return;

        // Si no se define 'show', alternamos el estado actual
        const finalShow = (typeof show === 'boolean') ? show : !overlay.classList.contains('active');

        // Toggle del botón
        if (menuBtn) {
            if (finalShow) menuBtn.classList.add('active');
            else menuBtn.classList.remove('active');
        }

        if (finalShow) {
            backdrop.style.display = 'block';
            setTimeout(() => {
                backdrop.classList.add('active');
                overlay.classList.add('active');
            }, 10);
        } else {
            backdrop.classList.remove('active');
            overlay.classList.remove('active');
            setTimeout(() => {
                if (!overlay.classList.contains('active')) {
                    backdrop.style.display = 'none';
                }
            }, 400);
        }
    }

    // === MÉTODOS DE SOPORTE PARA AUTH Y OVERFLOW ===
    static checkOverflow() {
        // Placeholder robusto para evitar crash si Auth lo llama
        console.log('AdaptiveNav: Verificando overflow (placeholder)');
        // Futura implementación: Ocultar items del nav si el ancho < 800px
    }

    static toggleAccessMenu() {
        const menu = document.getElementById('auth-quick-options');
        const btn = document.getElementById('btn-access-header');
        
        // Cerrar otros menús si es necesario
        this.toggleMenu(false); // Cerrar menú hamburguesa

        if (menu) {
            const isActive = menu.classList.toggle('active');
            if (btn) btn.innerHTML = isActive 
                ? '<i class="fas fa-times"></i> <span class="btn-text">Cancelar</span>' 
                : '<i class="fas fa-user-circle"></i> <span class="btn-text">Acceder</span>';
            
            if (btn) btn.classList.toggle('active', isActive);
        }
    }

    static closeAccessMenu() {
        const menu = document.getElementById('auth-quick-options');
        const btn = document.getElementById('btn-access-header');
        
        if (menu) menu.classList.remove('active');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-user-circle"></i> <span class="btn-text">Acceder</span>';
            btn.classList.remove('active');
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    AdaptiveNav.init();
});

// Exportar globalmente
window.AdaptiveNav = AdaptiveNav;

