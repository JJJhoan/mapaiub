// src/context/userContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [esInvitado, setEsInvitado] = useState(false);
  const [esAdmin, setEsAdmin] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  
  // Tiempo máximo de sesión en milisegundos
  const MAX_SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 horas

  // Verificar y restaurar sesión al cargar (versión mejorada con logging)
  useEffect(() => {
    console.log("UserProvider: Intentando restaurar sesión...");
    
    try {
      const storedUser = localStorage.getItem("usuario");
      const storedGuest = localStorage.getItem("esInvitado");
      const storedSessionStart = localStorage.getItem("sessionStartTime");
      
      console.log("UserProvider - Datos en localStorage:", { storedUser, storedGuest, storedSessionStart });
        
      // Limpiar estados primero
      setUsuario(null);
      setEsInvitado(false);
      setEsAdmin(false);
      setSessionStartTime(null);
      
      // Si no hay datos de sesión guardados, no hacer nada más
      if (!storedUser && storedGuest !== "true") {
        console.log("UserProvider: No hay datos de sesión guardados.");
        return;
      }
      
      let startTime = null;
      if (storedSessionStart) {
        startTime = parseInt(storedSessionStart, 10);
        // Verificar si es un número válido
        if (isNaN(startTime)) {
          console.warn("UserProvider: sessionStartTime en localStorage no es un número válido:", storedSessionStart);
          startTime = null;
        }
      }
      
      // Verificar si la sesión ha expirado
      if (startTime && (Date.now() - startTime > MAX_SESSION_DURATION)) {
        console.log("UserProvider: Sesión expirada, limpiando datos.");
        // Sesión expirada, limpiar datos y no restaurar
        localStorage.removeItem("usuario");
        localStorage.removeItem("esInvitado");
        localStorage.removeItem("sessionStartTime");
        return;
      }
      
      // Restaurar datos de sesión si no han expirado
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        console.log("UserProvider: Restaurando usuario:", userData);
        setUsuario(userData);
        setEsAdmin(userData.email === "admin@unibarranquilla.edu.co");
        setEsInvitado(false); // Asegurarse de que esInvitado sea false si hay usuario
      } else if (storedGuest === "true") {
        console.log("UserProvider: Restaurando modo invitado.");
        setUsuario(null);
        setEsInvitado(true);
        setEsAdmin(false);
      }
      
      if (startTime) {
        console.log("UserProvider: Restaurando sessionStartTime:", startTime);
        setSessionStartTime(startTime);
      }
      
      console.log("UserProvider: Sesión restaurada exitosamente.");
    } catch (error) {
      console.error("UserProvider: Error al restaurar sesión desde localStorage:", error);
      // En caso de error, limpiar todo
      setUsuario(null);
      setEsInvitado(false);
      setEsAdmin(false);
      setSessionStartTime(null);
      localStorage.removeItem("usuario");
      localStorage.removeItem("esInvitado");
      localStorage.removeItem("sessionStartTime");
    }
  }, []); // Solo se ejecuta una vez al montar

  const iniciarSesion = (email, password, rememberMe) => {
    // Verificar credenciales de administrador
    if (email === "admin@unibarranquilla.edu.co" && password === "adminiub") {
      const userData = { email, nombre: "Administrador", isAdmin: true };
      const startTime = Date.now();
      
      setUsuario(userData);
      setEsAdmin(true);
      setEsInvitado(false);
      setSessionStartTime(startTime);
      
      if (rememberMe) {
        localStorage.setItem("usuario", JSON.stringify(userData));
        localStorage.setItem("sessionStartTime", startTime.toString());
        localStorage.removeItem("esInvitado"); // Asegurarse de que no quede invitado
      }
      
      return true;
    }
    
    // Verificar otras credenciales (simulación)
    if (email && email.includes("@") && password) {
      // Extraer nombre del email o usar un nombre genérico
      const nombre = email.split('@')[0] || "Estudiante";
      const userData = { email, nombre, isAdmin: false };
      const startTime = Date.now();
      
      setUsuario(userData);
      setEsAdmin(false);
      setEsInvitado(false);
      setSessionStartTime(startTime);
      
      if (rememberMe) {
        localStorage.setItem("usuario", JSON.stringify(userData));
        localStorage.setItem("sessionStartTime", startTime.toString());
        localStorage.removeItem("esInvitado"); // Asegurarse de que no quede invitado
      }
      
      return true;
    }
    
    return false;
  };

  const entrarComoInvitado = () => {
    const startTime = Date.now();
    
    setUsuario(null);
    setEsInvitado(true);
    setEsAdmin(false);
    setSessionStartTime(startTime);
    
    localStorage.setItem("esInvitado", "true");
    localStorage.setItem("sessionStartTime", startTime.toString());
    localStorage.removeItem("usuario"); // Asegurarse de que no quede usuario
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setEsInvitado(false);
    setEsAdmin(false);
    setSessionStartTime(null);
    
    localStorage.removeItem("usuario");
    localStorage.removeItem("esInvitado");
    localStorage.removeItem("sessionStartTime");
  };

  // Calcular el tiempo formateado de sesión
  const getFormattedSessionTime = () => {
    if (!sessionStartTime) return "00:00:00";
    
    const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
    const hrs = Math.floor(elapsed / 3600);
    const mins = Math.floor((elapsed % 3600) / 60);
    const secs = elapsed % 60;
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Verificar si la sesión está activa
  const isSessionActive = () => {
    if (!sessionStartTime) return false;
    return (Date.now() - sessionStartTime) <= MAX_SESSION_DURATION;
  };

  return (
    <UserContext.Provider value={{ 
      usuario, 
      esInvitado, 
      esAdmin,
      sessionStartTime,
      getFormattedSessionTime,
      isSessionActive,
      iniciarSesion, 
      entrarComoInvitado, 
      cerrarSesion 
    }}>
      {children}
    </UserContext.Provider>
  );
};