import { configureStore } from "@reduxjs/toolkit"
import appStateReducer from "../features/appstate"
import contestReducer from "../features/contest"

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    contest: contestReducer,
  },
})
