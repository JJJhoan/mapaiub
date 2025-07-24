from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
import config
import re

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

app.config['SECRET_KEY'] = config.HEX_SEC_KEY
app.config['MYSQL_HOST'] = config.MYSQL_HOST
app.config['MYSQL_USER'] = config.MYSQL_USER
app.config['MYSQL_PASSWORD'] = config.MYSQL_PASSWORD
app.config['MYSQL_DB'] = config.MYSQL_DB

mysql = MySQL(app)

cloudinary.config(
    cloud_name=config.CLOUD_NAME,
    api_key=config.CLOUD_API_KEY,
    api_secret=config.CLOUD_API_SECRET
)

@app.route('/api/eventos', methods=['POST'])
def crear_evento():
    try:
        id_evento = request.form.get("id_evento", "").strip()
        nombre = request.form['nombre']
        descripcion = request.form['descripcion']
        fecha_inicio = request.form['fecha_inicio']
        fecha_fin = request.form['fecha_fin']
        hora_inicio = request.form['hora_inicio']
        hora_fin = request.form['hora_fin']
        es_opcional = request.form['es_opcional']
        es_importante = request.form['es_importante']
        imagen = request.files.get('imagen')

        cur = mysql.connection.cursor()

        if id_evento:
            cur.execute("SELECT COUNT(*) FROM Evento WHERE id_evento = %s", (id_evento,))
            if cur.fetchone()[0] > 0:
                cur.close()
                return jsonify({"error": "El ID ya está en uso"}), 400

        url_imagen = None
        if imagen:
            resultado = cloudinary.uploader.upload(imagen)
            url_imagen = resultado['secure_url']

        if id_evento:
            cur.execute("""
                INSERT INTO Evento (id_evento, nombre, descripcion, fecha_inicio, fecha_fin, hora_inicio, hora_fin, es_opcional, es_importante, imagen_url)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (id_evento, nombre, descripcion, fecha_inicio, fecha_fin, hora_inicio, hora_fin, es_opcional, es_importante, url_imagen))
        else:
            cur.execute("""
                INSERT INTO Evento (nombre, descripcion, fecha_inicio, fecha_fin, hora_inicio, hora_fin, es_opcional, es_importante, imagen_url)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (nombre, descripcion, fecha_inicio, fecha_fin, hora_inicio, hora_fin, es_opcional, es_importante, url_imagen))

        mysql.connection.commit()
        cur.close()

        return jsonify({"mensaje": "Evento creado correctamente", "imagen_url": url_imagen})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/eventos', methods=['GET'])
def verEventos():
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
            "es_opcional": evento[7],
            "es_importante": evento[8],
            "imagen_url": evento[9]
        })
    return jsonify(listaEventos)

@app.route('/api/eventos', methods=['PUT'])
def update():
    try:
        id_evento_original = request.form['id_evento']
        nuevo_id_evento = request.form.get('nuevo_id_evento', '').strip() or id_evento_original
        nombre = request.form['nombre']
        descripcion = request.form['descripcion']
        fecha_inicio = request.form['fecha_inicio']
        fecha_fin = request.form['fecha_fin']
        hora_inicio = request.form['hora_inicio']
        hora_fin = request.form['hora_fin']
        es_opcional = request.form['es_opcional']
        es_importante = request.form['es_importante']
        imagen = request.files.get('imagen')

        cur = mysql.connection.cursor()

        if nuevo_id_evento != id_evento_original:
            cur.execute("SELECT COUNT(*) FROM Evento WHERE id_evento = %s", (nuevo_id_evento,))
            if cur.fetchone()[0] > 0:
                return jsonify({"error": "El nuevo ID ya está en uso"}), 400

        cur.execute("SELECT imagen_url FROM Evento WHERE id_evento = %s", (id_evento_original,))
        resultado = cur.fetchone()
        url_anterior = resultado[0] if resultado else None
        nueva_url_imagen = url_anterior

        if imagen:
            if url_anterior:
                match = re.search(r'/upload/(?:v\d+/)?(.+)\.(jpg|jpeg|png|gif)', url_anterior)
                if match:
                    public_id = match.group(1)
                    cloudinary.uploader.destroy(public_id)

            resultado_nueva = cloudinary.uploader.upload(imagen)
            nueva_url_imagen = resultado_nueva['secure_url']

        cur.execute("""
            UPDATE Evento SET 
                id_evento = %s,
                nombre = %s,
                descripcion = %s,
                fecha_inicio = %s,
                fecha_fin = %s,
                hora_inicio = %s,
                hora_fin = %s,
                es_opcional = %s,
                es_importante = %s,
                imagen_url = %s
            WHERE id_evento = %s
        """, (nuevo_id_evento, nombre, descripcion, fecha_inicio, fecha_fin, hora_inicio, hora_fin, es_opcional, es_importante, nueva_url_imagen, id_evento_original))

        mysql.connection.commit()
        cur.close()

        return jsonify({
            "mensaje": "Evento actualizado correctamente",
            "nuevo_id_evento": nuevo_id_evento,
            "imagen_url": nueva_url_imagen
        })

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/api/eventos/borrar', methods=['POST'])
def borrar():
    data = request.get_json()
    id_evento = data.get('id_evento')

    try:
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
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
