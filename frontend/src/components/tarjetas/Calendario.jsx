import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/locales/es';

export default function Calendario() {
  const calendarRef = useRef(null);
  const [vistaSeleccionada, setVistaSeleccionada] = useState('dayGridMonth');

  const eventosObligatorios = [
    {
      id: '1',
      title: 'Entrega del 60%',
      start: '2025-06-16',
      color: '#EF4444',
    },
    {
      id: '2',
      title: 'Feria de Tecnología',
      start: '2025-08-15',
      color: '#EF4444',
    },
  ];

  const eventosUsuario = [
    {
      id: 'u1',
      title: 'Mi grupo de estudio',
      start: '2025-08-05T14:00:00',
      end: '2025-08-05T16:00:00',
      color: '#10B981',
    },
  ];

  const todosLosEventos = [...eventosObligatorios, ...eventosUsuario];

  // Cargar vista guardada del usuario
  useEffect(() => {
    const vistaGuardada = localStorage.getItem('vistaCalendario');
    if (vistaGuardada) {
      setVistaSeleccionada(vistaGuardada);
    }
  }, []);

  const cambiarVista = (nuevaVista) => {
    setVistaSeleccionada(nuevaVista);
    localStorage.setItem('vistaCalendario', nuevaVista);
    calendarRef.current.getApi().changeView(nuevaVista);
  };

  return (
    <div className="p-6 rounded-lg">
      <h2 className="mb-6 text-lg text-slate-950 md:text-xl lg:text-2xl font-bold">
        Calendario Institucional
      </h2>

      <div className="flex items-center gap-4 mb-6">
        <label className="text-sm font-medium text-slate-700">
          Cambiar vista:
        </label>
        <select
          value={vistaSeleccionada}
          onChange={(e) => cambiarVista(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="dayGridMonth">Vista Mensual</option>
          <option value="timeGridWeek">Vista Semanal</option>
          <option value="timeGridDay">Vista por Día</option>
          <option value="listWeek">Lista Semanal</option>
        </select>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView={vistaSeleccionada}
        locale="es"
        events={todosLosEventos}
        height="auto"
        eventClick={(info) => {
          alert(`Evento: ${info.event.title}`);
        }}
        dateClick={(info) => {
          alert(`Clic en la fecha: ${info.dateStr}`);
        }}
      />
    </div>
  );
}
