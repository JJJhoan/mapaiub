// src/components/map/MapSVGOverlay.jsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MAP_CONFIG } from './mapConfig'; // Asegúrate de que esta ruta es correcta

const MapSVGOverlay = ({ mapInstance, svgPath, onMapClick }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!mapInstance) return;

    // Limpiar overlay anterior si existe
    if (overlayRef.current) {
      mapInstance.removeLayer(overlayRef.current);
    }

    // Crear overlay del SVG
    overlayRef.current = L.imageOverlay(
      svgPath,
      MAP_CONFIG.bounds,
      {
        interactive: true,
        className: 'leaflet-svg-overlay',
        // Añadir opacidad para ver mejor las áreas interactivas
        opacity: 0.8 
      }
    ).addTo(mapInstance);

    // Manejar clics en el mapa
    if (onMapClick) {
      const handleClick = (e) => {
        // Convertir coordenadas del clic a nuestro sistema 0-1600, 0-1200
        const point = mapInstance.latLngToContainerPoint(e.latlng);
        const bounds = mapInstance.getBounds();
        // Ajuste para que (0,0) esté en la esquina superior izquierda del SVG
        const x = (point.x / mapInstance.getSize().x) * 1600;
        const y = 1200 - (point.y / mapInstance.getSize().y) * 1200; // Invertir Y
        
        onMapClick({ x, y, latlng: e.latlng });
      };
      
      mapInstance.on('click', handleClick);
      
      // Cleanup
      return () => {
        mapInstance.off('click', handleClick);
        if (overlayRef.current && mapInstance.hasLayer(overlayRef.current)) {
            mapInstance.removeLayer(overlayRef.current);
        }
      };
    } else {
        // Cleanup si no hay onMapClick
        return () => {
            if (overlayRef.current && mapInstance.hasLayer(overlayRef.current)) {
                mapInstance.removeLayer(overlayRef.current);
            }
        };
    }
  }, [mapInstance, svgPath, onMapClick]); // Agregar onMapClick a las dependencias

  return null;
};

export default MapSVGOverlay;