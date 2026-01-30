import http.server
import socketserver
import os

PORT = 8000
# El script se ejecuta desde /debug, pero el sitio está en la raíz
DIRECTORY = ".."

class MuzicManiaHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Intentar servir el archivo normalmente
        return super().do_GET()

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            # Si es 404, intentar servir nuestro 404.html personalizado
            try:
                path_404 = os.path.join(DIRECTORY, "404.html")
                if os.path.exists(path_404):
                    self.send_response(404)
                    self.send_header("Content-type", "text/html; charset=utf-8")
                    self.end_headers()
                    with open(path_404, "rb") as f:
                        self.wfile.write(f.read())
                    return
            except Exception as e:
                print(f"[ERROR] No se pudo servir 404.html personalizado: {e}")
        
        # Fallback al error estándar si no es 404 o algo falló
        super().send_error(code, message, explain)

if __name__ == "__main__":
    Handler = MuzicManiaHandler
    
    # Permitir reutilizar el puerto inmediatamente
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"📡 [MuzicMania Pro Server] ON en http://localhost:{PORT}")
        print(f"📄 Sirviendo desde: {os.path.abspath(DIRECTORY)}")
        print("💡 Configurado con 404.html dinámico")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Servidor detenido por el usuario.")
            httpd.server_close()
