export interface WarehouseRecord {
  id: string;
  SKU: string;
  ProductName: string;
  Category: string; // 'Electronics', 'Appliances', 'Food', 'Clothing', 'Other'
  Location: string; // 'Zone A', 'Zone B', 'Zone C', 'Zone D'
  Stock: number;
  MinStock: number;
  MaxStock: number;
  UnitCost: number;
  Status: string; // 'In Stock', 'Low Stock', 'Out of Stock', 'Overstock'
  LastRestocked: string; // YYYY-MM-DD
  Supplier: string;
}

const CATEGORIES = ['Electronics', 'Appliances', 'Food', 'Clothing', 'Other'];
const LOCATIONS = ['Zone A', 'Zone B', 'Zone C', 'Zone D'];
const SUPPLIERS = ['TechCorp', 'GlobalGoods', 'PrimeSupplies', 'MegaMart', 'QualityVendors'];

function randomDate(start: Date, end: Date) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split('T')[0];
}

function generateWarehouseData(): WarehouseRecord[] {
  const data: WarehouseRecord[] = [];
  const now = new Date();
  for (let i = 1; i <= 200; i++) {
    const stock = Math.floor(Math.random() * 500);
    const minStock = Math.floor(Math.random() * 50) + 10;
    const maxStock = minStock + Math.floor(Math.random() * 300) + 100;
    
    let status = 'In Stock';
    if (stock === 0) status = 'Out of Stock';
    else if (stock < minStock) status = 'Low Stock';
    else if (stock > maxStock) status = 'Overstock';

    data.push({
      id: `WH-${1000 + i}`,
      SKU: `SKU-${Math.floor(10000 + Math.random() * 90000)}`,
      ProductName: `Product ${i}`,
      Category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      Location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
      Stock: stock,
      MinStock: minStock,
      MaxStock: maxStock,
      UnitCost: Math.floor(10 + Math.random() * 990),
      Status: status,
      LastRestocked: randomDate(new Date('2024-01-01'), now),
      Supplier: SUPPLIERS[Math.floor(Math.random() * SUPPLIERS.length)],
    });
  }
  return data;
}

export const WAREHOUSE_DATA = generateWarehouseData();

export const WAREHOUSE_STATUS_COLORS: Record<string, string> = {
  'In Stock': '#10b981',
  'Low Stock': '#f59e0b',
  'Out of Stock': '#ef4444',
  'Overstock': '#3b82f6',
};

export const WAREHOUSE_CATEGORY_COLORS: Record<string, string> = {
  'Electronics': '#3b82f6',
  'Appliances': '#10b981',
  'Food': '#f59e0b',
  'Clothing': '#8b5cf6',
  'Other': '#94a3b8',
};