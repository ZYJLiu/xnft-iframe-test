//ngrok http 3000
import {
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react"
import { useState } from "react"
import { Container } from "./Container"

import { useWallet } from "@solana/wallet-adapter-react"

import QrModal from "./Modal"

const SolanaPay = () => {
  const { wallet } = useWallet()
  const [amount, setAmount] = useState("1")
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      {wallet && (
        <Container alignContent={"center"} justifyContent={"top"}>
          <VStack>
            <FormLabel>Solana Pay Test</FormLabel>
            <NumberInput
              id="amount"
              defaultValue={0}
              precision={2}
              step={0.1}
              min={0}
              width={"200px"}
              onChange={(amount) => setAmount(amount)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button
              variant="solid"
              colorScheme="green"
              rounded="button"
              width="200px"
              onClick={onOpen}
            >
              Request SOL Amount
            </Button>
          </VStack>
          {isOpen && (
            <QrModal onClose={onClose} isOpen={isOpen} amount={amount} />
          )}
        </Container>
      )}
    </div>
  )
}

export default SolanaPay
