import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPatientService, createPatientService, updatePatientService, deletePatientService } from '@/services/patient'

export const getPatients = createAsyncThunk( 'get/patient', async (clinicId : number, thunkAPI) =>
    {

      try
      {

        const data = await getPatientService(clinicId)
    
        const isSuccess = data?.message === 'Success'

        if( isSuccess ) {
          
          return data.data

        }

      } catch (err)
      {
        return thunkAPI.rejectWithValue('Opps there seems to be an error')
      }

    }
)

export const createPatient = createAsyncThunk( 'post/patient', async ({patient, closeFormModal, message} : any, thunkAPI) =>
{
  try
  {

    const data = await createPatientService(patient)

    const isSuccess = data?.message === 'Success'

    if( isSuccess ) {
      message({content: 'Patient creation success'})
      closeFormModal()
      return data.data
    }

  } catch (content)
  {
    message({content, level: 'error'})
    return thunkAPI.rejectWithValue('Opps there seems to be an error')
  }

}
)

export const updatePatient = createAsyncThunk('patch/patient', async ({patientId, patient, closeFormModal, message} : any, thunkAPI) =>
{
  try
  {

    const data = await updatePatientService(patientId, patient)

    const isSuccess = data?.message === 'Success'

    if( isSuccess ) {
      message({content: 'Patient updation success'})
      closeFormModal()
      return data.data
      
    }

  } catch (content)
  {
    message({content, level: 'error'})
    return thunkAPI.rejectWithValue('Opps there seems to be an error')
  }

}
)

export const deletePatient = createAsyncThunk('delete/patient', async ({payload, message}: any, thunkAPI) =>
{
 
  try
  {

    const isDeleted = await deletePatientService(payload.id)

    if( isDeleted ) {
      message({content: 'Patient deletion success'})
      return payload
    }

  } catch (content)
  {
    message({content, level: 'error'})
    return thunkAPI.rejectWithValue('Opps there seems to be an error')
  }

}
)