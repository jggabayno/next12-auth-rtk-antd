import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'

import styles from '@/styles/modules/login.module.scss'

import {
  useAppDispatch,
  useAppSelector
} from '@/states/hooks'

import { authSelector } from '@/states/selectors'
import { login } from '@/states/auth'
import { LoginCredentialInterface } from '@/interfaces/LoginCredentialInterface'
import pageAuth from '@/utilities/pageAuth'

import { NextPageWithLayout } from './_app'

import { Form, Typography } from 'antd'

import Button from '@/components/button'

const PublicLayout  = dynamic(() => import('@/components/layout/public'))
const Input  = dynamic(() => import('@/components/input'))

const  { Title, Text }  = Typography

const Login: NextPageWithLayout = () =>
{

  const router                         = useRouter()
  const dispatch                       = useAppDispatch()
  const {isLoginRejected, isLoggingIn} = useAppSelector(authSelector)
  const [form]                         = Form.useForm()
  
  const onSubmit = (credential: LoginCredentialInterface) =>
  {
    credential.email = credential.email.trim()
    dispatch(login({credential, router}))
  }

  return (
    <>
      <Head>
        <title>Login - App</title>
        <meta name="description" content="Login to App"/>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={`inner ${styles.login}`}>

        <Form form={form} onFinish={onSubmit} colon={false} requiredMark={false} layout='vertical'>

          <Title level={1} className={styles.title}>App Title</Title>
          <Text className={styles.title_support}>App Description</Text>
          <div className={styles.login_invalid_credential}>
            {isLoginRejected && <Text type="danger" italic>Login Failed: Invalid Credential</Text>}
          </div>
          
          <Form.Item
            label='Email'
            name="email"
            rules={[{ required: true, message: "Email Required" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label='Password'
            name="password"
            rules={[{ required: true, message: "Password Required" }]}
          >
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <div className={styles.actions}>
            <Button htmlType="submit" type="primary" loading={isLoggingIn}>Log in</Button>
            <Link href='/forgot-password'>Forgot your password?</Link>
          </div>
          
        </Form>

      </main>
    </>
  )
}

Login.getLayout = function PageLayout(page)  {
  return <PublicLayout>{page}</PublicLayout>
}

export const getServerSideProps = pageAuth(false)

export default Login