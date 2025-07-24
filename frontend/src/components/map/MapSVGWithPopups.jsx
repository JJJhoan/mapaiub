import React, { useEffect } from 'react';
import L from 'leaflet';

const MapSVGWithPopups = ({ mapInstance, svgPath, popupData }) => {
  useEffect(() => {
    if (!mapInstance || !svgPath) return;

    // Coordenadas predefinidas para cada elemento del SVG
    const elementCoords = {
      'sala-101': [400, 300],
      'laboratorio-3': [700, 500],
      // Agrega más coordenadas según tus elementos SVG
    };

    // Cargar el SVG como overlay
    const svgOverlay = L.imageOverlay(svgPath, [[0, 0], [1200, 1600]], {
      interactive: true
    }).addTo(mapInstance);

    // Añadir popups a las ubicaciones
    popupData.forEach(location => {
      const coords = elementCoords[location.elementId];
      if (coords) {
        const [x, y] = coords;
        
        const popupContent = `
          <div class="leaflet-popup-content p-2">
            <h3 class="font-bold text-lg mb-1">${location.title}</h3>
            <p class="text-sm text-gray-600 mb-2">${location.description}</p>
            
            ${location.image ? `
              <img src="${location.image}" 
                   class="w-full h-24 object-cover rounded mb-2"
                   alt="${location.title}">
            ` : ''}
            
            ${location.eventos.length > 0 ? `
              <div class="mt-2">
                <h4 class="font-semibold text-sm mb-1">Eventos programados:</h4>
                <ul class="text-xs space-y-1">
                  ${location.eventos.map(evento => `
                    <li class="p-1 bg-amber-50 rounded">
                      <strong>${evento.nombre}</strong><br>
                      ${format(new Date(evento.fecha_inicio), 'dd/MM/yy')} - 
                      ${evento.hora_inicio.substring(0, 5)}
                    </li>
                  `).join('')}
                </ul>
              </div>
            ` : `
              <p class="text-xs text-gray-500 italic">No hay eventos programados</p>
            `}
          </div>
        `;

        // Marcador invisible para el popup
        L.marker([y, x], {
          opacity: 0,
          interactive: true
        })
        .bindPopup(popupContent)
        .addTo(mapInstance);
      }
    });

    return () => {
      mapInstance.removeLayer(svgOverlay);
    };
  }, [mapInstance, svgPath, popupData]);

  return null;
};

export default MapSVGWithPopups;