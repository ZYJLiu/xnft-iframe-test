import { FC, useState, useEffect, useCallback } from "react"
import {
  Transaction,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  sendAndConfirmTransaction,
} from "@solana/web3.js"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useWorkspace } from "../contexts/Workspace"

import {
  Metaplex,
  walletAdapterIdentity,
  bundlrStorage,
  MetaplexFile,
  toMetaplexFileFromBrowser,
  findMetadataPda,
  keypairIdentity,
} from "@metaplex-foundation/js"
import { useAuthContext } from "../contexts/Auth"
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

interface Props {
  setMerchant: (string) => void
}

export const CreateMerchant: FC<Props> = ({ setMerchant }) => {
  const keypair = useAuthContext()
  const workspace = useWorkspace()
  const program = workspace.program

  // const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()

  const [imageUrl, setImageUrl] = useState(null)
  const [name, setName] = useState("")

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
      alert("Image Uploaded")
    } catch (e) {}
  }

  // create new "merchant" account
  const onClick = useCallback(async () => {
    if (!keypair) {
      return
    }

    try {
      const initMerchant = await program.methods
        .initMerchant({
          name: name.toString(),
          image: imageUrl.toString(),
        })
        .accounts({
          user: keypair.publicKey,
        })

      // build transaction
      const transaction = new Transaction().add(
        await initMerchant.instruction()
      )

      // send transaction
      const transactionSignature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [keypair]
      )
      await connection.confirmTransaction(transactionSignature)
      const url = `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
      console.log(url)

      const keys = await initMerchant.pubkeys()
      setMerchant(keys.merchant)
      alert("Account Created Successfully")
      console.log("keys", keys.merchant)
    } catch (e) {}
  }, [connection, imageUrl, name, keypair])

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
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
          Create Merchant Account
        </Heading>
        <FormControl isRequired>
          <FormLabel>Merchant Name</FormLabel>
          <Input
            placeholder="Enter Store Name"
            _placeholder={{ color: "gray.500" }}
            onChange={(e) => setName(e.target.value)}
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
            onClick={onClick}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
