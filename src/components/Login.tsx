import { Button } from "@chakra-ui/react"
import { useSession, signIn, signOut } from "next-auth/react"

export const Login = () => {
  const { data: session } = useSession()
  console.log(session)

  if (session) {
    return (
      <Button
        position="fixed"
        top={4}
        right={75}
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
    )
  } else {
    return (
      <Button
        position="fixed"
        top={4}
        right={75}
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
    )
  }
}
