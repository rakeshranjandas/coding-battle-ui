import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import TIMER_STATE from "./types"
import { clearInterval } from "stompjs"

const initialState = {
  curState: TIMER_STATE.NOT_STARTED,
  secondsRemaining: 0,
  waitSeconds: 0,
  startingTimestamp: 0,
  durationInSeconds: 0,
  timerId: null,
}

const startTimer = createAsyncThunk(
  "timer/start",

  async (params, { dispatch, getState }) => {
    dispatch(timerSlice.actions.setDurationInMinutes(params.duration))
    dispatch(timerSlice.actions.setStartingTimestamp(params.startingTimestamp))
    dispatch(timerSlice.actions.ready())

    const timerId = setInterval(() => {
      dispatch(timerSlice.actions.tick())

      if (getState().timer.curState === TIMER_STATE.ENDED) {
        dispatch(timerSlice.actions.clearTimerId())
      }
    }, 1000)

    dispatch(timerSlice.actions.setTimerId(timerId))
  }
)

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setDurationInMinutes: (state, action) => {
      state.durationInSeconds = parseInt(action.payload) * 60
    },
    setStartingTimestamp: (state, action) => {
      state.startingTimestamp = parseInt(action.payload)
    },
    setTimerId: (state, action) => {
      state.timerId = action.payload
    },
    clearTimerId: (state) => {
      clearInterval(state.timerId)
    },
    ready: (state) => {
      state.curState = TIMER_STATE.READY
    },
    tick: (state) => {
      if (state.curState === TIMER_STATE.READY) {
        state.waitSeconds = Math.floor(
          (state.startingTimestamp - new Date().getTime()) / 1000
        )

        if (state.waitSeconds <= 0) {
          state.curState = TIMER_STATE.STARTED
        }
      } else if (state.curState === TIMER_STATE.STARTED) {
        state.secondsRemaining = Math.floor(
          (state.startingTimestamp +
            state.durationInSeconds * 1000 -
            new Date().getTime()) /
            1000
        )

        if (state.secondsRemaining <= 0) {
          state.curState = TIMER_STATE.ENDED
        }
      }
    },
  },
})

export const {
  setDurationInMinutes,
  setStartingTimestamp,
  setTimerId,
  clearTimerId,
  ready,
  tick,
} = timerSlice.actions

export { startTimer }

export default timerSlice.reducer
