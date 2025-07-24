import React from "react";
import { useTheme } from "../../context/ThemeContext"; // Importa el hook useTheme

export default function PaginaPrincipal() {
  const { isDark } = useTheme(); // Obtiene el estado del tema

  return (
    <div className={`transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <h1 className={`text-lg md:text-xl lg:text-2xl font-bold mb-20 text-center ${
        isDark ? 'text-gray-100' : 'text-slate-950'
      }`}>
        Página Principal
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <TarjetasPrincipal 
          titulo="¡Bienvenido a IUB NAV!" 
          texto="Una herramienta pensada para ti. Encuentra espacios, entérate de eventos y navega el campus con facilidad."
          isDark={isDark}
        />
        <TarjetasPrincipal 
          titulo="Explora los espacios del campus" 
          texto="Localiza salones, laboratorios, zonas comunes y más, todo desde un mapa interactivo con búsqueda rápida."
          isDark={isDark}
        />
        <TarjetasPrincipal 
          titulo="¿A dónde quieres ir ahora?" 
          texto="Usa los botones del menú lateral para navegar entre secciones. Puedes volver aquí en cualquier momento."
          isDark={isDark}
        />
        <TarjetasPrincipal 
          titulo="Consulta la sección de eventos" 
          texto="Mantene al día con los eventos académicos, culturales e institucionales dentro de nuestro mapa interactivo."
          isDark={isDark}
        />
        <TarjetasPrincipal 
          titulo="¡Personaliza tu calendario!" 
          texto="Añade, remueve y edita tu calendario a tu gusto. Los eventos más importantes se registrarán automaticamente."
          isDark={isDark}
        />
        <TarjetasPrincipal 
          titulo="¿Eres nuevo en la sede?" 
          texto="Este sistema te ayudará a ubicarte más rápido, saber dónde son los eventos y no perderte en tu primer cuatrimestre."
          isDark={isDark}
        />
      </div>
    </div>
  );
}

function TarjetasPrincipal({ titulo, texto, isDark }) {
  return (
    <div className={`
      relative group overflow-hidden
      shadow-lg p-4 rounded-xl
      w-full h-fit mb-5 select-none
      border-2 border-dashed hover:border-solid
      transition-all hover:scale-[1.02] duration-300 hover:-translate-y-4
      ${isDark ? 
        'bg-gray-700 border-gray-600 hover:border-amber-500' : 
        'bg-slate-100 border-slate-300 hover:border-amber-400'}
    `}>
      {/* Bloque animado (mismo color en ambos modos) */}
      <div className={`
        absolute inset-0 z-0
        before:content-[''] before:absolute before:inset-0
        before:bg-gradient-to-b before:from-amber-200 before:to-yellow-400
        before:transition-transform before:duration-300
        before:translate-x-0 before:translate-y-[100%]
        group-hover:before:translate-x-0 group-hover:before:translate-y-0
        before:rounded-lg
      `}></div>
      
      <div className="relative z-10">
        <p className={`font-bold mb-2 transition-colors duration-300 delay-100 
          ${isDark ? 
            'text-gray-200 group-hover:text-amber-900' :  // Mismo hover que light mode
            'text-slate-800 group-hover:text-amber-900'}`}>
          {titulo}
        </p>

        <p className={`transition-colors duration-300 delay-100 
          ${isDark ? 
            'text-gray-300 group-hover:text-amber-700' :  // Mismo hover que light mode
            'text-slate-700 group-hover:text-amber-700'}`}>
          {texto}
        </p>
      </div>
    </div>
  );
}