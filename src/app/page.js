'use client'
import { useState, useEffect } from 'react'
import localFont from 'next/font/local'
import fontData from './fontData.json'
import FontSwitcher from './components/FontSwitcher'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('SANS_SERIF')
  const [selectedFont, setSelectedFont] = useState(null)
  const [loadedFont, setLoadedFont] = useState(null)

  useEffect(() => {
    if (selectedFont) {
      const font = localFont({ src: selectedFont.path })
      setLoadedFont(font)
    }
  }, [selectedFont])

  const handleFontChange = (newFont) => {
    setSelectedFont(newFont)
  }

  return (
    <div>
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        {Object.keys(fontData).map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <FontSwitcher 
        fonts={fontData[selectedCategory]}
        selectedFont={selectedFont}
        onFontChange={handleFontChange}
      />

      {loadedFont && (
        <p className={loadedFont.className}>
          This is a sample text in the selected font.
        </p>
      )}
    </div>
  )
}
