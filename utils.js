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
