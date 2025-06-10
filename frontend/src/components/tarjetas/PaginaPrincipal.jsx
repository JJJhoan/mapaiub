import React from "react";

export default function PaginaPrincipal() {
  return (
    <div>
      <h1 className="text-lg text-slate-950 md:text-xl lg:text-2xl font-bold mb-20 text-center">Página Principal</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <TarjetasPrincipal titulo="¡Bienvenido a IUB NAV!" texto="Una herramienta pensada para ti.   Encuentra espacios, entérate de eventos y navega el campus con facilidad."/>
        <TarjetasPrincipal titulo="Explora los espacios del campus" texto="Localiza salones, laboratorios, zonas comunes y más, todo desde un mapa interactivo con búsqueda rápida." />
        <TarjetasPrincipal titulo="¿A dónde quieres ir ahora?" texto="Usa los botones del menú lateral para navegar entre secciones. Puedes volver aquí en cualquier momento." />
        <TarjetasPrincipal titulo="Consulta la sección de eventos" texto="Mantene al día con los eventos académicos, culturales e institucionales dentro de nuestro mapa interactivo." />
        <TarjetasPrincipal titulo="¡Personaliza tu calendario!" texto="Añade, remueve y edita tu calendario a tu gusto. Los eventos más importantes se registrarán automaticamente."/>
        <TarjetasPrincipal titulo="¿Eres nuevo en la sede?" texto="Este sistema te ayudará a ubicarte más rápido, saber dónde son los eventos y no perderte en tu primer cuatrimestre." />
      </div>
    </div>
  );
}

function TarjetasPrincipal({ titulo, texto }) {
  return (
    <div className="
      relative group overflow-hidden
      shadow-lg bg-slate-100 p-4 rounded-xl
      w-full h-fit mb-5 select-none
      border-2 border-dashed hover:border-solid border-slate-300
      hover:border-amber-400 transition-all hover:scale-[1.02]
      duration-300 hover:-translate-y-3
    ">
      <div className="
        absolute inset-0 z-0
        before:content-[''] before:absolute before:inset-0
        before:bg-gradient-to-b before:from-amber-200 before:to-yellow-400
        before:transition-transform before:duration-300
        before:translate-x-0 before:translate-y-[100%]
        group-hover:before:translate-x-0 group-hover:before:translate-y-0
        before:rounded-lg
      "></div>
      <div className="relative z-10">
        <p className="font-bold mb-2 text-slate-800 
          transition-colors duration-300 delay-100 
          group-hover:text-amber-900">
          {titulo}
        </p>

        <p className="text-slate-700 
          transition-colors duration-300 delay-100 
          group-hover:text-amber-700">
          {texto}
        </p>
      </div>
    </div>
  );
}

