import { categorizedFonts } from './googleFonts'

const FONT_LOAD_TIMEOUT = 5000; // 5 seconds timeout for each font

async function loadFontWithTimeout(fontName) {
  return Promise.race([
    import('next/font/google').then(module => {
      const font = module[fontName];
      return typeof font === 'function' ? font : { default: font };
    }),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Font load timeout')), FONT_LOAD_TIMEOUT))
  ]);


}
 
export async function loadFonts() {
  const loadedFonts = {};
  const categorizedLoadedFonts = {};
  const failedFonts = {};

  for (const category in categorizedFonts) {
    categorizedLoadedFonts[category] = [];
    failedFonts[category] = [];

    for (const fontName of categorizedFonts[category]) {
      try {
        console.log(`Attempting to load font: ${fontName}`);
        const fontModule = await import(`next/font/google/${fontName.replace(/\s+/g, '_')}`);
        let font;
        if (typeof fontModule === 'function') {
          font = fontModule({ subsets: ['latin'] });
        } else if (typeof fontModule.default === 'function') {
          font = fontModule.default({ subsets: ['latin'] });
        } else {
          throw new Error('Unexpected module structure');
        }
        loadedFonts[fontName] = font;
        categorizedLoadedFonts[category].push(fontName);
        console.log(`Successfully loaded font: ${fontName}`);
      } catch (error) {
        console.warn(`Failed to load font: ${fontName}. Error: ${error.message}`);
        failedFonts[category].push({ name: fontName, error: error.message });
      }
    }
  }

  console.log('Font loading complete. Summary:');
  console.log('Loaded fonts:', Object.keys(loadedFonts).length);
  console.log('Failed fonts:', Object.values(failedFonts).flat().length);

  return { loadedFonts, categorizedLoadedFonts, failedFonts };
}