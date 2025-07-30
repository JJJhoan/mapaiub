# app.py
from flask import Flask
# --- Importar CORS ---
from flask_cors import CORS
# ----------------------
from db import mysql
from config import configure_app
from routes.auth import auth_bp
from routes.eventos import eventos_bp # Asegúrate de la ruta correcta
import cloudinary
import cloudinary.uploader
import config

app = Flask(__name__)
configure_app(app)
mysql.init_app(app)

cloudinary.config(
    cloud_name=config.CLOUD_NAME,
    api_key=config.CLOUD_API_KEY,
    api_secret=config.CLOUD_API_SECRET
)

# --- Configurar CORS ---
# Permitir solicitudes desde el origen de tu frontend Vite
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
# -----------------------

# Registrar Blueprints (manteniendo tu estructura original)
# auth_bp se registrará en /api/...
# eventos_bp se registrará en /api/eventos/...
# La configuración de CORS de arriba cubre ambas.
app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(eventos_bp, url_prefix="/api/eventos")

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
