import { FC, useState, useEffect, useRef } from "react"
import { Metaplex } from "@metaplex-foundation/js"
import { useWorkspace } from "../contexts/Workspace"
import { PublicKey } from "@solana/web3.js"
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  HStack,
} from "@chakra-ui/react"

export interface PromoProps {
  account: any
}

export const DisplayPromo: FC<PromoProps> = (props) => {
  console.log(props)
  const [data, setData] = useState(null)
  const [modalData, setModalData] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const workspace = useWorkspace()
  const connection = workspace.connection
  const metaplex = new Metaplex(connection)

  const run = useRef(true)

  const fetchData = async () => {
    console.log("test")
    const metadata = await metaplex
      .nfts()
      .findByMint({ mintAddress: new PublicKey(props.account.account.mint) })
      .run()
    let fetchResult = await fetch(metadata.uri)
    let json = await fetchResult.json()
    setData(json)
    console.log(json)
    console.log(json.attributes[0].trait_type)
    console.log(json.attributes[0].value)
  }

  useEffect(() => {
    if (run.current) {
      run.current = false
    }
    fetchData()
  }, [props])

  return (
    <>
      {data && (
        <Center py={12}>
          <Box
            role={"group"}
            p={6}
            maxW={"330px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"2xl"}
            rounded={"lg"}
            pos={"relative"}
            zIndex={1}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={data.image}
            />
            <Stack pt={10} align={"center"}>
              <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
                {data.name}
              </Heading>
              <Stack direction={"column"} align={"center"}>
                <Text fontWeight={800} fontSize={"xl"}>
                  {data.description}
                </Text>
                <Text textDecoration={"line-through"} color={"gray.600"}>
                  {data.attributes.restrictions}
                </Text>
              </Stack>
              {/* <HStack direction={"column"} align={"center"}>
                <Text fontWeight={800} fontSize={"xl"}>
                  {data.attributes[0].trait_type}
                </Text>
                <Text color={"gray.600"}>{data.attributes[0].value}</Text>
              </HStack>
              <HStack direction={"column"} align={"center"}>
                <Text fontWeight={800} fontSize={"xl"}>
                  {data.attributes[1].trait_type}
                </Text>
                <Text color={"gray.600"}>{data.attributes[1].value}</Text>
              </HStack> */}
            </Stack>
            <Button
              mt={10}
              w={"full"}
              bg={"green.400"}
              color={"white"}
              rounded={"xl"}
              boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
              _hover={{
                bg: "green.500",
              }}
              _focus={{
                bg: "green.500",
              }}
            >
              What does the button do?
            </Button>
          </Box>
        </Center>
      )}
    </>
  )
}
