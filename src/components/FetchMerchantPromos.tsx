import { Flex, Text, SimpleGrid } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useWorkspace } from "../contexts/Workspace"
import { PublicKey } from "@solana/web3.js"
import { useAuthContext } from "../contexts/Auth"
import { DisplayPromo } from "./DisplayPromo"

const FetchMerchantPromos = () => {
  const keypair = useAuthContext()
  const { connection } = useConnection()
  const workspace = useWorkspace()
  const programId = workspace.program.programId
  const [merchant, setMerchant] = useState<PublicKey>()
  const [accounts, setAccounts] = useState(null)

  const fetchData = async () => {
    const [merchant] = await PublicKey.findProgramAddress(
      [Buffer.from("MERCHANT"), keypair.publicKey.toBuffer()],
      programId
    )

    const accounts = await workspace.program.account.promoState.all([
      {
        memcmp: {
          offset: 8,
          bytes: keypair.publicKey,
        },
      },
    ])
    setAccounts(accounts)
    console.log("test", accounts)
    console.log(keypair.publicKey.toBase58())
  }

  useEffect(() => {
    if (keypair)
      try {
        fetchData()
      } catch (e) {}
  }, [keypair, merchant])
  return (
    <SimpleGrid columns={2} spacing={10}>
      {accounts && (
        <>
          {Object.keys(accounts).map((key, index) => {
            const data = accounts[key]
            return <DisplayPromo key={key} account={data} />
          })}
        </>
      )}
    </SimpleGrid>
  )
}

export default FetchMerchantPromos
