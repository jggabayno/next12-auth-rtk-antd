import {  useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import styles from '@/styles/modules/signup.module.scss'

import pageAuth from '@/utilities/pageAuth'
import { signupService } from '@/services/signup'
import UserSignUpInterface from '@/interfaces/UserSignupInterface'

import { NextPageWithLayout } from '../pages/_app'

import Form from 'antd/lib/form'

import Button from '@/components/button'

const PublicLayout  = dynamic(() => import('@/components/layout/public'))
const Title  = dynamic(() => import('antd/lib/typography/Title'))
const Text   = dynamic(() => import('antd/lib/typography/Text'))
const Input  = dynamic(() => import('@/components/input'))

const Signup: NextPageWithLayout = () =>
{

  const [form]                                                 = Form.useForm()
  const [isSigningUp, setIsSigningUp]                          = useState<boolean>(false)
  const router                                                 = useRouter()
 
  async function onSubmit(user: UserSignUpInterface)
  {
  
    user.email = user.email.trim()
    console.log('user', user)
    user.role = 'User'
    delete user.password_confirm
    await signupService({user, form, router, setIsSigningUp})

  }

  return (
    <>
      <Head>
        <title>Signup - App</title>
        <meta name="description" content={`Signup - App`} />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={`inner ${styles._}`}>

      <Form 
        layout='vertical'
        requiredMark={false}
        colon={false}
        autoComplete='false'
        form={form}
        onFinish={onSubmit}
        >
          
        <Title level={2} className={styles.title}>Signup</Title>
        <Text className={styles.title_support}>Please signup to access your App Account</Text>
      
        <Form.Item
        label='First Name'
        name="first_name"
        rules={[{ required: true, message: "First Name Required" }]}
        >
        <Input/>
        </Form.Item>

        {/* <Form.Item
        label='Middle Name'
        name="middle_name"
        rules={[{ required: true, message: "Middle Name Required" }]}
        >
        <Input/>
        </Form.Item> */}

        <Form.Item
        label='Last Name'
        name="last_name"
        rules={[{ required: true, message: "Last Name Required" }]}
        >
        <Input/>
        </Form.Item>

        <Form.Item
        label='Mobile Number'
        name="mobile_number"
        rules={[{ required: true, message: "Mobile Number Required" }]}
        >
        <Input/>
        </Form.Item>

        <Form.Item
          label='Email'
          name="email"
          rules={[{ required: true, message: "Email Required" }, {type: 'email', message: 'Invalid email'}]}
        >
          <Input/>
        </Form.Item>
        

        <Form.Item
          label='Password'
          name="password"
          rules={[{ required: true, message: "Password Required" }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item
          name="password_confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input type='password' />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" loading={isSigningUp}>Sign Up</Button>
        </Form.Item>

        </Form>
      </main>
    </>
  )
}

export const getServerSideProps = pageAuth(false)

Signup.getLayout = function PageLayout(page)  {
  return <PublicLayout>{page}</PublicLayout>
}

export default Signup