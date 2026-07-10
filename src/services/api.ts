import { FINANCE_DATA } from '../data/mockData/financeData';
import { PROJECT_DATA } from '../data/mockData/projectData';
import { WORKFLOW_DATA } from '../data/mockData/workflowData';
// Import other data later when migrating other dashboards

// Mock network delay (ms)
const DELAY = 800;

export const dashboardApi = {
  getFinanceData: async () => {
    return new Promise<typeof FINANCE_DATA>((resolve) => {
      setTimeout(() => resolve(FINANCE_DATA), DELAY);
    });
  },
  getProjectData: async () => {
    return new Promise<typeof PROJECT_DATA>((resolve) => {
      setTimeout(() => resolve(PROJECT_DATA), DELAY);
    });
  },
  getWorkflowData: async () => {
    return new Promise<typeof WORKFLOW_DATA>((resolve) => {
      setTimeout(() => resolve(WORKFLOW_DATA), DELAY);
    });
  },
};
