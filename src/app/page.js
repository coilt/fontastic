'use client'

import React, { useState } from 'react';
import fontLoaders from './lib/fontLoaders';

export default function Home() {
  const fontKeys = Object.keys(fontLoaders);
  const [currentFontIndex, setCurrentFontIndex] = useState(0);

  // Function to change font index
  const changeFont = (direction) => {
    setCurrentFontIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % fontKeys.length;
      } else if (direction === 'prev') {
        return (prevIndex - 1 + fontKeys.length) % fontKeys.length;
      }
      return prevIndex;
    });
  };

  const currentFont = fontLoaders[fontKeys[currentFontIndex]];

  console.log('Current font object:', currentFont);

  return (
    <div>
      <p
        className={currentFont ? currentFont.className : ''}
        style={{ fontFamily: currentFont ? currentFont.style.fontFamily : 'inherit' }}
      >
        This is a sample paragraph to demonstrate the font changes.
      </p>
      <div>
        <button onClick={() => changeFont('prev')}>← Previous Font</button>
        <button onClick={() => changeFont('next')}>Next Font →</button>
      </div>
    </div>
  );
}
