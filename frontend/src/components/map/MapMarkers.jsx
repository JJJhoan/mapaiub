import React, { useEffect } from 'react';
import L from 'leaflet';
import { MAP_CONFIG } from './mapConfig';

const MapMarkers = ({ mapInstance, events, onMarkerClick }) => {
  useEffect(() => {
    if (!mapInstance || !events) return;

    const markersLayer = L.layerGroup().addTo(mapInstance);

    events.forEach(event => {
      if (event.x && event.y) {
        // Usamos los estilos definidos en mapConfig
        const markerStyles = event.highlighted 
          ? MAP_CONFIG.markerStyles.highlighted 
          : MAP_CONFIG.markerStyles.default;

        // Convertir coordenadas (y, x) para Leaflet
        const marker = L.circleMarker(
          [event.y, event.x], // y=0 es arriba (ya invertido en MapContainer)
          {
            ...markerStyles,
            // Puedes sobrescribir propiedades específicas si es necesario
            className: `event-marker ${event.type ? `marker-${event.type}` : ''}`
          }
        ).addTo(markersLayer);

        // Tooltip con información básica
        if (event.nombre) {
          marker.bindTooltip(event.nombre, {
            permanent: false,
            direction: 'top',
            className: 'marker-tooltip'
          });
        }

        // Popup con más detalles
        if (onMarkerClick) {
          marker.on('click', () => onMarkerClick(event));
          
          // Opcional: Mostrar más info en hover
          marker.on('mouseover', () => {
            marker.openTooltip();
          });
        }
      }
    });

    return () => {
      markersLayer.clearLayers();
      markersLayer.remove();
    };
  }, [mapInstance, events, onMarkerClick]);

  return null;
};

export default MapMarkers;