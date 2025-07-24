import React, { useEffect } from "react";
import FormularioCrear from "./FormularioCrear";
import FormularioEditar from "./FormularioEditar";
import FormularioEliminar from "./FormularioEliminar";
import { useEventos } from "./UseEventos";

export default function EventosSettings() {
  const {
    // estados y setters
    idManual, setIdManual,
    titulo, setTitulo,
    descripcion, setDescripcion,
    fechaInicio, setFechaInicio,
    fechaFin, setFechaFin,
    esImportante, setEsImportante,
    imagen, setImagen,
    preview, setPreview,
    editarTitulo, setEditarTitulo,
    editarDescripcion, setEditarDescripcion,
    editarFechaInicio, setEditarFechaInicio,
    editarFechaFin, setEditarFechaFin,
    editarEsImportante, setEditarEsImportante,
    editarImagen, setEditarImagen,
    editarPreview, setEditarPreview,
    eventos, setEventos,
    eventoSeleccionado, setEventoSeleccionado,
    eventoAEliminar, setEventoAEliminar,
    idEditable, setIdEditable,
    modalCrear, setModalCrear,
    modalEditar, setModalEditar,
    modalEliminar, setModalEliminar,
    modalError, setModalError,

    // funciones
    handleImagenChange,
    formularioValido,
    handleCrearEvento,
    handleActualizarEvento,
    handleEliminarEvento,
    cargarEventoEnFormulario,
  } = useEventos();

  // Limpieza de URLs preview y editarPreview para evitar fugas
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
      if (editarPreview && editarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(editarPreview);
      }
    };
  }, [preview, editarPreview]);

  const renderModal = (tipo, onClose) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10">
      <div className="bg-white rounded-xl shadow-xl p-6 border w-96">
        <h3 className="text-xl font-bold text-center text-green-700">Éxito</h3>
        <p className="text-center text-gray-700 mb-4">
          {tipo === "crear" && "El evento ha sido creado correctamente."}
          {tipo === "editar" && "El evento ha sido actualizado correctamente."}
          {tipo === "eliminar" && "El evento ha sido eliminado correctamente."}
          {tipo === "error" && modalError}
        </p>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );

  return (
    <>
      {modalCrear && renderModal("crear", () => setModalCrear(false))}
      {modalEditar && renderModal("editar", () => setModalEditar(false))}
      {modalEliminar && renderModal("eliminar", () => setModalEliminar(false))}
      {modalError && renderModal("error", () => setModalError(""))}

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
        imagen={imagen}
        setImagen={setImagen}
        preview={preview}
        setPreview={setPreview}
        handleImagenChange={handleImagenChange}
        formularioValido={formularioValido}
        handleCrearEvento={handleCrearEvento}
      />

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
        editarImagen={editarImagen}
        setEditarImagen={setEditarImagen}
        editarPreview={editarPreview}
        setEditarPreview={setEditarPreview}
        handleImagenChange={handleImagenChange}
        handleActualizarEvento={handleActualizarEvento}
        cargarEventoEnFormulario={cargarEventoEnFormulario}
      />

      <FormularioEliminar
        eventos={eventos}
        eventoAEliminar={eventoAEliminar}
        setEventoAEliminar={setEventoAEliminar}
        handleEliminarEvento={handleEliminarEvento}
      />
    </>
  );
}
