import React from "react"
import { useSelector } from "react-redux"
import APP_STATE from "../features/appstate/types"
import PutUserAndInviteCode from "./PutUserAndInviteCode"
import ContestMain from "./contest/ContestMain"

function Main() {
  const { cur_state } = useSelector((state) => state.appState)

  return (
    <div>
      {cur_state == APP_STATE.NOT_READY ? (
        <PutUserAndInviteCode />
      ) : (
        <ContestMain />
      )}
    </div>
  )
}

export default Main
