import Logo from '@/components/logo'
import Menu  from '@/components/menu'
import useIsSSR from '@/hooks/useIsSSR'
import { useAppSelector } from '@/states/hooks'
import { authSelector } from '@/states/selectors'
import styles from '@/styles/modules/login.module.scss'

const Sider : React.FC = () => {
  const isSSR = useIsSSR()
  const { isLoggedIn } = useAppSelector(authSelector)

  return (
    <aside className={styles.content}>
        <Logo styles={styles} />
        <Menu  mode='inline' type={isLoggedIn ? 'private' : 'public'}/>
    </aside>
  )
}

export default Sider