import { post } from '@/utilities/request'

export const refreshService = async (data : any ) : Promise<any> =>
{

  if (data.refresh) {
    const response = await post('/refresh/token/', data, false)
    const responseData = await response.data
  
    const isSuccess = responseData?.message === 'Success'
  
    if(isSuccess) return responseData?.data?.access;
  }

  return;
}