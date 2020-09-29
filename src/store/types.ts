import type { Store as Redux } from 'redux'

import type { AppState, AppActions } from './reducers/app'

export type RootState = {
  app: AppState
}

export type Actions = AppActions

export type Store = Redux<RootState, Actions>
