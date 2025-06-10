import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import PaginaPrincipal from "./tarjetas/PaginaPrincipal";
import ComoUsar from "./tarjetas/ComoUsar";
import MapaInteractivo from "./tarjetas/MapaInteractivo";
import Calendario from "./tarjetas/Calendario";
import Estadisticas from "./tarjetas/Estadisticas";
import Tecnologias from "./tarjetas/Tecnologias";
import SobreNosotros from "./tarjetas/SobreNosotros";
import Preferencias from "./tarjetas/Preferencias";
import EventosSettings from "./tarjetas/InterfazEventosAdmin/EventosSettings";

const tarjetas = {
  "Página Principal": PaginaPrincipal,
  "Cómo Usar": ComoUsar,
  "Mapa Interactivo": MapaInteractivo,
  "Calendario": Calendario,
  "Estadísticas": Estadisticas,
  "Tecnologias": Tecnologias,
  "Sobre Nosotros": SobreNosotros,
  "Preferencias": Preferencias,
  "Eventos Settings": EventosSettings
};

export default function ContenedorTarjetas({ seccionActual }) {
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
      className="relative h-screen overflow-y-scroll custom-scrollbar-hide ml-42 p-4 flex justify-center items-start"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={seccionActual}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-50 border-2 border-blue-100 w-[1200px] min-h-full shadow-xl rounded-lg p-6"
        >
          <Componente />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
