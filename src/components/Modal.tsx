// /* eslint-disable react-hooks/exhaustive-deps */
import { Button, Box, Flex, Spinner, Text } from "@chakra-ui/react"
import {
  createQR,
  encodeURL,
  findReference,
  FindReferenceError,
  TransactionRequestURLFields,
  validateTransfer,
  ValidateTransferError,
} from "@solana/pay"
import { Keypair, PublicKey } from "@solana/web3.js"
import BigNumber from "bignumber.js"
import { useEffect, useRef, useState } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import Confirmed from "./Confirmed"
// import Confirmed from "../Confirmed"

interface Props {
  onClose: () => void
  isOpen: boolean
  amount: string
}

const QrModal = ({ onClose, isOpen, amount }: Props) => {
  const { xnft }: any = window
  const qrRef = useRef<HTMLDivElement>(null)
  const [reference, setReference] = useState(Keypair.generate().publicKey)
  const [confirmed, setConfirmed] = useState(false)
  // const { publicKey, sendTransaction } = useWallet()
  const connection = useConnection()

  const [size, setSize] = useState(() =>
    typeof window === "undefined"
      ? 100
      : Math.min(window.screen.availWidth - 10, 325)
  )
  useEffect(() => {
    const listener = () => setSize(Math.min(window.screen.availWidth - 10, 512))

    window.addEventListener("resize", listener)
    return () => window.removeEventListener("resize", listener)
  }, [])

  console.log(window.screen.availWidth)
  console.log(amount)

  useEffect(() => {
    // window.location is only available in the browser, so create the URL in here
    const { location } = window
    const params = new URLSearchParams()
    params.append("reference", reference.toString())
    params.append("amount", amount.toString())
    params.append("publicKey", xnft.solana.publicKey.toString())
    // if (publicKey) {
    //   params.append("publicKey", publicKey.toString())
    // }

    const apiUrl = `${location.protocol}//${
      location.host
    }/api/makeTransaction?${params.toString()}`

    const urlParams: TransactionRequestURLFields = {
      link: new URL(apiUrl),
      label: "Label",
      message: "Message",
    }

    const solanaUrl = encodeURL(urlParams)

    const qr = createQR(solanaUrl, size, "transparent")
    if (qrRef.current) {
      qrRef.current.innerHTML = ""
      qr.append(qrRef.current)
    }
  }, [window, amount])

  // Check every 0.5s if the transaction is completed
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Check if there is any transaction for the reference
        const signatureInfo = await findReference(
          connection.connection,
          reference,
          {
            finality: "confirmed",
          }
        )
        setConfirmed(true)
      } catch (e) {
        if (e instanceof FindReferenceError) {
          // No transaction found yet, ignore this error
          return
        }
        if (e instanceof ValidateTransferError) {
          // Transaction is invalid
          console.error("Transaction is invalid", e)
          return
        }
        console.error("Unknown error", e)
      }
    }, 500)
    return () => {
      clearInterval(interval)
      setConfirmed(false)
    }
  }, [reference.toString()])

  console.log(confirmed)

  return (
    <>
      <Flex
        position="fixed"
        top="0px"
        left="0px"
        right="0px"
        bottom="0px"
        zIndex={1000}
        backgroundColor="rgba(0, 0, 0, 0.3)"
        display={isOpen ? "flex" : "none"}
      />
      <Flex
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        backgroundColor="#FFF"
        padding="5px"
        zIndex={1000}
        display={isOpen ? "flex" : "none"}
        flexDirection="column"
      >
        {confirmed ? (
          <div style={{ width: size }}>
            <Confirmed />
          </div>
        ) : (
          <Flex ref={qrRef} />
        )}
        <Button
          variant="solid"
          colorScheme="green"
          rounded="button"
          onClick={() => {
            setConfirmed(false)
            onClose()
          }}
        >
          Close
        </Button>
      </Flex>
    </>
  )
}

export default QrModal
