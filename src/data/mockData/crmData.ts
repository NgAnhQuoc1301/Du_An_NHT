export interface CRMRecord {
  id: string;
  Company: string;
  Contact: string;
  Industry: string;
  Region: string;
  Source: string; // 'Website', 'Referral', 'Social Media', 'Direct', 'Event'
  Stage: string; // 'Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'
  Status: string; // 'Hot', 'Warm', 'Cold' (for active), 'Closed' (for won/lost)
  Value: number;
  Probability: number; // %
  ExpectedCloseDate: string; // YYYY-MM
  Year: number;
  Month: string;
  SalesPerson: string;
}

const INDUSTRIES = ['Technology', 'Manufacturing', 'Retail', 'Finance', 'Healthcare', 'Education'];
const REGIONS = ['North', 'South', 'East', 'West', 'Central'];
const SOURCES = ['Website', 'Referral', 'Social Media', 'Direct', 'Event'];
const STAGES = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];
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
          case 'Lead': probability = 10 + Math.random() * 10; status = Math.random() > 0.5 ? 'Warm' : 'Cold'; break;
          case 'Qualified': probability = 30 + Math.random() * 15; status = 'Warm'; break;
          case 'Proposal': probability = 50 + Math.random() * 20; status = 'Hot'; break;
          case 'Negotiation': probability = 70 + Math.random() * 20; status = 'Hot'; break;
          case 'Won': probability = 100; status = 'Closed'; break;
          case 'Lost': probability = 0; status = 'Closed'; break;
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
  Website: '#3b82f6',
  Referral: '#10b981',
  'Social Media': '#8b5cf6',
  Direct: '#f59e0b',
  Event: '#ef4444',
};

export const CRM_STAGE_COLORS: Record<string, string> = {
  Lead: '#94a3b8',
  Qualified: '#3b82f6',
  Proposal: '#8b5cf6',
  Negotiation: '#f59e0b',
  Won: '#10b981',
  Lost: '#ef4444',
};