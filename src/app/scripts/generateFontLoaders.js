const fs = require('fs');
const path = require('path');

const fontData = require('../lib/fontData.json');

let output = "import localFont from 'next/font/local';\n\n";

Object.entries(fontData).forEach(([category, fonts]) => {
  fonts.forEach(font => {
    Object.entries(font.files).forEach(([styleWeight, filePath]) => {
      const variableName = `${font.name.replace(/\s+/g, '_')}_${styleWeight.replace('-', '_')}Font`;
      const normalizedPath = filePath.replace(/\\/g, '\\\\');
      output += `export const ${variableName} = localFont({ src: '${normalizedPath}' });\n`;
    });
  });
});

fs.writeFileSync(path.join(__dirname, '../lib/fontLoaders.js'), output);

console.log('Font loaders generated successfully.');
