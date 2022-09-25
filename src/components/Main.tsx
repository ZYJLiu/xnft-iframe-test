import { Stack, StackProps, Heading } from "@chakra-ui/react"

export const Main = (props: StackProps) => (
  <Stack
    height="100vh"
    spacing="1.5rem"
    width="100%"
    maxWidth="48rem"
    mt="-45vh"
    pt="8rem"
    px="1rem"
    {...props}
  />
)
