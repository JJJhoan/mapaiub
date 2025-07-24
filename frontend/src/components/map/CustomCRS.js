import L from 'leaflet';

const CustomCRS = L.extend({}, L.CRS.Simple, {
  // Transformación personalizada para invertir el eje Y
  transformation: new L.Transformation(
    1,    // Escala X (sin cambios)
    0,    // Desplazamiento X
    -1,   // Escala Y (invertido)
    1200  // Desplazamiento Y (altura del mapa)
  ),
  
  // Método para convertir coordenadas
  latLngToPoint: function(latlng, zoom) {
    const point = L.CRS.Simple.latLngToPoint(latlng, zoom);
    return L.point(point.x, 1200 - point.y);
  },
  
  pointToLatLng: function(point, zoom) {
    return L.CRS.Simple.pointToLatLng(
      L.point(point.x, 1200 - point.y), 
      zoom
    );
  }
});

export default CustomCRS;