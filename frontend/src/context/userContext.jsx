import { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sessionTime, setSessionTime] = useState(0);

  // Efecto para el contador de sesión
  useEffect(() => {
    let timer;
    if (user && !user.esInvitado) {
      timer = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    } else {
      setSessionTime(0);
    }
    return () => clearInterval(timer);
  }, [user]);

  const iniciarSesion = (correo, remember = false) => {
    const newUser = {
      email: correo,
      nombre: correo.split('@')[0],
      rol: correo.includes('admin') ? 'Administrador' : 'Estudiante',
      esInvitado: false
    };
    
    setUser(newUser);
    if (remember) {
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    }
    return true;
  };

  const entrarComoInvitado = () => {
    const guestUser = {
      nombre: 'Invitado',
      rol: 'Invitado',
      esInvitado: true
    };
    setUser(guestUser);
    localStorage.setItem('currentUser', JSON.stringify(guestUser));
    return true;
  };

  const cerrarSesion = () => {
    setUser(null);
    setSessionTime(0);
    localStorage.removeItem('currentUser');
    return true;
  };

  // Cargar usuario al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Formatear tiempo de sesión
  const formatSessionTime = () => {
    const hrs = Math.floor(sessionTime / 3600).toString().padStart(2, '0');
    const mins = Math.floor((sessionTime % 3600) / 60).toString().padStart(2, '0');
    const secs = (sessionTime % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <UserContext.Provider value={{
      user,
      sessionTime: formatSessionTime(),
      esInvitado: user?.esInvitado || false,
      iniciarSesion,
      entrarComoInvitado,
      cerrarSesion
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};