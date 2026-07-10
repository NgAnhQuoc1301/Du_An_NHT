import React from 'react';
import type { BIWidgetConfig } from '../../../types/bi.types';
import {
  ResponsiveContainer,
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area, ComposedChart,
  ScatterChart, Scatter,
  FunnelChart, Funnel, LabelList,
  RadialBarChart, RadialBar,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend
} from 'recharts';

interface ChartEngineProps {
  config: BIWidgetConfig;
  data: any[];
}

const formatValue = (v: any, type?: 'currency' | 'number' | 'percent') => {
  if (type === 'currency') {
    if (Math.abs(v) >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
    if (Math.abs(v) >= 1000) return `$${(v / 1000).toFixed(0)}K`;
    return `$${v}`;
  }
  if (type === 'percent') return `${v}%`;
  return v;
};

// Premium Tooltip
const CustomTooltip = ({ active, payload, label, config }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-xl p-4 md:p-5 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-slate-100/80 min-w-[180px] z-50">
        {label && (
          <p className="text-slate-400 font-bold mb-3 text-xs uppercase tracking-wider border-b border-slate-100/80 pb-2">
            {label}
          </p>
        )}
        <div className="space-y-3">
          {payload.map((entry: any, index: number) => {
            const mConfig = config.metrics?.find((m: any) => m.dataKey === entry.dataKey || m.label === entry.name);
            const type = mConfig?.type;
            const val = formatValue(entry.value, type);
            const color = entry?.color || entry?.payload?.fill || mConfig?.color || '#10b981';
            
            return (
              <div key={index} className="flex items-center gap-6 justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full shadow-sm ring-2 ring-white" style={{ backgroundColor: color }} />
                  <span className="text-slate-600 text-sm font-semibold">{entry.name}</span>
                </div>
                <span className="text-slate-900 font-extrabold text-sm font-mono">{val}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

// SVG Filters & Gradients (Premium Look)
const ChartDefs = ({ metrics }: { metrics: any[] }) => (
  <defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2" />
    </filter>
    {metrics?.map((m: any) => (
      <React.Fragment key={m.dataKey}>
        <linearGradient id={`grad-${m.dataKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={m.color || '#10b981'} stopOpacity={1}/>
          <stop offset="100%" stopColor={m.color || '#10b981'} stopOpacity={0.4}/>
        </linearGradient>
        <linearGradient id={`area-${m.dataKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={m.color || '#10b981'} stopOpacity={0.6}/>
          <stop offset="95%" stopColor={m.color || '#10b981'} stopOpacity={0.05}/>
        </linearGradient>
      </React.Fragment>
    ))}
  </defs>
);

export const ChartEngine: React.FC<ChartEngineProps> = React.memo(({ config, data }) => {
  const renderChart = () => {
    if (!data || data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
          <svg className="w-10 h-10 mb-3 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-sm font-medium">Không có dữ liệu</span>
        </div>
      );
    }

    switch (config.chartType) {
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 15, right: 15, left: -20, bottom: 5 }}>
            <ChartDefs metrics={config.metrics || []} />
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} tickMargin={12} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} tickMargin={12} />
            <Tooltip content={<CustomTooltip config={config} />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: '600', color: '#64748b' }} iconType="circle" iconSize={8} />
            {config.metrics?.map((metric) => (
              <Line
                key={metric.dataKey}
                type="natural"
                dataKey={metric.dataKey}
                name={metric.label || metric.dataKey}
                stroke={metric.color || '#10b981'}
                strokeWidth={4}
                dot={{ r: 0 }}
                activeDot={{ r: 7, strokeWidth: 3, fill: '#fff', stroke: metric.color || '#10b981' }}
                filter="url(#shadow)"
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data} barGap={8} margin={{ top: 15, right: 15, left: -20, bottom: 5 }}>
            <ChartDefs metrics={config.metrics || []} />
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} tickMargin={12} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} tickMargin={12} />
            <Tooltip content={<CustomTooltip config={config} />} cursor={{ fill: '#f8fafc', opacity: 0.6 }} />
            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: '600', color: '#64748b' }} iconType="circle" iconSize={8} />
            {config.metrics?.map((metric) => (
              <Bar
                key={metric.dataKey}
                dataKey={metric.dataKey}
                name={metric.label || metric.dataKey}
                fill={`url(#grad-${metric.dataKey})`}
                radius={[8, 8, 0, 0]}
                barSize={24}
                filter="url(#shadow)"
              />
            ))}
          </BarChart>
        );

      case 'pie':
        const pieMetric = config.metrics?.[0]?.dataKey || 'value';
        return (
          <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <ChartDefs metrics={config.metrics || []} />
            <Pie
              data={data}
              cx="50%" cy="50%"
              innerRadius="65%" outerRadius="85%"
              paddingAngle={5} cornerRadius={10}
              dataKey={pieMetric}
              stroke="none"
              filter="url(#shadow)"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || '#10b981'} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip config={config} />} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }} iconSize={8} />
          </PieChart>
        );

      case 'radar':
        const radarMetric = config.metrics?.[0]?.dataKey || 'score';
        const radarColor = config.metrics?.[0]?.color || '#8b5cf6';
        return (
          <RadarChart data={data} margin={{ top: 15, right: 30, bottom: 15, left: 30 }}>
            <ChartDefs metrics={config.metrics || []} />
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name={config.metrics?.[0]?.label || "Score"}
              dataKey={radarMetric}
              stroke={radarColor}
              strokeWidth={3}
              fill={radarColor}
              fillOpacity={0.3}
              filter="url(#shadow)"
            />
            <Tooltip content={<CustomTooltip config={config} />} />
          </RadarChart>
        );

      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 15, right: 15, left: -20, bottom: 5 }}>
            <ChartDefs metrics={config.metrics || []} />
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} tickMargin={12} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} tickMargin={12} />
            <Tooltip content={<CustomTooltip config={config} />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: '600', color: '#64748b' }} iconType="circle" iconSize={8} />
            {config.metrics?.map((metric) => (
              <Area
                key={metric.dataKey}
                type="natural"
                dataKey={metric.dataKey}
                name={metric.label || metric.dataKey}
                stroke={metric.color || '#10b981'}
                fillOpacity={1}
                fill={`url(#area-${metric.dataKey})`}
                strokeWidth={3}
              />
            ))}
          </AreaChart>
        );

      case 'composed':
        return (
          <ComposedChart data={data} margin={{ top: 15, right: 15, left: -20, bottom: 5 }}>
            <ChartDefs metrics={config.metrics || []} />
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} tickMargin={12} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} tickMargin={12} />
            <Tooltip content={<CustomTooltip config={config} />} cursor={{ fill: '#f8fafc', opacity: 0.6 }} />
            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: '600', color: '#64748b' }} iconType="circle" iconSize={8} />
            {config.metrics?.map((metric, idx) => {
              if (idx === 0) {
                return (
                  <Bar
                    key={metric.dataKey}
                    dataKey={metric.dataKey}
                    name={metric.label || metric.dataKey}
                    fill={`url(#grad-${metric.dataKey})`}
                    radius={[8, 8, 0, 0]}
                    barSize={24}
                    filter="url(#shadow)"
                  />
                );
              }
              return (
                <Line
                  key={metric.dataKey}
                  type="natural"
                  dataKey={metric.dataKey}
                  name={metric.label || metric.dataKey}
                  stroke={metric.color || '#f59e0b'}
                  strokeWidth={4}
                  dot={{ r: 0 }}
                  activeDot={{ r: 7, strokeWidth: 3, fill: '#fff', stroke: metric.color || '#f59e0b' }}
                  filter="url(#glow)"
                />
              );
            })}
          </ComposedChart>
        );

      case 'scatter':
        const xMetric = config.metrics?.[0]?.dataKey || 'x';
        const yMetric = config.metrics?.[1]?.dataKey || 'y';
        const scatterColor = config.metrics?.[0]?.color || '#8b5cf6';
        return (
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
            <XAxis type="number" dataKey={xMetric} name={config.metrics?.[0]?.label || xMetric} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} tickMargin={10} />
            <YAxis type="number" dataKey={yMetric} name={config.metrics?.[1]?.label || yMetric} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} tickMargin={10} />
            <Tooltip cursor={{ strokeDasharray: '4 4', stroke: '#cbd5e1' }} content={<CustomTooltip config={config} />} />
            <Scatter name={config.title} data={data} fill={scatterColor}>
               {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill || scatterColor} />
               ))}
            </Scatter>
          </ScatterChart>
        );

      case 'funnel':
        const funnelMetric = config.metrics?.[0]?.dataKey || 'value';
        return (
          <FunnelChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <Tooltip content={<CustomTooltip config={config} />} />
            <Funnel dataKey={funnelMetric} data={data}>
              <LabelList position="right" fill="#475569" stroke="none" dataKey="name" fontSize={13} fontWeight={600} />
              <LabelList position="center" fill="#fff" stroke="none" dataKey={funnelMetric} fontSize={15} fontWeight="bold" />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || '#10b981'} />
              ))}
            </Funnel>
          </FunnelChart>
        );

      case 'radialBar':
        const radialMetric = config.metrics?.[0]?.dataKey || 'value';
        return (
          <RadialBarChart
            cx="50%" cy="50%" innerRadius="40%" outerRadius="100%"
            barSize={20}
            data={data}
            startAngle={180} endAngle={0}
          >
            <RadialBar background={{ fill: '#f1f5f9' }} dataKey={radialMetric} cornerRadius={12}>
               {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill || '#3b82f6'} />
               ))}
            </RadialBar>
            <Legend iconSize={8} wrapperStyle={{ bottom: 0, fontSize: '12px', fontWeight: '600', color: '#64748b' }} />
            <Tooltip content={<CustomTooltip config={config} />} cursor={false} />
          </RadialBarChart>
        );

      default:
        return <div className="flex items-center justify-center h-full text-slate-400 font-medium bg-slate-50/50 rounded-xl border border-dashed border-slate-200">Unsupported chart type: {config.chartType}</div>;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-7 rounded-[28px] shadow-[0_8px_30px_-15px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_-15px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800 h-[400px] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 transition-all duration-500 ease-out relative flex flex-col group">
      <div className="flex justify-between items-center mb-6 relative z-10 flex-shrink-0">
        <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">{config.title}</h3>
      </div>
      <div className="flex-1 relative z-10 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
});
