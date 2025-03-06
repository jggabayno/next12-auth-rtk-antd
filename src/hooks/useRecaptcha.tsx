import { useRef, useState } from 'react'
import { reCaptchaService } from '@/services/recaptcha'
import { UseRecaptchaInterface } from '@/interfaces/RecaptchaInterface'

import ReCAPTCHA from 'react-google-recaptcha'

export default function useRecaptcha() : UseRecaptchaInterface
{
    const rcRef : any           = useRef<ReCAPTCHA>()
    const [isHuman, setIsHuman] = useState<boolean>(false)
 
    async function validateReCaptchaToken()
    {

        const token = await rcRef.current.getValue()

        const checkReCaptcha = await reCaptchaService(token)
        
        setIsHuman(checkReCaptcha.is_success)

    }
 
    return {
      state: [isHuman, setIsHuman],
      component: () : JSX.Element => (
            <ReCAPTCHA
              sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
              ref={rcRef}
              onChange={validateReCaptchaToken}
            />
          )
      
      }
    
}
