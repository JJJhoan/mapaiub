import os

MYSQL_HOST = "127.0.0.1"
MYSQL_USER = "root"
MYSQL_PASSWORD = ""
MYSQL_DB = "sistema_eventos(2)"

HEX_SEC_KEY = "d5fb8cf748abd46638ddac4e751ed868d"

CLOUD_NAME = "dvoyobibw"
CLOUD_API_KEY = "247391328718892"
CLOUD_API_SECRET = "mH46vzGMNWkUAruDZw0ai8f1-As"

def configure_app(app):
    app.config['SECRET_KEY'] = HEX_SEC_KEY
    app.config['MYSQL_HOST'] = MYSQL_HOST
    app.config['MYSQL_USER'] = MYSQL_USER
    app.config['MYSQL_PASSWORD'] = MYSQL_PASSWORD
    app.config['MYSQL_DB'] = MYSQL_DB
