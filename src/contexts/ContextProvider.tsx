import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  BackpackWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import { FC, ReactNode, useCallback, useMemo } from "react"
require("@solana/wallet-adapter-react-ui/styles.css")

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet
  //   const network = WalletAdapterNetwork.Mainnet;
  // const endpoint = useMemo(() => "https://devnet.genesysgo.net/", [network])
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [
      new BackpackWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [network]
  )

  return (
    // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletContextProvider
