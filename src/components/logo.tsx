import Link from "next/link"
import styles from '@/styles/modules/logo.module.scss'

const Logo : React.FC = () =>
{

  return (
    <div className={styles._}>
      <Link href='/' shallow={true}>
        App.
      </Link>
    </div>
  )
}

export default Logo