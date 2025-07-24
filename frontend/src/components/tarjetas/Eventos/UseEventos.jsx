import { useEffect, useState } from "react";

export function useEventos() {
  const [idManual, setIdManual] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [esImportante, setEsImportante] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);

  const [editarTitulo, setEditarTitulo] = useState("");
  const [editarDescripcion, setEditarDescripcion] = useState("");
  const [editarFechaInicio, setEditarFechaInicio] = useState(new Date());
  const [editarFechaFin, setEditarFechaFin] = useState(new Date());
  const [editarEsImportante, setEditarEsImportante] = useState(false);
  const [editarPreview, setEditarPreview] = useState(null);
  const [editarImagen, setEditarImagen] = useState(null);

  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [eventoAEliminar, setEventoAEliminar] = useState("");
  const [idEditable, setIdEditable] = useState("");

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalError, setModalError] = useState("");

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/eventos");
      const data = await res.json();
      setEventos(data);
    } catch (err) {
      console.error("Error al cargar eventos:", err);
    }
  };

  const limpiarFormulario = () => {
    setIdManual("");
    setTitulo("");
    setDescripcion("");
    setFechaInicio(new Date());
    setFechaFin(new Date());
    setEsImportante(false);
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
  };

  const formularioValido = () => {
    return (
      titulo.trim() !== "" &&
      descripcion.trim() !== "" &&
      fechaInicio instanceof Date &&
      fechaFin instanceof Date &&
      !isNaN(fechaInicio.getTime()) &&
      !isNaN(fechaFin.getTime())
    );
  };

  const buildFormData = (id, esEdicion = false) => {
    const inicio = esEdicion ? editarFechaInicio : fechaInicio;
    const fin = esEdicion ? editarFechaFin : fechaFin;

    const pad = (n) => n.toString().padStart(2, "0");

    const fechaInicioISO = `${inicio.getFullYear()}-${pad(inicio.getMonth() + 1)}-${pad(inicio.getDate())}`;
    const horaInicio = `${pad(inicio.getHours())}:${pad(inicio.getMinutes())}:${pad(inicio.getSeconds())}`;

    const fechaFinISO = `${fin.getFullYear()}-${pad(fin.getMonth() + 1)}-${pad(fin.getDate())}`;
    const horaFin = `${pad(fin.getHours())}:${pad(fin.getMinutes())}:${pad(fin.getSeconds())}`;
    
    const formData = new FormData();
    if (id) formData.append("id_evento", id);
    else if (idManual) formData.append("id_evento", idManual);
    if (idEditable && id) formData.append("nuevo_id_evento", idEditable);

    formData.append("nombre", esEdicion ? editarTitulo : titulo);
    formData.append("descripcion", esEdicion ? editarDescripcion : descripcion);
    formData.append("fecha_inicio", fechaInicioISO);
    formData.append("fecha_fin", fechaFinISO);
    formData.append("hora_inicio", horaInicio);
    formData.append("hora_fin", horaFin);

    const importante = esEdicion ? editarEsImportante : esImportante;
    formData.append("es_importante", importante ? 1 : 0);
    formData.append("es_opcional", importante ? 0 : 1);

    const imagenFinal = esEdicion ? editarImagen : imagen;
    if (imagenFinal) formData.append("imagen", imagenFinal);

    return formData;
  };

  const handleCrearEvento = async () => {
    const formData = buildFormData();
    try {
      const res = await fetch("http://localhost:5000/api/eventos", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        fetchEventos();
        limpiarFormulario();
        setModalCrear(true);
      } else {
        setModalError(data.error || "Error al crear el evento");
      }
    } catch (error) {
      console.error("Error:", error);
      setModalError("Error en la petición al crear");
    }
  };

  const handleActualizarEvento = async () => {
    if (!eventoSeleccionado) return;
    const formData = buildFormData(eventoSeleccionado, true);

    try {
      const res = await fetch("http://localhost:5000/api/eventos", {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        fetchEventos();
        limpiarFormulario();
        setModalEditar(true);
      } else {
        setModalError(data.error || "Error al actualizar el evento");
      }
    } catch (error) {
      console.error("Error:", error);
      setModalError("Error en la petición al actualizar");
    }
  };

  const handleEliminarEvento = async () => {
    if (!eventoAEliminar) return;
    try {
      const res = await fetch("http://localhost:5000/api/eventos/borrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_evento: eventoAEliminar }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchEventos();
        setEventoAEliminar("");
        setModalEliminar(true);
      } else {
        setModalError(data.error || "Error al eliminar el evento");
      }
    } catch (error) {
      console.error("Error:", error);
      setModalError("Error en la petición al eliminar");
    }
  };

  const handleImagenChange = (e, esEdicion = false) => {
    const file = e.target.files[0];
    if (file) {
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

  const formato = "yyyy-MM-dd hh:mm a";
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
    const evento = eventos.find((e) => e.id_evento === parseInt(id));
    if (!evento) return;

    setEventoSeleccionado(id);
    setIdEditable("" + evento.id_evento);
    setEditarTitulo(evento.nombre);
    setEditarDescripcion(evento.descripcion);

    const horaInicio24 = convertirHoraA24Horas(evento.hora_inicio);
    const horaFin24 = convertirHoraA24Horas(evento.hora_fin);

    const fechaHoraInicioString = `${evento.fecha_inicio}T${horaInicio24}`;
    const fechaHoraFinString = `${evento.fecha_fin}T${horaFin24}`;

    setEditarFechaInicio(new Date(fechaHoraInicioString));
    setEditarFechaFin(new Date(fechaHoraFinString));

    setEditarEsImportante(evento.es_importante === 1);
    setEditarPreview(evento.imagen_url);
    setEditarImagen(null);
  };

  return {
    // Estados y setters
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

    // Funciones
    handleImagenChange,
    formularioValido,
    handleCrearEvento,
    handleActualizarEvento,
    handleEliminarEvento,
    cargarEventoEnFormulario,
  };
}
