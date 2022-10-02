import { PublicKey } from "@solana/web3.js"

const MockWallet = {
    signTransaction: () => Promise.reject(),
    signAllTransactions: () => Promise.reject(),
    publicKey: new PublicKey("FuKFWGZ9TChvWf7cmJY9FcpTma3sbYULNJV85mSK9XX4"),
}

export default MockWallet
