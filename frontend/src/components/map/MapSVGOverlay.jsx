import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MAP_CONFIG } from './mapConfig';

const MapSVGOverlay = ({ mapInstance, svgPath, onMapClick }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!mapInstance) return;

    // Crear overlay del SVG
    overlayRef.current = L.imageOverlay(
      svgPath,
      MAP_CONFIG.bounds,
      {
        interactive: true,
        className: 'leaflet-svg-overlay'
      }
    ).addTo(mapInstance);

    // Manejar clics en el mapa
    if (onMapClick) {
      const handleClick = (e) => {
        // Convertir coordenadas del clic a nuestro sistema 0-1600, 0-1200
        const point = mapInstance.latLngToContainerPoint(e.latlng);
        const bounds = mapInstance.getBounds();
        const x = (point.x / mapInstance.getSize().x) * 1600;
        const y = 1200 - (point.y / mapInstance.getSize().y) * 1200;
        
        onMapClick({ x, y, latlng: e.latlng });
      };
      
      mapInstance.on('click', handleClick);
      return () => {
        mapInstance.off('click', handleClick);
      };
    }
  }, [mapInstance, svgPath, onMapClick]);

  return null;
};

export default MapSVGOverlay;