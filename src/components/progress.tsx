import dynamic from 'next/dynamic'
import { motion, useScroll, useSpring } from 'framer-motion'
const NextNProgress = dynamic(() => import('nextjs-progressbar'))

const Progress : React.FC = () =>
{
    const { scrollYProgress } = useScroll()
    const scaleX              = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    })

    return (
      <>
      <NextNProgress
        color="#2196F3"
        height={2}
        options={{ showSpinner: false }} 
        showOnShallow={true}
      />
      <motion.div className='scroll_up_progress_bar' style={{ scaleX }} />
      </>
    )
}

export default Progress


