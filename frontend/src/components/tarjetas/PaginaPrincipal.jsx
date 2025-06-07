import React from "react";

export default function PaginaPrincipal() {
  return (
    <div>
      <h1 className="text-lg text-slate-950 md:text-xl lg:text-2xl font-bold mb-15">Página Principal</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-29 w-full">
        <TarjetasPrincipal titulo="¡Bienvenido a IUB NAV!" texto="Una herramienta pensada para ti.   Encuentra espacios, entérate de eventos y navega el campus con facilidad."/>
        <TarjetasPrincipal titulo="Explora los espacios del campus" texto="Localiza salones, laboratorios, zonas comunes y más, todo desde un mapa interactivo con búsqueda rápida." />
        <TarjetasPrincipal titulo="¿A dónde quieres ir ahora?" texto="Usa los botones del menú lateral para navegar entre secciones. Puedes volver aquí en cualquier momento." />
        <TarjetasPrincipal titulo="Consulta el calendario de eventos" texto="Mantene al día con los eventos académicos, culturales e institucionales." />
        <TarjetasPrincipal titulo="¡Personaliza tu calendario!" texto="Añade, remueve y edita tu calendario a tu gusto. Los eventos más importantes se registrarán automaticamente."/>
        <TarjetasPrincipal titulo="¿Eres nuevo en la sede?" texto="Este sistema te ayudará a ubicarte más rápido, saber dónde son los eventos y no perderte en tu primer cuatrimestre." />
      </div>
    </div>
  );
}

function TarjetasPrincipal({ titulo, texto }) {
  return (
    <div className="
      group
      shadow-lg bg-slate-100 p-3 rounded-xl
      hover:bg-slate-800 hover:scale-105
      duration-300 
      w-70 h-fit select-none
      border-2 border-dashed border-gray-400
      hover:border-amber-400
    ">
      <p className="font-bold mb-2 group-hover:text-amber-400">
        {titulo}
      </p>
      <p className="group-hover:text-amber-300">
        {texto}
      </p>
    </div>
  );
}
