import React from "react"
import { useSelector } from "react-redux"
import Header from "./header/Header"
import ProblemsList from "./problems/ProblemsList"
import Leaderboard from "./leaderboard/Leaderboard"
import ContestControls from "./contestcontrols/ContestControls"

function ContestMain() {
  const { user, problems, duration } = useSelector((state) => state.contest)

  return (
    <div>
      <Header user={user} />
      <ProblemsList problems={problems} duration={duration} />
      <ContestControls />
      <Leaderboard />
    </div>
  )
}

export default ContestMain
