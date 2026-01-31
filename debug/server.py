#!/usr/bin/env python3
"""
MuzicMania - Servidor de Desarrollo Local
==========================================
Un servidor HTTP simple con logging integrado y cache busting.

Uso:
    python debug/server.py           # Inicia en puerto 8000
    python debug/server.py 3000      # Inicia en puerto personalizado

Autor: Ciszuko Antony
"""

import http.server
import socketserver
import os
import sys
import datetime
import signal
import urllib.parse
import re
import random

# Configuracion de rutas
DEBUG_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(DEBUG_DIR)
LOG_DIR = os.path.join(ROOT_DIR, "logs")

# Puerto por defecto
PORT = int(sys.argv[1]) if len(sys.argv) > 1 and sys.argv[1].isdigit() else 8000

# Colores ANSI para terminal
class Colors:
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    MAGENTA = '\033[95m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

# Crear directorio de logs si no existe
os.makedirs(LOG_DIR, exist_ok=True)

# Generar nombre de archivo de log
SESSION_ID = f"{random.randint(1000, 9999)}"
DATE_STAMP = datetime.datetime.now().strftime("%Y-%m-%d")
LOG_FILE = os.path.join(LOG_DIR, f"server_{SESSION_ID}_{DATE_STAMP}.log")

def log(msg, level="INFO"):
    """Escribe un mensaje al log y a la consola."""
    timestamp = datetime.datetime.now().strftime("%H:%M:%S")
    
    # Colores por nivel
    colors = {
        "INFO": Colors.CYAN,
        "OK": Colors.GREEN,
        "WARN": Colors.YELLOW,
        "ERROR": Colors.RED,
        "JS": Colors.MAGENTA
    }
    color = colors.get(level, Colors.RESET)
    
    # Formato para consola (con color)
    console_msg = f"{color}[{timestamp}] [{level}]{Colors.RESET} {msg}"
    print(console_msg)
    sys.stdout.flush()
    
    # Formato para archivo (sin color)
    file_msg = f"[{timestamp}] [{level}] {msg}"
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(file_msg + "\n")
    except Exception as e:
        print(f"{Colors.RED}Error escribiendo log: {e}{Colors.RESET}")

def apply_cache_busting():
    """Aplica cache busting a todos los archivos HTML."""
    cache_version = random.randint(100000, 999999)
    html_files = [f for f in os.listdir(ROOT_DIR) if f.endswith('.html')]
    
    patterns = [
        (r'styles\.css\?v=\d+', f'styles.css?v={cache_version}'),
        (r'utils\.js\?v=\d+', f'utils.js?v={cache_version}'),
        (r'navigation\.js\?v=\d+', f'navigation.js?v={cache_version}'),
        (r'layout\.js\?v=\d+', f'layout.js?v={cache_version}'),
    ]
    
    updated = 0
    for filename in html_files:
        filepath = os.path.join(ROOT_DIR, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for pattern, replacement in patterns:
                new_content = re.sub(pattern, replacement, new_content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                updated += 1
        except Exception as e:
            log(f"Error en cache busting para {filename}: {e}", "ERROR")
    
    return updated, cache_version

class MuzicManiaHandler(http.server.SimpleHTTPRequestHandler):
    """Handler HTTP personalizado para MuzicMania."""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT_DIR, **kwargs)
    
    def do_GET(self):
        # Endpoint interno para logs de JavaScript
        if "INTERNAL_LOG_PING" in self.path:
            try:
                query = urllib.parse.urlparse(self.path).query
                params = urllib.parse.parse_qs(query)
                msg = params.get('msg', [''])[0]
                fatal = params.get('fatal', ['false'])[0] == 'true'
                
                log(msg, "ERROR" if fatal else "JS")
                
                self.send_response(200)
                self.send_header("Content-type", "text/plain")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(b"OK")
                return
            except Exception as e:
                log(f"Error en ping: {e}", "ERROR")
        
        return super().do_GET()
    
    def log_message(self, format, *args):
        # Solo loguear peticiones reales (no pings internos)
        if "INTERNAL_LOG_PING" not in format:
            log(f"{self.address_string()} - {format % args}")
    
    def send_error(self, code, message=None, explain=None):
        # Servir pagina 404 personalizada
        if code == 404:
            try:
                path_404 = os.path.join(ROOT_DIR, "404.html")
                if os.path.exists(path_404):
                    self.send_response(404)
                    self.send_header("Content-type", "text/html; charset=utf-8")
                    self.end_headers()
                    with open(path_404, "rb") as f:
                        self.wfile.write(f.read())
                    return
            except Exception as e:
                log(f"Error cargando 404.html: {e}", "ERROR")
        
        super().send_error(code, message, explain)

def signal_handler(sig, frame):
    """Maneja Ctrl+C para cerrar limpiamente."""
    print()
    log("Servidor detenido por el usuario", "WARN")
    sys.exit(0)

    # Banner eliminado para evitar duplicación con server.bat
    # print_banner()
    
    # Aplicar cache busting
    updated, version = apply_cache_busting()
    log(f"Cache busting aplicado (v{version}) - {updated} archivos actualizados", "OK")
    
    # Mostrar informacion
    log(f"Servidor iniciando en puerto {PORT}", "INFO")
    log(f"Directorio raiz: {ROOT_DIR}", "INFO")
    log(f"Archivo de log: {os.path.basename(LOG_FILE)}", "INFO")
    print()
    log(f"{Colors.BOLD}URL: http://localhost:{PORT}{Colors.RESET}", "OK")
    print()
    log("Presiona Ctrl+C para detener el servidor", "INFO")
    print(f"{Colors.MAGENTA}{'─' * 60}{Colors.RESET}")
    print()
    
    # Iniciar servidor
    socketserver.TCPServer.allow_reuse_address = True
    
    try:
        with socketserver.TCPServer(("", PORT), MuzicManiaHandler) as httpd:
            httpd.serve_forever()
    except OSError as e:
        if "Address already in use" in str(e) or "10048" in str(e):
            log(f"El puerto {PORT} ya esta en uso. Intenta con otro puerto.", "ERROR")
            log(f"Ejemplo: python debug/server.py 3000", "INFO")
        else:
            log(f"Error critico: {e}", "ERROR")
        sys.exit(1)

if __name__ == "__main__":
    main()
