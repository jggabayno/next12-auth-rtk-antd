import { useState } from 'react'

const useForm = () =>
{
    const [state, setState] = useState<any>({})

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) =>
    {
        e.persist()
        setState((state : any) => ({...state, [e.target.name]: e.target.value}))
    }

    return [state, setState, onChange]
}

export default useForm