import { FC, useState, Fragment, useEffect, useRef, useCallback } from "react"
import {
  Transaction,
  PublicKey,
  sendAndConfirmTransaction,
} from "@solana/web3.js"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import {
  Metaplex,
  walletAdapterIdentity,
  bundlrStorage,
  MetaplexFile,
  toMetaplexFileFromBrowser,
  findMetadataPda,
  keypairIdentity,
} from "@metaplex-foundation/js"

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Container,
  AspectRatio,
  Box,
  BoxProps,
  forwardRef,
  Text,
  Image,
} from "@chakra-ui/react"

import { useWorkspace } from "../contexts/Workspace"
import { useAuthContext } from "../contexts/Auth"

export const CreatePromo: FC = () => {
  const keypair = useAuthContext()
  const workspace = useWorkspace()
  const program = workspace.program

  const wallet = useWallet()
  const { connection } = useConnection()

  const [imageUrl, setImageUrl] = useState(null)
  const [metadataUrl, setMetadataUrl] = useState(null)

  const [tokenName, setTokenName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [description, setDescription] = useState("")
  const [restrictions, setRestrictions] = useState("")
  const [expiration, setExpiration] = useState("")
  const [transaction, setTransaction] = useState("")

  const urlMounted = useRef(false)

  const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  )

  // set up metaplex object
  const metaplex = new Metaplex(connection).use(
    bundlrStorage({
      address: "https://devnet.bundlr.network",
      providerUrl: "https://api.devnet.solana.com",
      timeout: 60000,
    })
  )

  if (keypair) {
    metaplex.use(keypairIdentity(keypair))
  }

  // upload image
  const handleImage = async (event) => {
    try {
      const file: MetaplexFile = await toMetaplexFileFromBrowser(
        event.target.files[0]
      )

      const imageUrl = await metaplex.storage().upload(file)
      setImageUrl(imageUrl)
      console.log(imageUrl)
      alert("Image Uploaded")
    } catch (e) {}
  }

  // upload metadata
  const uploadMetadata = async () => {
    const data = {
      name: tokenName,
      symbol: symbol,
      description: description,
      image: imageUrl,
      attributes: [
        {
          trait_type: "Expiration",
          value: expiration,
        },
        {
          trait_type: "Restrictions",
          value: restrictions,
        },
      ],
    }
    const { uri } = await metaplex.nfts().uploadMetadata(data).run()
    setMetadataUrl(uri)
    console.log("metadata:", uri)
  }

  // build and send transaction
  const createPromo = useCallback(
    async (form) => {
      if (!keypair) {
        return
      }

      // merchant account PDA
      const [merchant] = await PublicKey.findProgramAddress(
        [Buffer.from("MERCHANT"), keypair.publicKey.toBuffer()],
        program.programId
      )

      let count = await (
        await program.account.merchantState.fetch(merchant)
      ).promoCount

      console.log(count.toNumber())

      // promo account PDA
      const [promo] = await PublicKey.findProgramAddress(
        [merchant.toBuffer(), count.toArrayLike(Buffer, "be", 8)],
        program.programId
      )

      // promo mint PDA
      const [promoMint] = await PublicKey.findProgramAddress(
        [Buffer.from("MINT"), promo.toBuffer()],
        program.programId
      )

      // get mint metedata account PDA
      const metadataPDA = await findMetadataPda(promoMint)

      const transaction = await program.methods
        .createPromo({
          name: form.tokenName.toString(),
          symbol: form.symbol.toString(),
          uri: form.metadata.toString(),
        })
        .accounts({
          merchant: merchant,
          promo: promo,
          promoMint: promoMint,
          user: keypair.publicKey,
          // systemProgram: SystemProgram.programId,
          // rent: SYSVAR_RENT_PUBKEY,
          // tokenProgram: TOKEN_PROGRAM_ID,
          metadata: metadataPDA,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        })
        .transaction()

      // send transaction
      const transactionSignature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [keypair]
      )
      await connection.confirmTransaction(transactionSignature)
      const url = `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
      console.log(url)

      alert("Success")
      setTransaction(url)
    },
    [connection, metadataUrl]
  )

  // send transaction once metadata uplaoded
  useEffect(() => {
    if (urlMounted.current && metadataUrl != null) {
      createPromo({
        metadata: metadataUrl,
        symbol: "COUPON",
        tokenName: tokenName,
      })
    } else {
      urlMounted.current = true
    }
  }, [metadataUrl])

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Create New Promotion
        </Heading>
        <FormControl isRequired>
          <FormLabel>Coupon Name</FormLabel>
          <Input
            placeholder="Enter Coupon Name"
            _placeholder={{ color: "gray.500" }}
            onChange={(e) => setTokenName(e.target.value)}
          />
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="Enter Description of Promotion"
            _placeholder={{ color: "gray.500" }}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormLabel>Restriction</FormLabel>
          <Input
            placeholder="Enter Restriction"
            _placeholder={{ color: "gray.500" }}
            onChange={(e) => setRestrictions(e.target.value)}
          />
          <FormLabel>Expiration Date</FormLabel>
          <Input
            placeholder="Enter Restriction"
            _placeholder={{ color: "gray.500" }}
            type="date"
            onChange={(e) => setExpiration(e.target.value)}
          />
          <Container centerContent my="5">
            <AspectRatio width="60" ratio={1}>
              <Box
                borderColor="gray.300"
                borderStyle="dashed"
                borderWidth="2px"
                rounded="md"
              >
                <Box position="relative" height="100%" width="100%">
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    height="100%"
                    width="100%"
                    display="flex"
                    flexDirection="column"
                  >
                    {imageUrl ? (
                      <Image src={imageUrl} />
                    ) : (
                      <Stack
                        height="100%"
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justify="center"
                        spacing="4"
                      >
                        <Stack p="8" textAlign="center" spacing="1">
                          <Heading
                            fontSize="lg"
                            color="white"
                            fontWeight="bold"
                          >
                            Drop image here
                          </Heading>
                          <Text fontWeight="light">or click to upload</Text>
                        </Stack>
                      </Stack>
                    )}
                  </Box>
                  <Input
                    type="file"
                    height="100%"
                    width="100%"
                    position="absolute"
                    top="0"
                    left="0"
                    opacity="0"
                    aria-hidden="true"
                    accept="image/*"
                    onChange={handleImage}
                  />
                </Box>
              </Box>
            </AspectRatio>
          </Container>
        </FormControl>

        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={uploadMetadata}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
