import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { StyleInterface } from '@/interfaces/StyleInterface'
import { PatientInterface } from '@/interfaces/PatientInterface'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { getPatients } from '@/states/patient'
import { authSelector, patientSelector } from '@/states/selectors'

const AutoComplete = dynamic(import('antd/lib/auto-complete'))

interface Props {
  styles: StyleInterface
}

const Search : React.FC<Props> = ({styles}) => {

  const dispatch                             = useAppDispatch()
  const {data: patients, isPending}          = useAppSelector(patientSelector)
  const { loggedData } = useAppSelector(authSelector)

  const clinicId = loggedData?.user?.clinic_id

  useEffect(() => { dispatch(getPatients(clinicId)) }, [dispatch, clinicId])

  const dataSource = patients.map((patient : PatientInterface) => ({key: patient.id, value: `${patient.first_name} ${patient.last_name}`}))

  const router = useRouter()
  const [options, setOptions] = useState([])

  const search = (val: string) => {
    let filtered : any = dataSource.filter((
      obj : any) =>
        obj.key !== 0 &&
        obj.value
          .toString()
          .toLowerCase()
          .includes(val)
    );
    setOptions(filtered)
  };

  function select(_ : any, option: any) {
    router.push(`/patients/${option.key}`)
  }

  return (
    <div className={styles.search}>
      <AutoComplete
      style={{width: '17rem'}}
      size='large'
      options={options}
      onSelect={(val : any, option : any) => select(val, option)}
      onSearch={search}
      allowClear={true}
      placeholder="Search Patient" 
      disabled={isPending}     
      /> 
    </div>
  )
}

export default Search