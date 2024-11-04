const fs = require('fs').promises;
const path = require('path');


const googleFontsPath = path.join(__dirname, 'public', 'googlefonts', 'ofl');


async function generateFontData() {
  const fontData = {};

  const fontDirs = await fs.readdir(googleFontsPath);
  console.log(`Found ${fontDirs.length} font directories`);

  for (const fontDir of fontDirs) {
    const metadataPath = path.join(googleFontsPath, fontDir, 'METADATA.pb');
    const fontPath = path.relative(process.cwd(), path.join(googleFontsPath, fontDir));
    
    try {
      const metadata = await fs.readFile(metadataPath, 'utf8');
      const category = extractCategory(metadata);
      console.log(`Processing font: ${fontDir}, Category: ${category}`);

      const fontName = fontDir;
      const fontInfo = extractFontInfo(metadata, fontPath);
      console.log(`Font info extracted: ${JSON.stringify(fontInfo, null, 2)}`);

      if (!fontData[category]) {
        fontData[category] = [];
      }

      fontData[category].push({
        name: fontName,
        displayName: fontInfo.displayName,
        designer: fontInfo.designer,
        copyright: fontInfo.copyright,
        styles: fontInfo.styles,
        weights: fontInfo.weights,
        files: fontInfo.files,
        subsets: fontInfo.subsets,
        path: fontPath
      });

      console.log(`Added font ${fontName} to category ${category}`);
    } catch (error) {
      console.error(`Error processing ${fontDir}: ${error.message}`);
    }
  }

  console.log(`Final fontData structure: ${JSON.stringify(fontData, null, 2)}`);

  await fs.writeFile('fontData.json', JSON.stringify(fontData, null, 2));
  console.log('fontData.json generated successfully');
}

function extractCategory(metadata) {
  const match = metadata.match(/category:\s*"(\w+)"/);
  return match ? match[1] : 'UNKNOWN';
}

function extractFontInfo(metadata, fontPath) {
  const styles = new Set();
  const weights = new Set();
  const files = {};
  let displayName = '';
  let designer = '';
  let copyright = '';
  const subsets = new Set();

  const nameMatch = metadata.match(/name:\s*"([^"]+)"/);
  if (nameMatch) {
    displayName = nameMatch[1];
  }

  const designerMatch = metadata.match(/designer:\s*"([^"]+)"/);
  if (designerMatch) {
    designer = designerMatch[1];
  }

  const subsetMatches = metadata.matchAll(/subsets:\s*"([^"]+)"/g);
  for (const match of subsetMatches) {
    subsets.add(match[1]);
  }

  const fontBlocks = metadata.split('fonts {');
  fontBlocks.shift();

  fontBlocks.forEach(block => {
    const style = block.match(/style:\s*"(\w+)"/)?.[1] || 'normal';
    const weight = block.match(/weight:\s*(\d+)/)?.[1];
    const filename = block.match(/filename:\s*"([^"]+)"/)?.[1];
    const copyrightMatch = block.match(/copyright:\s*"([^"]+)"/);

    if (style) styles.add(style);
    if (weight) weights.add(parseInt(weight));
    if (filename) files[`${style}-${weight}`] = path.join(fontPath, filename);
    if (copyrightMatch && !copyright) copyright = copyrightMatch[1];
  });

  return {
    displayName,
    designer,
    copyright,
    subsets: Array.from(subsets),
    styles: Array.from(styles),
    weights: Array.from(weights).sort((a, b) => a - b),
    files
  };
}

generateFontData();
