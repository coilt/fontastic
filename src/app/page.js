'use client'
import { useState, useEffect } from 'react'
import { categorizedFonts } from './components/googleFonts'

import { Inter, Roboto_Serif, Roboto_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const robotoSerif = Roboto_Serif({ subsets: ['latin'] })
const robotoMono = Roboto_Mono({ subsets: ['latin'] })

const fontMap = {
  'sans-serif': inter,
  serif: robotoSerif,
  monospace: robotoMono,
}

export default function Home() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('sans-serif')

  const [selectedFont, setSelectedFont] = useState('')

  useEffect(() => {
    const availableCategories = Object.keys(categorizedFonts).filter(
      (category) => fontMap[category]
    )
    setCategories(availableCategories)
    if (availableCategories.length > 0) {
      setSelectedCategory(availableCategories[0])
    }
  }, [])

  useEffect(() => {
    if (selectedCategory && categorizedFonts[selectedCategory].length > 0) {
      setSelectedFont(categorizedFonts[selectedCategory][0])
    }
  }, [selectedCategory])

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

      <p className={fontMap[selectedCategory].className}>
        This is a sample paragraph to demonstrate the font changes.
      </p>
    </div>
  )
}
