import { Flex, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useWorkspace } from "../../contexts/Workspace"
import { PublicKey } from "@solana/web3.js"
import { useAuthContext } from "../../contexts/Auth"
import { CreateMerchant } from "../../components/CreateMerchantForm"
import { CreatePromo } from "../../components/CreatePromoForm"
import FetchMerchantPromos from "../../components/FetchMerchantPromos"

const MerchantPromo = () => {
  return (
    <Flex
      alignContent="center"
      justifyContent="center"
      width="100%"
      backgroundColor="gray.800"
      height="100vh"
    >
      <FetchMerchantPromos />
    </Flex>
  )
}

export default MerchantPromo
