// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Simula login (luego lo cambiarás por llamadas reales al backend)
  const login = (email, password) => {
    const mockUser = {
      email,
      nombre: email.split('@')[0], // Ejemplo: "ana@mail.com" -> "ana"
      rol: email.includes('admin') ? 'Administrador' : 'Estudiante' // Simula roles
    };
    
    setUser(mockUser);
    localStorage.setItem('mockAuth', JSON.stringify(mockUser)); // Persistencia local
    navigate('/inicio'); // Redirige tras login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockAuth');
    navigate('/login');
  };

  // Verifica autenticación al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('mockAuth');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);