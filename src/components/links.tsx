import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '@/styles/modules/links.module.scss'
import routes from '@/services/routes'
import IRoute from '@/interfaces/IRoute'

const Links : React.FC = () =>
{
    const router = useRouter()

    const liClassName = (route : IRoute) => route.path === router.pathname ? { className: styles.active } : {}

    return (
        <ul className={styles._}>
            {routes.map((route : IRoute) => (
                <li key={route.slug} {...liClassName(route)}>
                    <Link href={route.path} shallow={true}>{route.slug}</Link>
                </li>
            ))}
        </ul>
    )
}

export default Links