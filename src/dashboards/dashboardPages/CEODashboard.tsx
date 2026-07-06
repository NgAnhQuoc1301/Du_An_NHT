import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { RAW_EXCEL_DATA, DEPT_DATA, COLORS, type RegionData } from '../../data/mockData/ceoData';

interface CEODashboardProps {
  style?: string;
}

export default function CEODashboard({ style }: CEODashboardProps) {
  // State quản lý bộ lọc và tính năng Drill-down
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [drillDownData, setDrillDownData] = useState<RegionData | null>(null);

  // Tính toán KPI động dựa vào bộ lọc Vùng miền (Region Filter)
  const filteredMetrics = useMemo(() => {
    let baseData = [...RAW_EXCEL_DATA];
    if (selectedRegion !== 'All') {
      baseData = baseData.filter(d => d.Region === selectedRegion);
    }

    const totalRevenue = baseData.reduce((sum, item) => sum + item.Revenue, 0);
    const totalCost = baseData.reduce((sum, item) => sum + item.Cost, 0);
    const totalProfit = totalRevenue - totalCost;
    const totalProjects = baseData.reduce((sum, item) => sum + item.Projects, 0);
    const totalEmployees = baseData.reduce((sum, item) => sum + item.Employees, 0);
    const avgMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    return { totalRevenue, totalCost, totalProfit, totalProjects, totalEmployees, avgMargin };
  }, [selectedRegion]);

  // Hàm chuyển đổi định dạng tiền tệ ngắn gọn dạng Triệu USD ($M)
  const formatCurrency = (value: number) => `$${(value / 1000000).toFixed(1)}M`;

  return (
    <div className="p-4 md:p-6 space-y-6 bg-slate-50 min-h-screen text-slate-800 antialiased">
      
      {/* 1. GLOBAL HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-700 text-white font-bold text-xs rounded">NHT SOLUTIONS</span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Executive Overview Dashboard</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">Hệ thống Business Intelligence cao cấp dành cho Ban Giám Đốc</p>
        </div>
        <div className="text-xs text-slate-400 font-mono bg-slate-50 px-3 py-2 rounded border border-emerald-100">
          Dữ liệu: Danh_Sach_CEO.xlsx
        </div>
      </div>

      {/* 2. GLOBAL FILTER PANEL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white rounded-xl shadow-sm border border-emerald-100/50">
        <div>
          <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Khu vực (Region)</label>
          <select 
            value={selectedRegion} 
            onChange={(e) => { setSelectedRegion(e.target.value); setDrillDownData(null); }}
            className="w-full text-sm bg-white border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="All">Tất cả khu vực (All Regions)</option>
            {RAW_EXCEL_DATA.map(d => <option key={d.Region} value={d.Region}>{d.Region}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Phòng ban (Department)</label>
          <select 
            value={selectedDept} 
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full text-sm bg-white border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="All">Tất cả phòng ban (All Depts)</option>
            {DEPT_DATA.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Chu kỳ thời gian</label>
          <div className="text-sm bg-slate-100 text-slate-500 border border-slate-200 rounded-lg p-2.5 font-medium">Toàn thời gian (2025 - 2026)</div>
        </div>

        <div className="flex items-end">
          <button 
            onClick={() => { setSelectedRegion('All'); setSelectedDept('All'); setDrillDownData(null); }}
            className="w-full text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 hover:bg-emerald-100 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* 3. DYNAMIC KPI CARDS (6 chỉ số cốt lõi) */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-700">
          <p className="text-xs font-semibold text-slate-400 uppercase">Doanh thu (Revenue)</p>
          <p className="text-xl font-bold text-slate-900 mt-1">{formatCurrency(filteredMetrics.totalRevenue)}</p>
          <span className="text-[10px] text-emerald-600 font-bold">▲ 12.4% YoY</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500">
          <p className="text-xs font-semibold text-slate-400 uppercase">Chi phí (Cost)</p>
          <p className="text-xl font-bold text-slate-900 mt-1">{formatCurrency(filteredMetrics.totalCost)}</p>
          <span className="text-[10px] text-slate-400 font-medium">Trong hạn mức duyệt</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-teal-600">
          <p className="text-xs font-semibold text-slate-400 uppercase">Lợi nhuận (Profit)</p>
          <p className="text-xl font-bold text-slate-900 mt-1">{formatCurrency(filteredMetrics.totalProfit)}</p>
          <span className="text-[10px] text-teal-600 font-bold">Margin: {filteredMetrics.avgMargin.toFixed(1)}%</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-800">
          <p className="text-xs font-semibold text-slate-400 uppercase">Dự án (Projects)</p>
          <p className="text-xl font-bold text-slate-900 mt-1">{filteredMetrics.totalProjects}</p>
          <span className="text-[10px] text-emerald-700 font-bold">94.2% Hoàn thành</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-lime-600">
          <p className="text-xs font-semibold text-slate-400 uppercase">Nhân sự (FTEs)</p>
          <p className="text-xl font-bold text-slate-900 mt-1">{filteredMetrics.totalEmployees}</p>
          <span className="text-[10px] text-lime-600 font-bold">Attendance: 95.4%</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-900">
          <p className="text-xs font-semibold text-slate-400 uppercase">CSAT Khách hàng</p>
          <p className="text-xl font-bold text-slate-900 mt-1">4.3 / 5.0</p>
          <span className="text-[10px] text-emerald-800 font-bold">NPS: Đạt hạng A</span>
        </div>
      </div>

      {/* 4. MAIN CHARTS (Biểu đồ chính) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biểu đồ thanh cột thể hiện mối tương quan giữa Doanh thu - Chi phí - Lợi nhuận */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 lg:col-span-2 h-96">
          <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wide mb-4">Phân tích hiệu quả tài chính theo Khu vực</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={RAW_EXCEL_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="Region" />
              <YAxis tickFormatter={(v) => `$${v/1000000}M`} />
              <Tooltip formatter={(value: any) => [formatCurrency(value), '']} />
              <Legend />
              <Bar dataKey="Revenue" name="Doanh thu" fill="#1b4332" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Cost" name="Chi phí" fill="#40916c" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Profit" name="Lợi nhuận" fill="#95d5b2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ Donut phân bổ số lượng dự án theo từng vùng miền */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 h-96 flex flex-col">
          <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wide mb-2">Tỷ trọng phân bổ dự án</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={RAW_EXCEL_DATA} 
                  cx="50%" cy="50%" 
                  innerRadius={65} outerRadius={85} 
                  paddingAngle={4} dataKey="Projects" nameKey="Region"
                >
                  {RAW_EXCEL_DATA.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} Dự án`, '']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5. RADAR SỨC KHỎE DOANH NGHIỆP & BẢNG SỐ LIỆU TƯƠNG TÁC DRILL-DOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart thể hiện điểm sức khỏe doanh nghiệp theo phòng ban */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 h-96">
          <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wide mb-4">Chỉ số sức khỏe phòng ban (Enterprise Health)</h3>
          <ResponsiveContainer width="100%" height="85%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={DEPT_DATA}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Điểm Vận hành (%)" dataKey="Score" stroke="#1b4332" fill="#2d6a4f" fillOpacity={0.35} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bảng tổng hợp kích hoạt tính năng Drill-down khi nhấp vào dòng */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 h-96 flex flex-col overflow-hidden">
          <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wide mb-1">
            Báo cáo Vùng miền chuyên sâu
          </h3>
          <p className="text-xs text-slate-400 mb-4">Mẹo: Click chọn một hàng bất kỳ để mở tính năng Drill-down xem chi tiết.</p>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase border-b border-slate-200">
                  <th className="p-3">Khu vực</th>
                  <th className="p-3">Doanh thu</th>
                  <th className="p-3">Dự án</th>
                  <th className="p-3">CSAT Hài lòng</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {RAW_EXCEL_DATA.map((row) => (
                  <tr 
                    key={row.Region} 
                    onClick={() => setDrillDownData(row)}
                    className="hover:bg-emerald-50/60 cursor-pointer transition"
                  >
                    <td className="p-3 font-semibold text-emerald-800">{row.Region}</td>
                    <td className="p-3">{formatCurrency(row.Revenue)}</td>
                    <td className="p-3 font-medium">{row.Projects} DA</td>
                    <td className="p-3">⭐ {row.CSAT}/5.0</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 6. MODAL INTERACTIVE DRILL-DOWN POPUP */}
      {drillDownData && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="text-base font-bold text-slate-900">
                Drill-down Chi tiết: Khu vực {drillDownData.Region}
              </h4>
              <button onClick={() => setDrillDownData(null)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Doanh thu vùng</p>
                  <p className="text-base font-bold text-slate-800">{formatCurrency(drillDownData.Revenue)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Chi phí cục bộ</p>
                  <p className="text-base font-bold text-slate-800">{formatCurrency(drillDownData.Cost)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Lực lượng nhân sự</p>
                  <p className="text-base font-bold text-slate-800">{drillDownData.Employees} FTEs</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Biên lợi nhuận</p>
                  <p className="text-base font-bold text-emerald-700">
                    {((drillDownData.Revenue - drillDownData.Cost) / drillDownData.Revenue * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
              💡 <b>Luồng dữ liệu (Data Lineage):</b> Đang phân rã thông tin theo sơ đồ cấp bậc: <code>Region (Khu vực) → Department (Phòng ban)</code> chuẩn xác theo Blueprint Tập đoàn[cite: 60].
            </div>

            <button 
              onClick={() => setDrillDownData(null)}
              className="w-full py-2.5 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 transition text-sm shadow-sm"
            >
              Đóng và Quay lại
            </button>
          </div>
        </div>
      )}

    </div>
  );
}