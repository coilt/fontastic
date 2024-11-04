'use client'
import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import * as fontLoaders from './lib/fontLoaders'
import { categorizedFonts } from './components/googleFonts'
import FontSwitcher from './components/FontSwitcher'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('sans-serif')
  const [selectedFont, setSelectedFont] = useState('')

  useEffect(() => {
    setCategories(Object.keys(categorizedFonts))
    setSelectedCategory('sans-serif')
  }, [])

  useEffect(() => {
    if (selectedCategory && categorizedFonts[selectedCategory].length > 0) {
      setSelectedFont(categorizedFonts[selectedCategory][0])
    }
  }, [selectedCategory])

  const currentFont = fontLoaders[`${selectedFont.replace(/\s+/g, '_')}Font`] || inter

  return (
    <div>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <FontSwitcher
        fonts={categorizedFonts[selectedCategory]}
        selectedFont={selectedFont}
        onFontChange={setSelectedFont}
      />

      <p className={currentFont.className}>
        This is a sample paragraph to demonstrate the font changes.
      </p>
    </div>
  )
}
