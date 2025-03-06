// import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Head from 'next/head'
// import Link from 'next/link'

import styles from '@/styles/modules/index.module.scss'

// import {
//   useAppDispatch,
//   useAppSelector
// } from '@/states/hooks'

import pageAuth from '@/utilities/pageAuth'

import { Form, Typography } from 'antd'
import { NextPageWithLayout } from './_app'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { authSelector } from '@/states/selectors'
import { getCookie } from '@/utilities/cookie'
import { useRouter } from 'next/router'
import { logout } from '@/states/auth'

// import Button from '@/components/button'

const PrivateLayout  = dynamic(() => import('@/components/layout/private'))
// const Input  = dynamic(() => import('@/components/input'))

// const  { Title, Text }  = Typography

const Index: NextPageWithLayout = () =>
{

  const router = useRouter()
  const dispatch       = useAppDispatch()

  const { isLoggedIn, loggedData } = useAppSelector(authSelector)

  function onLogout()
    {
        if ( isLoggedIn )
        {
            const refresh = JSON.parse(getCookie('next12_session'))?.token?.refresh
            dispatch(logout({refresh, router}))
        }
    }


 
  return (
    <>
      <Head>
        <title>App</title>
        <meta name="description" content="Login to App"/>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.login}>
        Index
      <div onClick={onLogout}>Logout</div>
      </main>
    </>
  )
}

Index.getLayout = function PageLayout(page)  {
  return page
}

export const getServerSideProps = pageAuth()

export default Index