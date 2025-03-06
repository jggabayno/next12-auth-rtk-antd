import { LoginCredentialInterface } from "@/interfaces/LoginCredentialInterface"
import { post } from "@/utilities/request"

export async function loginService(credential: LoginCredentialInterface)
{
    const response = await post('/auth/login/', credential, false)
    const data = await response.data
    return data
}

export async function logoutService(refresh: any)
{
    const response = await post('/auth/logout/', {refresh})
    const data = await response.data
    return data
}