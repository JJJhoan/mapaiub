import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ContenedorTarjetas from "../components/ContenedorTarjetas";

export default function Home() {
  const [seccionActual, setSeccionActual] = useState("Página Principal");

  return (
    <div className="bg-white w-screen h-screen flex">
      <Sidebar onSelect={setSeccionActual} />
      <ContenedorTarjetas seccionActual={seccionActual} />
    </div>
  );
}
