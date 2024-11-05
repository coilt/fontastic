import React from 'react'
import * as fontLoaders from '../lib/fontLoaders'

export default function FontSwitcher({ fonts, selectedFont, onFontChange }) {
  const fontLoaderArray = Object.values(fontLoaders).filter(loader => loader && loader.style);
  
  const currentIndex = fontLoaderArray.findIndex(loader => 
    loader.style.fontFamily.toLowerCase().includes(selectedFont.toLowerCase())
  );

  const handlePrevious = () => {
    console.log('Previous button clicked');
    const newIndex = (currentIndex - 1 + fontLoaderArray.length) % fontLoaderArray.length;
    const newFont = fontLoaderArray[newIndex];
    if (newFont && newFont.style) {
      const newFontName = newFont.style.fontFamily.split(',')[0].replace(/['"]+/g, '');
      console.log('Switching to previous font:', newFontName);
      onFontChange(newFontName);
    }
  }

  const handleNext = () => {
    console.log('Next button clicked');
    const newIndex = (currentIndex + 1) % fontLoaderArray.length;
    const newFont = fontLoaderArray[newIndex];
    if (newFont && newFont.style) {
      const newFontName = newFont.style.fontFamily.split(',')[0].replace(/['"]+/g, '');
      console.log('Switching to next font:', newFontName);
      onFontChange(newFontName);
    }
  }

  return (
    <div>
      <button onClick={handlePrevious}>&lt;</button>
      <span>{selectedFont}</span>
      <button onClick={handleNext}>&gt;</button>
    </div>
  )
}