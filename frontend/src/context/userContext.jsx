// Actualización del contexto de usuario (userContext.js)
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

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    const storedGuest = localStorage.getItem("esInvitado");
    const storedSessionStart = localStorage.getItem("sessionStartTime");
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUsuario(userData);
      setEsAdmin(userData.email === "admin@unibarranquilla.edu.co");
    }
    
    if (storedGuest === "true") {
      setEsInvitado(true);
    }
    
    if (storedSessionStart) {
      setSessionStartTime(parseInt(storedSessionStart, 10));
    }
  }, []);

  const iniciarSesion = (email, password, rememberMe) => {
    // Verificar credenciales de administrador
    if (email === "admin@unibarranquilla.edu.co" && password === "adminiub") {
      const userData = { email, isAdmin: true };
      const startTime = Date.now();
      
      setUsuario(userData);
      setEsAdmin(true);
      setEsInvitado(false);
      setSessionStartTime(startTime);
      
      if (rememberMe) {
        localStorage.setItem("usuario", JSON.stringify(userData));
        localStorage.setItem("sessionStartTime", startTime.toString());
      }
      
      return true;
    }
    
    // Verificar otras credenciales (simulación)
    if (email && email.includes("@") && password) {
      const userData = { email, isAdmin: false };
      const startTime = Date.now();
      
      setUsuario(userData);
      setEsAdmin(false);
      setEsInvitado(false);
      setSessionStartTime(startTime);
      
      if (rememberMe) {
        localStorage.setItem("usuario", JSON.stringify(userData));
        localStorage.setItem("sessionStartTime", startTime.toString());
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
    localStorage.removeItem("usuario");
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

  return (
    <UserContext.Provider value={{ 
      usuario, 
      esInvitado, 
      esAdmin,
      sessionStartTime,
      getFormattedSessionTime,
      iniciarSesion, 
      entrarComoInvitado, 
      cerrarSesion 
    }}>
      {children}
    </UserContext.Provider>
  );
};