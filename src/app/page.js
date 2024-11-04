'use client'
import styles from './css/page.module.css'
import { useState } from 'react'
import Head from 'next/head'
import {
  Inter,
  Roboto_Serif,
  Roboto_Mono,
  Lato,
  Merriweather,
  Source_Code_Pro,
} from 'next/font/google'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from './components/dropdown'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

const inter = Inter({ subsets: ['latin'] })
const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
})
const robotoSerif = Roboto_Serif({ subsets: ['latin'] })
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
})
const robotoMono = Roboto_Mono({ subsets: ['latin'] })
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] })

export default function Home() {
  const [headingFont, setHeadingFont] = useState('sans')
  const [bodyFont, setBodyFont] = useState('sans')

  const fonts = {
    inter: inter,
    lato: lato,
    robotoSerif: robotoSerif,
    merriweather: merriweather,
    robotoMono: robotoMono,
    sourceCodePro: sourceCodePro,
  }

  const fontsByType = {
    sans: ['inter', 'lato'],
    serif: ['robotoSerif', 'merriweather'],
    mono: ['robotoMono', 'sourceCodePro'],
  }
  const [headingFontIndex, setHeadingFontIndex] = useState(0)
  const [bodyFontIndex, setBodyFontIndex] = useState(0)

  function FontSelector({ fontType, fontIndex, setFontIndex }) {
    const fonts = fontsByType[fontType]

    const handlePrev = () =>
      setFontIndex((fontIndex - 1 + fonts.length) % fonts.length)
    const handleNext = () => setFontIndex((fontIndex + 1) % fonts.length)

    return (
      <div className='font-selector'>
        <button onClick={handlePrev}>&lt;</button>
        <span>{fonts[fontIndex].split(/(?=[A-Z])/).join(' ')}</span>
        <button onClick={handleNext}>&gt;</button>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>A design conference for the dark side.</title>
        <meta name='description' content='Test different fonts in context' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
      <div className={styles.fontTypeSelector}>
  <Dropdown>
    <DropdownButton outline>
      Heading Font: {headingFont.charAt(0).toUpperCase() + headingFont.slice(1)}
      <ChevronDownIcon />
    </DropdownButton>
    <DropdownMenu>
      <DropdownItem onClick={() => setHeadingFont('sans')}>Sans-serif</DropdownItem>
      <DropdownItem onClick={() => setHeadingFont('serif')}>Serif</DropdownItem>
      <DropdownItem onClick={() => setHeadingFont('mono')}>Monospace</DropdownItem>
    </DropdownMenu>
  </Dropdown>

  <Dropdown>
    <DropdownButton outline>
      Body Font: {bodyFont.charAt(0).toUpperCase() + bodyFont.slice(1)}
      <ChevronDownIcon />
    </DropdownButton>
    <DropdownMenu>
      <DropdownItem onClick={() => setBodyFont('sans')}>Sans-serif</DropdownItem>
      <DropdownItem onClick={() => setBodyFont('serif')}>Serif</DropdownItem>
      <DropdownItem onClick={() => setBodyFont('mono')}>Monospace</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</div>

        <FontSelector
          fontType={headingFont}
          fontIndex={headingFontIndex}
          setFontIndex={setHeadingFontIndex}
        />

        <FontSelector
          fontType={bodyFont}
          fontIndex={bodyFontIndex}
          setFontIndex={setBodyFontIndex}
        />

        <div className={styles.body}>
          <h1 className={fonts[fontsByType[headingFont][headingFontIndex]].className}
            style={{ fontSize: '2.5em' }}
          >
            A design conference for the dark side.
          </h1>
          <p className={fonts[fontsByType[bodyFont][bodyFontIndex]].className}>
            The next generation of web users are tech-savvy and suspicious. They
            know how to use dev tools, they can detect a phishing scam from a
            mile away, and they certainly aren't accepting any checks from
            Western Union. At DeceptiConf you'll learn about the latest dark
            patterns being developed to trick even the smartest visitors, and
            you'll learn how to deploy them without ever being detected.
          </p>
        </div>
      </main>
    </div>
  )
}
