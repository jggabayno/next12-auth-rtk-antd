import jwt_decode from 'jwt-decode'

export const checkToken = async (token: string) : Promise<boolean> =>
{
    
    let res = true;
    
    try
    {
        const currentTime = new Date().getTime() / 1000
        const decodedToken: any = jwt_decode(token)

        if(decodedToken.exp > currentTime) return false
    
    } catch (err) {
    
        res = true;
    
    }

    return res
}