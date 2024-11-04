import React from 'react'

export default function FontSwitcher({ fonts, selectedFont, onFontChange }) {
  const currentIndex = fonts.indexOf(selectedFont)

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + fonts.length) % fonts.length
    onFontChange(fonts[newIndex])
  }

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % fonts.length
    onFontChange(fonts[newIndex])
  }

  return (
    <div>
      <button onClick={handlePrevious}>&lt;</button>
      <span>{selectedFont}</span>
      <button onClick={handleNext}>&gt;</button>
    </div>
  )
}
