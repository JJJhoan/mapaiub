import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "../../../context/ThemeContext";

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
  const { isDark } = useTheme();

  // Limpiar preview cuando cambia la imagen para evitar fuga de memoria
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className={`shadow-md rounded-xl p-6 my-5 transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900 border-gray-700 text-gray-100' 
        : 'bg-white border-gray-300 text-gray-800'
    }`}>
      <h2 className={`text-xl font-semibold mb-4 ${
        isDark ? 'text-green-400' : 'text-green-600'
      }`}>
        Crear nuevo evento
      </h2>

      <input
        type="number"
        placeholder="ID del evento (opcional)"
        value={idManual}
        onChange={(e) => setIdManual(e.target.value)}
        className={`no-spinner w-full p-2 border rounded mb-2 transition-colors ${
          isDark
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
        }`}
      />

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className={`w-full p-2 border rounded mb-2 transition-colors ${
          isDark
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
        }`}
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className={`w-full h-28 p-2 border rounded mb-2 transition-colors resize-none ${
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
          selected={fechaInicio}
          onChange={(date) => setFechaInicio(date)}
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
          selected={fechaFin}
          onChange={(date) => setFechaFin(date)}
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
            checked={esImportante}
            onChange={(e) => setEsImportante(e.target.checked)}
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
          onChange={(e) => handleImagenChange(e, false)}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
        {preview ? (
          <img src={preview} alt="Preview" className="w-79 h-39 rounded object-cover"/>
        ) : (
          <span className={`text-3xl font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            +
          </span>
        )}
      </div>

      <button
        className={`px-4 py-2 rounded text-white transition font-medium ${
          formularioValido()
            ? isDark
              ? "bg-green-600 hover:bg-green-700"
              : "bg-green-600 hover:bg-green-700"
            : isDark
              ? "bg-gray-600 cursor-not-allowed"
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