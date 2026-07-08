import { useMemo, useState } from 'react';
import { financeConfig } from '../../config/dashboards/finance.config';
import { FINANCE_DATA, FINANCE_EXPENSE_COLORS } from '../../data/mockData/financeData';
import type { FinanceRecord } from '../../data/mockData/financeData';

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

function downloadCSV(rows: FinanceRecord[], filename = 'finance_export.csv') {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]) as (keyof FinanceRecord)[];
  const csv = [keys.join(','), ...rows.map(r => keys.map(k => `"${r[k]}"`).join(','))].join('\n');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: filename,
  });
  a.click(); URL.revokeObjectURL(a.href);
}

const DEFAULT_FILTERS: Record<string, any> = {
  startYear: 2025, endYear: 2026,
  Department: 'All', AccountType: 'All', Category: 'All',
};

const KPI_PREMIUM: Record<string, string> = {
  'kpi-revenue':    'from-emerald-500 to-teal-600',
  'kpi-expense':    'from-rose-500 to-pink-600',
  'kpi-profit':     'from-blue-500 to-indigo-600',
  'kpi-margin':     'from-amber-500 to-orange-600',
};

export default function FinanceDashboard() {
  const [filters, setFilters] = useState<Record<string, any>>(DEFAULT_FILTERS);
  const [drillDown, setDrillDown] = useState<FinanceRecord | null>(null);

  const handleChange = (key: string, value: any) => setFilters(p => ({ ...p, [key]: value }));
  const handleReset  = () => setFilters(DEFAULT_FILTERS);

  const filteredData = useMemo(() =>
    FINANCE_DATA.filter(d => {
      if (d.Year < filters.startYear || d.Year > filters.endYear) return false;
      if (filters.Department  !== 'All' && d.Department  !== filters.Department)  return false;
      if (filters.AccountType !== 'All' && d.AccountType !== filters.AccountType) return false;
      if (filters.Category    !== 'All' && d.Category    !== filters.Category)    return false;
      return true;
    }), [filters]);

  const kpis = useMemo(() => {
    if (!filteredData.length) return {} as Record<string, any>;
    const revData = filteredData.filter(d => d.AccountType === 'Revenue');
    const expData = filteredData.filter(d => d.AccountType === 'Expense');
    
    const sum = (arr: FinanceRecord[], fn: (d: FinanceRecord) => number) => arr.reduce((s, d) => s + fn(d), 0);
    
    const revenue = sum(revData, d => d.Amount);
    const expense = sum(expData, d => d.Amount);
    const profit = revenue - expense;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    
    const revBudget = sum(revData, d => d.Budget);
    const expBudget = sum(expData, d => d.Budget);
    const budgetVariance = (revenue - revBudget) + (expBudget - expense); // Fav variance

    return {
      'kpi-revenue':    revenue,
      'kpi-expense':    expense,
      'kpi-profit':     profit,
      'kpi-margin':     Math.round(margin * 10) / 10,
      'kpi-budget-var': budgetVariance,
      'kpi-roi':        Math.round((profit / (expense || 1)) * 100 * 10) / 10,
      'kpi-liquidity':  1.8 + (Math.random() * 0.4), // Mock ratio
      'kpi-debt':       35 - (Math.random() * 5),    // Mock ratio
    };
  }, [filteredData]);

  const chartData = useMemo(() => {
    // Profit Trend
    const trendMap = new Map<string, { revenue: number; expense: number }>();
    filteredData.forEach(d => {
      const key = `${d.Year} ${d.Month}`;
      const ex = trendMap.get(key) ?? { revenue: 0, expense: 0 };
      if (d.AccountType === 'Revenue') ex.revenue += d.Amount;
      else ex.expense += d.Amount;
      trendMap.set(key, ex);
    });
    
    const MONTH_ORDER = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const profitTrend = Array.from(trendMap, ([name, v]) => ({
      name, revenue: v.revenue, expense: v.expense, profit: v.revenue - v.expense
    })).sort((a, b) => {
      const [aYear, aMonth] = a.name.split(' ');
      const [bYear, bMonth] = b.name.split(' ');
      if (aYear !== bYear) return Number(aYear) - Number(bYear);
      return MONTH_ORDER.indexOf(aMonth) - MONTH_ORDER.indexOf(bMonth);
    });

    // Expense Breakdown
    const expMap = new Map<string, number>();
    filteredData.filter(d => d.AccountType === 'Expense').forEach(d => {
      expMap.set(d.Category, (expMap.get(d.Category) ?? 0) + d.Amount);
    });
    const expenseBreakdown = Array.from(expMap, ([name, value]) => ({
      name, value, fill: FINANCE_EXPENSE_COLORS[name] ?? '#64748b'
    }));

    // Budget Variance by Dept
    const varMap = new Map<string, number>();
    filteredData.forEach(d => {
      varMap.set(d.Department, (varMap.get(d.Department) ?? 0) + d.Variance);
    });
    const budgetVariance = Array.from(varMap, ([name, variance]) => ({ name, variance }));

    return { profitTrend, expenseBreakdown, budgetVariance };
  }, [filteredData]);

  const kpiDisplay = (id: string): string => {
    const v = kpis[id] ?? 0;
    if (['kpi-revenue', 'kpi-expense', 'kpi-profit', 'kpi-budget-var'].includes(id)) return fmtCurrency(v);
    if (['kpi-margin', 'kpi-roi', 'kpi-debt'].includes(id)) return `${v}%`;
    return typeof v === 'number' && !Number.isInteger(v) ? v.toFixed(2) : String(v);
  };

  const resolveChart = (src?: string): any[] => {
    switch (src) {
      case 'profitTrend':      return chartData.profitTrend;
      case 'expenseBreakdown': return chartData.expenseBreakdown;
      case 'budgetVariance':   return chartData.budgetVariance;
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

  const { layout } = financeConfig;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      <DashboardHeader config={financeConfig} onExport={() => downloadCSV(filteredData)} />
      <GlobalFilterPanel config={financeConfig.filters} sourceData={FINANCE_DATA} values={filters} onChange={handleChange} onReset={handleReset} />

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {layout.kpis.slice(0, 4).map(kpi => (
          <KpiEngine key={kpi.id} config={kpi} value={kpiDisplay(kpi.id)} variant="premium" colorGradient={KPI_PREMIUM[kpi.id]} />
        ))}
      </div>
      
      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {layout.kpis.slice(4).map(kpi => (
          <KpiEngine key={kpi.id} config={kpi} value={kpiDisplay(kpi.id)} variant="default" />
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
          onRowClick={row => setDrillDown(row as FinanceRecord)}
          onExport={data => downloadCSV(data as FinanceRecord[])} />
      ))}

      {/* Drill-down Modal */}
      {drillDown && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDrillDown(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{drillDown.id} - {drillDown.Category}</h4>
                <p className="text-sm text-slate-500">{drillDown.Month} {drillDown.Year} · {drillDown.Department}</p>
              </div>
              <button onClick={() => setDrillDown(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {([
                ['Department',   drillDown.Department],
                ['Account Type', drillDown.AccountType],
                ['Category',     drillDown.Category],
                ['Description',  drillDown.Description],
                ['Amount',       fmtCurrency(drillDown.Amount)],
                ['Budget',       fmtCurrency(drillDown.Budget)],
                ['Variance',     fmtCurrency(drillDown.Variance)],
                ['Currency',     drillDown.Currency],
              ] as [string, any][]).map(([label, val]) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">{label}</p>
                  <p className="font-bold text-slate-800">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => downloadCSV([drillDown], `${drillDown.id}.csv`)} className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl text-sm transition-colors">📥 Export</button>
              <button onClick={() => setDrillDown(null)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}