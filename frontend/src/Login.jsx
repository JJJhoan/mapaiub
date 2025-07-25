// Componente Login actualizado
import React, { useEffect, useState } from "react";
import { EnvelopeSimple, LockKey } from "@phosphor-icons/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./context/userContext";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { iniciarSesion, entrarComoInvitado } = useUser();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Estilos personalizados para los toast
  const toastSuccessStyle = {
    style: {
      background: "#1e293b",
      color: "#34d399",
      border: "1px solid #34d399",
      userSelect: "none"
    },
    iconTheme: {
      primary: "#34d399",
      secondary: "#1e293b",
    },
  };

  const toastErrorStyle = {
    style: {
      background: "#1e293b",
      color: "#f87171",
      border: "1px solid #f87171",
      userSelect: "none",
    },
    iconTheme: {
      primary: "#f87171",
      secondary: "#1e293b",
    },
  };

  const toastInfoStyle = {
    style: {
      background: "#1e293b",
      color: "#60a5fa",
      border: "1px solid #60a5fa",
      userSelect: "none"
    },
    iconTheme: {
      primary: "#60a5fa",
      secondary: "#1e293b",
    },
  };

  useEffect(() => {
    if (location.state?.toast) {
      toast.success(location.state.toast, toastSuccessStyle);
    }
  }, [location.state]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validación de campos vacíos
    if (!correo.trim() || !password.trim()) {
      toast.error("Por favor completa todos los campos", toastErrorStyle);
      return;
    }

    // Validación de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      toast.error("Por favor ingresa un correo válido", toastErrorStyle);
      return;
    }

    // Mostrar toast de carga
    const loadingToast = toast.loading("Iniciando sesión...", toastInfoStyle);

    try {
      // Autenticación con credenciales
      const loginSuccess = iniciarSesion(correo, password, rememberMe);
      
      setTimeout(() => {
        if (loginSuccess) {
          toast.dismiss(loadingToast);
          toast.success("¡Bienvenido! Sesión iniciada correctamente", toastSuccessStyle);
          navigate("/inicio");
        } else {
          toast.dismiss(loadingToast);
          toast.error("Credenciales inválidas. Por favor intenta de nuevo", toastErrorStyle);
        }
      }, 1000);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Error al iniciar sesión. Por favor intenta más tarde", toastErrorStyle);
    }
  };

  const handleInvitado = () => {
    const loadingToast = toast.loading("Ingresando como invitado...", toastInfoStyle);
    
    try {
      setTimeout(() => {
        entrarComoInvitado();
        toast.dismiss(loadingToast);
        toast.success("Has ingresado como invitado", toastSuccessStyle);
        navigate("/inicio");
      }, 800);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Error al ingresar como invitado", toastErrorStyle);
    }
  };

  // Manejar Enter en formularios
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <>
      <header className="bg-slate-900 py-2 px-2 text-white text-sm font-bold shadow-md h-12 w-full flex justify-between items-center">
        <p className="font-extrabold text-2xl px-3 rounded text-blue-200 h-7 select-none">
          IUB NAV
        </p>
        <button
          onClick={() => navigate("/registro")}
          className="border py-1 px-3 rounded cursor-pointer text-blue-200 hover:text-slate-100 hover:bg-slate-700 transition-colors h-7"
        >
          Regístrate
        </button>
      </header>

      <div className="bg-slate-950 w-screen h-screen flex items-center justify-center transition-all select-none p-4">
        <div className="bg-slate-900 rounded border border-gray-500 h-auto flex flex-col items-center justify-center p-6 w-full max-w-md shadow-xl">
          <p className="mt-2 mb-8 font-bold text-amber-400 text-xl">Bienvenido a IUB NAV</p>

          <form className="flex flex-col gap-5 w-full items-center" onSubmit={handleLogin}>
            <div className="w-full max-w-xs">
              <label className="text-slate-200 font-semibold flex items-center gap-2 mb-1">
                <EnvelopeSimple size={20} />
                Correo electrónico
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ingrese su correo"
                autoComplete="off"
                className="text-sm text-slate-200 outline-none border-b border-gray-400 w-full bg-transparent py-2 px-1 focus:border-amber-400 transition-colors"
                required
              />
            </div>

            <div className="w-full max-w-xs">
              <label className="text-slate-200 font-semibold flex items-center gap-2 mb-1">
                <LockKey size={20} />
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ingrese su contraseña"
                className="text-sm text-slate-200 outline-none border-b border-gray-400 w-full bg-transparent py-2 px-1 focus:border-amber-400 transition-colors"
                required
              />
            </div>

            <div className="w-85 flex justify-between items-center mt-4 px-2">
              <label className="flex items-center text-slate-200">
                <input 
                  type="checkbox" 
                  className="mr-2 rounded text-amber-500 focus:ring-amber-500"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Recuérdame</span>
              </label>
              
              <a 
                href="#" 
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  toast("Función de recuperación próximamente", toastInfoStyle);
                }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="flex justify-center items-center relative group overflow-hidden mt-2 w-full max-w-xs h-10 py-3 px-4 rounded-lg shadow-md border border-slate-400 hover:border-amber-500 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 font-semibold text-slate-300 hover:text-slate-800 z-10"
            >
              <span className="relative z-10">Iniciar sesión</span>
              <span className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-amber-300 before:to-yellow-600 before:transition-transform before:duration-300 before:translate-y-full group-hover:before:translate-y-0 before:rounded-lg" />
            </button>
          </form>

          <div className="text-sm text-center mt-6">
            <button
              onClick={handleInvitado}
              className="cursor-pointer text-slate-400 hover:text-slate-300 transition-colors"
            >
              <strong>Ingresar como invitado</strong>
            </button>
          </div>
          
          <div className="text-xs text-slate-500 mt-8 text-center">
            <p>Al iniciar sesión, aceptas nuestros</p>
            <p>Términos de servicio y Política de privacidad</p>
          </div>
        </div>
      </div>
    </>
  );
}