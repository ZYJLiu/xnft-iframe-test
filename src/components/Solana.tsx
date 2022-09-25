import { Text, Button } from "@chakra-ui/react"
import { useEffect, useState, useCallback } from "react"
import { FcGoogle } from "react-icons/fc"
import { useAuthContext } from "../contexts/Auth"
import { Container } from "./Container"

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as FirebaseSignOut,
} from "firebase/auth"
import { useRouter } from "next/router"
import Link from "next/link"

import {
  Keypair,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js"
import sha256 from "crypto-js/sha256"

const Solana = () => {
  const uid = useAuthContext()
  const [keypair, setKeypair] = useState<Keypair>(null)
  const [balance, setBalance] = useState(0)
  const connection = new Connection(clusterApiUrl("devnet"))

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
    setBalance(balance / LAMPORTS_PER_SOL)
  }, [keypair, balance])

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
        </Container>
      )}
    </div>
  )
}

export default Solana
