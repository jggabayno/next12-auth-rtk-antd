import { createSelector } from '@reduxjs/toolkit'
import { RootState } from "@/states/store"

export const authSelector = createSelector(
    (state: RootState) => state.auth,
    state => state
)

export const settingsSelector = createSelector(
    (state: RootState) => state.settings,
    state => state
)

export const patientSelector = createSelector(
    (state: RootState) => state.patients,
    state => state
)