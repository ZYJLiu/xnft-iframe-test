import React from "react"
import { FcGoogle } from "react-icons/fc"

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { useRouter } from "next/router"

const login = () => {
  const firebaseAuth = getAuth()
  const provider = new GoogleAuthProvider()
  const router = useRouter()

  const signIn = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider)
    const { refreshToken, providerData } = user
    console.log(refreshToken, providerData)
    localStorage.setItem("user", JSON.stringify(providerData))
    localStorage.setItem("accessToken", JSON.stringify(refreshToken))
    router.push("/")
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white relative">
      <div className="top-0 left-0 right-0 bottom-0 absolute bg-black opacity-50"></div>
      <div
        className="flex justify-center items-center border border-gray-300 p-2 bg-white bg-opacity-60
                    rounded-full cursor-pointer hover:shadow-md hover:bg-opacity-100 duration-150 ease-in-out z-10"
        onClick={signIn}
      >
        <FcGoogle fontSize={30} />
        <p className="text-lg font-semibold ml-4">Sign in with Google</p>
      </div>
    </div>
  )
}

export default login
