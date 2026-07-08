import React from 'react';
import type { BIWidgetConfig } from '../../../types/bi.types';
import {
  ResponsiveContainer,
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend
} from 'recharts';

interface ChartEngineProps {
  config: BIWidgetConfig;
  data: any[];
}

// Helper to format currency/numbers inside tooltip
const formatValue = (v: any, type?: 'currency' | 'number' | 'percent') => {
  if (type === 'currency') {
    if (Math.abs(v) >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
    if (Math.abs(v) >= 1000) return `$${(v / 1000).toFixed(0)}K`;
    return `$${v}`;
  }
  if (type === 'percent') return `${v}%`;
  return v;
};

export const ChartEngine: React.FC<ChartEngineProps> = ({ config, data }) => {
  const renderChart = () => {
    switch (config.chartType) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
              cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
              formatter={(val: any, name: any, props: any) => {
                const metricConfig = config.metrics?.find(m => m.dataKey === name);
                return [formatValue(val, metricConfig?.type), metricConfig?.label || name];
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
            {config.metrics?.map((metric, idx) => (
              <Line
                key={metric.dataKey}
                type="monotone"
                dataKey={metric.dataKey}
                name={metric.label || metric.dataKey}
                stroke={metric.color || '#10b981'}
                strokeWidth={4}
                dot={{ r: 0 }}
                activeDot={{ r: 6, strokeWidth: 0, fill: metric.color || '#10b981' }}
                style={{ filter: `drop-shadow(0px 6px 8px ${metric.color || '#10b981'}4D)` }}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
              cursor={{ fill: '#f8fafc' }}
              formatter={(val: any, name: any) => {
                const metricConfig = config.metrics?.find(m => m.dataKey === name);
                return [formatValue(val, metricConfig?.type), metricConfig?.label || name];
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
            {config.metrics?.map((metric) => (
              <Bar
                key={metric.dataKey}
                dataKey={metric.dataKey}
                name={metric.label || metric.dataKey}
                fill={metric.color || '#10b981'}
                radius={[8, 8, 8, 8]}
                barSize={24}
              />
            ))}
          </BarChart>
        );

      case 'pie':
        const pieMetric = config.metrics?.[0]?.dataKey || 'value';
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%" cy="50%"
              innerRadius={75} outerRadius={105}
              paddingAngle={6} cornerRadius={10}
              dataKey={pieMetric}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || '#10b981'} style={{ filter: `drop-shadow(0px 4px 6px ${entry.fill || '#10b981'}40)` }} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px', fontWeight: '500' }} />
          </PieChart>
        );

      case 'radar':
        const radarMetric = config.metrics?.[0]?.dataKey || 'score';
        const radarColor = config.metrics?.[0]?.color || '#8b5cf6';
        return (
          <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name={config.metrics?.[0]?.label || "Score"}
              dataKey={radarMetric}
              stroke={radarColor}
              strokeWidth={3}
              fill={radarColor}
              fillOpacity={0.3}
              style={{ filter: `drop-shadow(0px 4px 8px ${radarColor}66)` }}
            />
            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
          </RadarChart>
        );

      default:
        return <div className="flex items-center justify-center h-full text-slate-400">Unsupported chart type: {config.chartType}</div>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[350px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col">
      <h3 className="text-base font-bold text-slate-800 mb-3 relative z-10 flex-shrink-0">{config.title}</h3>
      <div className="flex-1 relative z-10 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
