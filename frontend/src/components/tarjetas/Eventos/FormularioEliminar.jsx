import React from "react";

export default function FormularioEliminar({
  eventos,
  eventoAEliminar,
  setEventoAEliminar,
  handleEliminarEvento,
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-300 my-5">
      <h2 className="text-xl font-semibold mb-4 text-red-600">
        Eliminar evento
      </h2>

      <select
        className="w-full p-2 border rounded mb-4"
        value={eventoAEliminar}
        onChange={(e) => setEventoAEliminar(e.target.value)}
      >
        <option value="">Selecciona un evento</option>
        {eventos.map((e) => (
          <option key={e.id_evento} value={e.id_evento}>
            {e.nombre}
          </option>
        ))}
      </select>

      <button
        className={`px-4 py-2 rounded text-white transition ${
          eventoAEliminar
            ? "bg-red-600 hover:bg-red-700"
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
