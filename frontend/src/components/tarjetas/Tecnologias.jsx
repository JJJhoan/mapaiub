import React from "react";
import { useTheme } from "../../context/ThemeContext"; // Asegúrate de tener esta ruta correcta

export default function Tecnologias() {
  const { isDark } = useTheme();

  return (
    <div className={`transition-colors duration-300 ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-slate-950'}`}>
      <h1 className={`text-lg md:text-xl lg:text-2xl font-bold mb-8 ${isDark ? 'text-gray-100' : 'text-slate-950'}`}>
        Tecnologías
      </h1>
      <p className={`mb-8 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
        Para este proyecto se decidió utilizar las siguientes tecnologías:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
        {/* FRONTEND */}
        <div>
          <h2 className={`font-semibold text-lg mb-4 ${isDark ? 'text-gray-200' : 'text-slate-900'}`}>Frontend</h2>
          <TarjetasTecnologias
            titulo="React"
            texto="Librería de JavaScript para construir interfaces dinámicas y por componentes."
            isDark={isDark}
          />
          <TarjetasTecnologias
            titulo="React Router"
            texto="Permite crear rutas internas para navegar entre secciones como /mapa o /eventos."
            isDark={isDark}
          />
          <TarjetasTecnologias
            titulo="SVG + JSON"
            texto="El mapa se representa con SVG usando datos dinámicos desde archivos JSON."
            isDark={isDark}
          />
          <TarjetasTecnologias
            titulo="Tailwind CSS"
            texto="Framework de utilidades CSS para diseñar interfaces modernas y responsivas."
            isDark={isDark}
          />
          <TarjetasTecnologias
            titulo="Framer Motion"
            texto="Librería de animaciones para crear transiciones suaves en tarjetas y secciones."
            isDark={isDark}
          />
        </div>

        {/* BACKEND */}
        <div>
          <h2 className={`font-semibold text-lg mb-4 ${isDark ? 'text-gray-200' : 'text-slate-900'}`}>Backend</h2>
          <TarjetasTecnologias
            titulo="Python"
            texto="Lenguaje base para la lógica del servidor y procesamiento de datos."
            isDark={isDark}
          />
          <TarjetasTecnologias
            titulo="Flask"
            texto="Framework ligero de Python para construir APIs RESTful."
            isDark={isDark}
          />
          <TarjetasTecnologias
            titulo="SQL"
            texto="Base de datos relacional para almacenar eventos, salones y usuarios."
            isDark={isDark}
          />
        </div>

        {/* Comunicación y herramientas */}
        <div>
          <h2 className={`font-semibold text-lg mb-4 ${isDark ? 'text-gray-200' : 'text-slate-900'}`}>Comunicación y herramientas</h2>
          <TarjetasTecnologias
            titulo="Fetch API"
            texto="Envío y recepción de datos entre frontend y backend mediante HTTP y JSON."
            isDark={isDark}
          />
          <TarjetasTecnologias
            titulo="VS Code"
            texto="Editor de código utilizado para el desarrollo del frontend y backend."
            isDark={isDark}
          />
          <TarjetasTecnologias
            titulo="Git & GitHub"
            texto="Control de versiones y colaboración en equipo entre desarrolladores."
            isDark={isDark}
          />
        </div>
      </div>
      <h1 className={`md:text-lg lg:text-xl font-bold mt-8 mb-3 ${isDark ? 'text-gray-200' : 'text-slate-950'}`}>Nota:</h1>
      <TarjetasTecnologias 
        texto="Estas tecnologías tuvieron su razón de ser elegidas mediante el criterio de que en algunos modulos nos ponian el requerimiento de ciertos lenguajes y tecnologías. Pero en un futuro cuando este proyecto crezca, se actualizarán las tecnologías a unas mas eficientes. At least we hope so."
        isDark={isDark}
      />
    </div>
  );
}

function TarjetasTecnologias({ titulo, texto, isDark }) {
  return (
    <div className={`
      relative group overflow-hidden
      shadow-lg p-4 rounded-xl
      w-full h-fit mb-5 select-none
      border-2 border-dashed hover:border-solid
      transition-all hover:scale-[1.02]
      duration-300 hover:-translate-y-3
      ${isDark ? 
        'bg-gray-700 border-gray-600 hover:border-amber-500' : 
        'bg-slate-100 border-slate-300 hover:border-amber-400'}
    `}>
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
        {titulo && (
          <p className={`font-bold mb-2 transition-colors duration-300 delay-100 
            ${isDark ? 
              'text-gray-200 group-hover:text-amber-900' : 
              'text-slate-800 group-hover:text-amber-900'}`}>
            {titulo}
          </p>
        )}
        <p className={`transition-colors duration-300 delay-100 
          ${isDark ? 
            'text-gray-300 group-hover:text-amber-700' : 
            'text-slate-700 group-hover:text-amber-700'}`}>
          {texto}
        </p>
      </div>
    </div>
  );
}