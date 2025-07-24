import React, { useState } from "react";
import {
  House,
  Question,
  MapTrifold,
  Calendar,
  ChartBar,
  Cpu,
  Info,
  User,
  ClipboardText,
  CaretDown
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function SidebarButtons({ items = [], handleClick, iconosPorEtiqueta, navigate, isDark }) {
  return (
    <div className="grid grid-cols-1 gap-2 p-2">
      {items.map((label, i) => {
        const Icon = iconosPorEtiqueta[label];

        const handleButtonClick = () => {
          if (label === "Mapa Interactivo") {
            navigate("/mapa");
          } else if (label === "Iniciar sesión") {
            navigate("/");
          } else {
            handleClick(label);
          }
        };

        return (
          <button
            key={i}
            onClick={handleButtonClick}
            className={`
              py-2 px-1 w-full h-full text-xs font-bold rounded-lg  flex items-center gap-2 
              transition-all duration-100
              ${
                isDark
                  ? `
                    text-gray-300 
                    hover:bg-amber-400 hover:text-gray-900 hover:border-l-4 border-amber-600
                    active:bg-amber-500
                  `
                  : `
                    text-gray-600 
                    hover:bg-slate-800 hover:text-amber-300 hover:border-l-4 border-amber-400
                    active:bg-slate-700
                  `
              }
            `}
          >
            {Icon && <Icon size={20} className="transition-colors duration-200" />}
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Sidebar({ onSelect }) {
  const { esInvitado } = useUser();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const info = ["Página Principal", "Cómo Usar"];
  const apps = esInvitado
    ? ["Mapa Interactivo"]
    : ["Mapa Interactivo", "Calendario"];
  const dev = ["Estadísticas", "Tecnologias", "Sobre Nosotros"];
  const admin = ["Eventos Settings"];
  const pref = esInvitado ? ["Iniciar sesión"] : ["Usuario"];

  const iconosPorEtiqueta = {
    "Página Principal": House,
    "Cómo Usar": Question,
    "Mapa Interactivo": MapTrifold,
    "Calendario": Calendar,
    "Estadísticas": ChartBar,
    "Tecnologias": Cpu,
    "Sobre Nosotros": Info,
    "Usuario": User,
    "Eventos Settings": ClipboardText,
    "Iniciar sesión": User,
  };

  const secciones = [
    { titulo: "Inicio", items: info },
    { titulo: "Apps", items: apps },
    { titulo: "Información de Desarrollo", items: dev },
    ...(!esInvitado ? [{ titulo: "Administración", items: admin }] : []),
    { titulo: "", items: pref },
  ];

  const [abiertas, setAbiertas] = useState({});

  const toggleSeccion = (titulo) => {
    setAbiertas((prev) => ({
      ...prev,
      [titulo]: !prev[titulo],
    }));
  };

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
    <div className={`h-screen w-40 shadow-[2px_0_5px_rgba(0,0,0,0.1)] overflow-y-scroll scroll-hide transition-all duration-300
      ${isDark ? 'bg-gray-800' : 'bg-slate-50 hover:bg-slate-100/80'}`}
    >
      <div className="flex items-baseline select-none">
        <img 
          src={isDark ? "/logoiublight.png" : "/logoiubdark.png"} 
          className="w-15 m-4 mb-1 mr-2 pt-3" 
          alt="IUB Logo"
        />
        <p className={`font-bold text-2xl mb-3 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          NAV
        </p>
      </div>

      {secciones.map((seccion, i) => (
        <div 
          key={i} 
          className={`transition-all ${
            isDark 
              ? 'border-t border-gray-700 hover:border-gray-600' 
              : 'border-t border-slate-300 hover:border-slate-400'
          }`}
        >
          {seccion.titulo && (
            <button
              onClick={() => toggleSeccion(seccion.titulo)}
              className={`flex items-center justify-between w-full px-4 py-2 text-xs font-bold transition
                ${
                  isDark
                    ? 'text-gray-200 hover:bg-gray-700'
                    : 'text-slate-800 hover:bg-slate-100'
                }
              `}
            >
              <span>{seccion.titulo}</span>
              <span
                className="text-lg ml-2 inline-block transition-transform duration-300"
                style={{
                  transform: abiertas[seccion.titulo]
                    ? "rotate(-180deg)"
                    : "rotate(0deg)",
                }}
              >
                <CaretDown size={24} color={isDark ? "#e5e7eb" : "#1e293b"} />
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
                <SidebarButtons
                  items={seccion.items}
                  handleClick={onSelect}
                  iconosPorEtiqueta={iconosPorEtiqueta}
                  navigate={navigate}
                  isDark={isDark}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}