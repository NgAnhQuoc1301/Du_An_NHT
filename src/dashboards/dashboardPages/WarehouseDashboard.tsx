import { useMemo, useState } from 'react';
import { warehouseConfig } from '../../config/dashboards/warehouse.config';
import { WAREHOUSE_DATA } from '../../data/mockData/warehouseData';
import type { WarehouseRecord } from '../../data/mockData/warehouseData';

import { DashboardHeader }   from '../../components/bi-platform/shell/DashboardHeader';
import { GlobalFilterPanel } from '../../components/bi-platform/filters/GlobalFilterPanel';
import { KpiEngine }         from '../../components/bi-platform/kpis/KpiEngine';
import { ChartEngine }       from '../../components/bi-platform/charts/ChartEngine';
import { TableEngine }       from '../../components/bi-platform/tables/TableEngine';

const fmtCurrency = (v: number) => {
  if (Math.abs(v) >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(1)}B`;
  if (Math.abs(v) >= 1_000_000)     return `$${(v / 1_000_000).toFixed(1)}M`;
  if (Math.abs(v) >= 1_000)         return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v}`;
};

function downloadCSV(rows: WarehouseRecord[], filename = 'warehouse_export.csv') {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]) as (keyof WarehouseRecord)[];
  const csv = [keys.join(','), ...rows.map(r => keys.map(k => `"${r[k]}"`).join(','))].join('\n');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: filename,
  });
  a.click(); URL.revokeObjectURL(a.href);
}

const DEFAULT_FILTERS: Record<string, any> = {
  startYear: 2024, endYear: 2026,
  Category: 'Tất cả', Location: 'Tất cả', Status: 'Tất cả', Supplier: 'Tất cả',
};

const KPI_PREMIUM: Record<string, string> = {
  'kpi-total-items':   'from-slate-500 to-slate-700',
  'kpi-stock-value':   'from-blue-500 to-indigo-600',
  'kpi-turnover':      'from-emerald-500 to-teal-600',
  'kpi-low-stock':     'from-red-500 to-rose-600',
};

export default function WarehouseDashboard() {
  const [filters, setFilters] = useState<Record<string, any>>(DEFAULT_FILTERS);
  const [drillDown, setDrillDown] = useState<WarehouseRecord | null>(null);

  const handleChange = (key: string, value: any) => setFilters(p => ({ ...p, [key]: value }));
  const handleReset  = () => setFilters(DEFAULT_FILTERS);

  const filteredData = useMemo(() =>
    WAREHOUSE_DATA.filter(d => {
      const year = new Date(d.LastRestocked).getFullYear();
      if (year < filters.startYear || year > filters.endYear) return false;
      if (filters.Category !== 'Tất cả' && d.Category !== filters.Category) return false;
      if (filters.Location !== 'Tất cả' && d.Location !== filters.Location) return false;
      if (filters.Status   !== 'Tất cả' && d.Status   !== filters.Status)   return false;
      if (filters.Supplier !== 'Tất cả' && d.Supplier !== filters.Supplier) return false;
      return true;
    }), [filters]);

  const kpis = useMemo(() => {
    if (!filteredData.length) return {} as Record<string, any>;
    const n = filteredData.length;
    
    const stockValue = filteredData.reduce((s, d) => s + (d.Stock * d.UnitCost), 0);
    const lowStock   = filteredData.filter(d => d.Stock < d.MinStock).length;
    const activeOrd  = Math.floor(n * 0.4); // Mock active orders
    const avgCost    = filteredData.reduce((s, d) => s + d.UnitCost, 0) / n;
    const uniqueCats = new Set(filteredData.map(d => d.Category)).size;

    return {
      'kpi-total-items':    n,
      'kpi-stock-value':    stockValue,
      'kpi-turnover':       3.2,
      'kpi-low-stock':      lowStock,
      'kpi-total-capacity': '78%',
      'kpi-active-orders':  activeOrd,
      'kpi-avg-cost':       Math.round(avgCost),
      'kpi-categories':     uniqueCats,
    };
  }, [filteredData]);

  const chartData = useMemo(() => {
    // Stock Levels (Composed)
    const stockLevels = filteredData.slice(0, 15).map(d => ({
      name: d.ProductName.slice(0, 10),
      stock: d.Stock,
      minStock: d.MinStock,
    }));

    // Turnover Data (Scatter)
    const turnoverData = filteredData.map(d => ({
      name: d.ProductName,
      turnover: Math.round((d.Stock / (d.MinStock || 1)) * 10) / 10,
      stockValue: d.Stock * d.UnitCost,
    }));

    return { stockLevels, turnoverData };
  }, [filteredData]);

  const kpiDisplay = (id: string): string => {
    const v = kpis[id] ?? 0;
    if (id === 'kpi-stock-value' || id === 'kpi-avg-cost') return fmtCurrency(Number(v));
    if (id === 'kpi-turnover') return `${v}x`;
    if (id === 'kpi-total-capacity') return String(v);
    return String(v);
  };

  const resolveChart = (src?: string): any[] => {
    switch (src) {
      case 'stockLevels':  return chartData.stockLevels;
      case 'turnoverData': return chartData.turnoverData;
      default: return [];
    }
  };

  const getColSpanClass = (span?: number) => {
    switch (span) {
      case 1: return 'lg:col-span-1';
      case 2: return 'lg:col-span-2';
      case 3: return 'lg:col-span-3';
      case 4: return 'lg:col-span-4';
      default: return 'lg:col-span-2';
    }
  };

  const { layout } = warehouseConfig;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      <DashboardHeader config={warehouseConfig} onExport={() => downloadCSV(filteredData)} />
      <GlobalFilterPanel config={warehouseConfig.filters} sourceData={WAREHOUSE_DATA} values={filters} onChange={handleChange} onReset={handleReset} />

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {layout.kpis.map(kpi => (
          <KpiEngine key={kpi.id} config={kpi} value={kpiDisplay(kpi.id)} variant="premium" colorGradient={KPI_PREMIUM[kpi.id]} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {layout.charts.map(chart => (
          <div key={chart.id} className={getColSpanClass(chart.gridSpan)}>
            <ChartEngine config={chart} data={resolveChart(chart.dataSource)} />
          </div>
        ))}
      </div>

      {/* Tables */}
      {layout.tables.map(table => (
        <TableEngine key={table.id} config={table} data={filteredData}
          onRowClick={row => setDrillDown(row as WarehouseRecord)}
          onExport={data => downloadCSV(data as WarehouseRecord[])} />
      ))}

      {/* Drill-down Modal */}
      {drillDown && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDrillDown(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{drillDown.ProductName}</h4>
                <p className="text-sm text-slate-500">{drillDown.SKU} · {drillDown.Category}</p>
              </div>
              <button onClick={() => setDrillDown(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {([
                ['Location',     drillDown.Location],
                ['Trạng thái',       drillDown.Status],
                ['Stock Qty',    drillDown.Stock],
                ['Min Stock',    drillDown.MinStock],
                ['Max Stock',    drillDown.MaxStock],
                ['Unit Cost',    fmtCurrency(drillDown.UnitCost)],
                ['Supplier',     drillDown.Supplier],
                ['Last Restock', drillDown.LastRestocked],
              ] as [string, any][]).map(([label, val]) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">{label}</p>
                  <p className="font-bold text-slate-800">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => downloadCSV([drillDown], `${drillDown.SKU}.csv`)} className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl text-sm transition-colors">📥 Export</button>
              <button onClick={() => setDrillDown(null)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}