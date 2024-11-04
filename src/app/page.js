'use client'
import { useState, useEffect } from 'react'
import localFont from 'next/font/local'
import fontData from  './lib/fontData.json'
import FontSwitcher from './components/FontSwitcher'

const sansSerifFont = localFont({ src: './fonts/SANS_SERIF/Roboto-Regular.ttf' })
const serifFont = localFont({ src: './fonts/SERIF/Merriweather-Regular.ttf' })
const monoFont = localFont({ src: './fonts/MONOSPACE/RobotoMono-Regular.ttf' })

const fontLoaders = {
  'SANS_SERIF': sansSerifFont,
  'SERIF': serifFont,
  'MONOSPACE': monoFont,
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('SANS_SERIF')
  const [selectedFont, setSelectedFont] = useState(null)

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

      <p className={fontLoaders[selectedCategory].className}>
        This is a sample text in the selected font category.
      </p>
    </div>
  )
}
