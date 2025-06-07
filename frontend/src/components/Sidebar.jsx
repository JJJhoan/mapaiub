import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SidebarButtons({ items, handleClick }) {
  return (
    <div className="grid grid-cols-1 gap-2 p-2">
      {items.map((label, i) => (
        <button
          key={i}
          onClick={() => handleClick(label)}
          className="py-2 px-4 w-full h-full text-xs font-bold text-gray-500 rounded flex justify-items-start hover:border-l-5 hover:bg-slate-700 hover:border-slate-950 hover:text-amber-300 active:bg-slate-700 transition-all duration-100"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function Sidebar({ onSelect }) {
  const info = ["Página Principal", "Cómo Usar"];
  const apps = ["Mapa Interactivo", "Calendario"];
  const dev = ["Estadísticas", "Tecnologías", "Sobre Nosotros"];
  const pref = ["Preferencias"];
  const admin = ["Eventos Settings"];

  const secciones = [
    { titulo: "Inicio", items: info },
    { titulo: "Apps", items: apps },
    { titulo: "Información de Desarrollo", items: dev },
    { titulo: "Administración", items: admin },
    { titulo: "", items: pref },
  ];

  const [abiertas, setAbiertas] = useState({});

  const toggleSeccion = (titulo) => {
    setAbiertas((prev) => ({
      ...prev,
      [titulo]: !prev[titulo],
    }));
  };

  // Variants para la animación de abrir/cerrar
  const variants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <div className="bg-slate-50 h-screen w-40 shadow-[2px_0_5px_rgba(0,0,0,0.1)] fixed overflow-y-scroll custom-scrollbar-hide">
      <div className="flex items-baseline">
        <img src="/logoiubdark.png" className="w-15 m-4 mb-1 mr-2 pt-3 " />
        <p className="font-bold text-2xl mb-3">NAV</p>
      </div>

      {secciones.map((seccion, i) => (
        <div key={i} className="mb-3 border-b border-t border-gray-300 shadow-md">
          {seccion.titulo && (
            <button
              onClick={() => toggleSeccion(seccion.titulo)}
              className="flex items-center justify-between w-full px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-0 active:bg-slate-100 transition"
            >
              <span>{seccion.titulo}</span>
              <span
                className="text-lg ml-2 inline-block transition-transform duration-300"
                style={{
                  transform: abiertas[seccion.titulo]
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                ▼
              </span>
            </button>
          )}

          <AnimatePresence initial={false}>
            {(abiertas[seccion.titulo] || !seccion.titulo) && (
              <motion.div
                key="content"
                initial="closed"
                animate="open"
                exit="closed"
                variants={variants}
                className="overflow-hidden"
              >
                <SidebarButtons items={seccion.items} handleClick={onSelect} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
