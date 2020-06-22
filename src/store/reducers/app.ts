import { AuthStatus } from '../enums'

import type { LoadAuthStatusAction, LoadAllCategoriesAction, Categories } from '../actions/app'

export type AppActions = LoadAuthStatusAction | LoadAllCategoriesAction

export interface AppState {
  authStatus: AuthStatus
  categories: Categories
}

const initialState = (): AppState => ({
  authStatus: AuthStatus.LOADING,
  categories: {
    loading: false,
    items: [],
    error: false,
  },
})

export default (state: AppState, action: AppActions): AppState => {
  if (action.type === 'app#authStatus') {
    return { ...state, ...action.payload }
  } else if (action.type === 'app#loadAllCategories') {
    const categories = action.payload
    return { ...state, categories: { ...state.categories, ...categories } }
  }

  return state ?? initialState()
}
