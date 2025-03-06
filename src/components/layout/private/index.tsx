import dynamic from 'next/dynamic'
import React, { ReactNode } from 'react'
import useIsSSR from "@/hooks/useIsSSR"
import useBreakpoint from '@/hooks/useBreakpoint'
import PrivateHeader from '@/components/layout/private/header'
import PrivateSider from '@/components/layout/private/aside'
import styles from '@/styles/modules/login.module.scss'

const Drawer = dynamic(() => import('@/components/layout/drawer'))

interface Props {
  children : ReactNode
}

const PrivateLayout : React.FC<Props> = ({children}) => {
    
  const isSSR      = useIsSSR()
  const breakpoint = useBreakpoint()

  const isMobileBreakpoint = breakpoint <= 768
  const canRenderDrawer = (!isSSR && isMobileBreakpoint)

  return (
    <div className={styles.v3}>
      <PrivateHeader/>
      <PrivateSider/>
      {canRenderDrawer && <Drawer/>}
      {children}
    </div>
  )
}

export default PrivateLayout