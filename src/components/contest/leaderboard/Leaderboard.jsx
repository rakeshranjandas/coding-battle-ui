import React from "react"
import { useSelector } from "react-redux"

function Leaderboard() {
  const { participants } = useSelector((state) => state.contest)

  return (
    <div>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th></th>
            {participants[Object.keys(participants)[0]].map((_, index) => (
              <th key={index}>#{index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(participants).map((name) => (
            <tr key={name}>
              <td>
                <b>{name}</b>
              </td>
              {participants[name].map((submission, problem_index) => (
                <td key={problem_index}>{submission}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
