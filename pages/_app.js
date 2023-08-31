import { createGlobalStyle } from 'styled-components'
import { Roboto } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({ weight: '400', subsets: ['latin'] })

const GlobalStyles = createGlobalStyle`
  body{
    padding: 0;
    margin: 0;
    font-family: ${roboto.style.fontFamily};
  }
`

export default function App ({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
