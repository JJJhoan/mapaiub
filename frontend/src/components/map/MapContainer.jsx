import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapContainer = ({ children, className }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        crs: L.CRS.Simple,
        minZoom: -1,
        maxZoom: 3,
        zoomControl: false,
        attributionControl: false,
        doubleClickZoom: true,
        scrollWheelZoom: true
      });

      // Ajustar los límites del mapa
      const bounds = [[0, 0], [1200, 1600]];
      mapInstance.current.fitBounds(bounds);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      className={`relative w-full h-full ${className}`}
      style={{ cursor: 'grab' }}
    >
      {React.Children.map(children, child => 
        React.cloneElement(child, { mapInstance: mapInstance.current })
      )}
    </div>
  );
};

export default MapContainer;