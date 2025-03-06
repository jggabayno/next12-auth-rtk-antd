import dynamic from 'next/dynamic'
import React, { ReactNode } from 'react'
import useIsSSR from "@/hooks/useIsSSR"
import useBreakpoint from '@/hooks/useBreakpoint'

const PublicHeader = dynamic(import('@/components/layout/public/header'))
const Drawer       = dynamic(() => import('@/components/layout/drawer'))

interface Props {
  children : ReactNode
}

const PublicLayout : React.FC<Props> = ({children}) => {
        
  const isSSR      = useIsSSR()
  const breakpoint = useBreakpoint()

  const isMobileBreakpoint = breakpoint <= 768
  const canRenderDrawer = (!isSSR && isMobileBreakpoint)

  return (
    <>
      <PublicHeader/>
      {children}
      {canRenderDrawer && 
      <Drawer/>}
    </>
  )
}

export default PublicLayout