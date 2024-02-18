import { configureStore } from "@reduxjs/toolkit"
import appStateReducer from "../features/appstate"

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
  },
})
