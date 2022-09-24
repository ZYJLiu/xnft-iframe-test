import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react"
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons"

import { Hero } from "../components/Hero"
import { Container } from "../components/Container"
import { Main } from "../components/Main"
import { DarkModeSwitch } from "../components/DarkModeSwitch"
import { CTA } from "../components/CTA"
import { Footer } from "../components/Footer"
import { Login } from "../components/Login"

const Index = () => (
  <Container height="100vh">
    <Hero />
    <Main></Main>
    <Login />

    <DarkModeSwitch />
    {/* <Footer>
      <Text>Next ❤️ Chakra</Text>
    </Footer> */}
    {/* <CTA /> */}
  </Container>
)

export default Index
