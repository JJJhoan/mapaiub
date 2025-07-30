from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from db import mysql
from datetime import datetime
import re

auth_bp = Blueprint('auth', __name__)

def validar_correo(correo):
    return re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', correo)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        campos_requeridos = ['correo', 'contraseña', 'nombres', 'apellidos']
        for campo in campos_requeridos:
            if campo not in data or not data[campo].strip():
                return jsonify({"error": f"El campo '{campo}' es obligatorio"}), 400

        correo = data['correo'].strip()
        contraseña = data['contraseña'].strip()
        nombres = data['nombres'].strip()
        apellidos = data['apellidos'].strip()

        if not validar_correo(correo):
            return jsonify({"error": "El correo no tiene un formato válido"}), 400

        if len(contraseña) < 6:
            return jsonify({"error": "La contraseña debe tener al menos 6 caracteres"}), 400

        contraseña_hash = generate_password_hash(contraseña)

        cur = mysql.connection.cursor()
        cur.execute("SELECT id_rol FROM Rol WHERE nombre_rol = 'Estudiante'")
        rol_result = cur.fetchone()
        if not rol_result:
            return jsonify({"error": "Rol 'Estudiante' no existe"}), 500
        id_rol = rol_result[0]

        cur.execute("SELECT id_usuario FROM Usuario WHERE correo = %s", (correo,))
        if cur.fetchone():
            return jsonify({"error": "El correo ya está registrado"}), 409

        cur.execute("""
            INSERT INTO Usuario (correo, contraseña, nombres, apellidos, id_rol)
            VALUES (%s, %s, %s, %s, %s)
        """, (correo, contraseña_hash, nombres, apellidos, id_rol))
        mysql.connection.commit()
        cur.close()

        return jsonify({"mensaje": "Usuario registrado correctamente"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data.get('correo') or not data.get('contraseña'):
            return jsonify({"error": "Correo y contraseña son obligatorios"}), 400

        correo = data['correo'].strip()
        contraseña = data['contraseña'].strip()

        cur = mysql.connection.cursor()
        cur.execute("""
            SELECT U.id_usuario, U.contraseña, U.nombres, U.apellidos, R.nombre_rol
            FROM Usuario U
            JOIN Rol R ON U.id_rol = R.id_rol
            WHERE U.correo = %s
        """, (correo,))
        user = cur.fetchone()

        if user and check_password_hash(user[1], contraseña):
            cur.execute("UPDATE Usuario SET ultimo_login = %s WHERE id_usuario = %s", (datetime.now(), user[0]))
            mysql.connection.commit()
            cur.close()

            return jsonify({
                "mensaje": "Inicio de sesión exitoso",
                "usuario": {
                    "id_usuario": user[0],
                    "nombres": user[2],
                    "apellidos": user[3],
                    "rol": user[4]
                }
            })

        return jsonify({"error": "Correo o contraseña incorrectos"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 400
