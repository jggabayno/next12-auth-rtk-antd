import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Button from '@/components/button'
import styles from '@/styles/modules/404.module.scss'

const Result = dynamic(() => import('antd/lib/result'))

const NotFound : React.FC = () =>
{
  const router = useRouter()
  
  return (
    <main className={styles._}>
        {/* <Result
          icon={false}
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button onClick={() => router.back()} type="primary">Go Back</Button>}
        /> */}
    </main>
  )
}

export default NotFound