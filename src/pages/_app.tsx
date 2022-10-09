import { ChakraProvider } from "@chakra-ui/react"

import theme from "../theme"
import { AppProps } from "next/app"
import WalletContextProvider from "../contexts/ContextProvider"
import { WorkspaceProvider } from "../contexts/Workspace"
import Navbar from "../components/Navbar"

function App({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <WorkspaceProvider>
        <ChakraProvider theme={theme}>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </WorkspaceProvider>
    </WalletContextProvider>
  )
}

export default App
