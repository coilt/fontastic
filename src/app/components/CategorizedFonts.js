import fontData from '../lib/fontData.json';

export const categorizedFonts = Object.entries(fontData).reduce((acc, [category, fonts]) => {
  acc[category] = fonts.flatMap(font => {
    return Object.keys(font.files).map(styleWeight => ({
      name: font.name,
      styleWeight: styleWeight, // e.g., "normal-400"
      loaderKey: `${font.name.toLowerCase()}_${styleWeight.replace('-', '_')}Font`
    }));
  });
  return acc;
}, {});

console.log('Categorized Fonts:', categorizedFonts);