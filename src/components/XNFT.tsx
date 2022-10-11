//ngrok http 3000
import {
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  FormLabel,
  useDisclosure,
  Text,
  Heading,
} from "@chakra-ui/react"
import { useEffect, useState, useCallback } from "react"
import { Container } from "./Container"

import { useWallet } from "@solana/wallet-adapter-react"

import QrModal from "./Modal"
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js"

const XNft = () => {
  const [publicKey, setPublicKey] = useState(null)

  useEffect(() => {
    if (typeof window.xnft !== "undefined") {
      console.log("load", window.xnft.solana.publicKey.toBase58())
      // console.log("testing", window.xnft)
      setPublicKey(window.xnft.solana.publicKey)
    }
  }, [])

  return (
    <div>
      {publicKey && (
        <VStack margin="5">
          <Text>PublicKey</Text>
          <Text margin="5">
            {publicKey.toBase58().substring(0, 4)}...
            {publicKey.toBase58().substring(publicKey.toBase58().length - 4)}
          </Text>
        </VStack>
      )}
    </div>
  )
}

export default XNft
