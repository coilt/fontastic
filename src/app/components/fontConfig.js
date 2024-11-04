export const fontConfig = {
  sans: ['Inter', 'Lato', 'Roboto', 'Open Sans'],
  serif: ['Merriweather', 'Playfair Display', 'Lora', 'Crimson Text'],
  mono: ['Roboto Mono', 'Source Code Pro', 'Fira Code', 'IBM Plex Mono']
};

export const getFontImport = (fontName) => {
  return `import { ${fontName.replace(/\s+/g, '_')} } from 'next/font/google'`;
};
