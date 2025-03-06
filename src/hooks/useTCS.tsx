import Grid from 'antd/lib/grid'

// transform component size
// via viewport


export type TCSInterface = string | any

const initialValueProps = {
  xxl: 'large',
  xl: 'large',
  lg: 'large',
  md: 'large',
  sm: 'middle',
  xs: 'middle'
  }

const useTCS = (valueProp = initialValueProps) : {size: TCSInterface} => {

  const {xxl, xl, lg, md, sm, xs } = Grid.useBreakpoint()

    if ( xxl ) return {size: valueProp.xxl}
    if ( xl ) return {size: valueProp.xl}
    if ( lg ) return {size: valueProp.lg}
    if ( md ) return {size: valueProp.md}
    if ( sm ) return {size: valueProp.sm}
    if ( xs ) return {size: valueProp.xs}

    return {size: ''}
}

export default useTCS