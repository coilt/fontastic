

const fs = require('fs');
const { exec } = require('child_process');

const util = require('util');
fs.writeFileSync('categorizedFonts.txt', util.inspect(categorizedFonts, {depth: null}));

let categorizedFonts;
try {
  const jsonContent = fs.readFileSync('./googleFonts.json', 'utf8');
  categorizedFonts = JSON.parse(jsonContent);
  console.log('Successfully read and parsed googleFonts.json');
} catch (error) {
  console.error('Error reading or parsing googleFonts.json:', error.message);
  process.exit(1);
}

console.log('Type of categorizedFonts:', typeof categorizedFonts);
console.log('Keys in categorizedFonts:', Object.keys(categorizedFonts));
 

const installCommands = Array.from(allFonts).map(font => 
  `npm install @fontsource/${font.toLowerCase().replace(/\s+/g, '-')}`
);

const installAllFonts = installCommands.join(' && ');

exec(installAllFonts, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
