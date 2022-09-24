import { Hero } from "../components/Hero"
import { Container } from "../components/Container"
import { Main } from "../components/Main"
import { DarkModeSwitch } from "../components/DarkModeSwitch"
import { CTA } from "../components/CTA"
import { Login } from "../components/Login"

const Index = () => (
  <Container height="100vh">
    <Hero />
    <Main></Main>
    <Login />

    <DarkModeSwitch />
    {/* <CTA /> */}
  </Container>
)

export default Index
