// src/components/map/MapControls.jsx
import React, { useState } from 'react';
import { Plus, Minus, Crosshair, ArrowSquareUpRight, Question } from '@phosphor-icons/react';

const MapControls = ({ 
  mapInstance, 
  className, 
  isDark,
  pisoActual,
  cambiarPiso
}) => {
  const [mostrarLeyenda, setMostrarLeyenda] = useState(false);

  if (!mapInstance) return null;

  const zoomIn = () => mapInstance.zoomIn();
  const zoomOut = () => mapInstance.zoomOut();
  const resetView = () => mapInstance.fitBounds([[0, 0], [1200, 1600]]);

  // Clases condicionales para el modo oscuro
  const buttonClasses = `p-2 rounded shadow-md transition-colors duration-200 flex items-center justify-center ${
    isDark
      ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
      : 'bg-white text-gray-800 hover:bg-gray-100'
  }`;
  
  // Clases para la ventana de la leyenda
  const leyendaClasses = `absolute right-16 top-0 w-48 p-3 rounded shadow-lg z-[1001] text-xs ${
    isDark
      ? 'bg-gray-800 text-gray-100 border border-gray-600'
      : 'bg-white text-gray-800 border border-gray-300'
  }`;

  return (
    <div className={`absolute right-4 top-4 z-[1000] flex flex-col gap-2 ${className}`}>
      <button 
        onClick={zoomIn}
        className={buttonClasses}
        aria-label="Zoom in"
      >
        <Plus size={20} />
      </button>
      <button 
        onClick={zoomOut}
        className={buttonClasses}
        aria-label="Zoom out"
      >
        <Minus size={20} />
      </button>
      <button 
        onClick={resetView}
        className={buttonClasses}
        aria-label="Reset view"
      >
        <Crosshair size={20} />
      </button>
      
      {/* Botón para cambiar de piso */}
      {cambiarPiso && (
        <button
          onClick={cambiarPiso}
          className={`${buttonClasses} font-bold text-xs border`}
          aria-label={`Cambiar a Piso ${pisoActual === 1 ? 2 : 1}`}
        >
          P{pisoActual === 1 ? 2 : 1}
        </button>
      )}

      {/* Botón de ayuda con leyenda */}
      <div className="relative">
        <button
          onClick={() => setMostrarLeyenda(!mostrarLeyenda)}
          className={`${buttonClasses} font-bold`}
          aria-label="Mostrar leyenda"
        >
          <Question size={20} />
        </button>

        {mostrarLeyenda && (
          <div className={leyendaClasses}>
            <h3 className="font-bold mb-2">Guia</h3>
            <ul className="space-y-1">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#335876] mr-2 inline-block rounded-sm"></span> 
                <span>Salones</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#FFD700] mr-2 inline-block rounded-sm"></span>
                <span>Oficinas</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#50a6c3] mr-2 inline-block rounded-sm"></span>
                <span>Zonas Especiales</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapControls;