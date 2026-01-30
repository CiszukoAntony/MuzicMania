# 🎵 MuzicMania

> **El Juego de Ritmo Definitivo en la Web.**
> Domina el beat en una dimensión online con estética futurista.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-Active_Development-green.svg)
![Version](https://img.shields.io/badge/version-2.0.0-purple.svg)

## 📖 Descripción
MuzicMania es un juego de ritmo tipo "Mania" (VSRG - Vertical Scrolling Rhythm Game) que se ejecuta directamente en el navegador. Combina mecánicas clásicas de 4 teclas con una estética Cyberpunk/Neon moderna.

### ✨ Características Principales
- **Web-Based**: Juega instantáneamente sin descargas.
- **Sistema de Cuentas**: Login, Registro y Perfiles de Usuario.
- **Leaderboards Globales**: Compite por la puntuación más alta.
- **Visualizadores de Audio**: Efectos que reaccionan a la música en tiempo real.
- **Diseño Responsivo**: Interfaz moderna adaptable.

---

## 🚀 Instalación y Uso Local

Este proyecto no requiere un backend complejo (actualmente usa `localStorage` para persistencia simulada), por lo que es fácil de correr.

### Requisitos
- Un navegador web moderno (Chrome, Firefox, Edge).
- (Opcional) Un servidor local simple como `Live Server` de VS Code o Python `http.server`.

### Pasos
1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/CiszukoAntony/MuzicMania.git
    cd MuzicMania
    ```

2.  **Ejecutar**:
    Simplemente abre el archivo `index.html` en tu navegador.
    *Recomendado: Usar una extensión como "Live Server" para evitar problemas con CORS en módulos JS.*

---

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3 (Variables, Flexbox, Grid), JavaScript (ES6+).
- **Audio**: Web Audio API para análisis de espectro.
- **Datos**: LocalStorage (Simulación de Base de Datos).
- **Iconos**: FontAwesome.

---

## 📁 Estructura del Proyecto

```
MuzicMania/
├── assets/          # Imágenes y recursos estáticos
├── debug/           # Scripts de desarrollo y bots (Ignorado en producción)
├── ia/              # Documentación interna del proyecto (Ignorado en prod)
├── index.html       # Landing Page
├── game.html        # Core del juego
├── styles.css       # Estilos globales
├── script.js        # Lógica principal
├── layout.js        # Componente compartido (Header/Footer)
└── ...
```

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, abre un issue o envía un Pull Request para mejoras.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---
*Desarrollado con ❤️ por el equipo de MuzicMania.*
