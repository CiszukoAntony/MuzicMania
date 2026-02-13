from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="MuzicMania API", version="0.1.0")

# Configurar CORS para permitir peticiones desde el frontend (GitHub Pages / Local)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "🪐 MuzicMania Backend Engine is Ready",
        "version": "0.1.0-ALPHA"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "main-api"}
