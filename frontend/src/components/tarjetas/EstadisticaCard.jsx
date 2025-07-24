import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useTheme } from "../../context/ThemeContext";

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`
        p-2 rounded-md text-xs border
        ${isDark ? 
          'bg-gray-800 border-amber-500 text-amber-100' : 
          'bg-white border-amber-400 text-gray-800'}
      `}>
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
  color = "#facc15",
  dataKey = "value",
  unit = "",
  strokeColor = "#eb8116",
  fillColor = "#facc15",
}) {
  const { isDark } = useTheme();

  return (
    <div className={`
      rounded-xl p-4 w-full max-w-lg shadow-md border-2 transition-colors duration-300
      ${isDark ? 
        'bg-gray-700 border-gray-600 text-gray-100' : 
        'bg-gray-100 border-slate-300 text-slate-900'}
    `}>
      <div className="flex justify-between items-center mb-4">
        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-900'}`}>{title}</span>
        <button className={`text-sm hover:underline ${
          isDark ? 'text-amber-400' : 'text-slate-800'
        }`}>
          Ver Más
        </button>
      </div>
      <div className={`text-3xl font-bold mb-1 ${
        isDark ? 'text-amber-400' : 'text-slate-900'
      }`}>
        {value}
      </div>
      <div className={`text-sm mb-4 ${
        isDark ? 'text-gray-400' : 'text-slate-700'
      }`}>
        {change}
      </div>
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis
              dataKey="mes"
              stroke={isDark ? "#94a3b8" : "#334155"}
              tick={{ fill: isDark ? "#facc15" : "#e76800", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip isDark={isDark} />} />
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