import React from "react";

export default function Tecnologias() {
  return (
    <div>
      <h1 className="text-lg text-slate-950 md:text-xl lg:text-2xl font-bold mb-8">Tecnologías</h1>
      <p className="mb-8">Para este proyecto se decidió utilizar las siguientes tecnologías:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
        {/* FRONTEND */}
        <div>
          <h2 className="text-slate-900 font-semibold text-lg mb-4">Frontend</h2>
          <TarjetasTecnologias
            titulo="React"
            texto="Librería de JavaScript para construir interfaces dinámicas y por componentes."
          />
          <TarjetasTecnologias
            titulo="React Router"
            texto="Permite crear rutas internas para navegar entre secciones como /mapa o /eventos."
          />
          <TarjetasTecnologias
            titulo="SVG + JSON"
            texto="El mapa se representa con SVG usando datos dinámicos desde archivos JSON."
          />
          <TarjetasTecnologias
            titulo="Tailwind CSS"
            texto="Framework de utilidades CSS para diseñar interfaces modernas y responsivas."
          />
          <TarjetasTecnologias
            titulo="Framer Motion"
            texto="Librería de animaciones para crear transiciones suaves en tarjetas y secciones."
          />
        </div>

        {/* BACKEND */}
        <div>
          <h2 className="text-slate-900 font-semibold text-lg mb-4">Backend</h2>
          <TarjetasTecnologias
            titulo="Python"
            texto="Lenguaje base para la lógica del servidor y procesamiento de datos."
          />
          <TarjetasTecnologias
            titulo="Flask"
            texto="Framework ligero de Python para construir APIs RESTful."
          />
          <TarjetasTecnologias
            titulo="SQL"
            texto="Base de datos relacional para almacenar eventos, salones y usuarios."
          />
        </div>

        {/* Comunicación y herramientas */}
        <div>
          <h2 className="text-slate-900 font-semibold text-lg mb-4">Comunicación y Desarrollo</h2>
          <TarjetasTecnologias
            titulo="Fetch API"
            texto="Envío y recepción de datos entre frontend y backend mediante HTTP y JSON."
          />
          <TarjetasTecnologias
            titulo="VS Code"
            texto="Editor de código utilizado para el desarrollo del frontend y backend."
          />
          <TarjetasTecnologias
            titulo="Git & GitHub"
            texto="Control de versiones y colaboración en equipo entre desarrolladores."
          />
          <TarjetasTecnologias
            titulo="Postman"
            texto="Herramienta para probar rutas del backend y depurar las respuestas API."
          />
        </div>
      </div>
      <h1 className="text-slate-950 md:text-lg lg:text-xl font-bold mt-8 mb-3">Nota:</h1>
      <TarjetasTecnologias 
      texto="Estas tecnologías tuvieron su razón de ser elegidas mediante el criterio de que en algunos modulos nos ponian el requerimiento de ciertos lenguajes y tecnologías. Pero en un futuro cuando este proyecto crezca, se actualizarán las tecnologías a unas mas eficientes. At least we hope so."
       />

    </div>
  );
}

function TarjetasTecnologias({ titulo, texto }) {
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
        {titulo && (<p className="font-bold mb-2 text-slate-800 
          transition-colors duration-300 delay-100 
          group-hover:text-amber-900">
          {titulo}
        </p>
        )}
        <p className="text-slate-700 
          transition-colors duration-300 delay-100 
          group-hover:text-amber-700">
          {texto}
        </p>
      </div>
    </div>
  );
}

