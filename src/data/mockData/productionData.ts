export interface ProductionRecord {
  id: string;
  Year: number;
  Month: string;
  Date: string; // YYYY-MM-DD
  Plant: string; // 'Plant A', 'Plant B', 'Plant C'
  Line: string; // 'Dây chuyền 1', 'Dây chuyền 2', etc.
  ProductType: string;
  Shift: string; // 'Morning', 'Afternoon', 'Night'
  OutputTarget: number;
  OutputActual: number;
  Defects: number;
  DowntimeMinutes: number;
  EnergyConsumed: number; // kWh
  OEE: number; // Overall Equipment Effectiveness %
  Supervisor: string;
}

const PLANTS = ['Plant A - Hanoi', 'Plant B - HCM', 'Plant C - Da Nang'];
const LINES = ['Dây chuyền 1', 'Dây chuyền 2', 'Dây chuyền 3', 'Dây chuyền 4'];
const PRODUCTS = ['Điều hòa 1HP', 'Điều hòa 2HP', 'Tủ lạnh Side-by-Side', 'Máy giặt 8kg', 'Máy giặt 10kg'];
const SHIFTS = ['Morning', 'Afternoon', 'Night'];
const SUPERVISORS = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function generateProductionData(): ProductionRecord[] {
  const data: ProductionRecord[] = [];
  let id = 1;

  for (const year of [2025, 2026]) {
    for (let m = 0; m < MONTHS.length; m++) {
      const monthStr = MONTHS[m];
      const monthNum = String(m + 1).padStart(2, '0');
      
      // Generate 2 random days per month to keep record count manageable
      for (const day of [5, 20]) {
        const dateStr = `${year}-${monthNum}-${String(day).padStart(2, '0')}`;
        
        for (const plant of PLANTS) {
          for (const line of LINES) {
            for (const shift of SHIFTS) {
              const target = 400 + Math.floor(Math.random() * 200);
              // Actual is usually close to target, sometimes lower
              const actual = Math.floor(target * (0.8 + Math.random() * 0.25));
              const defects = Math.floor(actual * (0.005 + Math.random() * 0.03)); // 0.5% to 3.5%
              const downtime = Math.floor(Math.random() * 60); // 0 to 60 mins per shift
              
              const availability = (480 - downtime) / 480; // 8 hours = 480 mins
              const performance = actual / target;
              const quality = (actual - defects) / actual;
              const oee = availability * performance * quality * 100;

              data.push({
                id: `PRD-${10000 + id++}`,
                Year: year,
                Month: monthStr,
                Date: dateStr,
                Plant: plant,
                Line: line,
                ProductType: PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)],
                Shift: shift,
                OutputTarget: target,
                OutputActual: actual,
                Defects: defects,
                DowntimeMinutes: downtime,
                EnergyConsumed: Math.round(actual * (15 + Math.random() * 5)),
                OEE: Math.min(100, Math.max(0, Math.round(oee * 10) / 10)),
                Supervisor: SUPERVISORS[Math.floor(Math.random() * SUPERVISORS.length)],
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

export const PRODUCTION_DATA = generateProductionData();

export const PROD_PLANT_COLORS: Record<string, string> = {
  'Plant A - Hanoi': '#3b82f6',
  'Plant B - HCM': '#10b981',
  'Plant C - Da Nang': '#f59e0b',
};

export const PROD_LINE_COLORS: Record<string, string> = {
  'Dây chuyền 1': '#3b82f6',
  'Dây chuyền 2': '#10b981',
  'Dây chuyền 3': '#8b5cf6',
  'Dây chuyền 4': '#f59e0b',
};