
import React  from 'react'

import Empty from 'antd/lib/empty'
import AntdTable from 'antd/lib/table'
import Grid from 'antd/lib/grid'
import useTCS from '@/hooks/useTCS'

export default function Table({ attributes, ...restProps }: any) : JSX.Element {

    const tcs = useTCS()

    const { dataSource, isLoading, isSearching, columns,
    currentPage, pageSize, total, onPaginate,data
    } = attributes

    const screens:any = Grid.useBreakpoint()
    const isXs = screens.xs
   
    const paginationConfig = attributes.hasOwnProperty('currentPage') 
    ? {pagination: { current: currentPage, pageSize, total }, onChange: onPaginate} : 
    {pagination: { pageSize: 5 }}

    const includeDescription = isLoading ? {description: 'Loading...'} : {}
    
    return (
        <AntdTable
            {...restProps}
            {...tcs}
            {...paginationConfig}
            rowKey={obj => obj.id}
            loading={isLoading}
            columns={columns}
            dataSource={dataSource(data)}
            scroll={isXs && { x: 'max-content' }}
            locale={{
                emptyText: (isSearching
                    ?
                    <>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No Results Found' />
                    </>
                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} {...includeDescription} />)
            }}
        />
    )
}
