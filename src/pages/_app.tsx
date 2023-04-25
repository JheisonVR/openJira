import { UIProvider } from '../../context/ui'
import { EntriesProvider } from '../../context/entries'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline} from '@mui/material'
import type { AppProps } from 'next/app'
import { darkTheme, lightTheme } from '../../themes'
import '@/styles/globals.css'


export default function App({ Component, pageProps }: AppProps) {

  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme} >
          <CssBaseline/>
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>


  )
  
}
