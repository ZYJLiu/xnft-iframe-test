//ngrok http 3000

import {
  getAssociatedTokenAddress,
  getMint,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  getAccount,
  Account,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createBurnInstruction,
  burn,
} from "@solana/spl-token"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js"
import { NextApiRequest, NextApiResponse } from "next"

import {
  Program,
  AnchorProvider,
  Idl,
  setProvider,
} from "@project-serum/anchor"
import idl from "../../contexts/Workspace/token_rewards.json"
// import {
//   IDL,
//   TokenRewards,
// } from "../../contexts/Workspace/token_rewards_coupons"
// import MockWallet from "../../contexts/Workspace/MockWallet"

// const programId = new PublicKey(idl.metadata.address)
const network = "https://api.devnet.solana.com/"
const connection = new Connection(network)
// const provider = new AnchorProvider(connection, MockWallet, {})
// setProvider(provider)
// const program = new Program(IDL as Idl, programId) as Program<TokenRewards>

export type MakeTransactionInputData = {
  account: string
}

type MakeTransactionGetResponse = {
  label: string
  icon: string
}

export type MakeTransactionOutputData = {
  transaction: string
  message: string
}

type ErrorOutput = {
  error: string
}

function get(res: NextApiResponse<MakeTransactionGetResponse>) {
  res.status(200).json({
    label: "SolanaPay",
    icon: "https://seeklogo.com/images/S/solana-sol-logo-12828AD23D-seeklogo.com.png",
  })
}

async function post(
  req: NextApiRequest,
  res: NextApiResponse<MakeTransactionOutputData | ErrorOutput>
) {
  try {
    // We pass the reference to use in the query
    const { reference } = req.query
    if (!reference) {
      console.log("Returning 400: no reference")
      res.status(400).json({ error: "No reference provided" })
      return
    }

    const { publicKey } = req.query
    if (!publicKey) {
      console.log("Returning 400: no reference")
      res.status(400).json({ error: "No publicKey provided" })
      return
    }

    const { amount } = req.query
    if (!amount) {
      console.log("Returning 400: no amount")
      res.status(400).json({ error: "No amount provided" })
      return
    }

    // We pass the buyer's public key in JSON body
    const { account } = req.body as MakeTransactionInputData
    if (!account) {
      console.log("Returning 400: no account")
      res.status(400).json({ error: "No account provided" })
      return
    }

    const scannerPublickey = new PublicKey(account)

    // Get a recent blockhash to include in the transaction
    const { blockhash } = await connection.getLatestBlockhash("finalized")

    const transaction = new Transaction({
      recentBlockhash: blockhash,
      feePayer: scannerPublickey,
    })

    // let number = +amount

    const instruction = SystemProgram.transfer({
      fromPubkey: scannerPublickey,
      toPubkey: new PublicKey(publicKey),
      lamports: +amount * LAMPORTS_PER_SOL,
    })

    // Add the reference to the instruction as a key
    // This will mean this transaction is returned when we query for the reference
    instruction.keys.push({
      pubkey: new PublicKey(reference),
      isSigner: false,
      isWritable: false,
    })

    // Add both instructions to the transaction
    transaction.add(instruction)
    // transaction.add(burnInstruction);

    // Serialize the transaction and convert to base64 to return it
    const serializedTransaction = transaction.serialize({
      // We will need the buyer to sign this transaction after it's returned to them
      requireAllSignatures: false,
    })

    const base64 = serializedTransaction.toString("base64")

    const message = "This is a Test"

    // Return the serialized transaction
    const responseBody = {
      transaction: base64,
      message,
    }

    console.log("returning 200", responseBody)
    res.status(200).json(responseBody)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "error creating transaction" })
    return
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    MakeTransactionGetResponse | MakeTransactionOutputData | ErrorOutput
  >
) {
  if (req.method === "GET") {
    return get(res)
  } else if (req.method === "POST") {
    return await post(req, res)
  } else {
    return res.status(405).json({ error: "Method not allowed" })
  }
}
