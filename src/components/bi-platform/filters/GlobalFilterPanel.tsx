import React, { useMemo } from 'react';
import type { BIFilterConfig } from '../../../types/bi.types';
import { useFilterStore } from '../../../store/useFilterStore';
import { useTranslation } from 'react-i18next';

interface GlobalFilterPanelProps {
  config: BIFilterConfig[];
  sourceData?: Record<string, any>[];
  values?: Record<string, any>;
  onChange?: (key: string, value: any) => void;
  onReset?: () => void;
}

export const GlobalFilterPanel: React.FC<GlobalFilterPanelProps> = React.memo(({
  config,
  sourceData = [],
  values,
  onChange,
  onReset,
}) => {
  const { dateRange, region, department, setDateRange, setRegion, setDepartment, resetFilters } = useFilterStore();
  const { t } = useTranslation();

  // Map Zustand state to filter IDs (fallback)
  const getFilterValue = (id: string) => {
    if (values) return values[id] ?? 'Tất cả';
    switch (id) {
      case 'dateRange': return dateRange;
      case 'region': return region;
      case 'department': return department;
      default: return 'Tất cả';
    }
  };

  const setFilterValue = (id: string, value: any) => {
    if (onChange) {
      onChange(id, value);
      return;
    }
    switch (id) {
      case 'dateRange': setDateRange(value); break;
      case 'region': setRegion(value); break;
      case 'department': setDepartment(value); break;
    }
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      resetFilters();
    }
  };

  const dynamicOptions = useMemo(() => {
    const opts: Record<string, string[]> = {};
    config.forEach(f => {
      if (f.type === 'select') {
        if (f.options && f.options.length > 0) {
          opts[f.id] = f.options;
        } else if (sourceData.length > 0) {
          const uniq = Array.from(new Set(sourceData.map(d => d[f.id]).filter(Boolean)));
          opts[f.id] = ['Tất cả', ...uniq.sort()];
        } else {
           opts[f.id] = ['Tất cả'];
        }
      }
    });
    return opts;
  }, [config, sourceData]);

  return (
    <div className="bg-white dark:bg-slate-900 p-4 md:p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 flex-1">
          {config.map(filter => (
            <div key={filter.id}>
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                {filter.label}
              </label>
              {filter.type === 'select' && (
                <select
                  value={getFilterValue(filter.id)}
                  onChange={e => setFilterValue(filter.id, e.target.value)}
                  className="w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-500 focus:border-emerald-400 transition-all cursor-pointer"
                >
                  {(dynamicOptions[filter.id] || []).map(opt => (
                    <option key={opt} value={opt}>
                      {opt === 'Tất cả' || opt === 'this_month' ? (filter.defaultValue || 'Tất cả') : opt}
                    </option>
                  ))}
                </select>
              )}
              {filter.type === 'date-range' && (
                <input
                  type="number"
                  value={getFilterValue(filter.id) ?? filter.defaultValue}
                  onChange={e => setFilterValue(filter.id, Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                  min={2020}
                  max={2030}
                />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleReset}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
        >
          ↺ {t('common.reset')}
        </button>
      </div>
    </div>
  );
});
