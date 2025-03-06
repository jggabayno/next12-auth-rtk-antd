import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from '@/states/reducers'

const makeStore = () => configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
})

type Store = ReturnType<typeof makeStore>

export type AppDispatch = Store['dispatch']
export type RootState = ReturnType<Store['getState']>

export const wrapper = createWrapper(makeStore)