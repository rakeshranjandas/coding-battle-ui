import React from "react"
import { useDispatch, useSelector } from "react-redux"
import APP_STATE from "./features/appstate/types"
import { connected, contestStarted, contestEnded } from "./features/appstate"
import { initialise } from "./features/appstate"
import { startTimer } from "./features/timer"
import Socket from "./app/network/socket"

export default function App() {
  const timer = useSelector((state) => state.timer)
  const contest = useSelector((state) => state.contest)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <pre>{JSON.stringify(timer, null, 2)}</pre>
      <pre>{JSON.stringify(contest, null, 2)}</pre>
      {/* {cur_state == APP_STATE.CONNECTING && <h1>CONNECTING</h1>}
      {cur_state == APP_STATE.READY && <h1>READY</h1>}
      {cur_state == APP_STATE.CONTEST.STARTED && <h1>STARTED</h1>}
      {cur_state == APP_STATE.CONTEST.ENDED && <h1>ENDED</h1>}

      <button onClick={() => dispatch(connected())}>ready</button>
      <button onClick={() => dispatch(contestStarted())}>start</button>
      <button onClick={() => dispatch(contestEnded())}>end</button> */}
      <button
        onClick={() =>
          dispatch(initialise({ userId: "xx13e", inviteCode: "108" }))
        }
      >
        Connect
      </button>
      <button onClick={() => Socket.sendStart()}>Start</button>
    </div>
  )
}
