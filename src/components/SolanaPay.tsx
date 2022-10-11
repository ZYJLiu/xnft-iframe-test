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

// import QrModal from "./Modal"
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js"

const SolanaPay = () => {
  const { xnft }: any = window
  // const { wallet } = useWallet()
  const [amount, setAmount] = useState("1")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isReady, setIsReady] = useState(false)
  const [url, setUrl] = useState(null)

  const sendTransaction = useCallback(async () => {
    try {
      const instruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(xnft.solana.publicKey),
        toPubkey: new PublicKey(xnft.solana.publicKey),
        lamports: +0.1 * LAMPORTS_PER_SOL,
      })

      const signature = await xnft.send(new Transaction().add(instruction))
      setUrl(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)
      console.log(signature)
    } catch (e) {}
  }, [])

  useEffect(() => {
    console.log("testing", xnft.solana.publicKey.toBase58())
    console.log("testing", xnft)
    setIsReady(true)
  }, [])

  return (
    <div>
      {isReady && (
        <Container alignContent={"center"} justifyContent={"top"}>
          <VStack>
            <Text>PublicKey</Text>
            <Text margin="5">
              {xnft.solana.publicKey.toBase58().substring(0, 4)}...
              {xnft.solana.publicKey
                .toBase58()
                .substring(xnft.solana.publicKey.toBase58().length - 4)}
            </Text>
            {/* <FormLabel>Solana Pay Test</FormLabel>
            <NumberInput
              id="amount"
              defaultValue={0}
              precision={2}
              step={0.1}
              min={0}
              width={"200px"}
              onChange={(amount) => setAmount(amount)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button
              variant="solid"
              colorScheme="green"
              rounded="button"
              width="200px"
              onClick={onOpen}
            >
              Request SOL Amount
            </Button> */}

            <Button
              variant="solid"
              colorScheme="green"
              rounded="button"
              width="150px"
              mb={2}
              onClick={sendTransaction}
            >
              Test Transaction
            </Button>
          </VStack>
          {/* {isOpen && (
            <QrModal onClose={onClose} isOpen={isOpen} amount={amount} />
          )} */}
          {url && <iframe width="100%" height="100%" src={url}></iframe>}
        </Container>
      )}
    </div>
  )
}

export default SolanaPay
