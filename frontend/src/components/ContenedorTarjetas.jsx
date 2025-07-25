import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext"; // Importa el hook useTheme

import PaginaPrincipal from "./tarjetas/PaginaPrincipal";
import ComoUsar from "./tarjetas/ComoUsar";
import Calendario from "./tarjetas/Calendario";
import Estadisticas from "./tarjetas/Estadisticas";
import Tecnologias from "./tarjetas/Tecnologias";
import SobreNosotros from "./tarjetas/SobreNosotros";
import Usuario from "./tarjetas/Usuario";
import EventosSettings from "./tarjetas/Eventos/EventosSettings";

const tarjetas = {
  "Página Principal": PaginaPrincipal,
  "Cómo Usar": ComoUsar,
  "Calendario": Calendario,
  "Estadísticas": Estadisticas,
  "Tecnologias": Tecnologias,
  "Sobre Nosotros": SobreNosotros,
  "Usuario": Usuario,
  "Eventos Settings": EventosSettings
};

export default function ContenedorTarjetas({ seccionActual }) {
  const { isDark } = useTheme(); // Obtiene el estado del tema
  const Componente = tarjetas[seccionActual];
  const scrollRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [seccionActual]);

  return (
    <div
      ref={scrollRef}
      className={`select-none relative h-screen w-auto md:ml-40 overflow-y-scroll custom-scrollbar-hide p-4 flex justify-center items-start transition-all scroll-hide ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={seccionActual}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.2 }}
          className={`w-[1200px] min-h-full shadow-xl rounded-lg p-6 transition-colors duration-300 ${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-slate-50 border-2 border-blue-100'
          }`}
        >
          <Componente />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}