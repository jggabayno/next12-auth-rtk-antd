import { createReducer } from '@reduxjs/toolkit'

import {
toggleDrawer,
closeDrawer
} from '@/states/settings'

interface SettingInterface {
  isDrawerVisible: boolean
}

const initialState = { isDrawerVisible: false } as SettingInterface

export const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleDrawer, (state) =>
      (
        {
          ...state,
          isDrawerVisible: !state.isDrawerVisible
        }
      )
    )

    .addCase(closeDrawer, (state) =>
      (
        {
          ...state,
          isDrawerVisible: false
        }
      )
    )

})

export default settingsReducer