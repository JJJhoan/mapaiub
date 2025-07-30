// src/components/map/InteractiveAreas.jsx
import React, { useEffect } from 'react';
import L from 'leaflet';

// Manteniendo exactamente tus coordenadas
const areasInteractivas = [
  // Primer piso
  { id: 'salon_1', bounds: [[243, 126], [329, 246]], color: '#4682B4', piso: 1 }, 
  { id: 'biblioteca', bounds: [[419, 729], [624, 542]], color: '#ADD8E6', piso: 1 }, 
  { id: 'bienestar', bounds: [[243, 246], [329, 370]], color: '#FFD700', piso: 1 }, 
  // Segundo piso - Manteniendo tus coordenadas exactas
  { id: 'auditorio', bounds: [[756, 1157], [550, 1351]], color: '#9370DB', piso: 2 }
];

export function determinarPisoDeUbicacion(ubicacionId) {
  if (!ubicacionId) return 1;
  
  const area = areasInteractivas.find(a => a.id === ubicacionId);
  return area ? area.piso : 1;
}

// Exportar areasInteractivas para que otros componentes puedan usarla
export { areasInteractivas };

const InteractiveAreas = ({ mapInstance, pisoActual, popupData }) => {
  useEffect(() => {
    // Verificación de seguridad inicial
    if (!mapInstance) {
      console.warn("Mapa no disponible en InteractiveAreas useEffect");
      return;
    }

    let interactiveLayerGroup;
    let isMounted = true;

    try {
      // Crear un grupo de capas para las áreas interactivas
      interactiveLayerGroup = L.layerGroup();
      
      // Añadir el grupo de capas al mapa
      interactiveLayerGroup.addTo(mapInstance);
      
      // Limpiar capas anteriores del grupo si existen
      interactiveLayerGroup.clearLayers();

      // Filtrar áreas por piso actual
      const areasDelPiso = areasInteractivas.filter(area => area.piso === pisoActual);

      areasDelPiso.forEach(area => {
        // Verificar si el efecto aún está montado
        if (!isMounted) return;

        const { id, bounds, color } = area;

        // Crear un rectángulo completamente invisible inicialmente
        const rectangle = L.rectangle(bounds, {
          color: color,
          weight: 0,
          fillColor: color,
          fillOpacity: 0,
          interactive: true
        });

        // Mostrar borde y relleno al hover
        rectangle.on('mouseover', function (e) {
          if (isMounted && this._map) {
            this.setStyle({
              weight: 2,
              fillOpacity: 0.3,
            });
          }
        });

        // Ocultar borde y relleno al salir del hover
        rectangle.on('mouseout', function (e) {
          if (isMounted && this._map) {
            this.setStyle({
              weight: 0,
              fillOpacity: 0,
            });
          }
        });

        // Obtener datos del popup correspondiente
        const location = popupData.find(loc => loc.elementId === id);
        let popupContent = '';

        if (location) {
          popupContent = `
            <div class="leaflet-popup-content p-2 max-w-xs">
              <h3 class="font-bold text-lg mb-1">${location.title}</h3>
              <p class="text-sm text-gray-600 mb-2">${location.description}</p>
              
              ${location.image ? `
                <img src="${location.image}" 
                     class="w-full h-24 object-cover rounded mb-2"
                     alt="${location.title}">
              ` : ''}
              
              ${location.detalles ? `
                <div class="mt-2">
                  <ul class="text-xs space-y-1">
                    ${location.detalles.map(detalle => `
                      <li class="p-1 bg-gray-50 rounded">
                        <strong>${detalle.nombre}:</strong> ${detalle.valor}
                      </li>
                    `).join('')}
                  </ul>
                </div>
              ` : ''}
              
              ${location.horario ? `
                <div class="mt-2 p-2 bg-blue-50 rounded">
                  <strong>Horario:</strong> ${location.horario}
                </div>
              ` : ''}
            </div>
          `;
        } else {
          popupContent = `
            <div class="leaflet-popup-content p-2">
              <h3 class="font-bold text-lg mb-1">${id}</h3>
              <p class="text-sm text-gray-600">Información no disponible.</p>
            </div>
          `;
        }

        // Asociar el popup al rectángulo
        rectangle.bindPopup(popupContent, {
          minWidth: 250,
          maxWidth: 350
        });

        // Verificar si el efecto aún está montado antes de añadir al grupo
        if (isMounted && interactiveLayerGroup) {
          try {
            interactiveLayerGroup.addLayer(rectangle);
          } catch (addLayerError) {
            console.warn("Error al añadir capa:", addLayerError.message);
          }
        }
      });

    } catch (error) {
      console.error("Error al crear áreas interactivas:", error);
      // Limpiar en caso de error
      if (interactiveLayerGroup && mapInstance) {
        try {
          mapInstance.removeLayer(interactiveLayerGroup);
        } catch (removeError) {
          console.warn("Error al remover capas:", removeError.message);
        }
      }
      return;
    }

    // Función de limpieza
    return () => {
      isMounted = false;
      
      // Remover el grupo de capas del mapa
      if (mapInstance && interactiveLayerGroup) {
        try {
          if (mapInstance.hasLayer(interactiveLayerGroup)) {
            mapInstance.removeLayer(interactiveLayerGroup);
          }
        } catch (removeError) {
          console.warn("Error al remover capas interactivas:", removeError.message);
        }
      }
    };
  }, [mapInstance, pisoActual, popupData]);

  return null;
};

export default InteractiveAreas;