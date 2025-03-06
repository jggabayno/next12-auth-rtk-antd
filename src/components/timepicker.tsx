import AntdTimePicker from 'antd/lib/time-picker'
import useTCS from '@/hooks/useTCS'

interface Props {
    [x: string] : any
}

const TimePicker : React.FC<Props> = ({...restProps}) => {
    const tcs = useTCS()
    return <AntdTimePicker {...tcs} {...restProps}/>
}

export default TimePicker