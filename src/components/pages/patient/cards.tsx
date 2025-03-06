import dynamic from 'next/dynamic'
import { useState } from 'react'
import { StyleInterface } from '@/interfaces/StyleInterface'
import { PatientInterface } from '@/interfaces/PatientInterface'
import { Checkbox } from 'antd'
import Button from '@/components/button'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'

const PatientCard = dynamic(() => import('@/components/pages/patient/card'))

interface Props {
    styles: StyleInterface
    patients: PatientInterface[],
    openEditPatientModal: (patient: any) => (value: any) => void,
    onDelete: (id: number) => () => void
}

const PatientCards : React.FC<Props> = ({styles, patients, openEditPatientModal, onDelete}) => {

const patientIds = patients.map((patient: PatientInterface) => patient.id)
 
const [selectedPatientList, setSelectedPatientList] = useState<CheckboxValueType[]>([])
const [indeterminate, setIndeterminate] = useState<boolean>(true)
const [checkAll, setCheckAll] = useState<boolean>(false)

const onSelectPatient = (patients: CheckboxValueType[]) => {
  setSelectedPatientList(patients)
  setIndeterminate(!!patients.length && patients.length < patientIds.length)
  setCheckAll(patients.length === patientIds.length)
};

const onCheckAllChange = (e: CheckboxChangeEvent) => {
  setSelectedPatientList(e.target.checked ? patientIds : [])
  setIndeterminate(false)
  setCheckAll(e.target.checked)
}

const hasSelectedPatient = selectedPatientList.length > 0

const selectedItemText = hasSelectedPatient &&
    <div className={styles.selected_patient_count_text_and_delete_btn}>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>Check all</Checkbox>
        <span>{`Selected ${selectedPatientList.length} items`}</span>
        <Button type='link' size='small'>Delete</Button>
    </div>

    return (
        <div className={styles.patient_cards}>
        {selectedItemText}
        <Checkbox.Group className={styles.checkbox_group} value={selectedPatientList} onChange={onSelectPatient}>
            {patients.map((patient: PatientInterface, index: number) => (
             <PatientCard key={patient.id} index={index} patient={patient} styles={styles} openEditPatientModal={openEditPatientModal} onDelete={onDelete}/>
            ))}
        </Checkbox.Group>
        </div>
    )
}

export default PatientCards