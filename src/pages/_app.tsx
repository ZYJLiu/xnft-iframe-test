import { ChakraProvider } from "@chakra-ui/react"

import theme from "../theme"
import { AppProps } from "next/app"
import WalletContextProvider from "../contexts/ContextProvider"
import { WorkspaceProvider } from "../contexts/Workspace"
import { AuthProvider } from "../contexts/Auth"
import Navbar from "../components/Navbar"

require("../firebase")

function App({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <AuthProvider>
        <WorkspaceProvider>
          <ChakraProvider theme={theme}>
            <Navbar />
            <Component {...pageProps} />
          </ChakraProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </WalletContextProvider>
  )
}

export default App
