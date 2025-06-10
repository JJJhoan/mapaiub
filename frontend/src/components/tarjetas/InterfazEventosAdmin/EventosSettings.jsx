import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventosSettings = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [esImportante, setEsImportante] = useState(false);
  const [visibleEnMapa, setVisibleEnMapa] = useState(false);
  const [imagen, setImagen] = useState(null);

  const [eventos, setEventos] = useState([
    { id: 1, titulo: "Reunión de bienvenida" },
    { id: 2, titulo: "Taller de React" },
  ]);
  const [eventoAEliminar, setEventoAEliminar] = useState("");

  const handleCrearEvento = () => {
    const nuevoEvento = {
      id: eventos.length + 1,
      titulo,
      descripcion,
      fecha,
      importante: esImportante,
      visibleEnMapa,
      imagen, // en un futuro, se puede subir a un servidor o base64
    };

    setEventos([...eventos, nuevoEvento]);
    console.log("Evento creado:", nuevoEvento);

    // Limpiar campos
    setTitulo("");
    setDescripcion("");
    setFecha(new Date());
    setEsImportante(false);
    setVisibleEnMapa(false);
    setImagen(null);
  };

  const handleEliminarEvento = () => {
    const eventosFiltrados = eventos.filter((e) => e.id !== parseInt(eventoAEliminar));
    setEventos(eventosFiltrados);
    setEventoAEliminar("");
    console.log("Evento eliminado:", eventoAEliminar);
  };

  const handleImagenChange = (e) => {
    const archivo = e.target.files[0];
    setImagen(archivo);
  };

  return (
    <div className="p-4 space-y-8">
      {/* Crear evento */}
      <div className="bg-white shadow-md rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-4">Crear nuevo evento</h2>
        <input
          className="w-full p-2 border rounded mb-2"
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <div className="mb-2">
          <DatePicker
            selected={fecha}
            onChange={(date) => setFecha(date)}
            showTimeSelect
            dateFormat="Pp"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={esImportante}
              onChange={(e) => setEsImportante(e.target.checked)}
            />
            Importante
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={visibleEnMapa}
              onChange={(e) => setVisibleEnMapa(e.target.checked)}
            />
            Mostrar en el mapa
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Imagen del evento (opcional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            className="w-full"
          />
          {imagen && (
            <p className="text-sm text-gray-600 mt-1">
              Imagen seleccionada: {imagen.name}
            </p>
          )}
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={handleCrearEvento}
        >
          Crear evento
        </button>
      </div>

      {/* Eliminar evento */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-red-400">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Eliminar un evento</h2>
        <select
          className="w-full p-2 border rounded mb-4"
          value={eventoAEliminar}
          onChange={(e) => setEventoAEliminar(e.target.value)}
        >
          <option value="">Selecciona un evento</option>
          {eventos.map((evento) => (
            <option key={evento.id} value={evento.id}>
              {evento.titulo}
            </option>
          ))}
        </select>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          onClick={handleEliminarEvento}
          disabled={!eventoAEliminar}
        >
          Eliminar evento
        </button>
      </div>
    </div>
  );
};

export default EventosSettings;
