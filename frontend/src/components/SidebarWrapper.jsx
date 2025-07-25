import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function SidebarWrapper({ onSelect, esInvitado }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        className={`md:hidden fixed top-6 left-6 z-50 p-2 rounded-full shadow-lg transition-colors ${
          isDark ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' 
                 : 'bg-white text-gray-900 hover:bg-gray-100'
        }`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay para móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar para desktop */}
      <div className={`hidden md:block h-screen w-40 fixed left-0 top-0 z-30 ${
        isDark ? 'bg-gray-800 border-r border-gray-700' 
               : 'bg-white border-r border-gray-200'
      }`}>
        <Sidebar onSelect={onSelect} esInvitado={esInvitado} />
      </div>

      {/* Sidebar para móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sidebar-mobile"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.2 }}
            className={`fixed top-0 left-0 z-50 h-screen w-40 shadow-xl md:hidden ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <Sidebar onSelect={handleSelect} esInvitado={esInvitado} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}