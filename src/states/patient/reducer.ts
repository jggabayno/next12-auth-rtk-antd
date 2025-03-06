import useTypicalReducer from '@/hooks/useTypicalReducer'
import {getPatients, createPatient, updatePatient, deletePatient} from '@/states/patient/actions'

export const patientReducer = useTypicalReducer({
  get: getPatients, create: createPatient, 
  update: updatePatient, drop: deletePatient
})