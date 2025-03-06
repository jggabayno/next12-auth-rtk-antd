import { useState } from "react"

export interface ConfigInterface {
    isModalVisible: boolean
    actionType: string | null
    selected: object | null
}

const useModalFormConfig = (form : any) : any =>
{
    const [config, setModalFormStateConfig] = useState<ConfigInterface>({
        isModalVisible: false,
        actionType: null,
        selected: {}
    })

    const openFormModal = () => {

        setModalFormStateConfig((prevConfig : ConfigInterface) => ({
            isModalVisible: !prevConfig.isModalVisible,
            actionType: 'create',
            selected: {}
        }))

        form.resetFields()
    }

    const closeFormModal = () => {

        setModalFormStateConfig(() => ({
            isModalVisible: false,
            actionType: null,
            selected: {}
        }))

        form.resetFields()
    }

    return {...config, setModalFormStateConfig, openFormModal, closeFormModal}
}

export default useModalFormConfig