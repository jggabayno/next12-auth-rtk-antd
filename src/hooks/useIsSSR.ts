import { 
    useState,
    useEffect
} from "react"

const useIsSSR = () : boolean =>
{
    
    const [isSSR, setIsSSR] = useState<boolean>(true)

    useEffect(() => 
    {
        setIsSSR(false)
    }, [])

    return isSSR
}

export default useIsSSR