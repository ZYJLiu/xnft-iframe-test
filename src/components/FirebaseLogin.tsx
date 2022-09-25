import { Button, Flex, Box, VStack, HStack } from "@chakra-ui/react"
import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"
import { FcGoogle } from "react-icons/fc"
import { useAuthContext } from "../contexts/Auth"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as FirebaseSignOut,
} from "firebase/auth"
import { useRouter } from "next/router"
import Link from "next/link"

export const FirebaseLogin = () => {
  const { data: session } = useSession()
  console.log(session)

  const firebaseAuth = getAuth()
  const provider = new GoogleAuthProvider()
  const router = useRouter()

  const uid = useAuthContext()

  const signIn = async () => {
    try {
      const { user } = await signInWithPopup(firebaseAuth, provider)
      const { refreshToken, providerData } = user
      console.log(refreshToken, providerData)
      localStorage.setItem("user", JSON.stringify(providerData))
      localStorage.setItem("accessToken", JSON.stringify(refreshToken))
      router.push("/")
    } catch (e) {}
  }
  const signOut = async () => {
    await FirebaseSignOut(firebaseAuth)
  }

  return (
    <div>
      <VStack>
        {uid ? (
          <Button
            position="fixed"
            top={4}
            left={75}
            onClick={() => signOut()}
            variant="solid"
            colorScheme="green"
            rounded="button"
            flexGrow={3}
            mx={2}
            width="100px"
          >
            Sign Out
          </Button>
        ) : (
          <Button
            position="fixed"
            top={4}
            left={75}
            onClick={() => signIn()}
            variant="solid"
            colorScheme="green"
            rounded="button"
            flexGrow={3}
            mx={2}
            width="100px"
          >
            Sign In
          </Button>
        )}
        <WalletMultiButton />
      </VStack>
    </div>
  )
}
