import React from 'react';
import type { BIWidgetConfig } from '../../../types/bi.types';

interface KpiEngineProps {
  config: BIWidgetConfig;
  value: string | number;
  trend?: string;
  variant?: 'default' | 'premium';
  colorGradient?: string; // e.g. "from-emerald-500 to-teal-600"
}

export const KpiEngine: React.FC<KpiEngineProps> = React.memo(({ config, value, trend, variant = 'default', colorGradient }) => {
  if (variant === 'premium' && colorGradient) {
    return (
      <div className={`bg-gradient-to-br ${colorGradient} p-6 rounded-2xl shadow-lg text-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full`}>
        <p className="text-sm font-medium text-white/80 mb-1">{config.title}</p>
        <p className="text-3xl font-extrabold">{value}</p>
        {trend && <p className="text-xs font-semibold text-white/90 mt-2">{trend}</p>}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
      {/* Decorative gradient blur in background */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-10 dark:opacity-20 transition-opacity group-hover:opacity-20 dark:group-hover:opacity-30 ${config.trend === 'up' ? 'bg-emerald-500' : config.trend === 'down' ? 'bg-rose-500' : 'bg-blue-500'}`} />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            {config.title}
          </p>
          <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
});
