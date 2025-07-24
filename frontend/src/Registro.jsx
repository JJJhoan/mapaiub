import React, { useState } from "react";
import { EnvelopeSimple, LockKey, Key } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Registro() {
  const navigate = useNavigate();

  const [identificacion, setIdentificacion] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleRegister = () => {
    if (!identificacion.trim() || !correo.trim() || !contrasena.trim()) {
      toast.error("Por favor completa todos los campos", {
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
      });
      return;
    }

    toast.success("Registro exitoso", {
      style: {
        background: "#1e293b",
        color: "#4ade80",
        border: "1px solid #4ade80",
        userSelect: "none",
      },
      iconTheme: {
        primary: "#4ade80",
        secondary: "#1e293b",
      },
    });

    // Simular registro exitoso
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <header className="bg-slate-900 py-2 px-2 text-white text-sm font-bold shadow-md h-12 w-full flex justify-between">
        <p className="font-extrabold text-2xl px-3 rounded cursor-pointer text-blue-200 hover:text-slate-100 h-7 select-none">
          IUB NAV
        </p>
        <a
          onClick={() => navigate("/")}
          className="border-b-1 border-l-1 border-r-1 py-1 px-3 rounded cursor-pointer text-blue-200 hover:text-slate-100 h-7"
        >
          Inicia sesión
        </a>
      </header>

      <div className="bg-slate-950 w-screen h-screen flex items-center justify-center transition-all select-none">
        <div className="bg-slate-900 rounded border-solid border-2 border-gray-500 w-md h-auto flex flex-col items-center justify-center p-5 mb-15">
          <p className="mb-4 font-bold text-amber-400">Crea una cuenta</p>

          <form className="m-5 flex flex-col gap-4 w-full items-center" onSubmit={(e) => e.preventDefault()}>
            <div className="w-full max-w-xs">
              <label className="text-slate-200 flex items-center gap-2">
                <Key size={22} />
                Identificación (CC o TI)
              </label>
              <input
                type="number"
                inputMode="numeric"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                placeholder="Ingrese su identificación"
                className="no-spinner text-slate-200 text-sm outline-none border-b-1 mb-2 p-2 w-full"
                required
              />
            </div>

            <div className="w-full max-w-xs">
              <label className="text-slate-200 flex items-center gap-2">
                <EnvelopeSimple size={22} />
                Correo electrónico
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ingrese su correo"
                autoComplete="off"
                className="text-slate-200 text-sm outline-none border-b-1 mb-2 p-2 w-full"
                required
              />
            </div>

            <div className="w-full max-w-xs">
              <label className="text-slate-200 flex items-center gap-2">
                <LockKey size={22} />
                Contraseña
              </label>
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Cree una contraseña"
                className="text-slate-200 text-sm outline-none border-b-1 mb-2 p-2 w-full"
                required
              />
            </div>
          </form>

          <button
            onClick={handleRegister}
            className="relative group overflow-hidden mb-5 w-[280px] py-2 px-4 rounded-lg shadow-md border border-slate-400 hover:border-amber-500 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 font-semibold text-slate-300 hover:text-slate-800 z-10"
          >
            <span className="relative z-10">Registrarse</span>
            <span
              className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-amber-300 before:to-yellow-600 before:transition-transform before:duration-300 before:translate-y-full group-hover:before:translate-y-0 before:rounded-lg"
            ></span>
          </button>

          <div className="text-sm text-center mb-5">
            <a
              onClick={() => navigate("/")}
              className="cursor-pointer text-slate-400 hover:text-slate-300"
            >
              <strong>¿Ya tienes cuenta?</strong>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
