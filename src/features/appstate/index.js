import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import APP_STATE from "./types"
import Network from "../../app/network"

const initialState = {
  cur_state: APP_STATE.CONNECTING,
}

const initialise = createAsyncThunk(
  "appstate/initialise",

  async (params, { dispatch, getState }) => {
    let response = Network().ajax.sendJoinRequest(
      params.userId,
      params.inviteCode
    )
    dispatch(appStateSlice.actions.connected())
  }
)

const appStateSlice = createSlice({
  name: "appstate",
  initialState,
  reducers: {
    connected: (state) => {
      state.cur_state = APP_STATE.READY
    },
    contestStarted: (state) => {
      state.cur_state = APP_STATE.CONTEST.STARTED
    },
    contestEnded: (state) => {
      state.cur_state = APP_STATE.CONTEST.ENDED
    },
  },
})

export const { connected, contestStarted, contestEnded } = appStateSlice.actions

export { initialise }

export default appStateSlice.reducer
