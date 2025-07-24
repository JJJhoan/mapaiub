import React, { useState, useEffect } from "react";
import SidebarWrapper from "./components/SidebarWrapper";
import ContenedorTarjetas from "./components/ContenedorTarjetas";

export default function App() {
  const [seccionActual, setSeccionActual] = useState("Página Principal");
  const [esInvitado, setEsInvitado] = useState(false);

  useEffect(() => {
    const valor = localStorage.getItem("esInvitado");
    setEsInvitado(valor === "true");
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar para desktop */}
      <div className="hidden md:block h-full">
        <SidebarWrapper onSelect={setSeccionActual} esInvitado={esInvitado} />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 h-full overflow-y-auto scroll-hide relative">
        <ContenedorTarjetas seccionActual={seccionActual} />
      </div>

      {/* Sidebar para mobile (debe estar fuera del flujo normal) */}
      <div className="md:hidden">
        <SidebarWrapper onSelect={setSeccionActual} esInvitado={esInvitado} />
      </div>
    </div>
  );
}