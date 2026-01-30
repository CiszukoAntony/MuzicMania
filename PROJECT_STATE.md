# Estado del Proyecto MuzicMania

**Última actualización:** 30 Enero 2026 - Recuperación de Desastre Encoding

## 📋 Descripción del Proyecto
MuzicMania es un juego de ritmo web (estilo Mania/DDR) con estética futurista Neon/Synthwave.
- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (Vanilla).
- **Backend:** Simulado con `localStorage` (sin base de datos real por ahora).
- **Diseño:** Responsivo, "Mobile First" pero optimizado para escritorio. Colores neón (Cyan, Pink, Purple).

## 🛠️ Tecnologías y Estructura
- **Framework:** Ninguno (Vanilla JS/CSS).
- **Iconos:** FontAwesome 6.4.0 (CDN).
- **Fuentes:** 'Orbitron' (Headers), 'Rajdhani' (Cuerpo).
- **Estructura de Archivos:**
  - `/`: HTMLs principales (`index.html`, `game.html`, `leaderboard.html`, etc.)
  - `assets/`: Imágenes (`logo.png`).
  - `repair_scripts/`: Herramientas de mantenimiento (`fix_encoding.py`, `qt_repair.py`).
  - `backups/`: Copias de seguridad automáticas.
  - `.vscode/`, `.editorconfig`: Configuración crítica del entorno.

## ⚠️ Historial de Errores Críticos

### 1. El "Gran Desastre de Encoding" (Enero 2026)
- **Síntoma:** Archivos HTML "encriptados" con caracteres como `ÃƒÂsticas` o `TƒÃ‚Âƒ...`.
- **Causa:** VSCode guardó archivos UTF-8 interpretándolos como Windows-1252 repetidas veces (Triple/Cuádruple Mojibake).
- **Solución Aplicada:**
  1. **Prevención:** Se creó `.vscode/settings.json` y `.editorconfig` forzando UTF-8.
  2. **Reparación:** Script quirúrgico `repair_scripts/fix_bytes_final.py` que revierte patrones de bytes corruptos capa por capa.

## 📝 Estado Actual de Archivos
- `index.html`: **REPARADO** (Texto y Emojis legibles).
- `game.html`, `terms.html`: **DAÑADOS SEVERAMENTE** (Requieren múltiples pasadas de reparación binaria).
- `styles.css`: Estable (Logo ajustado a 50px).
- Scripts JS (`navigation.js`, `auth.js`): Verificados limpios.

## 🚀 Hoja de Ruta Inmediata
1. Terminar de desencriptar `game.html` y `terms.html` mediante iteración de scripts de bytes.
2. Verificar integridad visual de todas las páginas.
3. Consolidar el sistema de navegación.

---
**Nota para la IA:** Antes de empezar cualquier sesión, LEE ESTE ARCHIVO para entender que el encoding es frágil y debe tratarse como UTF-8 estricto. Usa `repair_scripts/` si encuentras texto corrupto.
