import fontData from '../lib/googleFonts.json';

export const categorizedFonts = fontData.reduce((acc, font) => {
  if (!acc[font.category]) {
    acc[font.category] = [];
  }
  acc[font.category].push(font.family);
  return acc;
}, {});

console.log('Categorized Fonts:', categorizedFonts);




