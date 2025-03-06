import { NextRouter } from "next/router"
  
  export interface AuthInterface
  {
    isLoggingIn: boolean
    isLoggedIn: boolean
    isLoginRejected: boolean
    loggedData: loggedData
  }

  interface loggedDataJWT 
  {
    refresh: string | null,
    access: string | null,
  }

  interface loggedDataUser
  {
    id: number | null,
    first_name: string | null,
    last_name:string | null,
    email: string | null,
    mobile_number: string | null,
    role: string | null
  }

  interface loggedData
  {
    token: loggedDataJWT,
    user: loggedDataUser
  }

  export interface LoginRequestParamInterface
  {
    credential: {
      email: string,
      password: string
    },
    router: NextRouter
  }
  
  export interface LogoutRequestParamInterface
  {
    refresh: string,
    router: NextRouter
  }
  