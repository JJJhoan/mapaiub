// src/pages/EventosSettings.jsx
import React, { useEffect } from "react";
import FormularioCrear from "./FormularioCrear";
import FormularioEditar from "./FormularioEditar";
import FormularioEliminar from "./FormularioEliminar";
import { useEventos } from "./UseEventos"; // Asegúrate de la ruta correcta a tu hook
import { useTheme } from "../../../context/ThemeContext"; // Ajusta la ruta según tu estructura

export default function EventosSettings() {
  const { isDark } = useTheme();

  const {
    // Estados del formulario de creación
    idManual, setIdManual,
    titulo, setTitulo,
    descripcion, setDescripcion,
    fechaInicio, setFechaInicio,
    fechaFin, setFechaFin,
    esImportante, setEsImportante,
    // --- NUEVO: Estados para ubicacion en creación ---
    ubicacion, setUbicacion,
    // -----------------------------------------------
    imagen, setImagen,
    preview, setPreview,

    // Estados del formulario de edición
    editarTitulo, setEditarTitulo,
    editarDescripcion, setEditarDescripcion,
    editarFechaInicio, setEditarFechaInicio,
    editarFechaFin, setEditarFechaFin,
    editarEsImportante, setEditarEsImportante,
    // --- NUEVO: Estados para ubicacion en edición ---
    editarUbicacion, setEditarUbicacion,
    // -----------------------------------------------
    editarImagen, setEditarImagen,
    editarPreview, setEditarPreview,

    // Estados generales
    eventos, setEventos,
    eventoSeleccionado, setEventoSeleccionado,
    eventoAEliminar, setEventoAEliminar,
    idEditable, setIdEditable,
    modalCrear, setModalCrear,
    modalEditar, setModalEditar,
    modalEliminar, setModalEliminar,
    modalError, setModalError,
    isLoading, // Si `useEventos` lo proporciona, se usará para el indicador de carga

    // Funciones
    handleImagenChange,
    formularioValido,
    handleCrearEvento,
    handleActualizarEvento,
    handleEliminarEvento,
    cargarEventoEnFormulario,
    limpiarFormulario // Asumo que existe en useEventos
  } = useEventos();

  // Limpieza de URLs preview y editarPreview para evitar fugas
  // (Asegúrate de que preview y editarPreview estén en la lista de dependencias si se usan)
  useEffect(() => {
    return () => {
      // Si `useEventos` expone preview y editarPreview, descomenta:
      // if (preview && preview.startsWith("blob:")) {
      //   URL.revokeObjectURL(preview);
      // }
      // if (editarPreview && editarPreview.startsWith("blob:")) {
      //   URL.revokeObjectURL(editarPreview);
      // }
    };
  }, []); // Añade preview y editarPreview si se desestructuran arriba

  // Funciones para cerrar modales
  const cerrarModalCrear = () => setModalCrear(false);
  const cerrarModalEditar = () => setModalEditar(false);
  const cerrarModalEliminar = () => setModalEliminar(false);
  const cerrarModalError = () => setModalError("");

  return (
    <div className="p-4 relative min-h-screen">
      
      {/* --- Indicador de carga global (si isLoading está disponible) --- */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-xl`}>
            <p>Procesando...</p>
          </div>
        </div>
      )}
      {/* ------------------------------------------------------------------ */}

      {/* --- Modales de Retroalimentación --- */}
      {modalCrear && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10">
          <div className={`rounded-xl shadow-xl p-6 border w-96 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h3 className="text-xl font-bold text-center text-green-600">Éxito</h3>
            <p className="text-center mb-4">El evento ha sido creado correctamente.</p>
            <button
              className={`px-4 py-2 rounded w-full font-medium ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
              onClick={cerrarModalCrear}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {modalEditar && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10">
          <div className={`rounded-xl shadow-xl p-6 border w-96 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h3 className="text-xl font-bold text-center text-green-600">Éxito</h3>
            <p className="text-center mb-4">El evento ha sido actualizado correctamente.</p>
            <button
              className={`px-4 py-2 rounded w-full font-medium ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
              onClick={cerrarModalEditar}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {modalEliminar && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10">
          <div className={`rounded-xl shadow-xl p-6 border w-96 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h3 className="text-xl font-bold text-center text-green-600">Éxito</h3>
            <p className="text-center mb-4">El evento ha sido eliminado correctamente.</p>
            <button
              className={`px-4 py-2 rounded w-full font-medium ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
              onClick={cerrarModalEliminar}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {modalError && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10">
          <div className={`rounded-xl shadow-xl p-6 border w-96 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h3 className="text-xl font-bold text-center text-red-600">Error</h3>
            <p className="text-center mb-4">{modalError}</p>
            <button
              className={`px-4 py-2 rounded w-full font-medium ${isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
              onClick={cerrarModalError}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {/* ----------------------------------- */}

      <div className="max-w-4xl mx-auto">
        <h1 className={`text-2xl font-bold mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          Gestión de Eventos
        </h1>

        {/* --- MODIFICADO: Pasar ubicacion y setUbicacion a FormularioCrear --- */}
        <FormularioCrear
          idManual={idManual}
          setIdManual={setIdManual}
          titulo={titulo}
          setTitulo={setTitulo}
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          fechaInicio={fechaInicio}
          setFechaInicio={setFechaInicio}
          fechaFin={fechaFin}
          setFechaFin={setFechaFin}
          esImportante={esImportante}
          setEsImportante={setEsImportante}
          // --- NUEVO: Pasar ubicacion ---
          ubicacion={ubicacion}
          setUbicacion={setUbicacion}
          // -----------------------------
          imagen={imagen}
          setImagen={setImagen}
          preview={preview}
          setPreview={setPreview}
          handleImagenChange={handleImagenChange}
          formularioValido={formularioValido}
          handleCrearEvento={handleCrearEvento}
        />
        {/* ------------------------------------------------------------------- */}

        <div className="my-8 border-t border-gray-300 dark:border-gray-700"></div>

        {/* --- MODIFICADO: Pasar editarUbicacion y setEditarUbicacion a FormularioEditar --- */}
        <FormularioEditar
          eventos={eventos}
          eventoSeleccionado={eventoSeleccionado}
          setEventoSeleccionado={setEventoSeleccionado}
          idEditable={idEditable}
          setIdEditable={setIdEditable}
          editarTitulo={editarTitulo}
          setEditarTitulo={setEditarTitulo}
          editarDescripcion={editarDescripcion}
          setEditarDescripcion={setEditarDescripcion}
          editarFechaInicio={editarFechaInicio}
          setEditarFechaInicio={setEditarFechaInicio}
          editarFechaFin={editarFechaFin}
          setEditarFechaFin={setEditarFechaFin}
          editarEsImportante={editarEsImportante}
          setEditarEsImportante={setEditarEsImportante}
          // --- NUEVO: Pasar editarUbicacion ---
          editarUbicacion={editarUbicacion}
          setEditarUbicacion={setEditarUbicacion}
          // -----------------------------------
          editarImagen={editarImagen}
          setEditarImagen={setEditarImagen}
          editarPreview={editarPreview}
          setEditarPreview={setEditarPreview}
          handleImagenChange={handleImagenChange}
          handleActualizarEvento={handleActualizarEvento}
          cargarEventoEnFormulario={cargarEventoEnFormulario}
        />
        {/* -------------------------------------------------------------------------------- */}

        <div className="my-8 border-t border-gray-300 dark:border-gray-700"></div>

        <FormularioEliminar
          eventos={eventos}
          eventoAEliminar={eventoAEliminar}
          setEventoAEliminar={setEventoAEliminar}
          handleEliminarEvento={handleEliminarEvento}
        />
      </div>
    </div>
  );
}