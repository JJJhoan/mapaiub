from flask import Flask
from flask_cors import CORS

from db import mysql
from config import configure_app
from routes.auth import auth_bp
from routes.eventos import eventos_bp
import cloudinary
import cloudinary.uploader
import config
from routes.estadisticas import estadisticas_bp

app = Flask(__name__)
configure_app(app)
mysql.init_app(app)

cloudinary.config(
    cloud_name=config.CLOUD_NAME,
    api_key=config.CLOUD_API_KEY,
    api_secret=config.CLOUD_API_SECRET
)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(eventos_bp, url_prefix="/api/eventos")
app.register_blueprint(estadisticas_bp, url_prefix="/api/estadisticas")

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
