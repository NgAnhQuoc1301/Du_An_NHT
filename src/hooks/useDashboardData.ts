import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../services/api';

export const useFinanceData = () => {
  return useQuery({
    queryKey: ['financeData'],
    queryFn: dashboardApi.getFinanceData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProjectData = () => {
  return useQuery({
    queryKey: ['projectData'],
    queryFn: dashboardApi.getProjectData,
    staleTime: 5 * 60 * 1000,
  });
};

export const useWorkflowData = () => {
  return useQuery({
    queryKey: ['workflowData'],
    queryFn: dashboardApi.getWorkflowData,
    staleTime: 5 * 60 * 1000,
  });
};
