const fs = require('fs');
const path = require('path');
const dir = 'src/config/dashboards';
const dict = {
  'Khu vực': 'Region',
  'Công ty': 'Company',
  'Phòng ban': 'Department',
  'Doanh thu': 'Revenue',
  'Liên hệ': 'Contact',
  'Giai đoạn': 'Stage',
  'Trạng thái': 'Status',
  'Giá trị': 'Value',
  'Xác suất': 'Probability',
  'Nhân viên bán hàng': 'SalesPerson',
  'Danh mục': 'Category',
  'Số tiền': 'Amount',
  'Ngân sách': 'Budget',
  'Lương': 'Salary',
  'Mục tiêu': 'Target',
  'Ngày': 'Date',
  'Dây chuyền': 'Line',
  'Lỗi': 'Defects',
  'Quản lý': 'Manager',
  'Ưu tiên': 'Priority',
  'Tiến độ': 'Progress',
  'Sản phẩm': 'Product',
  'Mã SP': 'SKU',
  'Khách hàng': 'Customer',
  'Vấn đề': 'Issue'
};

fs.readdirSync(dir).forEach(file => {
  if (!file.endsWith('.ts')) return;
  let c = fs.readFileSync(path.join(dir, file), 'utf8');
  let modified = false;
  Object.keys(dict).forEach(k => {
    // Regex matches accessor: 'Key' or accessor: "Key"
    const r = new RegExp(`accessor:\\s*['"]${k}['"]`, 'g');
    if (c.match(r)) {
      c = c.replace(r, `accessor: '${dict[k]}'`);
      modified = true;
    }
  });
  if (modified) {
    fs.writeFileSync(path.join(dir, file), c);
    console.log('Fixed', file);
  }
});
