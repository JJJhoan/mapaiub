import EstadisticaCard from "./EstadisticaCard";
import { useTheme } from "../../context/ThemeContext";

const dataEventos = [
  { mes: "Ene", value: 1 },
  { mes: "Feb", value: 8 },
  { mes: "Mar", value: 4 },
  { mes: "Abr", value: 12 },
  { mes: "May", value: 9 },
  { mes: "Jun", value: 2 },
  { mes: "Jul", value: 1 },
  { mes: "Ago", value: 8 },
  { mes: "Sep", value: 6 },
  { mes: "Oct", value: 12 },
  { mes: "Nov", value: 4 },
  { mes: "Dic", value: 2 }
];

export default function Dashboard() {
  const { isDark } = useTheme();

  return (
    <div className={`transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <h1 className={`text-2xl font-bold mb-5 ${
        isDark ? 'text-gray-100' : 'text-slate-900'
      }`}>
        Estadísticas Generales
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EstadisticaCard
          title="Eventos por Mes"
          value="+2,350"
          change="+180.1% desde el mes pasado"
          data={dataEventos}
          color="#facc15"
          unit="eventos"
        />

        <EstadisticaCard
          title="Sesiones por Usuario"
          value="4.2"
          change="+10% este mes"
          data={[
            { mes: "Ene", value: 3.5 },
            { mes: "Feb", value: 3.8 },
            { mes: "Mar", value: 4.2 },
          ]}
          color="#facc15"
          unit="sesiones"
        />

        <EstadisticaCard
          title="Reservas de Espacios"
          value="127"
          change="+22% respecto al último mes"
          data={[
            { mes: "Ene", value: 45 },
            { mes: "Feb", value: 72 },
            { mes: "Mar", value: 66 },
            { mes: "Abr", value: 91 },
            { mes: "May", value: 127 },
          ]}
          color="#facc15"
          unit="reservas"
        />

        <EstadisticaCard
          title="Eventos Académicos"
          value="38"
          change="-5% este mes"
          data={[
            { mes: "Ene", value: 10 },
            { mes: "Feb", value: 12 },
            { mes: "Mar", value: 7 },
            { mes: "Abr", value: 9 },
          ]}
          color="#facc15"
          unit="eventos"
        />

        <EstadisticaCard
          title="Consultas al Mapa"
          value="1.2K"
          change="+8.7% respecto al mes anterior"
          data={[
            { mes: "Ene", value: 900 },
            { mes: "Feb", value: 950 },
            { mes: "Mar", value: 1100 },
            { mes: "Abr", value: 1200 },
            { mes: "May", value: 1250 },
          ]}
          color="#facc15"
          unit="visitas"
        />

        <EstadisticaCard
          title="Estadistica prueba"
          value="312"
          change="+33.2% este mes"
          data={[
            { mes: "Ene", value: 160 },
            { mes: "Feb", value: 210 },
            { mes: "Mar", value: 230 },
            { mes: "Abr", value: 312 },
          ]}
          color="#facc15"
          unit="Unidad"
        />
      </div>
    </div>
  );
}