import { ChakraProvider } from "@chakra-ui/react"

import theme from "../theme"
import { AppProps } from "next/app"

import { SessionProvider } from "next-auth/react"

import { AuthProvider } from "../contexts/Auth"
require("../firebase")
function App({ Component, pageProps, session }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </SessionProvider>
  )
}

export default App
