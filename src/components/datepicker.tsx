import useTCS from '@/hooks/useTCS'
import AntdDatePicker from 'antd/lib/date-picker'
import React from 'react'

interface Props {
    [x: string]: any;
}

const DatePicker : React.FC<Props> = ({ ...restProps }) => {
    const tcs = useTCS()
    return <AntdDatePicker {...tcs} {...restProps}/>
}

export default DatePicker