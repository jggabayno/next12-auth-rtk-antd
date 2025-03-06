
import type {
  ReactElement,
  ReactNode
} from 'react'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { wrapper } from '@/states/store'
import { Provider } from 'react-redux';

import '@/styles/main.scss'
import 'antd/dist/antd.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, ...pageProps }: AppPropsWithLayout) =>
{
  const {store, props} = wrapper.useWrappedStore(pageProps);

   // Use the layout defined at the page level, if available
   const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      {getLayout(<Component {...props.pageProps} />)}
    </Provider>
  )

}

export default MyApp