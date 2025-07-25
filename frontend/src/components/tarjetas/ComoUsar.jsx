import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function ComoUsar() {
  const { isDark } = useTheme();

  return (
    <div className={`transition-colors duration-300 ${isDark ? 'bg-gray-800' : ''}`}>
      <div className="w-full flex justify-center">
        <h2 className={`mb-10 text-lg md:text-xl lg:text-2xl font-bold ${
          isDark ? 'text-gray-100' : 'text-slate-950'
        }`}>
          Cómo Usar
        </h2>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-x-10 gap-y-5">

        <div className="grid grid-cols-1 gap-3">
          <h2 className={`font-semibold text-lg mb-2 ${
            isDark ? 'text-gray-200' : 'text-slate-900'
          }`}>Mapa Interactivo</h2>
          <TarjetasComoUsar
            texto="Una vez dentro del mapa, podrás ver la totalidad de espacios de la sede Plaza de la Paz. Entre ellos salones, zonas de recreación, cafetería, oficinas y más."
            isDark={isDark}
          />
          
          <TarjetasComoUsar
            texto="Si deseas buscar un salón o espacio en especifico, lo único que tendrás que hacer es ingresar el nombre de dicho lugar en la barra de busqueda ubicada en la parte superior de la página."
            isDark={isDark}
          />

          <TarjetasComoUsar 
            texto="Si el lugar que buscas está en el mapa, entonces se te dirigirá hacía allí, si no, verifica que hayas ingresado el nombre del lugar correctamente."
            isDark={isDark}
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <h2 className={`font-semibold text-lg mb-2 ${
            isDark ? 'text-gray-200' : 'text-slate-900'
          }`}>Eventos</h2>
          <TarjetasComoUsar 
            texto="Te darás cuenta de que dentro de la página del mapa interactivo, habrá un apartado lateral en el que podrás acceder a los eventos, los cuales pueden ser academicos, culturales e institucionales."
            isDark={isDark}
          />
          
          <TarjetasComoUsar 
            texto="Desde ahí podrás filtrar los eventos totalmente a tu gusto (según fecha, hora o tipo de evento). Así no tendrás que navegar en un mar de eventos que no deseas ver."
            isDark={isDark}
          />
          
          <TarjetasComoUsar 
            texto="Además de eso, ¡podrás seleccionar cualquier evento y guardarlo en tu calendario personal! Asi que disfruta de tener las fechas y eventos importantes organizados y al alcance de un clic."
            isDark={isDark}
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <h2 className={`font-semibold text-lg mb-2 ${
            isDark ? 'text-gray-200' : 'text-slate-900'
          }`}>Calendario</h2>
          <TarjetasComoUsar 
            texto="En el calendario tendrás la posibilidad de visualizar todos los eventos y fechas importantes. Las fechas que se muestran se dividen en 2: "
            isDark={isDark}
          />
          
          <TarjetasComoUsar 
            texto="● Eventos establecidos por ti, directamente desde los eventos que se despliegan en el mapa interactivo"
            isDark={isDark}
          />
          
          <TarjetasComoUsar 
            texto="● Fechas establecidas automaticamente consideradas como importantes. Por ejemplo fechas de matriculas academicas y de modulos de inglés, semanas de parciales, etc."
            isDark={isDark}
          />
          
          <TarjetasComoUsar 
            texto="De igual manera, si no te sientes cómodo con alguna de las fechas automáticamente establecidas puedes desactivarlas. ¡Sientete libre de personalizar tu calendario totalmente a tu gusto!"
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  );
}

function TarjetasComoUsar({ texto, isDark }) {
  return (
    <div className={`
      relative group overflow-hidden
      shadow-lg p-4 rounded-xl
      w-full h-fit mb-5 select-none
      border-2 border-dashed hover:border-solid
      transition-all hover:scale-[1.02] duration-300 hover:-translate-y-3
      ${isDark ? 
        'bg-gray-700 border-gray-600 hover:border-amber-500' : 
        'bg-slate-100 border-slate-300 hover:border-amber-400'}
    `}>
      {/* Bloque animado (mismo color en ambos modos) */}
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