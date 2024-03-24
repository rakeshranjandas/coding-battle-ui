import React from "react"
import Socket from "../../../app/network/socket"

function ProblemsList({ problems, duration }) {
  return (
    <div className="problems-list">
      <p>
        <b>Duration</b>: {duration} minutes
      </p>
      <div>
        <b>Problems</b>
        <ul>
          {problems.map((problem) => (
            <li key={problem.contestQuestionId}>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked)
                    Socket.sendSubmissionAccepted(problem.contestQuestionId)
                }}
              />
              {problem.url}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProblemsList
