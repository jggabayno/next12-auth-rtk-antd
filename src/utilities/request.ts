import axios from 'axios'
import token from '@/utilities/token'

type EndpointType = string
type DataType = object
type IsPrivateType = boolean

const  config = async () => 
({
headers: {
    Authorization: `Bearer ${ await token()}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
}
})
 
const API_URL = process.env.NEXT_PUBLIC_API_URL

export const get = async (endpoint: EndpointType, isPrivate: IsPrivateType = true) => 
axios.get(API_URL + endpoint, isPrivate ? await config() : undefined)

export const post = async (endpoint: EndpointType, data: DataType, isPrivate: IsPrivateType = true) =>
axios.post(API_URL + endpoint, data, isPrivate ? await config() : undefined)

export const update = async (endpoint: EndpointType, data: DataType, isPrivate: IsPrivateType = true) =>
axios.patch(API_URL + endpoint, data, isPrivate ? await config()  : undefined)

export const drop = async (endpoint: EndpointType) =>
axios.delete(API_URL + endpoint, await config())
