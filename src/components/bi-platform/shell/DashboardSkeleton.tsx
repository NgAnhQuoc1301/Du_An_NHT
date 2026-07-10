import React from 'react';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-4 w-96 bg-slate-200 rounded-lg animate-pulse" />
        </div>
        <div className="h-10 w-24 bg-slate-200 rounded-lg animate-pulse" />
      </div>

      {/* Filter Panel Skeleton */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6 h-24 animate-pulse" />

      {/* Primary KPIs Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {[...Array(4)].map((_, i) => (
          <div key={`kpi-pri-${i}`} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-32 animate-pulse" />
        ))}
      </div>

      {/* Secondary KPIs Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={`kpi-sec-${i}`} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm h-24 animate-pulse" />
        ))}
      </div>

      {/* Charts Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-[28px] border border-slate-100 h-[400px] animate-pulse" />
        <div className="lg:col-span-1 bg-white rounded-[28px] border border-slate-100 h-[400px] animate-pulse" />
        <div className="lg:col-span-1 bg-white rounded-[28px] border border-slate-100 h-[400px] animate-pulse" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-100 h-96 animate-pulse" />
    </div>
  );
};
