import {
  parse,
  isWithinInterval,
  addHours,
  startOfToday,
  addDays,
  isWithinInterval as isWithin,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
  setHours,
  setMinutes,
} from "date-fns";

export function filtrarEventos({ eventos, filtroDia, filtroHora, fechaSeleccionada }) {
  const hoy = startOfToday();

  // Filtrar por día
  let eventosFiltrados = eventos.filter((evento) => {
    const fechaEvento = parse(evento.fecha_inicio, "yyyy-MM-dd", new Date());

    switch (filtroDia) {
      case "Hoy":
        return format(fechaEvento, "yyyy-MM-dd") === format(hoy, "yyyy-MM-dd");
      case "Mañana":
        return format(fechaEvento, "yyyy-MM-dd") === format(addDays(hoy, 1), "yyyy-MM-dd");
      case "Esta semana":
        return isWithin(fechaEvento, { start: startOfWeek(hoy), end: endOfWeek(hoy) });
      case "Este mes":
        return isWithin(fechaEvento, { start: startOfMonth(hoy), end: endOfMonth(hoy) });
      case "Seleccionar fecha":
        if (!fechaSeleccionada) return true;
        return format(fechaEvento, "yyyy-MM-dd") === format(fechaSeleccionada, "yyyy-MM-dd");
      default:
        return true;
    }
  });

if (filtroHora && filtroHora !== "Cualquier hora") {
  // Parsea la hora seleccionada como hora en 24h
  const horaSeleccionada = parse(filtroHora, "hh:mm a", new Date());

  eventosFiltrados = eventosFiltrados.filter((evento) => {
    const inicioEvento = parse(
      `${evento.fecha_inicio} ${evento.hora_inicio}`,
      "yyyy-MM-dd HH:mm:ss",
      new Date()
    );

    const finEvento = parse(
      `${evento.fecha_fin} ${evento.hora_fin}`,
      "yyyy-MM-dd HH:mm:ss",
      new Date()
    );

    // Creamos un intervalo de 1 hora desde la hora seleccionada
    const inicioFiltro = setMinutes(setHours(new Date(), horaSeleccionada.getHours()), 0);
    const finFiltro = addHours(inicioFiltro, 1);

    return (
      isWithinInterval(inicioEvento, { start: inicioFiltro, end: finFiltro }) ||
      isWithinInterval(finEvento, { start: inicioFiltro, end: finFiltro }) ||
      isWithinInterval(inicioFiltro, { start: inicioEvento, end: finEvento })
    );
  });
}

  return eventosFiltrados;
}
