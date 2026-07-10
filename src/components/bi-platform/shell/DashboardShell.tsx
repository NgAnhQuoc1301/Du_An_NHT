import React from 'react';
import type { BIDashboardConfig } from '../../../types/bi.types';
import { DashboardHeader } from './DashboardHeader';

interface DashboardShellProps {
  config: BIDashboardConfig;
  data?: any[]; // Inject data for the dashboard
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ config }) => {
  const handleExport = () => {
    console.log("Export triggered for", config.name);
    // TODO: Connect to ExportEngine
  };

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <DashboardHeader config={config} onExport={handleExport} />

      {/* Global Filter Panel Placeholder */}
      {config.filters && config.filters.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
          <p className="text-sm font-semibold text-slate-400">GlobalFilterPanel</p>
          <div className="flex gap-4 mt-2">
            {config.filters.map(filter => (
              <div key={filter.id} className="px-3 py-1 bg-slate-100 rounded text-xs text-slate-600">
                {filter.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KPIs Engine Placeholder */}
      {config.layout.kpis && config.layout.kpis.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
          {config.layout.kpis.map(kpi => (
            <div key={kpi.id} className={`bg-white p-4 rounded-xl shadow-sm border border-slate-100 col-span-${kpi.gridSpan || 1}`}>
              <p className="text-xs font-semibold text-slate-400">{kpi.title}</p>
              <p className="text-lg font-bold text-slate-300 mt-2">KpiEngine</p>
            </div>
          ))}
        </div>
      )}

      {/* Charts Engine Placeholder */}
      {config.layout.charts && config.layout.charts.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          {config.layout.charts.map(chart => (
            <div key={chart.id} className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[350px] col-span-${chart.gridSpan || 1}`}>
              <h3 className="text-base font-bold text-slate-800 mb-4">{chart.title}</h3>
              <div className="flex items-center justify-center h-full w-full bg-slate-50 rounded-lg text-slate-400 font-medium border border-dashed border-slate-200">
                ChartEngine: {chart.chartType}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tables Engine Placeholder */}
      {config.layout.tables && config.layout.tables.length > 0 && (
        <div className="space-y-6 mb-6">
          {config.layout.tables.map(table => (
            <div key={table.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-base font-bold text-slate-800 mb-4">{table.title}</h3>
              <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200 text-slate-400">
                TableEngine Placeholder
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
