// src/hooks/useEventos.js
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
// --- Definir la URL base de la API ---
const API_BASE_URL = 'http://localhost:5000/api';
// -------------------------------------
export function useEventos() {
  const [idManual, setIdManual] = useState(""); // Puede ser usado si se requiere en el futuro, pero no para creación con AI
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [esImportante, setEsImportante] = useState(false);
  // --- NUEVO: Estados para ubicacion en creación ---
  const [ubicacion, setUbicacion] = useState(""); // Para creación
  // ------------------------------------------------
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editarTitulo, setEditarTitulo] = useState("");
  const [editarDescripcion, setEditarDescripcion] = useState("");
  const [editarFechaInicio, setEditarFechaInicio] = useState(new Date());
  const [editarFechaFin, setEditarFechaFin] = useState(new Date());
  const [editarEsImportante, setEditarEsImportante] = useState(false);
  // --- NUEVO: Estado para ubicacion en edición ---
  const [editarUbicacion, setEditarUbicacion] = useState(""); // Para edición
  // -----------------------------------------------
  const [editarPreview, setEditarPreview] = useState(null);
  const [editarImagen, setEditarImagen] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [eventoAEliminar, setEventoAEliminar] = useState("");
  const [idEditable, setIdEditable] = useState(""); // Para cambiar el ID en edición
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalError, setModalError] = useState("");
  // Estados para manejo de UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/eventos`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setEventos(data);
    } catch (err) {
      console.error("Error al cargar eventos:", err);
      setError(`Error al cargar eventos: ${err.message}`);
    }
  };

  const limpiarFormulario = () => {
    setIdManual("");
    setTitulo("");
    setDescripcion("");
    setFechaInicio(new Date());
    setFechaFin(new Date());
    setEsImportante(false);
    // --- NUEVO: Limpiar ubicacion ---
    setUbicacion("");
    setEditarUbicacion("");
    // -------------------------------
    setImagen(null);
    setPreview(null);
    setEventoSeleccionado(null);
    setIdEditable("");
    setEditarTitulo("");
    setEditarDescripcion("");
    setEditarFechaInicio(new Date());
    setEditarFechaFin(new Date());
    setEditarEsImportante(false);
    setEditarImagen(null);
    setEditarPreview(null);
    setError('');
  };

  const formularioValido = () => {
    return (
      titulo.trim() !== "" &&
      descripcion.trim() !== "" &&
      fechaInicio instanceof Date &&
      fechaFin instanceof Date &&
      !isNaN(fechaInicio.getTime()) &&
      !isNaN(fechaFin.getTime()) &&
      fechaFin >= fechaInicio
    );
  };

  // --- SIMPLIFICADO: buildFormData solo para actualizaciones (PUT) ---
  const buildFormDataForUpdate = (id) => {
    const inicio = editarFechaInicio;
    const fin = editarFechaFin;
    const fechaInicioISO = format(inicio, 'yyyy-MM-dd');
    const fechaFinISO = format(fin, 'yyyy-MM-dd');
    // Formato de hora para PUT (backend espera hh:mm AM/PM)
    const hora_inicio = format(inicio, 'hh:mm a', { locale: es });
    const hora_fin = format(fin, 'hh:mm a', { locale: es });
    const formData = new FormData();
    formData.append("id_evento", id); // ID del evento a actualizar
    if (idEditable && idEditable !== id.toString()) {
        formData.append("nuevo_id_evento", idEditable); // Para cambiar el ID del evento
    }
    formData.append("nombre", editarTitulo);
    formData.append("descripcion", editarDescripcion);
    formData.append("fecha_inicio", fechaInicioISO);
    formData.append("fecha_fin", fechaFinISO);
    formData.append("hora_inicio", hora_inicio);
    formData.append("hora_fin", hora_fin);
    const importante = editarEsImportante;
    formData.append("es_importante", importante ? '1' : '0');
    // --- NUEVO: Añadir ubicacion en actualización ---
    formData.append("ubicacion", editarUbicacion);
    // -----------------------------------------------
    const imagenFinal = editarImagen;
    if (imagenFinal) formData.append("imagen", imagenFinal);
    return formData;
  };
  // -------------------------------------------------------------------

  // --- CORREGIDO: handleCrearEvento ---
  const handleCrearEvento = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formularioValido()) {
      const errorMsg = "Por favor, complete todos los campos requeridos y asegúrese de que las fechas sean válidas.";
      console.error('Formulario inválido:', errorMsg);
      setError(errorMsg);
      // Considera usar un toast o modal en lugar de alert
      alert(errorMsg); 
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const formData = new FormData();
      // NO se envía idManual para creación si id_evento es AUTO_INCREMENT
      formData.append('nombre', titulo);
      formData.append('descripcion', descripcion);
      const formattedFechaInicio = format(fechaInicio, 'yyyy-MM-dd');
      const formattedFechaFin = format(fechaFin, 'yyyy-MM-dd');
      formData.append('fecha_inicio', formattedFechaInicio);
      formData.append('fecha_fin', formattedFechaFin);
      // Formato de hora para POST (backend espera hh:mm AM/PM)
      const formattedHoraInicio = format(fechaInicio, 'hh:mm a', { locale: es });
      const formattedHoraFin = format(fechaFin, 'hh:mm a', { locale: es });
      formData.append('hora_inicio', formattedHoraInicio);
      formData.append('hora_fin', formattedHoraFin);
      // Enviar es_importante como string '0' o '1'
      formData.append('es_importante', esImportante ? '1' : '0');
      // --- NUEVO: Añadir ubicacion en creación ---
      if (ubicacion.trim() !== "") {
        formData.append('ubicacion', ubicacion.trim());
      }
      // ------------------------------------------
      if (imagen) {
        // Validaciones básicas antes de enviar
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const maxSize = 4 * 1024 * 1024; // 4MB en bytes
        if (!validTypes.includes(imagen.type)) {
          throw new Error('Solo se permiten imágenes JPG o PNG.');
        }
        if (imagen.size > maxSize) {
            throw new Error('La imagen no puede superar los 4MB.');
        }
        formData.append('imagen', imagen);
      }
      console.log("Enviando FormData para crear:", [...formData.entries()]);
      const response = await fetch(`${API_BASE_URL}/eventos`, {
        method: 'POST',
        body: formData,
        // NO establecer Content-Type manualmente
      });
      console.log("Respuesta recibida (crear):", response);
      if (!response.ok) {
        let errorMsg = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch (e) {
          console.warn("No se pudo parsear el JSON de error:", e);
        }
        throw new Error(errorMsg);
      }
      const data = await response.json();
      console.log('Evento creado exitosamente:', data);
      // Usar mensaje del backend si existe
      const mensajeExito = data.mensaje || 'Evento creado correctamente';
      alert(mensajeExito); // Considera usar un toast o modal
      limpiarFormulario();
      await fetchEventos();
    } catch (error) {
      console.error('Error al crear evento:', error);
      const userErrorMsg = `Error al crear evento: ${error.message}`;
      setError(userErrorMsg);
      alert(userErrorMsg); // Considera usar un toast o modal
    } finally {
      setIsLoading(false);
    }
  };
  // -------------------------------------------------------------------------

  const handleActualizarEvento = async () => {
    if (!eventoSeleccionado) {
        const errorMsg = "No hay evento seleccionado para actualizar.";
        console.error(errorMsg);
        setError(errorMsg);
        return;
    }
    try {
        setIsLoading(true);
        setError('');
        const formData = buildFormDataForUpdate(eventoSeleccionado);
        const res = await fetch(`${API_BASE_URL}/eventos`, {
            method: "PUT",
            body: formData,
        });
        if (!res.ok) {
            let errorMsg = `Error ${res.status}: ${res.statusText}`;
            try {
                const errorData = await res.json();
                errorMsg = errorData.error || errorMsg;
            } catch (e) {
                console.warn("No se pudo parsear el JSON de error en actualización:", e);
            }
            throw new Error(errorMsg);
        }
        const data = await res.json();
        console.log('Evento actualizado:', data);
        await fetchEventos();
        limpiarFormulario();
        setModalEditar(true);
    } catch (error) {
        console.error("Error al actualizar:", error);
        const userErrorMsg = error.message || "Error en la petición al actualizar";
        setError(userErrorMsg);
        setModalError(userErrorMsg);
    } finally {
        setIsLoading(false);
    }
  };

  const handleEliminarEvento = async () => {
    if (!eventoAEliminar) {
        const errorMsg = "No se ha especificado un evento para eliminar.";
        console.error(errorMsg);
        setError(errorMsg);
        return;
    }
    try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`${API_BASE_URL}/eventos/borrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_evento: eventoAEliminar }),
        });
        if (!res.ok) {
            let errorMsg = `Error ${res.status}: ${res.statusText}`;
            try {
                const errorData = await res.json();
                errorMsg = errorData.error || errorMsg;
            } catch (e) {
                console.warn("No se pudo parsear el JSON de error en eliminación:", e);
            }
            throw new Error(errorMsg);
        }
        const data = await res.json();
        console.log('Evento eliminado:', data);
        await fetchEventos();
        setEventoAEliminar("");
        setModalEliminar(true);
    } catch (error) {
        console.error("Error al eliminar:", error);
        const userErrorMsg = error.message || "Error en la petición al eliminar";
        setError(userErrorMsg);
        setModalError(userErrorMsg);
    } finally {
        setIsLoading(false);
    }
  };

  const handleImagenChange = (e, esEdicion = false) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 4 * 1024 * 1024; // 4MB
      if (!validTypes.includes(file.type)) {
        alert('Solo se permiten imágenes JPG o PNG.');
        return;
      }
      if (file.size > maxSize) {
        alert('La imagen no puede superar los 4MB.');
        return;
      }
      const url = URL.createObjectURL(file);
      if (esEdicion) {
        if (editarPreview) URL.revokeObjectURL(editarPreview);
        setEditarImagen(file);
        setEditarPreview(url);
      } else {
        if (preview) URL.revokeObjectURL(preview);
        setImagen(file);
        setPreview(url);
      }
    }
  };

  function convertirHoraA24Horas(hora12) {
    const [horaMin, meridiano] = hora12.toLowerCase().split(/(am|pm)/);
    let [horas, minutos] = horaMin.split(":").map(Number);
    if (meridiano === "pm" && horas !== 12) {
      horas += 12;
    } else if (meridiano === "am" && horas === 12) {
      horas = 0;
    }
    const horasStr = horas.toString().padStart(2, "0");
    const minutosStr = minutos.toString().padStart(2, "0");
    return `${horasStr}:${minutosStr}`;
  }

  const cargarEventoEnFormulario = (id) => {
    const evento = eventos.find((e) => e.id_evento === parseInt(id, 10));
    if (!evento) return;
    setEventoSeleccionado(id);
    setIdEditable(evento.id_evento.toString()); // Cargar ID correcto
    setEditarTitulo(evento.nombre);
    setEditarDescripcion(evento.descripcion);
    // Convertir horas del formato del backend (hh:mm AM/PM) a objeto Date
    try {
        // Parsear fecha y hora de inicio
        const fechaInicioStr = `${evento.fecha_inicio} ${evento.hora_inicio}`;
        const fechaInicioDate = parse(fechaInicioStr, "yyyy-MM-dd hh:mm a", new Date());
        setEditarFechaInicio(fechaInicioDate);
        // Parsear fecha y hora de fin
        const fechaFinStr = `${evento.fecha_fin} ${evento.hora_fin}`;
        const fechaFinDate = parse(fechaFinStr, "yyyy-MM-dd hh:mm a", new Date());
        setEditarFechaFin(fechaFinDate);
    } catch (err) {
        console.error("Error al parsear fechas del evento:", err);
        // Fallback si el parseo falla
        setEditarFechaInicio(new Date());
        setEditarFechaFin(new Date());
    }
    setEditarEsImportante(evento.es_importante === 1);
    // --- NUEVO: Cargar ubicacion en edición ---
    setEditarUbicacion(evento.ubicacion || "");
    // -----------------------------------------
    setEditarPreview(evento.imagen_url || null);
    setEditarImagen(null); // Limpiar imagen seleccionada para edición
  };

  return {
    // Estados y setters
    idManual, setIdManual,
    titulo, setTitulo,
    descripcion, setDescripcion,
    fechaInicio, setFechaInicio,
    fechaFin, setFechaFin,
    esImportante, setEsImportante,
    // --- NUEVO: Estados y setters para ubicacion ---
    ubicacion, setUbicacion,
    editarUbicacion, setEditarUbicacion,
    // ---------------------------------------------
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
    // Estados adicionales
    isLoading, error, setError,
    // Funciones
    handleImagenChange,
    formularioValido,
    handleCrearEvento,
    handleActualizarEvento,
    handleEliminarEvento,
    cargarEventoEnFormulario,
    fetchEventos,
    limpiarFormulario
  };
}