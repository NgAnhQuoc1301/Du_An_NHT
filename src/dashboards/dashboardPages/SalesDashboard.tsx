import { useMemo, useState } from 'react';
import { salesConfig } from '../../config/dashboards/sales.config';
import { SALES_DATA, SALES_CHANNEL_COLORS, SALES_CATEGORY_COLORS } from '../../data/mockData/salesData';
import type { SalesRecord } from '../../data/mockData/salesData';

// ── Engine imports ────────────────────────────────────────────────────────────
import { DashboardHeader }   from '../../components/bi-platform/shell/DashboardHeader';
import { GlobalFilterPanel } from '../../components/bi-platform/filters/GlobalFilterPanel';
import { KpiEngine }         from '../../components/bi-platform/kpis/KpiEngine';
import { ChartEngine }       from '../../components/bi-platform/charts/ChartEngine';
import { TableEngine }       from '../../components/bi-platform/tables/TableEngine';

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (v: number, type: 'currency' | 'percent' | 'number' = 'currency'): string => {
  if (type === 'currency') {
    if (Math.abs(v) >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(1)}B`;
    if (Math.abs(v) >= 1_000_000)     return `$${(v / 1_000_000).toFixed(1)}M`;
    if (Math.abs(v) >= 1_000)         return `$${(v / 1_000).toFixed(0)}K`;
    return `$${v}`;
  }
  if (type === 'percent') return `${v}%`;
  return v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v);
};

function downloadCSV(rows: SalesRecord[], filename = 'sales_export.csv') {
  if (!rows.length) { alert('No data'); return; }
  const keys = Object.keys(rows[0]) as (keyof SalesRecord)[];
  const csv = [keys.join(','), ...rows.map(r => keys.map(k => `"${r[k]}"`).join(','))].join('\n');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })),
    download: filename,
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

// ── Default filter state ──────────────────────────────────────────────────────
const DEFAULT_FILTERS: Record<string, any> = {
  startYear:  2025,
  endYear:    2026,
  Region:     'All',
  Channel:    'All',
  Category:   'All',
  SalesPerson:'All',
};

// ── KPI gradient map ──────────────────────────────────────────────────────────
const KPI_PREMIUM: Record<string, string> = {
  'kpi-revenue':     'from-blue-500 to-indigo-600',
  'kpi-profit':      'from-emerald-500 to-teal-600',
  'kpi-orders':      'from-purple-500 to-violet-600',
  'kpi-customers':   'from-amber-500 to-orange-600',
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function SalesDashboard() {
  const [filters, setFilters] = useState<Record<string, any>>(DEFAULT_FILTERS);
  const [drillDownRow, setDrillDownRow] = useState<SalesRecord | null>(null);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  const handleReset = () => setFilters(DEFAULT_FILTERS);

  // ── Filtered dataset ──────────────────────────────────────────────────────
  const filteredData = useMemo(() =>
    SALES_DATA.filter(d => {
      if (d.Year < filters.startYear || d.Year > filters.endYear) return false;
      if (filters.Region      !== 'All' && d.Region      !== filters.Region)      return false;
      if (filters.Channel     !== 'All' && d.Channel     !== filters.Channel)     return false;
      if (filters.Category    !== 'All' && d.Category    !== filters.Category)    return false;
      if (filters.SalesPerson !== 'All' && d.SalesPerson !== filters.SalesPerson) return false;
      return true;
    }),
  [filters]);

  // ── KPI aggregation ───────────────────────────────────────────────────────
  const kpis = useMemo(() => {
    if (!filteredData.length) return {} as Record<string, number>;
    const n = filteredData.length;
    const sum = (fn: (d: SalesRecord) => number) => filteredData.reduce((s, d) => s + fn(d), 0);
    const avg = (fn: (d: SalesRecord) => number) => Math.round((sum(fn) / n) * 10) / 10;
    const totalRevenue = sum(d => d.Revenue);
    const totalCost    = sum(d => d.Cost);
    return {
      'kpi-revenue':     totalRevenue,
      'kpi-profit':      totalRevenue - totalCost,
      'kpi-orders':      sum(d => d.Orders),
      'kpi-customers':   sum(d => d.Customers),
      'kpi-avg-order':   Math.round(totalRevenue / sum(d => d.Orders)),
      'kpi-margin':      avg(d => ((d.Revenue - d.Cost) / d.Revenue) * 100),
      'kpi-conversion':  avg(d => d.ConversionRate),
      'kpi-achievement': avg(d => d.AchievementRate),
    };
  }, [filteredData]);

  // ── Chart data ────────────────────────────────────────────────────────────
  const chartData = useMemo(() => {
    // Revenue Trend — group by Year+Month
    const trendMap = new Map<string, { revenue: number; profit: number; target: number }>();
    filteredData.forEach(d => {
      const key = `${d.Year} ${d.Month}`;
      const ex = trendMap.get(key) ?? { revenue: 0, profit: 0, target: 0 };
      trendMap.set(key, {
        revenue: ex.revenue + d.Revenue,
        profit:  ex.profit  + d.Profit,
        target:  ex.target  + d.Target,
      });
    });
    const MONTH_ORDER = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const revenueTrend = Array.from(trendMap, ([name, v]) => ({ name, ...v }))
      .sort((a, b) => {
        const [aYear, aMonth] = a.name.split(' ');
        const [bYear, bMonth] = b.name.split(' ');
        if (aYear !== bYear) return Number(aYear) - Number(bYear);
        return MONTH_ORDER.indexOf(aMonth) - MONTH_ORDER.indexOf(bMonth);
      });

    // Channel mix (Donut)
    const channelMap = new Map<string, number>();
    filteredData.forEach(d => {
      channelMap.set(d.Channel, (channelMap.get(d.Channel) ?? 0) + d.Revenue);
    });
    const channelMix = Array.from(channelMap, ([name, value]) => ({
      name,
      value,
      fill: SALES_CHANNEL_COLORS[name] ?? '#64748b',
    }));

    // Category summary (Bar)
    const catMap = new Map<string, { revenue: number; profit: number }>();
    filteredData.forEach(d => {
      const ex = catMap.get(d.Category) ?? { revenue: 0, profit: 0 };
      catMap.set(d.Category, { revenue: ex.revenue + d.Revenue, profit: ex.profit + d.Profit });
    });
    const categorySummary = Array.from(catMap, ([name, v]) => ({ name, ...v }));

    // Region summary (Bar)
    const regionMap = new Map<string, { revenue: number; orders: number }>();
    filteredData.forEach(d => {
      const ex = regionMap.get(d.Region) ?? { revenue: 0, orders: 0 };
      regionMap.set(d.Region, { revenue: ex.revenue + d.Revenue, orders: ex.orders + d.Orders });
    });
    const regionSummary = Array.from(regionMap, ([name, v]) => ({ name, ...v }));

    return { revenueTrend, channelMix, categorySummary, regionSummary };
  }, [filteredData]);

  // ── KPI display value ─────────────────────────────────────────────────────
  const kpiDisplay = (id: string): string => {
    const v = kpis[id] ?? 0;
    if (['kpi-revenue', 'kpi-profit', 'kpi-avg-order'].includes(id)) return fmt(v, 'currency');
    if (['kpi-margin', 'kpi-conversion', 'kpi-achievement'].includes(id)) return `${v}%`;
    return fmt(v, 'number');
  };

  // ── Chart data resolver ────────────────────────────────────────────────────
  const resolveChart = (src?: string): any[] => {
    switch (src) {
      case 'revenueTrend':   return chartData.revenueTrend;
      case 'channelMix':     return chartData.channelMix;
      case 'categorySummary':return chartData.categorySummary;
      case 'regionSummary':  return chartData.regionSummary;
      default:               return [];
    }
  };

  const { layout } = salesConfig;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <DashboardHeader config={salesConfig} onExport={() => downloadCSV(filteredData)} />

      {/* ── Filters ─────────────────────────────────────────────────────────── */}
      <GlobalFilterPanel
        config={salesConfig.filters}
        sourceData={SALES_DATA}
        values={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* ── Primary KPI Row (gradient cards) ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {layout.kpis.slice(0, 4).map(kpi => (
          <KpiEngine
            key={kpi.id}
            config={kpi}
            value={kpiDisplay(kpi.id)}
            variant="premium"
            colorGradient={KPI_PREMIUM[kpi.id]}
          />
        ))}
      </div>

      {/* ── Secondary KPI Row (compact cards) ────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {layout.kpis.slice(4).map(kpi => (
          <KpiEngine
            key={kpi.id}
            config={kpi}
            value={kpiDisplay(kpi.id)}
            variant="default"
          />
        ))}
      </div>

      {/* ── Charts Grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {layout.charts.map(chart => (
          <ChartEngine
            key={chart.id}
            config={chart}
            data={resolveChart(chart.dataSource)}
          />
        ))}
      </div>

      {/* ── Detail Table ──────────────────────────────────────────────────── */}
      {layout.tables.map(table => (
        <TableEngine
          key={table.id}
          config={table}
          data={filteredData}
          onRowClick={row => setDrillDownRow(row as SalesRecord)}
          onExport={data => downloadCSV(data as SalesRecord[])}
        />
      ))}

      {/* ── Drill-down Modal ───────────────────────────────────────────────── */}
      {drillDownRow && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setDrillDownRow(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-lg font-bold text-slate-900">Sales Record #{drillDownRow.id}</h4>
                <p className="text-sm text-slate-500">{drillDownRow.SalesPerson} · {drillDownRow.Region}</p>
              </div>
              <button onClick={() => setDrillDownRow(null)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {([
                ['Region',       drillDownRow.Region],
                ['Country',      drillDownRow.Country],
                ['Sales Rep',    drillDownRow.SalesPerson],
                ['Channel',      drillDownRow.Channel],
                ['Category',     drillDownRow.Category],
                ['Product',      drillDownRow.Product],
                ['Revenue',      fmt(drillDownRow.Revenue)],
                ['Profit',       fmt(drillDownRow.Profit)],
                ['Orders',       drillDownRow.Orders],
                ['Customers',    drillDownRow.Customers],
                ['Avg Order Val',fmt(drillDownRow.AvgOrderValue)],
                ['Achievement',  `${drillDownRow.AchievementRate}%`],
                ['CSAT',         `${drillDownRow.SatisfactionScore}/5.0`],
                ['Return Rate',  `${drillDownRow.ReturnRate}%`],
              ] as [string, any][]).map(([label, val]) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">{label}</p>
                  <p className="font-bold text-slate-800">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => downloadCSV([drillDownRow], `sales_record_${drillDownRow.id}.csv`)}
                className="flex-1 py-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                📥 Export Record
              </button>
              <button
                onClick={() => setDrillDownRow(null)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}