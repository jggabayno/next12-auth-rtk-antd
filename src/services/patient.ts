import {
  PatientGetPostPatchResponseInterface,
  PatientPatchParamsInterface,
  PatientPostParamsInterface,
  PatientDeleteResponseInterface
} from "@/interfaces/PatientInterface"
import { get, post, update, drop } from "@/utilities/request"

export async function getPatientService(clinicId : number) : Promise<PatientGetPostPatchResponseInterface>
{
  const response = await get(`/account/clinic/${clinicId}/patient/`)
  const data = await response.data
  return data
}

export async function createPatientService(patient : PatientPostParamsInterface) : Promise<PatientGetPostPatchResponseInterface>
{
  const response = await post('/account/clinic-user/', patient)
  const data  = await response.data
  return data;
}

export async function updatePatientService(patientId : number, patient : PatientPatchParamsInterface) : Promise<PatientGetPostPatchResponseInterface>
{
  const response = await update(`/account/clinic-user/${patientId}/`, patient)
  const data  = await response.data
  return data;
}

export async function deletePatientService(patientId : number) : Promise<any>
{
  const response = await drop(`/account/clinic-user/${patientId}/`)
 
  const isDeleted = response.status === 204

  return isDeleted;

}