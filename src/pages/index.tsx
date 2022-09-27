import { Hero } from "../components/Hero"
import { Container } from "../components/Container"
import { Main } from "../components/Main"
import { DarkModeSwitch } from "../components/DarkModeSwitch"
import { CTA } from "../components/CTA"
import { Login } from "../components/Login"
import Solana from "../components/Solana"
import { FirebaseLogin } from "../components/FirebaseLogin"
import Scanner from "../components/Scanner"
import React from "react"
import { useAuthContext } from "../contexts/Auth"
import { Text } from "@chakra-ui/react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export default function Home() {
  const uid = useAuthContext()
  // Firestore

  // User Authentication
  return (
    <Container>
      {/* <WalletMultiButton /> */}
      <DarkModeSwitch />
      <FirebaseLogin />
      <Solana />
      {/* <Scanner /> */}
      {/* <Login /> */}

      {/* <CTA /> */}
    </Container>
  )
}
