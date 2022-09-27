import { useEffect, useRef, useState } from "react"
import QrScanner from "qr-scanner"
import { Text, Button, VStack } from "@chakra-ui/react"

export default function scanner() {
  const videoRef = useRef<HTMLVideoElement>()
  const [qrScanner, setQrScanner] = useState<QrScanner | undefined>(undefined)
  const [scannedUrl, setScannedUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        qrScanner.stop()
        setIsScanning(false)
        setScannedUrl(result.data)
      },
      {
        returnDetailedScanResult: true,
        highlightCodeOutline: true,
        highlightScanRegion: true,
      }
    )

    setQrScanner(qrScanner)
  }, [])

  async function startScanning() {
    if (!qrScanner) return
    await qrScanner.start()
    setIsScanning(true)
  }

  function cancelScanning() {
    if (!qrScanner) return
    qrScanner.stop()
    setIsScanning(false)
    setScannedUrl("")
  }

  const scannedUrlColour = isScanning ? "text-gray-500" : "text-white"

  return (
    <VStack>
      <video ref={videoRef} />
      <Text>{scannedUrl}</Text>

      <Button
        variant="solid"
        colorScheme="green"
        rounded="button"
        onClick={isScanning ? cancelScanning : startScanning}
      >
        {isScanning ? "Cancel" : "Scan!"}
      </Button>
    </VStack>
  )
}
