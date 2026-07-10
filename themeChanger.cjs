const fs = require('fs');
const path = require('path');

const directories = [
  'src/components/home',
  'src/components/contact',
  'src/pages/Dashboards',
  'src/pages/Solutions',
  'src/pages/Contact',
  'src/pages/Home'
];

// Color mapping to enforce strictly Green and White
const colorMap = {
  'indigo': 'green',
  'blue': 'emerald',
  'purple': 'green',
  'pink': 'emerald',
  'orange': 'green',
  'cyan': 'emerald',
  'amber': 'green',
  'stone': 'emerald',
  'sky': 'emerald',
  'fuchsia': 'green',
  'violet': 'emerald',
  'lime': 'green',
  'teal': 'emerald',
  'rose': 'green'
};

const exactReplacements = [
  { from: /bg-slate-900/g, to: 'bg-green-800' },
  { from: /text-slate-900/g, to: 'text-slate-900' }, // Keep slate-900 text
  { from: /shadow-slate-900/g, to: 'shadow-green-800' },
  { from: /bg-slate-800/g, to: 'bg-green-700' },
  { from: /shadow-slate-800/g, to: 'shadow-green-700' },
  { from: /bg-slate-700/g, to: 'bg-green-600' }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace colors
  for (const [oldColor, newColor] of Object.entries(colorMap)) {
    // We only want to replace tailwind utility classes, e.g., text-indigo-500, bg-blue-50, etc.
    const regex = new RegExp(`(${oldColor})-(\\d{2,3}(?:/\\d{1,2})?)`, 'g');
    content = content.replace(regex, `${newColor}-$2`);
  }

  for (const replacement of exactReplacements) {
    content = content.replace(replacement.from, replacement.to);
  }

  // Also replace any gradient "from-X to-Y" where X/Y are banned colors that might not end with numbers
  // e.g., from-indigo to-purple ... though Tailwind uses numbers e.g. from-indigo-500.

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated theme in: ${filePath}`);
  }
}

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        processFile(path.join(dir, file));
      }
    });
  }
});

console.log('Theme change complete.');
