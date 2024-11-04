const fs = require('fs');
const path = require('path');

const fontData = require('../lib/fontData.json');

let output = "import localFont from 'next/font/local';\n\n";

Object.entries(fontData).forEach(([category, fonts]) => {
  fonts.forEach(font => {
    const variableName = `${font.name.replace(/\s+/g, '_')}Font`;
    const normalizedPath = font.path.replace(/\\/g, '\\\\');
    output += `export const ${variableName} = localFont({ src: '${normalizedPath}' });\n`;
  });
});

fs.writeFileSync(path.join(__dirname, '../lib/fontLoaders.js'), output);

console.log('Font loaders generated successfully.');
