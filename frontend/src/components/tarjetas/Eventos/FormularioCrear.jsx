import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FormularioCrear({
  idManual,
  setIdManual,
  titulo,
  setTitulo,
  descripcion,
  setDescripcion,
  fechaInicio,
  setFechaInicio,
  fechaFin,
  setFechaFin,
  esImportante,
  setEsImportante,
  imagen,
  setImagen,
  preview,
  setPreview,
  handleImagenChange,
  formularioValido,
  handleCrearEvento
}) {
  // Limpiar preview cuando cambia la imagen para evitar fuga de memoria
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-300 my-5">
      <h2 className="text-xl font-semibold mb-4 text-green-600">Crear nuevo evento</h2>

      <input
        type="number"
        placeholder="ID del evento (opcional)"
        value={idManual}
        onChange={(e) => setIdManual(e.target.value)}
        className="no-spinner w-full p-2 border rounded mb-2"
      />

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full h-28 p-2 border rounded mb-2"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <label className="mr-3">Fecha y hora de inicio</label>
        <DatePicker
          selected={fechaInicio}
          onChange={(date) => setFechaInicio(date)}
          showTimeSelect
          dateFormat="Pp"
          withPortal
          className="w-full p-2 border rounded"
        />

        <label className="mr-3">Fecha y hora de fin</label>
        <DatePicker
          selected={fechaFin}
          onChange={(date) => setFechaFin(date)}
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
            checked={esImportante}
            onChange={(e) => setEsImportante(e.target.checked)}
            className="mr-2"
          />
          Importante
        </label>
      </div>

      <div
        className="w-80 h-40 border-2 border-dashed border-gray-400 rounded-md flex justify-center items-center cursor-pointer hover:border-blue-500 mb-4 relative"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImagenChange(e, false)}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
        {preview ? (
          <img src={preview} alt="Preview" className="w-79 h-39 rounded object-cover"/>
        ) : (
          <span className="text-gray-500 text-3xl font-bold">+</span>
        )}
      </div>

      <button
        className={`px-4 py-2 rounded text-white transition ${
          formularioValido()
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!formularioValido()}
        onClick={handleCrearEvento}
      >
        Crear evento
      </button>
    </div>
  );
}
