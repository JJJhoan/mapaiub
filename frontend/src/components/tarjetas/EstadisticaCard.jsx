import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const CustomTooltip = ({ active, payload, label, color = "#1e293b" }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ 
        backgroundColor: "#fef9c3", // fondo tooltip: amarillo claro
        padding: "8px", 
        borderRadius: "6px", 
        color: color,
        fontSize: "12px",
        border: "1px solid #fde68a" // borde suave amarillo
      }}>
        <p><strong>{label}</strong>: {payload[0].value} {payload[0].name}</p>
      </div>
    );
  }
  return null;
};

export default function EstadisticaCard({
  title = "Título",
  value = "+0",
  change = "+0% desde el mes pasado",
  data = [],
  color = "#facc15", // amarillo (amber-300)
  dataKey = "value",
  unit = "",
  strokeColor = "#facc15",
  fillColor = "#facc15",
}) {
  return (
    <div className="bg-white rounded-xl p-4 text-slate-900 w-full max-w-lg shadow-md border border-yellow-100">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-slate-700">{title}</span>
        <button className="text-sm text-blue-900 hover:underline">Ver Más</button>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-amber-500 mb-4">{change}</div>
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis
              dataKey="mes"
              stroke="#334155" // azul oscuro claro
              tick={{ fill: "#1e293b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip color={color} />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              name={unit}
              stroke={strokeColor}
              fill={fillColor}
              strokeWidth={2}
              fillOpacity={0.2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
