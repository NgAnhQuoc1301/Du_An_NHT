import { create } from 'zustand';

export interface FilterState {
  dateRange: string;
  region: string;
  department: string;
  setDateRange: (range: string) => void;
  setRegion: (region: string) => void;
  setDepartment: (department: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  dateRange: 'this_month',
  region: 'all',
  department: 'all',
  
  setDateRange: (range) => set({ dateRange: range }),
  setRegion: (region) => set({ region }),
  setDepartment: (department) => set({ department }),
  
  resetFilters: () => set({
    dateRange: 'this_month',
    region: 'all',
    department: 'all',
  }),
}));
