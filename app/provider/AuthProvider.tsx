"use client"
import { createContext, useActionState, useState } from "react";
import { AuthContextType,User } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children:React.ReactNode}) => {

  const [user,setUser] = useState<User | null>(null);

  // using useActionState for login
  const [loginState,loginAction,isLoginPending] = useActionState(callback function,initialState)


  return(
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      hasPermission
    }}
    >
      {children}
    <AuthContext.Provider>
  )
}
