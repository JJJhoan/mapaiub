import React from "react";
import { useTheme } from "../../../context/ThemeContext";

export default function FormularioEliminar({
  eventos,
  eventoAEliminar,
  setEventoAEliminar,
  handleEliminarEvento,
}) {
  const { isDark } = useTheme();

  return (
    <div className={`shadow-md rounded-xl p-6 my-5 transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900 border-gray-700 text-gray-100' 
        : 'bg-white border-gray-300 text-gray-800'
    }`}>
      <h2 className={`text-xl font-semibold mb-4 ${
        isDark ? 'text-red-400' : 'text-red-600'
      }`}>
        Eliminar evento
      </h2>

      <select
        className={`w-full p-2 border rounded mb-4 transition-colors ${
          isDark
            ? 'bg-gray-700 border-gray-600 text-white'
            : 'bg-white border-gray-300 text-gray-800'
        }`}
        value={eventoAEliminar}
        onChange={(e) => setEventoAEliminar(e.target.value)}
      >
        <option value="">Selecciona un evento</option>
        {eventos.map((e) => (
          <option 
            key={e.id_evento} 
            value={e.id_evento}
            className={isDark ? 'bg-gray-700' : 'bg-white'}
          >
            {e.nombre}
          </option>
        ))}
      </select>

      <button
        className={`px-4 py-2 rounded text-white transition font-medium ${
          eventoAEliminar
            ? isDark
              ? "bg-red-600 hover:bg-red-700"
              : "bg-red-600 hover:bg-red-700"
            : isDark
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleEliminarEvento}
        disabled={!eventoAEliminar}
      >
        Eliminar evento
      </button>
    </div>
  );
}
