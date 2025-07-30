// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'; // Importar React y useContext
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

// Tiempo de inactividad permitido en minutos (por ejemplo, 30 minutos)
const INACTIVITY_TIMEOUT_MINUTES = 30;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null); // Para gestionar el timeout
  const navigate = useNavigate();

  // Función para limpiar el timeout existente
  const clearInactivityTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };

  // Función para establecer el timeout de inactividad
  const setInactivityTimeout = () => {
    clearInactivityTimeout(); // Limpiar cualquier timeout anterior
    const id = setTimeout(() => {
      console.log("Sesión expirada por inactividad");
      logout(); // Cerrar sesión por inactividad
    }, INACTIVITY_TIMEOUT_MINUTES * 60 * 1000); // Convertir minutos a milisegundos
    setTimeoutId(id);
  };

  // Reiniciar el timeout de inactividad (llamar en eventos de actividad)
  const resetInactivityTimeout = () => {
    // Puedes llamar a esta función en eventos como clicks, movimientos del mouse, etc.
    // Por simplicidad, la llamaremos en el login y logout
    setInactivityTimeout();
  };

  // Simula login (luego lo cambiarás por llamadas reales al backend)
  // Modificamos esta función para usar datos más realistas o una lista de usuarios mock
  const login = (email, password) => {
    // Simulación básica de autenticación (debería ser reemplazada por una llamada real)
    // Aquí podrías tener una lista de usuarios válidos o verificar contra un backend
    
    // Ejemplo de lista de usuarios mock válidos
    const validUsers = [
      { email: 'ana@mail.com', nombre: 'Ana García', rol: 'Estudiante' },
      { email: 'carlos@mail.com', nombre: 'Carlos López', rol: 'Estudiante' },
      { email: 'admin@mail.com', nombre: 'Admin User', rol: 'Administrador' }
    ];

    const foundUser = validUsers.find(u => u.email === email); // Simplemente verifica si el email está en la lista

    if (foundUser) {
      // Contraseña simulada (en la vida real, esto se verifica en el backend)
      if (password === '123456') { // Contraseña de prueba
        setUser(foundUser);
        localStorage.setItem('mockAuth', JSON.stringify(foundUser)); // Persistencia local
        resetInactivityTimeout(); // Iniciar el timeout de inactividad
        navigate('/inicio'); // Redirige tras login
        return { success: true };
      } else {
        return { success: false, message: 'Contraseña incorrecta' };
      }
    } else {
      // Si no está en la lista de usuarios válidos, creamos un usuario genérico
      // pero evitamos el usuario@example.com a menos que sea explícitamente ese email
      const mockUser = {
        email,
        nombre: email === 'usuario@example.com' ? 'Usuario Ejemplo' : email.split('@')[0], 
        rol: email.includes('admin') ? 'Administrador' : 'Estudiante' 
      };
      
      setUser(mockUser);
      localStorage.setItem('mockAuth', JSON.stringify(mockUser)); 
      resetInactivityTimeout(); 
      navigate('/inicio'); 
      return { success: true, message: 'Usuario simulado creado' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockAuth');
    clearInactivityTimeout(); // Limpiar el timeout al cerrar sesión
    navigate('/login');
  };

  // Verifica autenticación al cargar y restaura el timeout si hay sesión
  useEffect(() => {
    const savedUser = localStorage.getItem('mockAuth');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      // Al restaurar la sesión, reiniciamos el timeout de inactividad
      resetInactivityTimeout();
    }

    // Opcional: Agregar listeners para eventos de actividad global (mousemove, keydown, etc.)
    // para reiniciar el timeout con más precisión
    const handleUserActivity = () => {
       // Solo reiniciar si ya hay un usuario logueado
       if (user) {
         resetInactivityTimeout();
       }
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    // Puedes agregar más eventos si lo deseas

    // Limpiar listeners y timeout al desmontar
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      clearInactivityTimeout();
    };
  }, [user]); // Dependencia en 'user' para asegurar que se agreguen/eliminen listeners correctamente

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Asegurarse de que useAuth esté correctamente definido
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};