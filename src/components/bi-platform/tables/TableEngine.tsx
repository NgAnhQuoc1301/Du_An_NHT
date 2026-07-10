import React, { useState } from 'react';
import type { BIWidgetConfig } from '../../../types/bi.types';

interface TableEngineProps {
  config: BIWidgetConfig;
  data: any[];
  onRowClick?: (row: any) => void;
  onExport?: (data: any[]) => void;
}

const formatValue = (v: any, type?: 'currency' | 'number' | 'text' | 'badge') => {
  if (type === 'currency') {
    if (Math.abs(v) >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
    if (Math.abs(v) >= 1000) return `$${(v / 1000).toFixed(0)}K`;
    return `$${v}`;
  }
  return v;
};

export const TableEngine: React.FC<TableEngineProps> = React.memo(({ config, data, onRowClick, onExport }) => {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 15;
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const pageRows = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{config.title || 'Bản ghi chi tiết'}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Tìm thấy tổng cộng {data.length} bản ghi</p>
        </div>
        {onExport && (
          <button onClick={() => onExport(data)} className="mt-2 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
            ⬇️ Xuất CSV
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-3 text-center w-12">STT</th>
              {config.columns?.map(col => (
                <th key={col.accessor} className={`p-3 text-${col.align || 'left'}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.length === 0 ? (
              <tr>
                <td colSpan={(config.columns?.length || 0) + 1} className="p-8 text-center text-slate-400 dark:text-slate-500 font-medium bg-slate-50/50 dark:bg-slate-800/50">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-10 h-10 mb-3 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Không có dữ liệu phù hợp với bộ lọc</span>
                  </div>
                </td>
              </tr>
            ) : (
              pageRows.map((r, idx) => {
                const stt = (page - 1) * PAGE_SIZE + idx + 1;
                return (
                  <tr
                    key={r.id || idx}
                    className={`hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                    onClick={() => onRowClick && onRowClick(r)}
                  >
                    <td className="p-3 text-center font-medium text-slate-400 dark:text-slate-300">{stt}</td>
                    {config.columns?.map(col => {
                      const val = r[col.accessor];
                      return (
                        <td key={col.accessor} className={`p-3 text-${col.align || 'left'} ${col.type === 'currency' ? 'font-bold text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-100'}`}>
                          {col.type === 'badge' ? (
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${Number(val) >= 80 ? 'bg-emerald-100 text-emerald-700' : Number(val) >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                              {val}
                            </span>
                          ) : (
                            formatValue(val, col.type)
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Hiển thị từ <span className="font-medium text-slate-900 dark:text-slate-100">{data.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}</span> đến <span className="font-medium text-slate-900 dark:text-slate-100">{Math.min(page * PAGE_SIZE, data.length)}</span> trên tổng số <span className="font-medium text-slate-900 dark:text-slate-100">{data.length}</span> kết quả
        </div>
        <div className="flex gap-1 bg-slate-50 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
          <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${page === 1 ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed' : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm'}`}>
            Trước
          </button>
          <div className="flex items-center px-3 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-700 shadow-sm rounded-md border border-slate-200 dark:border-slate-600">
            {page} / {totalPages}
          </div>
          <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${page === totalPages || totalPages === 0 ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed' : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm'}`}>
            Sau
          </button>
        </div>
      </div>
    </div>
  );
});
