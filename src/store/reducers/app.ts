export interface AppState {
  // pass
}

export interface AppActions {
  type: string
}

const initialState = (): AppState => ({
  // pass
})

export default (state: AppState): AppState => {
  // pass
  return state ?? initialState()
}
