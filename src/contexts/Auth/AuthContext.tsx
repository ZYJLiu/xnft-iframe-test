import { createContext, useContext, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user.uid)
    } else {
      setUser(null)
    }
  })
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export { useAuthContext, AuthProvider }
