import React from 'react';
import type { BIWidgetConfig } from '../../../types/bi.types';

interface KpiEngineProps {
  config: BIWidgetConfig;
  value: string | number;
  trend?: string;
  variant?: 'default' | 'premium';
  colorGradient?: string; // e.g. "from-emerald-500 to-teal-600"
}

export const KpiEngine: React.FC<KpiEngineProps> = ({ config, value, trend, variant = 'default', colorGradient }) => {
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
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300 group h-full">
      <p className="text-[11px] font-semibold text-slate-400 group-hover:text-emerald-500 transition-colors">{config.title}</p>
      <p className="text-base font-bold text-slate-800 mt-1">{value}</p>
      {trend && <p className="text-[10px] font-medium text-emerald-500 mt-1">{trend}</p>}
    </div>
  );
};
