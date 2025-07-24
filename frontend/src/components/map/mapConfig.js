export const MAP_CONFIG = {
  // Dimensiones del mapa en coordenadas personalizadas
  bounds: [[0, 0], [1200, 1600]], // [y, x] -> esquina superior izquierda (0,0), inferior derecha (1600,1200)
  
  // Configuración de zoom
  minZoom: -1,
  maxZoom: 3,
  defaultZoom: 0,
  
  // Estilos de marcadores
  markerStyles: {
    default: {
      radius: 8,
      fillColor: "#f59e0b", // color ámbar
      color: "#d97706",     // borde ámbar más oscuro
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    },
    highlighted: {
      radius: 12,
      fillColor: "#3b82f6", // color azul
      color: "#1d4ed8",     // borde azul más oscuro
      weight: 3,
      opacity: 1,
      fillOpacity: 0.9
    }
  },
  
  // Estilo del overlay del SVG
  svgOverlay: {
    className: 'leaflet-svg-overlay',
    interactive: true
  },
  
  // Configuración del mapa base
  mapOptions: {
    crs: L.CRS.Simple,  // Sistema de coordenadas simple (personalizado)
    zoomControl: false,  // Deshabilitamos controles por defecto
    attributionControl: false,
    doubleClickZoom: true,
    boxZoom: true,
    keyboard: true,
    scrollWheelZoom: true,
    dragging: true,
    zoomSnap: 0.1
  }
};

// Coordenadas de ejemplo para pruebas (puedes eliminarlas luego)
export const SAMPLE_POINTS = [
  { id: 1, x: 400, y: 300, nombre: "Punto Noroeste" },
  { id: 2, x: 1200, y: 400, nombre: "Punto Noreste" },
  { id: 3, x: 800, y: 900, nombre: "Punto Central" },
  { id: 4, x: 200, y: 1000, nombre: "Punto Suroeste" },
  { id: 5, x: 1400, y: 1100, nombre: "Punto Sureste" }
];