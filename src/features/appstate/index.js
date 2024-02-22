import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import APP_STATE from "./types"
import Network from "../../app/network"
import {
  setUser,
  setProblems,
  setDuration,
  setParticipants,
  addParticipant,
  updateSubmission,
} from "../contest"

import { startTimer } from "../timer"

const initialState = {
  cur_state: APP_STATE.CONNECTING,
}

const initialise = createAsyncThunk(
  "appstate/initialise",

  async (params, { dispatch, getState }) => {
    let { ajax, socket } = Network()

    let response = await ajax.sendJoinRequest(params.userId, params.inviteCode)

    dispatch(setUser(params.userId))
    dispatch(setProblems(response.questions))
    dispatch(setDuration(response.duration))
    dispatch(setParticipants(response.users))

    socket.connect(response.sessionId, params.userId, {
      onUserJoin: (newUser) => {
        dispatch(addParticipant(newUser))
      },

      onContestStart: (startTime) => {
        dispatch(
          startTimer({
            duration: response.duration,
            startingTimestamp: startTime,
          })
        )
      },

      onContestEnd: () => {},

      onUserSubmit: (user, contestQuestionId) => {
        dispatch(
          updateSubmission({
            user: user,
            contestQuestionId: contestQuestionId,
          })
        )
      },
    })

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
