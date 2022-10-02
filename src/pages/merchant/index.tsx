import { Flex, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useWorkspace } from "../../contexts/Workspace"
import { PublicKey } from "@solana/web3.js"
import { useAuthContext } from "../../contexts/Auth"
import { CreateMerchant } from "../../components/CreateMerchantForm"
import { CreatePromo } from "../../components/CreatePromoForm"

const Merchant = () => {
  const keypair = useAuthContext()
  const { connection } = useConnection()
  const workspace = useWorkspace()
  const programId = workspace.program.programId
  const [merchant, setMerchant] = useState(null)

  async function merchantInfo() {
    const [merchant] = await PublicKey.findProgramAddress(
      [Buffer.from("MERCHANT"), keypair.publicKey.toBuffer()],
      programId
    )
    try {
      const merchantInfo = await connection.getAccountInfo(merchant)
      setMerchant(merchantInfo)
      console.log(merchant)
    } catch (error: unknown) {}
  }

  useEffect(() => {
    if (keypair) {
      merchantInfo()
    }
  }, [keypair, connection])

  return (
    <Flex
      alignContent="center"
      justifyContent="center"
      width="100%"
      backgroundColor="gray.800"
      height="100vh"
    >
      {merchant ? (
        <CreatePromo />
      ) : (
        <CreateMerchant setMerchant={setMerchant} />
      )}
    </Flex>
  )
}

export default Merchant
