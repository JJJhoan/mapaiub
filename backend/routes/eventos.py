# eventos_bp.py
from flask import Blueprint, request, jsonify
from db import mysql
import cloudinary.uploader
import re
from datetime import datetime

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
MAX_IMAGE_SIZE_MB = 4

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_datetime(fecha, hora_str):
    try:
        datetime.strptime(fecha, "%Y-%m-%d")
        hora = datetime.strptime(hora_str, "%I:%M %p").time()
        return hora
    except ValueError:
        return None

eventos_bp = Blueprint('eventos', __name__)

@eventos_bp.route('', methods=['POST'])
def crear_evento():
    try:
        nombre = request.form.get('nombre', '').strip()
        descripcion = request.form.get('descripcion', '').strip()
        fecha_inicio = request.form.get('fecha_inicio', '').strip()
        fecha_fin = request.form.get('fecha_fin', '').strip()
        hora_inicio_str = request.form.get('hora_inicio', '').strip()
        hora_fin_str = request.form.get('hora_fin', '').strip()
        es_importante = request.form.get('es_importante', '').strip()
        # --- NUEVO: Obtener ubicacion (opcional) ---
        ubicacion = request.form.get('ubicacion', '').strip()
        imagen = request.files.get('imagen')

        if not all([nombre, descripcion, fecha_inicio, fecha_fin, hora_inicio_str, hora_fin_str, es_importante]):
            return jsonify({"error": "Todos los campos son obligatorios"}), 400

        try:
            datetime.strptime(fecha_inicio, "%Y-%m-%d")
            datetime.strptime(fecha_fin, "%Y-%m-%d")
        except ValueError:
            return jsonify({"error": "Formato de fecha inválido (usa YYYY-MM-DD)"}), 400

        hora_inicio = validate_datetime(fecha_inicio, hora_inicio_str)
        hora_fin = validate_datetime(fecha_fin, hora_fin_str)
        if not hora_inicio or not hora_fin:
            return jsonify({"error": "Formato de hora inválido (usa hh:mm AM/PM)"}), 400

        if es_importante not in ['0', '1']:
            return jsonify({"error": "El campo 'es_importante' debe ser 0 o 1"}), 400
        es_importante = int(es_importante)

        url_imagen = None
        if imagen:
            if imagen.mimetype not in ['image/jpeg', 'image/png']:
                return jsonify({"error": "Solo se permiten imágenes JPG y PNG"}), 400
            if not allowed_file(imagen.filename):
                return jsonify({"error": "Extensión de imagen no permitida"}), 400
            if len(imagen.read()) > MAX_IMAGE_SIZE_MB * 1024 * 1024:
                return jsonify({"error": "La imagen no puede superar los 4MB"}), 400
            imagen.seek(0)
            resultado = cloudinary.uploader.upload(imagen)
            url_imagen = resultado['secure_url']

        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO Evento (nombre, descripcion, fecha_inicio, fecha_fin, hora_inicio, hora_fin, es_importante, imagen_url, ubicacion)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (nombre, descripcion, fecha_inicio, fecha_fin, hora_inicio, hora_fin, es_importante, url_imagen, ubicacion if ubicacion else None))
        mysql.connection.commit()
        cur.close()

        return jsonify({"mensaje": "Evento creado correctamente", "imagen_url": url_imagen, "ubicacion": ubicacion if ubicacion else None})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@eventos_bp.route('', methods=['GET'])
def ver_eventos():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Evento")
        eventos = cur.fetchall()
        cur.close()

        listaEventos = []
        for evento in eventos:
            listaEventos.append({
                "id_evento": evento[0],
                "nombre": evento[1],
                "descripcion": evento[2],
                "fecha_inicio": evento[3].isoformat(),
                "fecha_fin": evento[4].isoformat(),
                "hora_inicio": str(evento[5]),
                "hora_fin": str(evento[6]),
                "es_importante": evento[7],
                "imagen_url": evento[8],
                "ubicacion": evento[11] if len(evento) > 11 and evento[11] is not None else None # Acceder al índice 11
            })

        return jsonify(listaEventos)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@eventos_bp.route('', methods=['PUT'])
def update_evento():
    try:
        id_evento = request.form.get('id_evento', '').strip()
        nombre = request.form.get('nombre', '').strip()
        descripcion = request.form.get('descripcion', '').strip()
        fecha_inicio = request.form.get('fecha_inicio', '').strip()
        fecha_fin = request.form.get('fecha_fin', '').strip()
        hora_inicio_str = request.form.get('hora_inicio', '').strip()
        hora_fin_str = request.form.get('hora_fin', '').strip()
        es_importante = request.form.get('es_importante', '').strip()
        # --- NUEVO: Obtener ubicacion (opcional) ---
        ubicacion = request.form.get('ubicacion', '').strip()
        imagen = request.files.get('imagen')

        if not all([id_evento, nombre, descripcion, fecha_inicio, fecha_fin, hora_inicio_str, hora_fin_str, es_importante]):
            return jsonify({"error": "Todos los campos son obligatorios"}), 400

        hora_inicio = validate_datetime(fecha_inicio, hora_inicio_str)
        hora_fin = validate_datetime(fecha_fin, hora_fin_str)
        if not hora_inicio or not hora_fin:
            return jsonify({"error": "Formato de hora inválido (usa hh:mm AM/PM)"}), 400

        if es_importante not in ['0', '1']:
            return jsonify({"error": "El campo 'es_importante' debe ser 0 o 1"}), 400
        es_importante = int(es_importante)

        cur = mysql.connection.cursor()
        cur.execute("SELECT imagen_url FROM Evento WHERE id_evento = %s", (id_evento,))
        resultado = cur.fetchone()
        url_anterior = resultado[0] if resultado else None
        nueva_url_imagen = url_anterior

        if imagen:
            if imagen.mimetype not in ['image/jpeg', 'image/png']:
                return jsonify({"error": "Solo se permiten imágenes JPG y PNG"}), 400
            if not allowed_file(imagen.filename):
                return jsonify({"error": "Extensión de imagen no permitida"}), 400
            if len(imagen.read()) > MAX_IMAGE_SIZE_MB * 1024 * 1024:
                return jsonify({"error": "La imagen no puede superar los 4MB"}), 400
            imagen.seek(0)
            if url_anterior:
                match = re.search(r'/upload/(?:v\d+/)?(.+)\.(jpg|jpeg|png|gif)', url_anterior)
                if match:
                    public_id = match.group(1)
                    cloudinary.uploader.destroy(public_id)

            resultado_nueva = cloudinary.uploader.upload(imagen)
            nueva_url_imagen = resultado_nueva['secure_url']

        cur.execute("""
            UPDATE Evento SET 
                nombre = %s,
                descripcion = %s,
                fecha_inicio = %s,
                fecha_fin = %s,
                hora_inicio = %s,
                hora_fin = %s,
                es_importante = %s,
                imagen_url = %s,
                ubicacion = %s
            WHERE id_evento = %s
        """, (nombre, descripcion, fecha_inicio, fecha_fin, hora_inicio, hora_fin, es_importante, nueva_url_imagen, ubicacion if ubicacion else None, id_evento))
        mysql.connection.commit()
        cur.close()

        return jsonify({"mensaje": "Evento actualizado correctamente", "imagen_url": nueva_url_imagen, "ubicacion": ubicacion if ubicacion else None})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@eventos_bp.route('/borrar', methods=['POST'])
def borrar_evento():
    try:
        data = request.get_json()
        id_evento = data.get('id_evento')

        if not id_evento:
            return jsonify({"error": "El ID del evento es obligatorio"}), 400

        cur = mysql.connection.cursor()
        cur.execute("SELECT imagen_url FROM Evento WHERE id_evento = %s", (id_evento,))
        resultado = cur.fetchone()
        imagen_url = resultado[0] if resultado else None

        if imagen_url:
            match = re.search(r'/upload/(?:v\d+/)?(.+)\.(jpg|jpeg|png|gif)', imagen_url)
            if match:
                public_id = match.group(1)
                cloudinary.uploader.destroy(public_id)

        cur.execute("DELETE FROM Evento WHERE id_evento = %s", (id_evento,))
        mysql.connection.commit()
        cur.close()

        return jsonify({"mensaje": "Evento e imagen eliminados correctamente"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500