import React, { useState, useEffect } from "react";
import { CaretLeft, CaretRight, CalendarPlus, X } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropdownFiltro from "./DropdownFiltro";
import { filtrarEventos } from "./utils/filtrarEventos";
import { parse, format, setHours, setMinutes } from "date-fns";
import { es } from "date-fns/locale";
import { MapContainer, MapControls, MapSVGWithPopups } from "./map";

export default function PaginaMapa() {
  // Estados principales
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [mostrarContenido, setMostrarContenido] = useState(true);
  const [eventos, setEventos] = useState([]);
  const [filtroDia, setFiltroDia] = useState("Hoy");
  const [filtroHora, setFiltroHora] = useState("Cualquier hora");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const navigate = useNavigate();

  // Opciones para los filtros
  const opcionesDia = ["Hoy", "Mañana", "Esta semana", "Este mes", "Seleccionar fecha"];
  const horas = [
    "Cualquier hora",
    ...Array.from({ length: 24 }, (_, i) => {
      const hora = setMinutes(setHours(new Date(), i), 0);
      return format(hora, "hh:mm a");
    }),
  ];

  // Datos para los popups en el SVG
  const popupData = [
    {
      elementId: 'sala-101',
      title: 'Sala de Conferencias 101',
      description: 'Capacidad: 50 personas. Equipamiento: Proyector, pantalla, WiFi.',
      image: '/img/salas/sala-101.jpg',
      eventos: []
    },
    {
      elementId: 'laboratorio-3',
      title: 'Laboratorio de Computación 3',
      description: '20 computadoras con software especializado. Acceso con credencial.',
      image: '/img/laboratorios/lab-3.jpg',
      eventos: []
    }
    // Agrega más ubicaciones según necesites
  ];

  // Cargar eventos desde la API
  useEffect(() => {
    fetch("http://localhost:5000/api/eventos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEventos(data);
          // Asignar eventos a sus ubicaciones
          popupData.forEach(location => {
            location.eventos = data.filter(e => e.ubicacion === location.elementId);
          });
        } else {
          console.error("Respuesta inesperada:", data);
        }
      })
      .catch((err) => console.error("Error al obtener eventos:", err));
  }, []);

  // Animación del sidebar
  useEffect(() => {
    let timeout;
    if (sidebarAbierto) {
      timeout = setTimeout(() => setMostrarContenido(true), 150);
    } else {
      setMostrarContenido(false);
    }
    return () => clearTimeout(timeout);
  }, [sidebarAbierto]);

  // Filtrar eventos según los criterios seleccionados
  const eventosFiltrados = filtrarEventos({
    eventos,
    filtroDia,
    filtroHora,
    fechaSeleccionada,
  });

  // Actualizar eventos en los popups cuando cambian los filtros
  useEffect(() => {
    popupData.forEach(location => {
      location.eventos = eventosFiltrados.filter(e => e.ubicacion === location.elementId);
    });
  }, [eventosFiltrados]);

  // Agregar evento al calendario
  const agregarAlCalendario = (evento) => {
    console.log("Evento agregado al calendario:", evento);
    // Implementar lógica real aquí
  };

  return (
    <div className="relative h-screen overflow-hidden bg-white text-slate-900">
      {/* Sidebar flotante */}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-40 transition-all duration-300 ease-in-out shadow-lg ${
          sidebarAbierto ? "w-64" : "w-12"
        }`}
      >
        <button
          className="absolute top-1 left-1 p-2 rounded-full bg-amber-400 hover:bg-amber-300 border-2 border-amber-500 transition z-50"
          onClick={() => setSidebarAbierto(!sidebarAbierto)}
        >
          {sidebarAbierto ? (
            <CaretLeft size={20} className="" />
          ) : (
            <CaretRight size={20} />
          )}
        </button>

        {mostrarContenido && (
          <div className="mt-12 px-4 animate-fade-in overflow-auto h-full scroll-hide">
            <DropdownFiltro
              label="Día"
              opciones={opcionesDia}
              selected={filtroDia}
              setSelected={setFiltroDia}
            />

            {filtroDia === "Seleccionar fecha" && (
              <div className="my-2">
                <DatePicker
                  selected={fechaSeleccionada}
                  onChange={setFechaSeleccionada}
                  className="text-black font-medium bg-amber-200 w-full px-2 py-1 rounded outline-none"
                  placeholderText="Elige una fecha"
                  dateFormat="yyyy-MM-dd"
                  withPortal
                />
              </div>
            )}

            <DropdownFiltro
              label="Hora"
              opciones={horas}
              selected={filtroHora}
              setSelected={setFiltroHora}
            />

            <h2 className="text-lg font-bold mb-4 mt-4">Todos los Eventos</h2>
            <ul className="space-y-2 max-h-64 overflow-auto scroll-hide">
              {eventosFiltrados.length > 0 ? (
                eventosFiltrados.map((evento) => (
                  <li
                    key={evento.id_evento}
                    onClick={() => setEventoSeleccionado(evento)}
                    className="bg-slate-200 p-2 rounded hover:bg-slate-300 transition-all border border-transparent hover:border-slate-400 cursor-pointer"
                  >
                    <p className="font-semibold break-words whitespace-normal">
                      {evento.nombre}
                    </p>
                    <p className="text-xs text-gray-600">
                      {format(
                        parse(evento.fecha_inicio, "yyyy-MM-dd", new Date()),
                        "d 'de' MMMM yyyy",
                        { locale: es }
                      )}
                      <br />
                      de{" "}
                      {format(
                        parse(evento.hora_inicio, "HH:mm:ss", new Date()),
                        "hh:mm a",
                        { locale: es }
                      )}{" "}
                      a{" "}
                      {format(
                        parse(evento.hora_fin, "HH:mm:ss", new Date()),
                        "hh:mm a",
                        { locale: es }
                      )}
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-600">
                  No hay eventos disponibles.
                </p>
              )}
            </ul>

            <div className="w-full border-b-2 border-dashed border-slate-300 mt-5"></div>

            <button
              onClick={() => navigate("/inicio")}
              className="w-full bg-amber-400 hover:bg-amber-300 text-md font-semibold mt-5 border-amber-500 border-3 py-1 px-0 rounded-lg shadow-lg transition-all"
            >
              Salir
            </button>
          </div>
        )}
      </div>

      {/* Contenido principal con el mapa */}
      <div className="ml-0 md:ml-14 h-screen w-full overflow-auto relative z-10 p-4">
        <h2 className="text-xl font-bold my-4">Mapa Interactivo</h2>
        <div className="w-full h-[calc(100vh-8rem)] border border-slate-200 rounded-lg bg-slate-100 p-2 md:p-4 overflow-hidden">
          <MapContainer className="w-full h-full">
            <MapSVGWithPopups 
              svgPath="/src/assets/map.svg"
              popupData={popupData}
            />
            <MapControls className="bg-white/80 backdrop-blur-sm" />
          </MapContainer>
        </div>
      </div>

      {/* Panel de información del evento seleccionado */}
      {eventoSeleccionado && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white border-l border-slate-300 shadow-lg z-50 animate-slide-in overflow-y-auto scroll-hide">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-2xl font-bold">{eventoSeleccionado.nombre}</h2>
            <button
              onClick={() => setEventoSeleccionado(null)}
              className="text-gray-600 bg-slate-100 hover:bg-slate-200 hover:text-black p-2 rounded-full transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>
          
          {eventoSeleccionado.imagen_url && (
            <img
              src={eventoSeleccionado.imagen_url}
              alt={`Imagen del evento ${eventoSeleccionado.nombre}`}
              className="w-full h-48 object-cover mb-4 border-y border-slate-200"
            />
          )}
          
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Fecha</p>
                <p>
                  {format(
                    parse(eventoSeleccionado.fecha_inicio, "yyyy-MM-dd", new Date()),
                    "PPP",
                    { locale: es }
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Horario</p>
                <p>
                  {format(
                    parse(eventoSeleccionado.hora_inicio, "HH:mm:ss", new Date()),
                    "hh:mm a"
                  )}{" "}
                  -{" "}
                  {format(
                    parse(eventoSeleccionado.hora_fin, "HH:mm:ss", new Date()),
                    "hh:mm a"
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ubicación</p>
                <p>{eventoSeleccionado.ubicacion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Organizador</p>
                <p>{eventoSeleccionado.organizador || "No especificado"}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Descripción</p>
              <p className="mt-1">{eventoSeleccionado.descripcion}</p>
            </div>

            <button
              onClick={() => agregarAlCalendario(eventoSeleccionado)}
              className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <CalendarPlus size={20} />
              Agregar a mi calendario
            </button>
          </div>
        </div>
      )}
    </div>
  );
}