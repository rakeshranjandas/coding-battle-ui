import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: "",
  problems: [],
  participants: [],
  timer: null,
}

export const contestSlice = createSlice({
  name: "contest",
  initialState,
  reducers: {},
})

// export const { setIsSearchOpen } = contestSlice.actions

// export default contestSlice.reducer
