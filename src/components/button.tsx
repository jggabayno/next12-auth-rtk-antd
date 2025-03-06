import dynamic from 'next/dynamic'
import useTCS from '@/hooks/useTCS'
import React, { ReactNode } from 'react'

const AntdButton = dynamic(() => import( 'antd/lib/button'))

interface Props {
  onClick?: () => any;
  children: ReactNode;
  htmlType?: string | any;
  [x: string]: any;
}
 
const Button : React.FC<Props> =({ onClick, children, htmlType, ...restProps }) => {
  const tcs = useTCS()

  const htmlTypeOrClickProps = htmlType === 'submit' 
  ?  { htmlType } : { onClick }

  return (
    <AntdButton  
        {...tcs}
        {...htmlTypeOrClickProps}
        {...restProps}
    >
      {children}
    </AntdButton>
  )
}

export default Button