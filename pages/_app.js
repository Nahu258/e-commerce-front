import { createGlobalStyle } from 'styled-components'
import { Poppins } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'] })

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: ${poppins.style.fontFamily};
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
