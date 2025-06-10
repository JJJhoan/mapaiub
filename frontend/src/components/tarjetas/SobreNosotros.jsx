import React from "react";

export default function SobreNosotros() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-2">
      <h2 className="text-lg text-slate-950 md:text-xl lg:text-2xl font-bold mb-8 text-center">
        Sobre Nosotros
      </h2>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-4 w-full max-w-6xl mx-auto">
        <TarjetaSobreNosotros 
          titulo="Nuestro Propósito"
          texto="Buscamos facilitar la navegación y la experiencia de los estudiantes dentro de la sede Plaza de la Paz mediante un sistema visual, dinámico y actualizado."
        />
        <TarjetaSobreNosotros 
          titulo="El Equipo"
          texto="Somos estudiantes apasionados por la tecnología, combinando diseño y desarrollo para resolver problemas reales dentro de nuestra universidad."
        />
        <TarjetaSobreNosotros 
          titulo="Nuestra Visión"
          texto="Queremos transformar la forma en que los estudiantes se orientan, se informan y participan en la vida universitaria, con una plataforma intuitiva y útil."
        />
        <TarjetaSobreNosotros 
          titulo="Cómo lo hicimos"
          texto="Diseñamos un mapa SVG interactivo conectado a una base de datos en la nube, integrando eventos y navegación en una interfaz moderna construida con React, además del calendario académico también construido en React. Through blood, sweat, and tears."
        />
        <TarjetaSobreNosotros 
          titulo="Lo que viene"
          texto="Proximamente pensamos incluir entre otras funciones, mapas para las demás sedes de la IUB dentro de esta app. Esto apenas empieza."
        />
        <TarjetaSobreNosotros 
          titulo="Hecho en la U, para la U"
          texto="Somos parte de la comunidad estudiantil, y entendemos sus necesidades. Por eso, cada línea de código fue escrita pensando en soluciones reales dentro del campus."
        />
      </div>
    </div>
  );
}

function TarjetaSobreNosotros({ titulo, texto }) {
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
