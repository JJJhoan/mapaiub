import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  editarImagen,
  setEditarImagen,
  editarPreview,
  setEditarPreview,
  handleImagenChange,
  handleActualizarEvento,
  cargarEventoEnFormulario
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-300 my-5">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">
        Editar evento
      </h2>

      <select
        className="w-full p-2 border rounded mb-4"
        value={eventoSeleccionado || ""}
        onChange={(e) => cargarEventoEnFormulario(e.target.value)}
      >
        <option value="">Selecciona un evento</option>
        {eventos.map((e) => (
          <option key={e.id_evento} value={e.id_evento}>
            {e.nombre}
          </option>
        ))}
      </select>

      {eventoSeleccionado && (
        <>
          <input
            type="text"
            placeholder="Nuevo ID (opcional)"
            value={idEditable}
            onChange={(e) => setIdEditable(e.target.value)}
            className="no-spinner w-full p-2 border rounded mb-2"
          />

          <input
            type="text"
            value={editarTitulo}
            onChange={(e) => setEditarTitulo(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />

          <textarea
            value={editarDescripcion}
            onChange={(e) => setEditarDescripcion(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label className="mr-3">Fecha y hora de inicio</label>
            <DatePicker
              selected={editarFechaInicio}
              onChange={(date) => setEditarFechaInicio(date)}
              showTimeSelect
              dateFormat="Pp"
              withPortal
              className="w-full p-2 border rounded"
            />

            <label className="mr-3">Fecha y hora de fin</label>
            <DatePicker
              selected={editarFechaFin}
              onChange={(date) => setEditarFechaFin(date)}
              showTimeSelect
              dateFormat="Pp"
              withPortal
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <label>
              <input
                type="checkbox"
                checked={editarEsImportante}
                onChange={(e) => setEditarEsImportante(e.target.checked)}
                className="mr-2"
              />
              Importante
            </label>
          </div>

          <div className="w-80 h-40 border-2 border-dashed border-gray-400 rounded-md flex justify-center items-center cursor-pointer hover:border-blue-500 mb-4 relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImagenChange(e, true)}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            {editarPreview ? (
              <img src={editarPreview} alt="Preview" className="w-79 h-39 rounded object-cover" />
            ) : (
              <span className="text-gray-500 text-3xl font-bold">+</span>
            )}
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleActualizarEvento}
          >
            Actualizar evento
          </button>
        </>
      )}
    </div>
  );
}
