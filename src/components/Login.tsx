import { Button, Text, Center, VStack, Image } from "@chakra-ui/react"
import { useSession, signIn, signOut } from "next-auth/react"

export const Login = () => {
  const { data: session } = useSession()
  console.log(session)

  if (session) {
    return (
      <VStack>
        <Text>{session.user.email}</Text>
        <Image src={session.user.image} />
        <Button
          onClick={() => signOut()}
          variant="solid"
          colorScheme="green"
          rounded="button"
          flexGrow={3}
          mx={2}
          width="full"
        >
          Sign Out
        </Button>
      </VStack>
    )
  } else {
    return (
      <VStack>
        <Button
          onClick={() => signIn()}
          variant="solid"
          colorScheme="green"
          rounded="button"
          flexGrow={3}
          mx={2}
          width="full"
        >
          Sign In
        </Button>
      </VStack>
    )
  }
}
