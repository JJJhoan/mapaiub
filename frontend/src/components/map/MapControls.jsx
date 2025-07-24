// MapControls.jsx
import React from 'react';
import { Plus, Minus, Crosshair } from '@phosphor-icons/react';
// Iconos alternativos que sí existen en la librería

const MapControls = ({ mapInstance, className }) => {
  if (!mapInstance) return null;

  const zoomIn = () => mapInstance.zoomIn();
  const zoomOut = () => mapInstance.zoomOut();
  const resetView = () => mapInstance.fitBounds([[0, 0], [1200, 1600]]);

  return (
    <div className={`absolute right-4 top-4 z-[1000] flex flex-col gap-2 ${className}`}>
      <button 
        onClick={zoomIn}
        className="p-2 bg-white rounded shadow-md hover:bg-gray-100"
        aria-label="Zoom in"
      >
        <Plus size={20} />
      </button>
      <button 
        onClick={zoomOut}
        className="p-2 bg-white rounded shadow-md hover:bg-gray-100"
        aria-label="Zoom out"
      >
        <Minus size={20} />
      </button>
      <button 
        onClick={resetView}
        className="p-2 bg-white rounded shadow-md hover:bg-gray-100"
        aria-label="Reset view"
      >
        <Crosshair size={20} />
      </button>
    </div>
  );
};

export default MapControls;