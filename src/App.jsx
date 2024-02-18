import React from "react"
import { useDispatch, useSelector } from "react-redux"
import APP_STATE from "./features/appstate/types"
import { connected, contestStarted, contestEnded } from "./features/appstate"
import { initialise } from "./features/appstate"

export default function App() {
  const { cur_state } = useSelector((state) => state.appState)
  const dispatch = useDispatch()

  console.log(cur_state)
  return (
    <div className="App">
      {cur_state == APP_STATE.CONNECTING && <h1>CONNECTING</h1>}
      {cur_state == APP_STATE.READY && <h1>READY</h1>}
      {cur_state == APP_STATE.CONTEST.STARTED && <h1>STARTED</h1>}
      {cur_state == APP_STATE.CONTEST.ENDED && <h1>ENDED</h1>}

      <button onClick={() => dispatch(connected())}>ready</button>
      <button onClick={() => dispatch(contestStarted())}>start</button>
      <button onClick={() => dispatch(contestEnded())}>end</button>
      <button
        onClick={() =>
          dispatch(initialise({ userId: "xxe", inviteCode: "97" }))
        }
      >
        doAjax
      </button>
    </div>
  )
}
