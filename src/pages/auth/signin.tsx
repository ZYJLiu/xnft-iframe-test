import React from "react"
import { useRouter } from "next/router"
import { Button, VStack } from "@chakra-ui/react"
import { useSession, signIn } from "next-auth/react"

import { BsGoogle } from "react-icons/bs"

const providers = [
  {
    name: "google",
    Icon: BsGoogle,
  },
]

const Signin = () => {
  const { data: session, status } = useSession()

  console.log(session)

  const handleOAuthSignIn = (provider) => () => signIn(provider)

  return (
    <VStack justifyContent="center" minHeight="100vh">
      {providers.map(({ name, Icon }) => (
        <Button
          key={name}
          leftIcon={<Icon />}
          onClick={handleOAuthSignIn(name)}
          textTransform="uppercase"
        >
          Sign in with {name}
        </Button>
      ))}
    </VStack>
  )
}

export default Signin
