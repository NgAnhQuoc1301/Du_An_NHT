export interface FinanceRecord {
  id: string;
  Year: number;
  Quarter: string;
  Month: string;
  Department: string;
  AccountType: string; // 'Doanh thu' | 'Chi phí' | 'Asset' | 'Liability'
  Category: string;
  Description: string;
  Amount: number;
  Budget: number;
  Variance: number; // Budget - Amount or Amount - Budget
  Currency: string;
}

const DEPARTMENTS = ['Corporate', 'Bán hàng', 'Marketing', 'Engineering', 'HR', 'Vận hành', 'CNTT'];
const ACCOUNT_TYPES = ['Doanh thu', 'Chi phí'];
const CATEGORIES: Record<string, string[]> = {
  'Doanh thu': ['Product Sales', 'Service Fees', 'Subscriptions', 'Consulting', 'Licensing'],
  'Chi phí': ['Lương', 'Marketing', 'Rent', 'Phần mềm', 'Travel', 'Utilities', 'Legal'],
};

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
const MONTHS: Record<string, string[]> = {
  Q1: ['Jan', 'Feb', 'Mar'],
  Q2: ['Apr', 'May', 'Jun'],
  Q3: ['Jul', 'Aug', 'Sep'],
  Q4: ['Oct', 'Nov', 'Dec'],
};

function generateFinanceData(): FinanceRecord[] {
  const data: FinanceRecord[] = [];
  let id = 1;

  for (const year of [2025, 2026]) {
    for (const quarter of QUARTERS) {
      for (const month of MONTHS[quarter]) {
        for (const dept of DEPARTMENTS) {
          for (const accType of ACCOUNT_TYPES) {
            // Not every department generates revenue
            if (accType === 'Doanh thu' && !['Corporate', 'Bán hàng', 'Vận hành'].includes(dept)) {
              continue;
            }

            const categories = CATEGORIES[accType];
            const numRecords = 2 + Math.floor(Math.random() * 3); // 2 to 4 records per dept per month per type

            for (let i = 0; i < numRecords; i++) {
              const category = categories[Math.floor(Math.random() * categories.length)];
              
              let baseAmount = 0;
              if (accType === 'Doanh thu') {
                baseAmount = 100_000_000 + Math.random() * 500_000_000;
              } else {
                if (category === 'Lương') baseAmount = 200_000_000 + Math.random() * 100_000_000;
                else if (category === 'Rent') baseAmount = 50_000_000;
                else baseAmount = 10_000_000 + Math.random() * 80_000_000;
              }
              
              const amount = Math.round(baseAmount);
              // Budget varies by +/- 15%
              const budget = Math.round(amount * (0.85 + Math.random() * 0.3));
              const variance = accType === 'Doanh thu' ? amount - budget : budget - amount; // positive is favorable

              data.push({
                id: `FIN-${id++}`,
                Year: year,
                Quarter: quarter,
                Month: month,
                Department: dept,
                AccountType: accType,
                Category: category,
                Description: `${category} - ${month} ${year}`,
                Amount: amount,
                Budget: budget,
                Variance: variance,
                Currency: 'VND',
              });

              if (id > 800) break;
            }
            if (id > 800) break;
          }
          if (id > 800) break;
        }
        if (id > 800) break;
      }
      if (id > 800) break;
    }
  }

  return data;
}

export const FINANCE_DATA = generateFinanceData();

export const FINANCE_EXPENSE_COLORS: Record<string, string> = {
  'Lương': '#3b82f6',
  Marketing: '#10b981',
  Rent: '#f59e0b',
  'Phần mềm': '#8b5cf6',
  Travel: '#ef4444',
  Utilities: '#06b6d4',
  Legal: '#ec4899',
};