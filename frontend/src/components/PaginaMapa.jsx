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
import { useTheme } from "../context/ThemeContext"; // Ajusta la ruta según tu estructura

export default function PaginaMapa() {
  const { isDark } = useTheme(); // Usar el contexto de tema
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

  // Clases condicionales para el modo oscuro
  const sidebarClasses = `fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out shadow-lg ${
    isDark 
      ? 'bg-gray-800 text-gray-100' 
      : 'bg-white text-slate-900'
  } ${sidebarAbierto ? "w-64" : "w-12"}`;

  const toggleButtonClasses = `absolute top-1 left-1 p-2 rounded-full border-2 transition z-50 ${
    isDark 
      ? 'bg-amber-500 hover:bg-amber-400 border-amber-600' 
      : 'bg-amber-400 hover:bg-amber-300 border-amber-500'
  }`;

  const datePickerClasses = `font-medium w-full px-2 py-1 rounded outline-none ${
    isDark 
      ? 'bg-gray-700 text-white' 
      : 'bg-amber-200 text-black'
  }`;

  const eventItemClasses = `p-2 rounded transition-all border cursor-pointer ${
    isDark 
      ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 hover:border-gray-500' 
      : 'bg-slate-200 hover:bg-slate-300 border-transparent hover:border-slate-400'
  }`;

  const mainContentClasses = `ml-0 md:ml-14 h-screen w-full overflow-auto relative z-10 p-4 ${
    isDark ? 'bg-gray-900' : 'bg-white'
  }`;

  const mapContainerClasses = `w-full h-[calc(100vh-8rem)] border rounded-lg p-2 md:p-4 overflow-hidden ${
    isDark 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-slate-100 border-slate-200'
  }`;

  const eventPanelClasses = `fixed top-0 right-0 w-80 h-full border-l shadow-lg z-50 animate-slide-in overflow-y-auto scroll-hide ${
    isDark 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-white border-slate-300'
  }`;

  const closeButtonClasses = `p-2 rounded-full transition-all duration-300 ${
    isDark 
      ? 'text-gray-300 bg-gray-700 hover:bg-gray-600 hover:text-white' 
      : 'text-gray-600 bg-slate-100 hover:bg-slate-200 hover:text-black'
  }`;

  const addToCalendarButtonClasses = `w-full flex items-center justify-center gap-2 font-medium py-2 px-4 rounded-lg transition-colors ${
    isDark 
      ? 'bg-amber-600 hover:bg-amber-500 text-amber-100' 
      : 'bg-amber-400 hover:bg-amber-300 text-amber-900'
  }`;

  const exitButtonClasses = `w-full font-semibold mt-5 py-1 px-0 rounded-lg shadow-lg transition-all ${
    isDark 
      ? 'bg-amber-600 hover:bg-amber-500 border-amber-700 text-amber-100' 
      : 'bg-amber-400 hover:bg-amber-300 border-amber-500 text-amber-900'
  }`;

  return (
    <div className={`relative h-screen overflow-hidden ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-slate-900'}`}>
      {/* Sidebar flotante */}
      <div className={sidebarClasses}>
        <button
          className={toggleButtonClasses}
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
              isDark={isDark}
            />
            {filtroDia === "Seleccionar fecha" && (
              <div className="my-2">
                <DatePicker
                  selected={fechaSeleccionada}
                  onChange={setFechaSeleccionada}
                  className={datePickerClasses}
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
              isDark={isDark}
            />
            <h2 className="text-lg font-bold mb-4 mt-4">Todos los Eventos</h2>
            <ul className="space-y-2 max-h-64 overflow-auto scroll-hide">
              {eventosFiltrados.length > 0 ? (
                eventosFiltrados.map((evento) => (
                  <li
                    key={evento.id_evento}
                    onClick={() => setEventoSeleccionado(evento)}
                    className={eventItemClasses}
                  >
                    <p className="font-semibold break-words whitespace-normal">
                      {evento.nombre}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
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
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  No hay eventos disponibles.
                </p>
              )}
            </ul>
            <div className={`w-full border-b-2 border-dashed mt-5 ${isDark ? 'border-gray-700' : 'border-slate-300'}`}></div>
            <button
              onClick={() => navigate("/inicio")}
              className={exitButtonClasses}
            >
              Salir
            </button>
          </div>
        )}
      </div>
      
      {/* Contenido principal con el mapa */}
      <div className={mainContentClasses}>
        <div className="w-full flex justify-center">
          <h2 className="text-xl font-bold my-4">Mapa Interactivo</h2>
        </div>
        <div className={mapContainerClasses}>
          <MapContainer className="w-full h-full">
            <MapSVGWithPopups 
              svgPath="/src/assets/map.svg"
              popupData={popupData}
            />
            <MapControls 
              className={isDark 
                ? 'mr-5 backdrop-blur-sm text-gray-100' 
                : 'mr-5 backdrop-blur-sm'}
            />
          </MapContainer>
        </div>
      </div>
      
      {/* Panel de información del evento seleccionado */}
      {eventoSeleccionado && (
        <div className={eventPanelClasses}>
          <div className="flex justify-between items-center p-4">
            <h2 className="text-2xl font-bold">{eventoSeleccionado.nombre}</h2>
            <button
              onClick={() => setEventoSeleccionado(null)}
              className={closeButtonClasses}
            >
              <X size={20} />
            </button>
          </div>
          {eventoSeleccionado.imagen_url && (
            <img
              src={eventoSeleccionado.imagen_url}
              alt={`Imagen del evento ${eventoSeleccionado.nombre}`}
              className={`w-full h-48 object-cover mb-4 ${isDark ? 'border-y border-gray-700' : 'border-y border-slate-200'}`}
            />
          )}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Fecha</p>
                <p>
                  {format(
                    parse(eventoSeleccionado.fecha_inicio, "yyyy-MM-dd", new Date()),
                    "PPP",
                    { locale: es }
                  )}
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Horario</p>
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
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Ubicación</p>
                <p>{eventoSeleccionado.ubicacion}</p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Organizador</p>
                <p>{eventoSeleccionado.organizador || "No especificado"}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Descripción</p>
              <p className="mt-1">{eventoSeleccionado.descripcion}</p>
            </div>
            <button
              onClick={() => agregarAlCalendario(eventoSeleccionado)}
              className={addToCalendarButtonClasses}
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