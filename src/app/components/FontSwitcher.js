import { useState, useEffect } from 'react'

export default function FontSwitcher({ fonts, selectedFont, onFontChange }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (fonts.length > 0 && !selectedFont) {
      onFontChange(fonts[0])
    }
  }, [fonts, selectedFont, onFontChange])

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + fonts.length) % fonts.length
    setCurrentIndex(newIndex)
    onFontChange(fonts[newIndex])
  }

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % fonts.length
    setCurrentIndex(newIndex)
    onFontChange(fonts[newIndex])
  }

  return (
    <div>
      <button onClick={handlePrevious}>&lt;</button>
      <input 
        type="text" 
        value={selectedFont ? selectedFont.displayName : ''} 
        readOnly 
      />
      <button onClick={handleNext}>&gt;</button>
    </div>
  )
}
