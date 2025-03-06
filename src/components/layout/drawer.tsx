import { useRouter } from "next/router"
import dynamic from 'next/dynamic'
import { authSelector, closeDrawer, settingsSelector } from '@/states/settings'
import { useAppDispatch, useAppSelector } from '@/states/hooks'

import Button from '@/components/button'

const AntdDrawer = dynamic(() => import('antd/lib/drawer'))
const Menu       = dynamic(() => import('@/components/menu'))
const Title = dynamic(() => import('antd/lib/typography/Title'))
const Text = dynamic(() => import('antd/lib/typography/Text'))
const Avatar = dynamic(() => import('@/components/avatar'))
const Anchor = dynamic(() => import('antd/lib/anchor'))
const AnchorLink = dynamic(() => import('antd/lib/anchor/AnchorLink'))

const Drawer : React.FC = () => {

  const dispatch                   = useAppDispatch()
  const {isDrawerVisible}          = useAppSelector(settingsSelector)
  const router                     = useRouter()
  const { isLoggedIn, loggedData } = useAppSelector(authSelector)

  const userName = loggedData?.user?.first_name

  const drawerConfig : any = {
      visible: isDrawerVisible,
      onClose: () => dispatch(closeDrawer()),
      closeIcon: false,
      title: false,
      placement: 'left',
      className: 'drawer',
      width: 250
  }
  
  return (
    <AntdDrawer {...drawerConfig}>
      {isLoggedIn && <div className='top_content'>
        <Avatar src='/avatar.png'/>
        <Title level={5} className='top_content_user_name'>{userName}</Title>
        <Text>jonh@exmaple.ph</Text>
      </div>

      }
      <Menu  mode='vertical' type={isLoggedIn ? 'private' : 'public'}/>
      {!isLoggedIn && <>
        <div className="top_content_login_signup_container">
        <Button type="link" size='middle' onClick={() => router.push('/login')}>LOGIN</Button>
        <Anchor
        affix={false}
        targetOffset={100}
        >
        <AnchorLink
        href="/#signup"
        title={<Button type="primary" ghost size='middle'>SIGN UP</Button>}
        />
        </Anchor>
        </div>

      </>
      }
    </AntdDrawer>
  )
}

export default Drawer