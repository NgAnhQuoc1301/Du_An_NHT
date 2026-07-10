import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { BIDashboardConfig } from '../../../types/bi.types';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { Moon, Sun, Languages, ArrowLeft } from 'lucide-react';

interface DashboardHeaderProps {
  config: BIDashboardConfig;
  onExport?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ config, onExport }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');
  };

  return (
    <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-emerald-100 dark:border-slate-800 shadow-[0_4px_30px_rgba(16,185,129,0.08)] dark:shadow-none transition-all duration-300 z-10">
      
      {/* Decorative Blurs */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none -z-10">
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-[40px]" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-teal-400/15 dark:bg-teal-500/10 rounded-full blur-[40px]" />
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-white dark:bg-slate-800 text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md"
          title="Quay lại"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 font-bold text-[10px] tracking-wider rounded-full uppercase">NHT SOLUTIONS</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{config.name}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{config.description}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95"
          title={theme === 'dark' ? t('common.light_mode') : t('common.dark_mode')}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {onExport && (
          <button 
            onClick={onExport}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 hover:from-slate-700 hover:to-slate-800 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.23)] hover:-translate-y-0.5 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t('common.export')}
          </button>
        )}
      </div>
    </div>
  );
};
