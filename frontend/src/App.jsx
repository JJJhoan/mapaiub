import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ContenedorTarjetas from "./components/ContenedorTarjetas";

export default function App() {
  const [seccionActual, setSeccionActual] = useState("Página Principal");

  return (
    <div className="flex">
      <Sidebar onSelect={setSeccionActual} />
      <ContenedorTarjetas seccionActual={seccionActual} />
    </div>
  );
}
