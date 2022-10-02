import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase"
import { Keypair } from "@solana/web3.js"
import sha256 from "crypto-js/sha256"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<Keypair>()

  const generateKeypair = async (email) => {
    const buffer = Buffer.from(sha256(email).toString()).slice(0, 32)
    const keypair = Keypair.fromSeed(new Uint8Array(buffer))
    console.log("test", keypair.publicKey.toString())
    setUser(keypair)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        generateKeypair(user.email)
      } else {
        setUser(null)
      }
    })
  }, [auth])
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export { useAuthContext, AuthProvider }
