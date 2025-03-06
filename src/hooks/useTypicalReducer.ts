import { TypicalStateInterface } from '@/interfaces/TypicalStateInterface'
import { createReducer } from '@reduxjs/toolkit'

const initialState: TypicalStateInterface = {
  data: [],
  isPending: false,
  hasError: false
};

const useTypicalReducer = (actions : any) => {

    const {get, create, update, drop} : any = actions

    return createReducer(initialState, builder => {
        builder
        .addCase(get.pending, state => ({...state, isPending: true }))
        .addCase(get.fulfilled, (state, { payload }) => ({...state, isPending: false, data: payload }))
        .addCase(get.rejected, state => ({...state, isPending: false, hasError: true}))
      
        .addCase(create.pending, state => ({...state, isPending: true }))
        .addCase(create.fulfilled, (state, { payload }) => ({...state, isPending: false, data: [payload, ...state.data]}))
        .addCase(create.rejected, state => ({...state, isPending: false, hasError: true}))
      
        .addCase(update.pending, state => ({...state, isPending: true }))
        .addCase(update.fulfilled, (state, { payload }: any) => ({...state, isPending: false, data: [payload, ...state.data.filter((row : any) => row.id != payload.id)]}))
        .addCase(update.rejected, state => ({...state, isPending: false, hasError: true}))
      
        .addCase(drop.pending, state => ({...state, isPending: true }))
        .addCase(drop.fulfilled, (state, { payload }: any) => ({...state, isPending: false, data: state.data.filter((row : any) => row.id != payload.id)}))
        .addCase(drop.rejected, state => ({...state, isPending: false, hasError: true}))
      
      });
    
}

export default useTypicalReducer