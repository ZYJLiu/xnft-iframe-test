import { Button, Flex, Box, VStack, HStack } from "@chakra-ui/react"
import React from "react"
import { useAuthContext } from "../contexts/Auth"

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as FirebaseSignOut,
} from "firebase/auth"
import { useRouter } from "next/router"
import Link from "next/link"

export const FirebaseLogin = () => {
  const firebaseAuth = getAuth()
  const provider = new GoogleAuthProvider()
  const router = useRouter()

  const email = useAuthContext()

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
    <>
      {email ? (
        <Button
          variant="solid"
          colorScheme="green"
          rounded="button"
          flexGrow={3}
          mx={2}
          width="100px"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      ) : (
        <Button
          variant="solid"
          colorScheme="green"
          rounded="button"
          flexGrow={3}
          mx={2}
          width="100px"
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      )}
    </>
  )
}
