import {
  Text,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  VStack,
} from "@chakra-ui/react"
import { useEffect, useState, useCallback } from "react"
import { FcGoogle } from "react-icons/fc"
import { useAuthContext } from "../contexts/Auth"
import { Container } from "./Container"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {
  Keypair,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js"
import sha256 from "crypto-js/sha256"
import Scanner from "../components/Scanner"

const Solana = () => {
  const uid = useAuthContext()
  const [keypair, setKeypair] = useState<Keypair>(new Keypair())
  const [balance, setBalance] = useState(0)
  const [amount, setAmount] = useState(0)
  // const connection = new Connection(clusterApiUrl("devnet"))
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const generateKeypair = async () => {
    console.log(uid)
    const buffer = Buffer.from(sha256(uid).toString()).slice(0, 32)
    const keypair = Keypair.fromSeed(new Uint8Array(buffer))
    console.log("test", keypair.publicKey.toString())
    setKeypair(keypair)
  }

  const airdrop = useCallback(async () => {
    const signature = await connection.requestAirdrop(
      keypair.publicKey,
      LAMPORTS_PER_SOL
    )
    await connection.confirmTransaction(signature, "confirmed")

    getBalance()
  }, [keypair])

  const getBalance = useCallback(async () => {
    const balance = await connection.getBalance(keypair.publicKey, "confirmed")
    setBalance(parseFloat((balance / LAMPORTS_PER_SOL).toFixed(2)))
  }, [keypair, balance])

  const withdraw = async (event: any) => {
    event.preventDefault()
    console.log(event.target.amount.value)
    const transaction = new Transaction()
    const sendSolInstruction = SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: publicKey,
      lamports: LAMPORTS_PER_SOL * event.target.amount.value,
    })
    transaction.add(sendSolInstruction)

    try {
      const transactionSignature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [keypair]
      )
      await connection.confirmTransaction(transactionSignature)
      getBalance()
    } catch (e) {}
  }

  useEffect(() => {
    if (uid) {
      generateKeypair()
    }
  }, [uid])

  useEffect(() => {
    if (keypair) {
      getBalance()
    }
  }, [keypair])

  return (
    <div>
      {uid && (
        <Container
          width={"100vw"}
          height={"100vh"}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Text>UID: {uid}</Text>
          <Text>PUBLIC KEY: {keypair.publicKey.toString()}</Text>
          <Text>Balance: {balance}</Text>
          <Button
            onClick={() => airdrop()}
            variant="solid"
            colorScheme="green"
            rounded="button"
            width="100px"
            margin="2"
          >
            Airdrop
          </Button>
          <form onSubmit={withdraw}>
            <VStack>
              <FormControl isRequired>
                <NumberInput
                  id="amount"
                  defaultValue={0}
                  precision={2}
                  step={0.1}
                  min={0}
                  // onChange={(valueString) => setAmount(parseInt(valueString))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <Button
                type="submit"
                variant="solid"
                colorScheme="green"
                rounded="button"
                width="100px"
                margin="2"
              >
                Withdraw
              </Button>
            </VStack>
          </form>
          <Scanner />
        </Container>
      )}
    </div>
  )
}

export default Solana
