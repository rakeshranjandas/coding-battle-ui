import React from "react"
import { useSelector } from "react-redux"
import APP_STATE from "../../../features/appstate/types"
import TIMER_STATE from "../../../features/timer/types"

function ContestControls() {
  const { cur_state } = useSelector((state) => state.appState)
  const {
    curState: timer_state,
    secondsRemaining: seconds_remaining,
    waitSeconds: wait_seconds,
  } = useSelector((state) => state.timer)

  return (
    <div className="contest-controls-div">
      {cur_state === APP_STATE.READY && <button>Start Contest</button>}

      {cur_state === APP_STATE.CONTEST.STARTED &&
        timer_state === TIMER_STATE.READY && (
          <p>
            <b>Starting in:</b> {wait_seconds} seconds
          </p>
        )}

      {cur_state === APP_STATE.CONTEST.STARTED &&
        timer_state === TIMER_STATE.STARTED && (
          <p>
            <b>Remaining :</b> {seconds_remaining} seconds
          </p>
        )}

      {cur_state === APP_STATE.CONTEST.ENDED && (
        <p>
          <b>Contest ended</b>
        </p>
      )}
    </div>
  )
}

export default ContestControls
