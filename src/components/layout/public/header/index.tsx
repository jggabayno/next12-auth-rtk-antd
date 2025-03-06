import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import styles from '@/styles/modules/header.module.scss'
import useBreakpoint from '@/hooks/useBreakpoint'

const Logo   = dynamic(() => import('@/components/logo'))
const Links  = dynamic(() => import('@/components/links'))
const Burger = dynamic(() => import('@/components/burger'))

const Header : React.FC = () =>
{
    const router              = useRouter()
    const breakpoint          = useBreakpoint()
    const [isOpen, setIsOpen] = useState(false)

    const is9 = breakpoint < 992
    const onToggleNav = () => setIsOpen(prevIsOpen => !prevIsOpen)

    useEffect(() =>
    {
        if(router.pathname) setIsOpen(false)
    }, [router])

    return (
        <header className={styles._}>
            <div className={`${styles.inner} inner`}>
                <Logo/>
                <nav className={`inner ${is9 ? (isOpen ? styles.op : styles.cl) : ''}`}>
                    <Links/>
                </nav>
                {is9 && <Burger onToggleNav={onToggleNav} className={styles.menu} />}
            </div>
        </header>
    )
}

export default Header