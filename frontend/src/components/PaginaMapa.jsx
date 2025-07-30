// src/pages/PaginaMapa.jsx
import React, { useState, useEffect, useRef } from "react";
import { CaretLeft, CaretRight, CalendarPlus, X } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropdownFiltro from "../components/DropdownFiltro";
import { filtrarEventos } from "./utils/filtrarEventos";
import { parse, format, setHours, setMinutes } from "date-fns";
import { es } from "date-fns/locale";
import MapContainer from "../components/map/MapContainer";
import { useTheme } from "../context/ThemeContext";

export default function PaginaMapa() {
  const { isDark } = useTheme();
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [mostrarContenido, setMostrarContenido] = useState(true);
  const [eventos, setEventos] = useState([]);
  const [filtroDia, setFiltroDia] = useState("Hoy");
  const [filtroHora, setFiltroHora] = useState("Cualquier hora");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [pisoActual, setPisoActual] = useState(1); 
  const navigate = useNavigate();
  
  // Detectar si es móvil para el comportamiento del sidebar
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // Referencia para MapContainer
  const mapContainerRef = useRef();

  // Efecto para detectar cambios en el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const opcionesDia = ["Hoy", "Mañana", "Esta semana", "Este mes", "Seleccionar fecha"];
  const horas = [
    "Cualquier hora",
    ...Array.from({ length: 24 }, (_, i) => {
      const hora = setMinutes(setHours(new Date(), i), 0);
      return format(hora, "hh:mm a");
    }),
  ];

  // Datos para los popups en el SVG - Actualizados
  const popupData = [
    // --- Piso 1 ---
    {
      elementId: 'salon_1',
      title: 'Salón 1',
      description: 'Aula equipada con tecnología moderna para clases presenciales.',
      image: null,
      detalles: [
        { nombre: 'Sillas', valor: '29' },
        { nombre: 'Videobeam', valor: 'Sí' },
        { nombre: 'PCs funcionales', valor: '28' }
      ],
      eventos: []
    },
    {
      elementId: 'biblioteca',
      title: 'Biblioteca',
      description: 'Espacio de estudio y consulta con amplia colección de libros y recursos digitales.',
      image: null,
      horario: '8:00 AM - 8:00 PM',
      eventos: []
    },
    {
      elementId: 'bienestar',
      title: 'Bienestar Universitario',
      description: 'Departamento encargado del cuidado integral de la comunidad universitaria.',
      image: null,
      detalles: [
        { nombre: 'Servicios', valor: 'Médico, Psicológico, Recreativo' },
        { nombre: 'Ubicación', valor: 'Primer piso, ala este' }
      ],
      eventos: []
    },
    // --- NUEVO: Auditorio Principal ---
    {
      elementId: 'auditorio_principal',
      title: 'Auditorio Principal',
      description: 'Espacio principal para conferencias y eventos de gran aforo.',
      image: null,
      detalles: [
        { nombre: 'Capacidad', valor: '105 personas' },
        { nombre: 'Equipamiento', valor: 'Sistema de sonido, Proyector 4K, Escenario' }
      ],
      eventos: []
    },
    // --- Piso 2 ---
    {
      elementId: 'salon_062',
      title: 'Salón 062',
      description: 'Aula estándar para clases y talleres.',
      image: null,
      eventos: []
    },
    {
      elementId: 'cafeteria_p2',
      title: 'Cafetería Piso 2',
      description: 'Zona de descanso con bebidas y snacks.',
      image: null,
      eventos: []
    },
    {
      elementId: 'oficina_rrhh',
      title: 'Oficina de RRHH',
      description: 'Departamento de Recursos Humanos.',
      image: null,
      eventos: []
    }
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/eventos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEventos(data);
          popupData.forEach(location => {
            location.eventos = data.filter(e => e.ubicacion === location.elementId);
          });
        } else {
          console.error("Respuesta inesperada:", data);
        }
      })
      .catch((err) => console.error("Error al obtener eventos:", err));
  }, []);

  useEffect(() => {
    let timeout;
    if (sidebarAbierto) {
      timeout = setTimeout(() => setMostrarContenido(true), 150);
    } else {
      setMostrarContenido(false);
    }
    return () => clearTimeout(timeout);
  }, [sidebarAbierto]);

  const eventosFiltrados = filtrarEventos({
    eventos,
    filtroDia,
    filtroHora,
    fechaSeleccionada,
  });

  useEffect(() => {
    popupData.forEach(location => {
      location.eventos = eventosFiltrados.filter(e => e.ubicacion === location.elementId);
    });
  }, [eventosFiltrados]);

  const agregarAlCalendario = (evento) => {
    console.log("Evento agregado al calendario:", evento);
  };

  const cambiarPiso = () => {
    setPisoActual(prevPiso => prevPiso === 1 ? 2 : 1);
  };

  // Función para determinar el piso a partir del ID de ubicación
  const determinarPisoDeUbicacion = (ubicacionId) => {
    if (!ubicacionId) return null;
    
    // Definición de áreas por piso (debe coincidir con InteractiveAreas.jsx)
    const areasPiso1 = ['salon_1', 'biblioteca', 'bienestar', 'auditorio_principal'];
    // Añadido 'auditorio' a la lista del piso 2
    const areasPiso2 = ['salon_062', 'cafeteria_p2', 'oficina_rrhh', 'auditorio'];

    if (areasPiso1.includes(ubicacionId)) {
      return 1;
    }
    if (areasPiso2.includes(ubicacionId)) {
      return 2;
    }
    
    // Si no se encuentra, intentar determinar por prefijo
    if (ubicacionId.includes('p2') || ubicacionId.includes('_0') || ubicacionId.startsWith('salon_0') || ubicacionId.startsWith('cafeteria_p2') || ubicacionId.startsWith('oficina_rrhh')) {
      return 2;
    }
    if (ubicacionId.includes('p1') || ubicacionId.startsWith('salon_1') || ubicacionId.startsWith('biblioteca') || ubicacionId.startsWith('bienestar') || ubicacionId.startsWith('auditorio_principal')) {
      return 1;
    }
    
    console.warn(`No se pudo determinar el piso para la ubicación: ${ubicacionId}`);
    return 1; // Piso por defecto
  };

  // Efecto para manejar la selección de evento y navegación en el mapa
  useEffect(() => {
    if (eventoSeleccionado) {
      const ubicacionId = eventoSeleccionado.ubicacion;
      console.log("Evento seleccionado, ubicacionId:", ubicacionId);
      
      if (ubicacionId) {
        const pisoUbicacion = determinarPisoDeUbicacion(ubicacionId);
        console.log(`Ubicación '${ubicacionId}' está en el piso ${pisoUbicacion}`);
        
        if (pisoUbicacion && pisoUbicacion !== pisoActual) {
          console.log(`Cambiando de piso ${pisoActual} a ${pisoUbicacion}`);
          // Cambiar de piso
          setPisoActual(pisoUbicacion);
          // Usar un pequeño timeout para asegurar que el mapa se haya renderizado
          setTimeout(() => {
            if (mapContainerRef.current && typeof mapContainerRef.current.centrarEnArea === 'function') {
              console.log(`Llamando a centrarEnArea('${ubicacionId}')`);
              mapContainerRef.current.centrarEnArea(ubicacionId);
            } else {
              console.warn("Función centrarEnArea no disponible en mapContainerRef");
            }
          }, 300); // Ajusta este tiempo si es necesario
        } else {
          // Ya estamos en el piso correcto, centrar directamente
          console.log(`Ya en el piso correcto (${pisoActual}), centrando directamente`);
          if (mapContainerRef.current && typeof mapContainerRef.current.centrarEnArea === 'function') {
            console.log(`Llamando a centrarEnArea('${ubicacionId}')`);
            mapContainerRef.current.centrarEnArea(ubicacionId);
          } else {
            console.warn("Función centrarEnArea no disponible en mapContainerRef");
          }
        }
      } else {
        console.log("El evento seleccionado no tiene ubicación definida");
      }
      
      // Solo cerrar el sidebar en dispositivos móviles
      if (sidebarAbierto && isMobile) {
        setSidebarAbierto(false);
      }
    }
  }, [eventoSeleccionado, pisoActual, sidebarAbierto, isMobile]);

  const sidebarClasses = `fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out shadow-lg ${
    isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-slate-900'
  } ${sidebarAbierto ? "w-64" : "w-12"}`;

  const toggleButtonClasses = `absolute top-1 left-1 p-2 rounded-full border-2 transition z-50 ${
    isDark ? 'bg-amber-500 hover:bg-amber-400 border-amber-600' : 'bg-amber-400 hover:bg-amber-300 border-amber-500'
  }`;

  const datePickerClasses = `font-medium w-full px-2 py-1 rounded outline-none ${
    isDark ? 'bg-gray-700 text-white' : 'bg-amber-200 text-black'
  }`;

  const eventItemClasses = `p-2 rounded transition-all border cursor-pointer ${
    isDark ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 hover:border-gray-500' : 'bg-slate-200 hover:bg-slate-300 border-transparent hover:border-slate-400'
  }`;

  const mainContentClasses = `h-screen w-full overflow-hidden relative z-10 ${ 
    isDark ? 'bg-gray-900' : 'bg-white'
  } flex flex-col`;

  const mapContainerClasses = `flex-1 w-full border-0 rounded-none overflow-hidden ${ 
    isDark ? 'bg-gray-800 border-gray-700' : 'bg-slate-100 border-slate-200'
  }`;

  const eventPanelClasses = `fixed top-0 right-0 w-80 h-full border-l shadow-lg z-50 animate-slide-in overflow-y-auto scroll-hide ${
    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-300'
  }`;

  const closeButtonClasses = `p-2 rounded-full transition-all duration-300 ${
    isDark ? 'text-gray-300 bg-gray-700 hover:bg-gray-600 hover:text-white' : 'text-gray-600 bg-slate-100 hover:bg-slate-200 hover:text-black'
  }`;

  const addToCalendarButtonClasses = `w-full flex items-center justify-center gap-2 font-medium py-2 px-4 rounded-lg transition-colors ${
    isDark ? 'bg-amber-600 hover:bg-amber-500 text-amber-100' : 'bg-amber-400 hover:bg-amber-300 text-amber-900'
  }`;

  const exitButtonClasses = `w-full font-semibold mt-5 py-1 px-0 rounded-lg shadow-lg transition-all ${
    isDark ? 'bg-amber-600 hover:bg-amber-500 border-amber-700 text-amber-100' : 'bg-amber-400 hover:bg-amber-300 border-amber-500 text-amber-900'
  }`;

  return (
    <div className={`relative h-screen overflow-hidden ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-slate-900'}`}>
      <div className={sidebarClasses}>
        <button
          className={toggleButtonClasses}
          onClick={() => setSidebarAbierto(!sidebarAbierto)}
        >
          {sidebarAbierto ? <CaretLeft size={20} /> : <CaretRight size={20} />}
        </button>
        {mostrarContenido && (
          <div className="mt-12 px-4 animate-fade-in overflow-auto h-[calc(100%-3rem)] scroll-hide">
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
      <div className={mainContentClasses}>
        <div className={mapContainerClasses}>
          <MapContainer 
            ref={mapContainerRef}
            className="w-full h-full"
            svgPath={`/map${pisoActual}.svg`}
            popupData={popupData}
            pisoActual={pisoActual}
            cambiarPiso={cambiarPiso}
            isDark={isDark}
          />
        </div>
      </div>
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
                <p>{eventoSeleccionado.ubicacion || "No especificada"}</p>
              </div>
              {/* Eliminado el bloque de Organizador como solicitaste */}
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