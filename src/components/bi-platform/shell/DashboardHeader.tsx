import React from 'react';
import type { BIDashboardConfig } from '../../../types/bi.types';

interface DashboardHeaderProps {
  config: BIDashboardConfig;
  onExport?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ config, onExport }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-xl border border-slate-800 text-white relative overflow-hidden mb-6">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs rounded-full">NHT SOLUTIONS</span>
          <h1 className="text-3xl font-extrabold tracking-tight">{config.name}</h1>
        </div>
        <p className="text-slate-400 font-medium mt-2">{config.description}</p>
      </div>
      {onExport && (
        <button onClick={onExport} className="relative z-10 mt-4 md:mt-0 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-300 flex items-center gap-2">
          📥 Export CSV
        </button>
      )}
    </div>
  );
};
