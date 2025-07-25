import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Usuario() {
  const { isDark, toggleTheme } = useTheme();
  const { usuario, esAdmin, getFormattedSessionTime, cerrarSesion } = useUser();
  const navigate = useNavigate();
  
  // Estado para el tiempo de sesión
  const [formattedTime, setFormattedTime] = useState(getFormattedSessionTime());
  
  // Actualizar el tiempo cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime(getFormattedSessionTime());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [getFormattedSessionTime]);
  
  const handleLogout = () => {
    cerrarSesion();
    console.log("Sesión cerrada");
    navigate("/");
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className={`max-w-md mx-auto rounded-xl shadow-lg overflow-hidden p-8 transition-all duration-300 ${
          isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
        }`}>
          
          {/* Encabezado */}
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-2xl font-bold">Mi Cuenta</h1>
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label="Cambiar tema"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Información principal */}
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-sm font-medium opacity-80">Nombre completo</p>
              <p className="text-lg font-semibold">
                {usuario?.nombre || (esAdmin ? "Administrador" : "Estudiante")}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium opacity-80">Correo electrónico</p>
              <p className="text-lg">{usuario?.email || "usuario@example.com"}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium opacity-80">Rol</p>
              <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                esAdmin 
                  ? (isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800')
                  : (isDark ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800')
              }`}>
                {esAdmin ? "Administrador" : "Estudiante"}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium opacity-80">Tiempo de sesión</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono">{formattedTime}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  activa ahora
                </span>
              </div>
            </div>
          </div>

          {/* Pie con botón de cerrar sesión y enlace de ayuda */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <button
              onClick={handleLogout}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                isDark 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-red-100 hover:bg-red-200 text-red-800'
              }`}
            >
              Cerrar sesión
            </button>
            
            <a 
              href="/soporte-tecnico" 
              className={`block text-center text-sm hover:underline ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}
            >
              ¿Necesitas ayuda? Contacta al soporte técnico
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}