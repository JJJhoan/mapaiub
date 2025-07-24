import React, { useState, useEffect } from "react";
import { EnvelopeSimple, LockKey } from "@phosphor-icons/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./context/UserContext";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { iniciarSesion, entrarComoInvitado, user } = useUser();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Si ya está autenticado, redirigir a inicio
    if (user) {
      navigate("/inicio");
    }

    if (location.state?.toast) {
      toast.success(location.state.toast);
    }
  }, [location.state, user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!correo.trim() || !password.trim()) {
      toast.error("Por favor completa todos los campos");
      setIsLoading(false);
      return;
    }

    try {
      const success = await iniciarSesion(correo);
      if (success) {
        toast.success("Sesión iniciada correctamente");
        navigate("/inicio");
      }
    } catch (error) {
      toast.error(error.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInvitado = () => {
    entrarComoInvitado();
    navigate("/inicio");
  };

  return (
    <>
      <header className="bg-slate-900 py-2 px-2 text-white text-sm font-bold shadow-md h-12 w-full flex justify-between">
        <p className="font-extrabold text-2xl px-3 rounded text-blue-200 h-7 select-none">
          IUB NAV
        </p>
        <button
          onClick={() => navigate("/registro")}
          className="border-b-1 border-l-1 border-r-1 py-1 px-3 rounded cursor-pointer text-blue-200 hover:text-slate-100 h-7"
        >
          Registrate
        </button>
      </header>

      <div className="bg-slate-950 w-screen h-screen flex items-center justify-center transition-all select-none">
        <div className="bg-slate-900 rounded border-solid border-2 border-gray-500 h-auto flex flex-col items-center justify-center p-5 mb-15 w-full max-w-md">
          <p className="mt-2 mb-10 font-bold text-amber-400">Bienvenido a IUB NAV</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full items-center">
            <div className="w-full max-w-xs">
              <label className="text-slate-200 font-semibold flex items-center gap-2">
                <EnvelopeSimple size={22} />
                Correo electrónico
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="usuario@iub.edu"
                autoComplete="username"
                className="text-sm mb-2 text-slate-200 outline-none border-b-1 p-2 border-gray-400 w-full bg-slate-800"
                required
              />
            </div>

            <div className="w-full max-w-xs">
              <label className="text-slate-200 font-semibold flex items-center gap-2">
                <LockKey size={22} />
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                autoComplete="current-password"
                className="text-sm text-slate-200 outline-none border-b-1 p-2 border-gray-400 w-full bg-slate-800"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`relative group overflow-hidden mb-5 w-[280px] py-2 px-4 rounded-lg shadow-md border border-slate-400 hover:border-amber-500 transition-all duration-300 font-semibold ${
                isLoading ? "text-gray-400 cursor-not-allowed" : "text-slate-300 hover:text-slate-800"
              } z-10`}
            >
              {isLoading ? (
                "Cargando..."
              ) : (
                <>
                  <span className="relative z-10">Iniciar sesión</span>
                  <span className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-amber-300 before:to-yellow-600 before:transition-transform before:duration-300 before:translate-y-full group-hover:before:translate-y-0 before:rounded-lg" />
                </>
              )}
            </button>
          </form>

          <div className="text-sm text-center">
            <button
              onClick={handleInvitado}
              className="cursor-pointer text-slate-400 hover:text-slate-300"
            >
              <strong>Ingresar como invitado</strong>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}