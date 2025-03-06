import { post } from '@/utilities/request'

export const signupService = async (
  {
    user,
    form,
    router,
    setIsSigningUp,
  } : any) =>
{
  setIsSigningUp(true)

    try
    {
        const response = await post('/auth/register/', user, false)
        const data = await response.data

        const isSignedUp = data?.data?.hasOwnProperty('id')

        if( isSignedUp ) {

          const ONE_SECONDS_BEFORE_REDIRECT = 1000

          setIsSigningUp(false)
          
          setTimeout(() =>
          {

            router.push('/login')

            form.resetFields();

          }, ONE_SECONDS_BEFORE_REDIRECT )

        }

    } catch ( error: any )
    {

      console.log('error.response', error.response)

    //   const errors = Object.entries(error.response.data.error)

      setIsSigningUp(false)

    //   errors.forEach(([name, errors]: any) => 
    //   {

    //     const hasUniqueName = errors.toString().includes('The fields last_name, first_name must make a unique set.')

    //     if(hasUniqueName) {

    //       form.setFields([
    //         { 
    //           name: 'first_name',
    //           errors: ['First Name, Last Name must make a unique set.']
    //         },
    //         { 
    //           name: 'last_name',
    //           errors: ['First Name, Last Name must make a unique set.']
    //         }
    //       ])

    //     }

    //     form.setFields([{ name, errors}])
    //   }
    // )

    }
 
};