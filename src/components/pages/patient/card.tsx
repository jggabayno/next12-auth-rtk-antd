import dynamic from 'next/dynamic'
import Link from 'next/link'

import { Checkbox } from 'antd'
import Title from 'antd/lib/typography/Title'
import Text from 'antd/lib/typography/Text'

// import {AiOutlineEye} from "@react-icons/all-files/ai/AiOutlineEye"
// import {AiOutlineEdit} from "@react-icons/all-files/ai/AiOutlineEdit"
// import {AiOutlineDelete} from "@react-icons/all-files/ai/AiOutlineDelete"
// import {AiOutlineMessage} from "@react-icons/all-files/ai/AiOutlineMessage"

import moment from 'moment'
import { StyleInterface } from '@/interfaces/StyleInterface'

import { PatientInterface } from '@/interfaces/PatientInterface'
import { useRouter } from 'next/router'

const Tooltip  = dynamic(() => import('antd/lib/tooltip')) 
const Avatar  = dynamic(() => import('@/components/avatar'))

interface Props {
    styles: StyleInterface
    index: number
    patient: PatientInterface,
    openEditPatientModal: (patient: any) => (value: any) => void,
    onDelete: (id: number) => () => void
}

const PatientCard : React.FC<Props> = ({styles, patient, index, openEditPatientModal, onDelete}) => {

    const router = useRouter()

    return (
        <div className={styles.patient_card}>
          <div className={styles.ani}>
          <Checkbox className={styles.checkbox} value={patient.id}/>
    
           {/* <Avatar src={`https://i.pravatar.cc/?img=${index + 1}`} styles={styles} /> */}
          <div>
            <Link href='/patients'><Title className={styles.name} level={4}>{`${patient.first_name} ${patient.last_name}`}</Title></Link>
            <Text className={styles.unique_identifier}>{`#2022000${patient.id}`}</Text>
          </div>
          </div>
          <div className={styles.info}>
            <div>
              <Text className={styles.key}>Dentist</Text>
              <Text className={styles.value}>{patient.clinic_name}</Text>
            </div>
            <div>
              <Text className={styles.key}>Date Joined</Text>
              <Text className={styles.value}>{moment(patient.date_joined).format('MMM DD, YYYY')}</Text>
            </div>
            <div>
              <Text className={styles.key}>Clinic</Text>
              <Text className={styles.value}>{patient.clinic_name}</Text>
            </div>
            <div>
              <Text className={styles.key}>Last Visit</Text>
              <Text className={styles.value}>{moment(patient.date_joined).format('MMM DD, YYYY')}</Text>
            </div>
          </div>
          {/* <div className={styles.actions}>
          
            <div>
              <Tooltip title='Send Message'>
              <AiOutlineMessage/>
              </Tooltip>
            </div>
            <div onClick={() => router.push(`patients/${patient.id}`)}>
            <Tooltip title='View'>
              <AiOutlineEye />
              </Tooltip>
            </div>
            <div onClick={openEditPatientModal(patient)}>
            <Tooltip title='Edit'>
              <AiOutlineEdit />
              </Tooltip>
            </div>
            <div  onClick={onDelete(patient.id)}>
            <Tooltip title='Delete'>
              <AiOutlineDelete />
              </Tooltip>
            </div>
          </div> */}
          
        </div>
      )
}

export default PatientCard