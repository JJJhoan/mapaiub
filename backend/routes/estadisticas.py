from flask import Blueprint, jsonify
from db import mysql

estadisticas_bp = Blueprint('estadisticas', __name__)

@estadisticas_bp.route('/eventosPorSede', methods=['GET'])
def eventosPorSede():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("""
            SELECT sede, COUNT(*) AS total_eventos
            FROM eventos
            GROUP BY sede
        """)
        resultados = cursor.fetchall()
        cursor.close()

        data = [{"sede": fila[0], "total_eventos": fila[1]} for fila in resultados]
        return jsonify({"status": "success", "data": data}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@estadisticas_bp.route('/eventosPorMes', methods=['GET'])
def eventosPorMes():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("""
            SELECT 
                DATE_FORMAT(fecha_evento, '%Y-%m') AS mes,
                COUNT(*) AS total_eventos
            FROM eventos
            GROUP BY mes
            ORDER BY mes ASC
        """)
        resultados = cursor.fetchall()
        cursor.close()

        data = [{"mes": fila[0], "total_eventos": fila[1]} for fila in resultados]
        return jsonify({"status": "success", "data": data}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@estadisticas_bp.route('/eventosImportancia', methods=['GET'])
def eventosImportancia():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("""
            SELECT 
                es_importante, 
                COUNT(*) AS cantidad
            FROM eventos
            GROUP BY es_importante
        """)
        resultados = cursor.fetchall()
        cursor.close()

        data = [
            {
                "tipo": "Importante" if (fila[0] == 1 or fila[0] == True) else "No importante",
                "cantidad": fila[1]
            }
            for fila in resultados
        ]

        return jsonify({"status": "success", "data": data}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@estadisticas_bp.route('/eventosUltimos7', methods=['GET'])
def eventosUltimos7():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("""
            SELECT 
                DATE(fecha_evento) AS dia, 
                COUNT(*) AS cantidad
            FROM eventos
            WHERE fecha_evento >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
            GROUP BY dia
            ORDER BY dia ASC
        """)
        resultados = cursor.fetchall()
        cursor.close()

        data = [{"dia": str(row[0]), "cantidad": row[1]} for row in resultados]
        return jsonify({"status": "success", "data": data}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
