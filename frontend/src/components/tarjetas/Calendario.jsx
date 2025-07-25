import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/locales/es';
import { useTheme } from '../../context/ThemeContext';

export default function Calendario() {
  const { isDark } = useTheme();
  const calendarRef = useRef(null);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [eventosDesdeBD, setEventosDesdeBD] = useState([]);
  const [currentView, setCurrentView] = useState('dayGridMonth');

  useEffect(() => {
    fetch('http://localhost:5000/api/eventos')
      .then((res) => res.json())
      .then((data) => {
        const eventosFormateados = data.map((evento) => ({
          id: evento.id_evento,
          title: evento.nombre,
          start: evento.fecha_inicio,
          end: evento.fecha_fin,
          color: evento.es_importante ? '#EF4444' : '#10B981',
          extendedProps: {
            ...evento,
          },
        }));
        setEventosDesdeBD(eventosFormateados);
      })
      .catch((err) => {
        console.error('Error al cargar eventos:', err);
      });
  }, []);

  const eventosImportantes = eventosDesdeBD.filter((e) => e.extendedProps.es_importante);
  const eventosNoImportantes = eventosDesdeBD.filter((e) => !e.extendedProps.es_importante);

  const todosLosEventos = [
    ...eventosImportantes,
    ...(mostrarTodos ? eventosNoImportantes : [])
  ];

  const handleViewChange = (viewInfo) => {
    setCurrentView(viewInfo.view.type);
  };

  return (
    <div className={`p-4 sm:p-6 rounded-lg transition-colors duration-300 ${isDark ? 'bg-gray-900' : ''}`}>
      <h2 className={`mb-4 sm:mb-6 text-lg md:text-xl lg:text-2xl font-bold ${
        isDark ? 'text-gray-100' : 'text-slate-950'
      }`}>
        Calendario Institucional
      </h2>

      <div className="flex justify-between items-center mb-4 sm:mb-6 flex-wrap gap-2">
        <label className={`flex items-center gap-2 text-sm font-medium ${
          isDark ? 'text-gray-300' : 'text-slate-700'
        }`}>
          <input
            type="checkbox"
            checked={mostrarTodos}
            onChange={(e) => setMostrarTodos(e.target.checked)}
            className={`rounded ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          />
          Mostrar también eventos no importantes
        </label>

        {/* Selector de vista para móviles */}
        <div className="sm:hidden">
          <select
            value={currentView}
            onChange={(e) => {
              const calendarApi = calendarRef.current.getApi();
              calendarApi.changeView(e.target.value);
            }}
            className={`rounded-md p-1 text-sm ${
              isDark ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-slate-700 border-gray-300'
            }`}
          >
            <option value="dayGridMonth">Mes</option>
            <option value="timeGridWeek">Semana</option>
            <option value="timeGridDay">Día</option>
          </select>
        </div>
      </div>

      <div className={isDark ? 'dark-calendar' : ''}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="es"
          events={todosLosEventos}
          height="auto"
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'today dayGridMonth,timeGridWeek,timeGridDay'
          }}
          buttonText={{
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día'
          }}
          views={{
            dayGridMonth: {
              titleFormat: { year: 'numeric', month: 'long' }
            }
          }}
          eventClick={(info) => {
            alert(`Evento: ${info.event.title}`);
          }}
          dateClick={(info) => {
            alert(`Clic en la fecha: ${info.dateStr}`);
          }}
          viewDidMount={handleViewChange}
          windowResize={(view) => {
            const calendarApi = calendarRef.current.getApi();
            if (window.innerWidth < 640) {
              calendarApi.setOption('headerToolbar', {
                left: 'prev,next',
                center: 'title',
                right: 'today'
              });
            } else {
              calendarApi.setOption('headerToolbar', {
                left: 'prev,next',
                center: 'title',
                right: 'today dayGridMonth,timeGridWeek,timeGridDay'
              });
            }
          }}
        />
      </div>

      {/* Estilos optimizados para dark mode y responsive */}
      <style jsx global>{`
        .dark-calendar .fc {
          --fc-border-color: #374151;
          --fc-neutral-bg-color: #1f2937;
          --fc-page-bg-color: #111827;
          --fc-today-bg-color: #1e40af;
          --fc-list-event-hover-bg-color: #1e293b;
          --fc-event-border-color: transparent;
        }
        
        /* Textos principales */
        .dark-calendar .fc-toolbar-title,
        .dark-calendar .fc-col-header-cell-cushion,
        .dark-calendar .fc-daygrid-day-number,
        .dark-calendar .fc-timegrid-slot-label-cushion,
        .dark-calendar .fc-event-time,
        .dark-calendar .fc-event-title {
          color: #f3f4f6 !important;
        }
        
        /* Botones */
        .dark-calendar .fc-button {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
          color: #f3f4f6 !important;
        }
        
        .dark-calendar .fc-button:hover {
          background-color: #4b5563 !important;
        }
        
        .dark-calendar .fc-button-active {
          background-color: #1d4ed8 !important;
        }
        
        /* Celdas y encabezados */
        .dark-calendar .fc-col-header-cell {
          background-color: #1f2937;
        }
        
        .dark-calendar .fc-daygrid-day {
          background-color: #111827;
        }
        
        .dark-calendar .fc-daygrid-day.fc-day-today {
          background-color: #1e40af;
        }
        
        /* Eventos */
        .dark-calendar .fc-event {
          filter: brightness(1.1);
        }
        
        .dark-calendar .fc-event-title {
          font-weight: 500;
        }

        /* Estilos responsive */
        .fc-toolbar.fc-header-toolbar {
          flex-direction: column;
          gap: 0.5rem;
        }

        .fc-header-toolbar .fc-toolbar-chunk {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .fc-toolbar-title {
          font-size: 1.25rem;
          margin: 0.5rem 0;
        }

        .fc .fc-button {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
          margin: 0 0.125rem;
        }

        .fc-today-button {
          margin-left: 0.5rem !important;
        }

        @media (min-width: 640px) {
          .fc-toolbar.fc-header-toolbar {
            flex-direction: row;
          }

          .fc-header-toolbar .fc-toolbar-chunk {
            width: auto;
          }

          .fc-toolbar-title {
            font-size: 1.5rem;
          }

          .fc .fc-button {
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}