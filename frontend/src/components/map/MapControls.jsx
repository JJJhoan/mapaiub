// MapControls.jsx
import React from 'react';
import { Plus, Minus, Crosshair } from '@phosphor-icons/react';

const MapControls = ({ mapInstance, className, isDark }) => {
  if (!mapInstance) return null;

  const zoomIn = () => mapInstance.zoomIn();
  const zoomOut = () => mapInstance.zoomOut();
  const resetView = () => mapInstance.fitBounds([[0, 0], [1200, 1600]]);

  // Clases condicionales para el modo oscuro
  const buttonClasses = `p-2 rounded shadow-md transition-colors duration-200 ${
    isDark
      ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
      : 'bg-white text-gray-800 hover:bg-gray-100'
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
    </div>
  );
};

export default MapControls;