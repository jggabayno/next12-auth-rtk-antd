import AntdInput from 'antd/lib/input'
import useTCS from '@/hooks/useTCS'

interface Props {
    type?: string;
    [x: string] : any
}

const Input : React.FC<Props> = ({ type, ...restProps}) => {
    const tcs = useTCS()
    
    if ( type === 'password' ) 
        return <AntdInput.Password {...tcs} {...restProps}/>

    if ( type === 'textarea' ) 
        return <AntdInput.TextArea {...tcs}{...restProps}/>

    return <AntdInput {...tcs} {...restProps}/>
}

export default Input