import React from "react";

export default function ComoUsar() {
  return (
    <div>
      <h2 className="mb-10 text-lg text-slate-950 md:text-xl lg:text-2xl font-bold">
        Cómo Usar
      </h2>
      <div className="grid grid-cols-3 items-start gap-5">

        <div className="grid grid-cols-1 gap-5">
          <TarjetasComoUsar
            titulo="Mapa Interactivo"
            texto="Una vez dentro del mapa, podrás ver la totalidad de espacios de la sede Plaza de la Paz. Entre ellos salones, zonas de recreación, cafetería, oficinas y más."/>
          
          <TarjetasComoUsar
            texto="Si deseas buscar un salón o espacio en especifico, lo único que tendrás que hacer es ingresar el nombre de dicho lugar en la barra de busqueda ubicada en la parte superior de la página."/>

          <TarjetasComoUsar 
            texto=" Si el lugar que buscas está en el mapa, entonces se te dirigirá hacía allí, si no, verifica que hayas ingresado el nombre del lugar correctamente."/>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <TarjetasComoUsar 
          titulo="Eventos" 
          texto="Te darás cuenta de que dentro de la página del mapa interactivo, habrá un apartado lateral en el que podrás acceder a los eventos, los cuales pueden ser academicos, culturales e institucionales."/>
          
          <TarjetasComoUsar 
          texto="Desde ahí podrás filtrar los eventos totalmente a tu gusto (según fecha, hora o tipo de evento). Así no tendrás que navegar en un mar de eventos que no deseas ver."/>
          
          <TarjetasComoUsar 
          texto="Además de eso, ¡podrás seleccionar cualquier evento y guardarlo en tu calendario personal! Asi que disfruta de tener las fechas y eventos importantes organizados y al alcance de un clic."/>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <TarjetasComoUsar 
          titulo="Calendario" 
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
