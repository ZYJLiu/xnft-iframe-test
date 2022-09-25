import { ChakraProvider } from "@chakra-ui/react"

import theme from "../theme"
import { AppProps } from "next/app"

import { SessionProvider } from "next-auth/react"
import WalletContextProvider from "../contexts/ContextProvider"
import { AuthProvider } from "../contexts/Auth"
require("../firebase")

function App({ Component, pageProps, session }: AppProps) {
  return (
    <SessionProvider session={session}>
      <WalletContextProvider>
        <AuthProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </AuthProvider>
      </WalletContextProvider>
    </SessionProvider>
  )
}

export default App
