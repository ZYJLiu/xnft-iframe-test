import Solana from "../components/Solana"
import Scanner from "../components/Scanner"
import React from "react"
import { useAuthContext } from "../contexts/Auth"
import Navbar from "../components/Navbar"

export default function Home() {
  const uid = useAuthContext()
  // Firestore

  // User Authentication
  return (
    <>
      {/* <Navbar /> */}
      <Solana />
      {/* <Scanner /> */}
    </>
  )
}
