import { StyleInterface } from '@/interfaces/StyleInterface'
import dynamic from 'next/dynamic'
import router from 'next/router'

const DownOutlined = dynamic(() => import('@ant-design/icons/DownOutlined'))
const Dropdown     = dynamic(() => import('antd/lib/dropdown'))
const AntdMenu     = dynamic(() => import('antd/lib/menu'))
const Space        = dynamic(() => import('antd/lib/space'))

interface Props {
    styles: StyleInterface,
    onLogout: any,
    userName: string
}

const SettingsMenu : React.FC<Props> = ({styles, onLogout, userName}) => {

    return (
        <Dropdown
        className='settings-menu'
        placement="bottomRight"
        overlay={<AntdMenu items={[
        {label: <div onClick={() => router.push('/account/profile')}>Profile</div>, key: 'profile'},
        {label: <div onClick={() => router.push('/account/settings')}>Account Settings</div>, key: 'account-settings'},
        {label: <div onClick={onLogout}>Logout</div>, key: 'logout'}

        ]}/>} trigger={['click']}
        >
        <Space>
        <span className={styles.username}>{userName}</span>
        <DownOutlined />
        </Space>
        </Dropdown>
    )
}

export default SettingsMenu