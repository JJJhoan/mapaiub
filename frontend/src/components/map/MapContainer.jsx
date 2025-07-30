// src/components/map/MapContainer.jsx
import React, { useRef, useEffect, forwardRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import InteractiveAreas from "./InteractiveAreas";
import MapControls from "./MapControls";

const MapContainer = forwardRef(({ className, svgPath, popupData, pisoActual, cambiarPiso, isDark }, ref) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Verificar si ya hay un mapa en este contenedor
    if (mapRef.current._leaflet_id) {
      console.warn("Contenedor de mapa ya inicializado");
      return;
    }

    console.log("Inicializando mapa con SVG:", svgPath);

    // Configuración del mapa Leaflet - SIN límites restrictivos
    const bounds = L.latLngBounds([0, 0], [1200, 1600]); 
    
    const map = L.map(mapRef.current, {
      crs: L.CRS.Simple,
      minZoom: -2,
      maxZoom: 2,
      zoom: -1,
      center: [600, 800],
      attributionControl: false,
    });

    // Añadir SVG como capa de imagen
    const imageOverlay = L.imageOverlay(svgPath, bounds).addTo(map);

    // ELIMINADO: map.setMaxBounds(bounds); - Esto es lo que restringía el movimiento
    // En su lugar, permitimos cierta libertad de movimiento
    // pero podemos establecer límites más amplios si es necesario
    
    map.fitBounds(bounds);
    
    mapInstanceRef.current = map;

    // Limpiar al desmontar
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (error) {
          console.warn("Error al remover el mapa:", error.message);
        }
        mapInstanceRef.current = null;
      }
    };
  }, [svgPath]);

  // Función mejorada para centrar en un área específica por su ID
  const centrarEnArea = (areaId) => {
    if (!mapInstanceRef.current) {
      console.warn("Instancia del mapa no disponible para centrar.");
      return;
    }

    console.log(`Intentando centrar en área: ${areaId}`);

    const intentarCentrar = (intentosRestantes = 10) => {
      // Importar dinámicamente para acceder a la definición de áreas
      import("./InteractiveAreas").then(({ areasInteractivas }) => {
        const area = areasInteractivas.find(a => a.id === areaId);
        
        if (area) {
          // Calcular el centro del rectángulo del área
          const [[lat1, lng1], [lat2, lng2]] = area.bounds;
          const centerLat = (lat1 + lat2) / 2;
          const centerLng = (lng1 + lng2) / 2;
          const center = [centerLat, centerLng];
          
          // Centrar el mapa en ese punto con un zoom más ajustado
          // Usamos zoom 1 para un acercamiento más preciso
          mapInstanceRef.current.setView(center, 1);
          console.log(`Mapa centrado en el área '${areaId}' en el piso ${area.piso}.`);
        } else if (intentosRestantes > 0) {
          // Si no la encontramos, esperar un poco y volver a intentar
          console.log(`Área '${areaId}' no encontrada, reintentando en 100ms... (${intentosRestantes} intentos restantes)`);
          setTimeout(() => intentarCentrar(intentosRestantes - 1), 100);
        } else {
          console.warn(`Área '${areaId}' no encontrada después de varios intentos.`);
        }
      }).catch(err => {
        console.error("Error al importar InteractiveAreas para centrar:", err);
      });
    };

    // Iniciar el proceso de centrado
    intentarCentrar();
  };

  // Exponer funciones al componente padre
  useEffect(() => {
    if (ref) {
      ref.current = {
        centrarEnArea,
        getMapInstance: () => mapInstanceRef.current
      };
    }
  }, [ref]);

  return (
    <div ref={mapRef} className={`${className} w-full h-full relative`}>
      {/* Renderizar InteractiveAreas cuando mapInstance esté disponible */}
      {mapInstanceRef.current && (
        <InteractiveAreas 
          mapInstance={mapInstanceRef.current} 
          pisoActual={pisoActual} 
          popupData={popupData} 
        />
      )}
      
      {/* Renderizar MapControls cuando mapInstance esté disponible */}
      {mapInstanceRef.current && (
        <MapControls
          mapInstance={mapInstanceRef.current}
          isDark={isDark}
          pisoActual={pisoActual}
          cambiarPiso={cambiarPiso}
        />
      )}
    </div>
  );
});

export default MapContainer;