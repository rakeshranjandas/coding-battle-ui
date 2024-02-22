import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: "",
  problems: [],
  duration: 0,
  participants: {},
}

export const contestSlice = createSlice({
  name: "contest",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setProblems: (state, action) => {
      state.problems = action.payload
    },
    setDuration: (state, action) => {
      state.duration = action.payload
    },
    setParticipants: (state, action) => {
      action.payload.forEach((user) => {
        state.participants[user.userId] = Array(state.problems.length).fill("")
      })
    },
    addParticipant: (state, action) => {
      state.participants[action.payload] = Array(state.problems.length).fill("")
    },
    updateSubmission: (state, action) => {
      let { user, contestQuestionId } = action.payload

      let index = state.problems.findIndex(
        (problem) => problem.contestQuestionId === contestQuestionId
      )

      state.participants[user][index] = "AC"
    },
  },
})

export const {
  setUser,
  setProblems,
  setDuration,
  setParticipants,
  addParticipant,
  updateSubmission,
} = contestSlice.actions

export default contestSlice.reducer
