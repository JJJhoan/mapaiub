import React from "react";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarPlus } from "@phosphor-icons/react";

export default function EventoDetalle({ evento, onClose, onAgregar }) {
  if (!evento) return null;

  const fecha = format(parse(evento.fecha_inicio, "yyyy-MM-dd", new Date()), "d 'de' MMMM yyyy", { locale: es });
  const horaInicio = format(parse(evento.hora_inicio, "HH:mm:ss", new Date()), "hh:mm a", { locale: es });
  const horaFin = format(parse(evento.hora_fin, "HH:mm:ss", new Date()), "hh:mm a", { locale: es });
  console.log("Evento:", evento); // 👈 esto imprime el objeto completo

if (!evento) return null;

return (
  <div className="fixed right-0 top-0 h-full w-96 bg-slate-900 text-white z-50 shadow-lg flex flex-col animate-slide-in">
    {/* Imagen o mensaje alternativo */}
    <div className="relative">
<img
  src="https://res.cloudinary.com/dqt3xhhxl/image/upload/v1752714966/sad7bktgsy4t0wrspj2t.jpg"
  alt="Prueba"
  className="w-80 h-48 object-cover"
/>

        <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-sm text-gray-300 italic">
          Sin imagen
        </div>


      <button
        onClick={onCerrar}
        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-400"
      >
        ✕
      </button>
    </div>

    {/* Contenido */}
    <div className="p-4 flex-1 overflow-auto">
      <h2 className="text-lg font-bold mb-2">{evento.nombre}</h2>
      <p className="text-sm text-gray-300 mb-1">🕒 {horaInicio} - {horaFin}</p>
      <p className="text-sm text-gray-300 mb-1">📅 {fecha}</p>
      <p className="text-sm text-gray-300 mb-4">📍 {evento.lugar}</p>

      <button
        onClick={console.log("Evento recibido:", evento)}
        className="flex items-center justify-center gap-2 w-full bg-amber-600 hover:bg-amber-500 py-2 px-4 rounded text-sm font-semibold transition"
      >
        <CalendarPlus size={20} />
        Agregar al calendario
      </button>
    </div>
  </div>
);
}
