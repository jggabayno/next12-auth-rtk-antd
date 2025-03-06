import { checkToken } from '@/utilities/isTokenExpired'
import { getCookie, hasCookie, setCookie } from '@/utilities/cookie'
import { refreshService } from '@/services/refresh'

export default async function configuredToken()
: Promise<string | undefined>
{

    if( hasCookie('next12_session') ) {

        let token = ''
    
        const parsedSession = JSON.parse(getCookie('next12_session'))

        const isAccessTokenExpired = await checkToken(parsedSession?.token?.access)
 
        token = parsedSession?.token?.access
     
        if ( isAccessTokenExpired ) {
           
            console.log("%cAccess Token Expired", "color:#2196F3");
            console.log("%cRequesting New Access Token...", "color:#2196F3");

            const newAccessToken : any = await refreshService({ refresh: parsedSession?.token?.refresh })

            const session = {
                token: {
                    refresh: parsedSession?.refresh,
                    access: newAccessToken
                },
                user: {...parsedSession?.user}
            }
            
            setCookie( 'next12_session', session)

            console.log("%cRequested Access token Applied", "color:#2196F3");

            token = newAccessToken

        }

        return token
    }
}