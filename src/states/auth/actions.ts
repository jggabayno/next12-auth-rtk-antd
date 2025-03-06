import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  removeCookie,
  setCookie
} from '@/utilities/cookie'

import {
  LoginRequestParamInterface,
  LogoutRequestParamInterface
} from '@/interfaces/AuthInterface'

import {
  loginService,
  logoutService
} from '@/services/auth'

export const login = createAsyncThunk(
  'auth/login',
  async ( { credential, router } : LoginRequestParamInterface, thunkAPI) =>
    {

      try
      {

        const data = await loginService(credential)

        const canLogIn = data?.data?.hasOwnProperty('token')
  
        if( canLogIn ) {

          Promise.all([
            setCookie('next12_session', JSON.stringify(data?.data)),
            router.reload(),
            router.push('/')
          ])

        }

        return data
      
      } catch (err)
      {
        return thunkAPI.rejectWithValue('Opps there seems to be an error')
      }

    }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async ( { refresh, router } : LogoutRequestParamInterface, thunkAPI) =>
    {
      try {

        const data = await logoutService(refresh)

        Promise.all([
          removeCookie('next12_session'),
          router.reload(),
          router.push('/')
        ])  

        return true;
      
      } catch (err: any)
      {
        Promise.all([
          removeCookie('next12_session'),
          router.reload(),
          router.push('/')
        ])  

        return thunkAPI.rejectWithValue('Opps there seems to be an error')

      }
  }
);