export interface CRMRecord {
  id: string;
  Company: string;
  Contact: string;
  Industry: string;
  Region: string;
  Source: string; // 'Trang web', 'Giới thiệu', 'Mạng xã hội', 'Trực tiếp', 'Sự kiện'
  Stage: string; // 'Cơ hội', 'Đủ ĐK', 'Đề xuất', 'Đàm phán', 'Thắng', 'Thua'
  Status: string; // 'Hot', 'Warm', 'Cold' (for active), 'Closed' (for won/lost)
  Value: number;
  Probability: number; // %
  ExpectedCloseDate: string; // YYYY-MM
  Year: number;
  Month: string;
  SalesPerson: string;
}

const INDUSTRIES = ['Công nghệ', 'Sản xuất', 'Bán lẻ', 'Tài chính', 'Y tế', 'Giáo dục'];
const REGIONS = ['Miền Bắc', 'Miền Nam', 'Miền Đông', 'Miền Tây', 'Miền Trung'];
const SOURCES = ['Trang web', 'Giới thiệu', 'Mạng xã hội', 'Trực tiếp', 'Sự kiện'];
const STAGES = ['Cơ hội', 'Đủ ĐK', 'Đề xuất', 'Đàm phán', 'Thắng', 'Thua'];
const SALESPERSONS = ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Văn Cường', 'Phạm Thị Dung', 'Hoàng Văn Em'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const COMPANIES = ['Công ty ABC', 'Tập đoàn XYZ', 'Công ty DEF', 'Doanh nghiệp MNP', 'Công ty GHI', 'StartUp Vina', 'TechCorp', 'GreenEnergy', 'PharmaCare', 'EduPro'];
const CONTACTS = ['Hoàng Long', 'Thu Hương', 'Quang Hải', 'Bích Ngọc', 'Văn Toàn', 'Thị Yến', 'Tuấn Anh', 'Mai Phương', 'Đức Thịnh', 'Thanh Trà'];

function generateCRMData(): CRMRecord[] {
  const data: CRMRecord[] = [];
  let id = 1;

  for (const year of [2025, 2026]) {
    for (const month of MONTHS) {
      const numLeads = 15 + Math.floor(Math.random() * 25);
      
      for (let i = 0; i < numLeads; i++) {
        const stage = STAGES[Math.floor(Math.random() * STAGES.length)];
        let status = 'Cold';
        let probability = 10;
        
        switch (stage) {
          case 'Cơ hội': probability = 10 + Math.random() * 10; status = Math.random() > 0.5 ? 'Warm' : 'Cold'; break;
          case 'Đủ ĐK': probability = 30 + Math.random() * 15; status = 'Warm'; break;
          case 'Đề xuất': probability = 50 + Math.random() * 20; status = 'Hot'; break;
          case 'Đàm phán': probability = 70 + Math.random() * 20; status = 'Hot'; break;
          case 'Thắng': probability = 100; status = 'Closed'; break;
          case 'Thua': probability = 0; status = 'Closed'; break;
        }

        const value = 50_000_000 + Math.floor(Math.random() * 950_000_000);
        
        data.push({
          id: `OPP-${1000 + id++}`,
          Company: COMPANIES[Math.floor(Math.random() * COMPANIES.length)],
          Contact: CONTACTS[Math.floor(Math.random() * CONTACTS.length)],
          Industry: INDUSTRIES[Math.floor(Math.random() * INDUSTRIES.length)],
          Region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
          Source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
          Stage: stage,
          Status: status,
          Value: value,
          Probability: Math.round(probability),
          ExpectedCloseDate: `${year}-${String(MONTHS.indexOf(month) + 1).padStart(2, '0')}`,
          Year: year,
          Month: month,
          SalesPerson: SALESPERSONS[Math.floor(Math.random() * SALESPERSONS.length)],
        });

        if (id > 800) break;
      }
      if (id > 800) break;
    }
  }

  return data;
}

export const CRM_DATA = generateCRMData();

export const CRM_SOURCE_COLORS: Record<string, string> = {
  'Trang web': '#3b82f6',
  'Giới thiệu': '#10b981',
  'Mạng xã hội': '#8b5cf6',
  'Trực tiếp': '#f59e0b',
  'Sự kiện': '#ef4444',
};

export const CRM_STAGE_COLORS: Record<string, string> = {
  'Cơ hội': '#94a3b8',
  'Đủ ĐK': '#3b82f6',
  'Đề xuất': '#8b5cf6',
  'Đàm phán': '#f59e0b',
  'Thắng': '#10b981',
  'Thua': '#ef4444',
};