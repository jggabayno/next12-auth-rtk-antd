import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import useBreakpoint from '@/hooks/useBreakpoint'
import useIsSSR from '@/hooks/useIsSSR'

const AntdMenu = dynamic(() => import('antd/lib/menu'))

interface MenuItemInterface {
    label: string,
    key: string,
    children: []
}

interface MenuConfigInterface {
    items: MenuItemInterface[];
    mode: string | any;
    itemIcon: boolean;
    selectedKeys: string[],
    defaultSelectedKeys: string[],
    onSelect: any,
}

function extraItems(isMobileBreakpoint : boolean){
        
    const logout : any = isMobileBreakpoint ? [{label: 'Logout', key: '/logout'}] : []
    const divider : any = isMobileBreakpoint ? [{type: 'divider'}] : []
    const shared : any = isMobileBreakpoint ? [{label: 'Help & Feedback', key: '/help-feedback'}] : []

    return {
        divider,
        shared,
        logout
    }
}

function makeOpenKeys(privateItems: MenuItemInterface[], activeRoute : string){

    const subMenu = privateItems.filter((item : MenuItemInterface) => item.hasOwnProperty('children'))
    
    function findContext(activeRoute: string){
        
        return (item: MenuItemInterface) => {

            const isMatchKey = item.key === activeRoute
            const hasMatchWithChildrenKey = item.children.some((item: MenuItemInterface) => item.key === activeRoute)
            
            const data = isMatchKey || hasMatchWithChildrenKey;

            return data;
        }
       
    }

    const activeSubKey = subMenu.find(findContext(activeRoute))?.key || []

    const result =  activeSubKey.length ? {openKeys: [activeSubKey], defaultOpenKeys:  [activeSubKey]} : {}

    return result;
}

const Menu : React.FC<{ mode: string, type : string }> = ({ mode, type }) => {
    
    const router         = useRouter()
    const breakpoint     = useBreakpoint()
    const isSSR          = useIsSSR()
    
    const isMobileBreakpoint  = breakpoint <= 768
    const activeRoute = router.pathname

    const { divider, shared, logout} = extraItems(isMobileBreakpoint)

    const publicItems = [
       {label: 'Features', key: '/features'},
       {label: 'Signup', key: '/signup'},
       ...divider,
       ...shared
   ]
   
    const privateItems = [
       ...divider,
       {label: 'Dashboard', key: '/dashboard'},
       {label: 'Patients', key: '/patients'},
       ...logout,
       ...divider,
       ...shared
   ]

   const designatedMenu = (type : string) => {
        if (type === 'private') return privateItems
        if (type === 'public') return publicItems
        return []
   }

    const openKeys                 = makeOpenKeys(privateItems, activeRoute)

    const selectKey = (event : any) => router.push(event.key)

    const menuConfig : MenuConfigInterface = {
        items: designatedMenu(type),
        itemIcon: false,
        mode,
        selectedKeys: [activeRoute],
        defaultSelectedKeys: ['/'] ,
        onSelect: selectKey,
        ...openKeys,
    }

    if (!isSSR) return <AntdMenu {...menuConfig}/>

    return <></>
   
}

export default Menu