import React, { useMemo } from 'react';
import type { BIFilterConfig } from '../../../types/bi.types';

interface GlobalFilterPanelProps {
  config: BIFilterConfig[];
  sourceData: Record<string, any>[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onReset: () => void;
}

export const GlobalFilterPanel: React.FC<GlobalFilterPanelProps> = ({
  config,
  sourceData,
  values,
  onChange,
  onReset,
}) => {
  // Dynamically build select options from data if not provided in config
  const dynamicOptions = useMemo(() => {
    const opts: Record<string, string[]> = {};
    config.forEach(f => {
      if (f.type === 'select') {
        if (f.options && f.options.length > 0) {
          opts[f.id] = f.options;
        } else {
          // Auto-derive from data source field matching filter id
          const uniq = Array.from(new Set(sourceData.map((d: any) => d[f.id]).filter(Boolean)));
          opts[f.id] = ['Tất cả', ...uniq.sort()];
        }
      }
    });
    return opts;
  }, [config, sourceData]);

  return (
    <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 flex-1">
          {config.map(filter => (
            <div key={filter.id}>
              <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wide">
                {filter.label}
              </label>
              {filter.type === 'select' && (
                <select
                  value={values[filter.id] ?? filter.defaultValue ?? 'Tất cả'}
                  onChange={e => onChange(filter.id, e.target.value)}
                  className="w-full px-3 py-2 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all cursor-pointer"
                >
                  {(dynamicOptions[filter.id] || []).map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
              {filter.type === 'date-range' && (
                <input
                  type="number"
                  value={values[filter.id] ?? filter.defaultValue}
                  onChange={e => onChange(filter.id, Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                  min={2020}
                  max={2030}
                />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={onReset}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
        >
          ↺ Đặt lại
        </button>
      </div>
    </div>
  );
};
