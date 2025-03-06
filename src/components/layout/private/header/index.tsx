import router from 'next/router'
import dynamic from 'next/dynamic'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { logout } from '@/states/auth'
import { authSelector } from '@/states/selectors'
import { toggleDrawer } from "@/states/settings"
import useBreakpoint from "@/hooks/useBreakpoint"
import useIsSSR from "@/hooks/useIsSSR"
import styles from '@/styles/modules/login.module.scss'

import { getCookie } from '@/utilities/cookie'

const BellOutlined = dynamic(() => import('@ant-design/icons/BellOutlined'))
const Avatar       = dynamic(() => import('@/components/avatar'))
const Search       = dynamic(() => import('@/components/layout/private/header/search'))
const BurgerMenu   = dynamic(() => import('@/components/layout/burgerMenu'))
const SettingsMenu = dynamic(() => import('@/components/layout/private/header/settingsMenu'))

const Header : React.FC = () => {
  
  const dispatch       = useAppDispatch()
  const breakpoint     = useBreakpoint()
  const isSSR          = useIsSSR()
 
  const { isLoggedIn, loggedData } = useAppSelector(authSelector)

    const userName : string = `${loggedData?.user?.first_name} ${loggedData?.user?.last_name}`

    function onLogout()
    {
        if ( isLoggedIn )
        {
            const refresh = JSON.parse(getCookie('next12_session'))?.token?.refresh
            dispatch(logout({refresh, router}))
        }
    }

  const isMobileBreakpoint  = breakpoint <= 768

  const canDisplayBurgerMenu = !isSSR && isMobileBreakpoint

  return  (
    <header className={styles.content}>
    <div className={styles.inner}>
      <Search styles={styles}/>
     <div className={styles.notif_and_avatar_and_settings_menu}>
      <BellOutlined />
     {!isMobileBreakpoint &&  (
        <div className={styles.avatar_and_settings_menu}>
          {/* <Avatar styles={styles} src='https://i.pravatar.cc/?img=48'/> */}
          <SettingsMenu styles={styles} userName={userName} onLogout={onLogout} />
        </div>
     )}
     </div>
      {canDisplayBurgerMenu && <BurgerMenu styles={styles} dispatch={dispatch} toggleDrawer={toggleDrawer}
      />}
    </div>
  </header>
  )
}

export default Header