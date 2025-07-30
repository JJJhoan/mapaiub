// src/components/eventos/FormularioEditar.jsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "../../../context/ThemeContext";

export default function FormularioEditar({
  eventos,
  eventoSeleccionado,
  setEventoSeleccionado,
  idEditable,
  setIdEditable,
  editarTitulo,
  setEditarTitulo,
  editarDescripcion,
  setEditarDescripcion,
  editarFechaInicio,
  setEditarFechaInicio,
  editarFechaFin,
  setEditarFechaFin,
  editarEsImportante,
  setEditarEsImportante,
  // --- NUEVO: Estado para ubicacion en edición ---
  editarUbicacion,
  setEditarUbicacion,
  editarImagen,
  setEditarImagen,
  editarPreview,
  setEditarPreview,
  handleImagenChange,
  handleActualizarEvento,
  cargarEventoEnFormulario
}) {
  const { isDark } = useTheme();

  return (
    <div className={`shadow-md rounded-xl p-6 my-5 transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900 border-gray-700 text-gray-100' 
        : 'bg-white border-gray-300 text-gray-800'
    }`}>
      <h2 className={`text-xl font-semibold mb-4 ${
        isDark ? 'text-blue-400' : 'text-blue-600'
      }`}>
        Editar evento
      </h2>

      <select
        className={`w-full p-2 border rounded mb-4 transition-colors ${
          isDark
            ? 'bg-gray-700 border-gray-600 text-white'
            : 'bg-white border-gray-300 text-gray-800'
        }`}
        value={eventoSeleccionado || ""}
        onChange={(e) => cargarEventoEnFormulario(e.target.value)}
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

      {eventoSeleccionado && (
        <>
          <input
            type="text"
            value={editarTitulo}
            onChange={(e) => setEditarTitulo(e.target.value)}
            className={`w-full p-2 border rounded mb-2 transition-colors ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-800'
            }`}
          />

          <textarea
            value={editarDescripcion}
            onChange={(e) => setEditarDescripcion(e.target.value)}
            className={`w-full p-2 border rounded mb-2 transition-colors resize-none ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-800'
            }`}
          />

          {/* --- NUEVO: Campo para ubicacion en edición --- */}
          <input
            type="text"
            placeholder="Ubicación (ID del lugar en el mapa, opcional)"
            value={editarUbicacion}
            onChange={(e) => setEditarUbicacion(e.target.value)}
            className={`w-full p-2 border rounded mb-2 transition-colors ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
            }`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label className={`mr-3 font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Fecha y hora de inicio
            </label>
            <DatePicker
              selected={editarFechaInicio}
              onChange={(date) => setEditarFechaInicio(date)}
              showTimeSelect
              dateFormat="Pp"
              withPortal
              className={`w-full p-2 border rounded transition-colors ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-800'
              }`}
            />

            <label className={`mr-3 font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Fecha y hora de fin
            </label>
            <DatePicker
              selected={editarFechaFin}
              onChange={(date) => setEditarFechaFin(date)}
              showTimeSelect
              dateFormat="Pp"
              withPortal
              className={`w-full p-2 border rounded transition-colors ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-800'
              }`}
            />
          </div>

          <div className="flex gap-4 mb-4">
            <label className={`flex items-center ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              <input
                type="checkbox"
                checked={editarEsImportante}
                onChange={(e) => setEditarEsImportante(e.target.checked)}
                className="mr-2"
              />
              Importante
            </label>
          </div>

          <div className={`
            w-80 h-40 border-2 border-dashed rounded-md flex justify-center items-center cursor-pointer mb-4 relative transition-colors
            ${isDark 
              ? 'border-gray-600 hover:border-blue-400' 
              : 'border-gray-400 hover:border-blue-500'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImagenChange(e, true)}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            {editarPreview ? (
              <img src={editarPreview} alt="Preview" className="w-79 h-39 rounded object-cover" />
            ) : (
              <span className={`text-3xl font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                +
              </span>
            )}
          </div>

          <button
            className={`px-4 py-2 rounded text-white transition font-medium ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleActualizarEvento}
          >
            Actualizar evento
          </button>
        </>
      )}
    </div>
  );
}