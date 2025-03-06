import {
  AnyAction,
  combineReducers
} from '@reduxjs/toolkit'

import { HYDRATE } from 'next-redux-wrapper'
import { authReducer } from '@/states/auth'
import { settingsReducer } from '@/states/settings'
import { patientReducer } from '@/states/patient'

const combinedReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  patients: patientReducer,
});

const reducers : any = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
  ) =>
{

  if (action.type !== HYDRATE) return combinedReducer(state, action);

  const nextState = {
    ...state, // use previous state
    ...action.payload // apply delta from hydration
  };

  if (state.auth) nextState.auth = state.auth // preserve authentication value on client side navigation

  return nextState;

};

export default reducers;