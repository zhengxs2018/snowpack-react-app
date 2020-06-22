import type { Store as Redux } from 'redux'

import type { AppState, AppActions } from './reducers/app'
import type { MeState, MeActions } from './reducers/me'

export type RootState = {
  me: MeState
  app: AppState
}

export type Actions = AppActions | MeActions

export type Store = Redux<RootState, Actions>
