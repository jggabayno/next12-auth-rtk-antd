import {Select as AntdSelect} from 'antd'
const {Option} = AntdSelect
import useTCS from '@/hooks/useTCS'
import { FC, ReactNode } from 'react'

interface Props {
    canSearch?: boolean;
    children: ReactNode;
    [x: string] : any;
}

const Select : FC<Props> = ({ canSearch = false, children, ...restProps }) => {
    
    const tcs = useTCS()

    const selectOptionProps = canSearch ? {
    showSearch: true,
    optionFilterProp: "children",
    filterOption: (input : string, option : any) => (option!.children as unknown as string).includes(input),
    filterSort: (optionA : any, optionB : any) =>
    (optionA!.children as unknown as string)
    .toLowerCase()
    .localeCompare((optionB!.children as unknown as string).toLowerCase()),
    } : {}

    return <AntdSelect 
            {...tcs}
            {...selectOptionProps}
            {...restProps}
            >{children}</AntdSelect>
 
}

export default Select
export const SelectOption = Option