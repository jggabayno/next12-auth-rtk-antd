import { StyleInterface } from '@/interfaces/StyleInterface'
import Image from 'next/image'

interface Props {
  src: string;
  styles?: StyleInterface;
}

const Avatar : React.FC<Props> = ({ src, styles }) => {
  return (
    <div className={`${styles?.hasOwnProperty('avatar') ? styles.avatar : ''} avatar`}>
      <Image
        src={src}
        alt='avatar'
        layout='fill'
        blurDataURL={src}
      />
    </div>
  )
}

export default Avatar