import { wrapper } from "@/states/store"
import { hasCookie } from "@/utilities/cookie"

export default function pageAuth(
  // initial value
  hasAuth : boolean = true,
  callback: any = () => ( { props: {} } )
) {

  return wrapper.getServerSideProps(
    () => async (context) : Promise<any> => 
      {

        const hasSession : boolean = hasCookie('next12_session', {req: context.req})

        const hasSessionAuth = hasAuth ? !hasSession : hasSession
        const Location: string = hasAuth ? '/login' : '/'

        context.res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')

        if( hasSessionAuth )
        {  
          context.res.writeHead(307, {Location})
          context.res.end()
          return callback(context)
        }

        return callback(context)

      }
  )

}