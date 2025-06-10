import React from "react";

export default function ComoUsar() {
  return (
    <div>
      <h2 className="mb-10 text-lg text-slate-950 md:text-xl lg:text-2xl font-bold">
        Cómo Usar
      </h2>
      <div className="grid grid-cols-3 items-start gap-x-10 gap-y-5">

        <div className="grid grid-cols-1 gap-5">
          <h2 className="text-slate-900 font-semibold text-lg mb-2">Mapa Interactivo</h2>
          <TarjetasComoUsar
            texto="Una vez dentro del mapa, podrás ver la totalidad de espacios de la sede Plaza de la Paz. Entre ellos salones, zonas de recreación, cafetería, oficinas y más."/>
          
          <TarjetasComoUsar
            texto="Si deseas buscar un salón o espacio en especifico, lo único que tendrás que hacer es ingresar el nombre de dicho lugar en la barra de busqueda ubicada en la parte superior de la página."/>

          <TarjetasComoUsar 
            texto=" Si el lugar que buscas está en el mapa, entonces se te dirigirá hacía allí, si no, verifica que hayas ingresado el nombre del lugar correctamente."/>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <h2 className="text-slate-900 font-semibold text-lg mb-2">Eventos</h2>
          <TarjetasComoUsar 
          texto="Te darás cuenta de que dentro de la página del mapa interactivo, habrá un apartado lateral en el que podrás acceder a los eventos, los cuales pueden ser academicos, culturales e institucionales."/>
          
          <TarjetasComoUsar 
          texto="Desde ahí podrás filtrar los eventos totalmente a tu gusto (según fecha, hora o tipo de evento). Así no tendrás que navegar en un mar de eventos que no deseas ver."/>
          
          <TarjetasComoUsar 
          texto="Además de eso, ¡podrás seleccionar cualquier evento y guardarlo en tu calendario personal! Asi que disfruta de tener las fechas y eventos importantes organizados y al alcance de un clic."/>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <h2 className="text-slate-900 font-semibold text-lg mb-2">Calendario</h2>
          <TarjetasComoUsar 
          texto="En el calendario tendrás la posibilidad de visualizar todos los eventos y fechas importantes. Las fechas que se muestran se dividen en 2: "/>
          
          <TarjetasComoUsar 
          texto="● Eventos establecidos por ti, directamente desde los eventos que se despliegan en el mapa interactivo"/>
          
          <TarjetasComoUsar 
          texto="● Fechas establecidas automaticamente consideradas como importantes. Por ejemplo fechas de matriculas academicas y de modulos de inglés, semanas de parciales, etc."/>
          
          <TarjetasComoUsar 
          texto="De igual manera, si no te sientes cómodo con alguna de las fechas automáticamente establecidas puedes desactivarlas. ¡Sientete libre de personalizar tu calendario totalmente a tu gusto!" />
        </div>
      </div>
    </div>
  );
}

function TarjetasComoUsar({ titulo, texto }) {
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

        <p className="text-slate-700 
          transition-colors duration-300 delay-100 
          group-hover:text-amber-700">
          {texto}
        </p>
      </div>
    </div>
  );
}
