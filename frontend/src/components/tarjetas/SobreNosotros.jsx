import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function SobreNosotros() {
  const { isDark } = useTheme();

  return (
    <div className={`transition-colors duration-300 ${isDark ? 'bg-gray-800' : ''}`}>
      <h1 className={`text-lg md:text-xl lg:text-2xl font-bold mb-20 text-center ${
        isDark ? 'text-gray-100' : 'text-slate-950'
      }`}>
        Sobre Nosotros
      </h1>
      <div className="grid grid-cols-1 gap-4 w-full">
        <TarjetasPrincipal 
          titulo="Nuestro Propósito"
          texto="Buscamos facilitar la navegación y la experiencia de los estudiantes dentro de la sede Plaza de la Paz mediante un sistema visual, dinámico y actualizado."
          isDark={isDark}
        />
        <TarjetasPrincipal 
          titulo="El Equipo"
          texto="Somos estudiantes apasionados por la tecnología, combinando diseño y desarrollo para resolver problemas reales dentro de nuestra universidad."
          isDark={isDark}
        />
        <TarjetasPrincipal 
          titulo="Nuestra Visión"
          texto="Queremos transformar la forma en que los estudiantes se orientan, se informan y participan en la vida universitaria, con una plataforma intuitica y útil."
          isDark={isDark}
        />
        <TarjetasPrincipal 
          titulo="Cómo lo hicimos"
          texto="Diseñamos un mapa SVG interactivo conectado a una base de datos en la nube, integrando eventos y navegación en una interfaz moderna construida con React."
          isDark={isDark}
        />
        <TarjetasPrincipal 
          titulo="Lo que viene"
          texto="Próximamente pensamos incluir entre otras funciones, mapas para las demás sedes de la IUB dentro de esta app. Esto apenas empieza."
          isDark={isDark}
        />
        <TarjetasPrincipal 
          titulo="Hecho en la U, para la U"
          texto="Somos parte de la comunidad estudiantil, y entendemos sus necesidades. Por eso, cada línea de código fue escrita pensando en soluciones reales dentro del campus."
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