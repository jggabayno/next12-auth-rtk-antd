import { createReducer } from '@reduxjs/toolkit'
import { AuthInterface } from '@/interfaces/AuthInterface'

import {
  getCookie, 
  hasCookie
} from '@/utilities/cookie'

import {
  login,
  logout
} from '@/states/auth/actions'

const initialState: AuthInterface = hasCookie('next12_session') 
?  {
    isLoggingIn: false,
    isLoggedIn: true,
    isLoginRejected: false,
    loggedData: JSON.parse(getCookie('next12_session'))
  }
: {
    isLoggingIn: false,
    isLoggedIn: false,
    isLoginRejected: false,
    loggedData: {
      token: {
        refresh: null,
        access: null
      },
      user: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
        mobile_number: null,
        role: null
      }
    }
  }

export const authReducer = createReducer(initialState, builder => 
  {
    
  builder
  .addCase(login.pending, state => 
    (
      {
        ...state,
        isLoggingIn: true,
        isLoggedIn: false,
        isLoginRejected: false
      }
    )
  )

  .addCase( login.fulfilled, ( state, { payload } ) => 
    (
      {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        loggedData: payload
      }
    )
  )

  .addCase( login.rejected, state => 
    (
      {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        isLoginRejected: true
      }
    )
  )

  .addCase( logout.pending, state => 
    (
      {
        ...state,
        isLoggingIn: true,
        isLoggedIn: false,
        isLoginRejected: false
      }
    )
  )

  .addCase( logout.fulfilled, state => 
    (
      {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        loggedData: state.loggedData
      }
    )
  )

  .addCase( logout.rejected, state => 
    (
      {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        isLoginRejected: true
      }
    )
  )

}
)