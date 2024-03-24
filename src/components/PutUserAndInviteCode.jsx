import React from "react"
import { useDispatch } from "react-redux"
import { initialise } from "../features/appstate"

function PutUserAndnviteCode() {
  const [user, setUser] = React.useState("")
  const [invite, setInvite] = React.useState("")
  const dispatch = useDispatch()

  return (
    <div>
      <p>
        user:{" "}
        <input
          type="text"
          name="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </p>
      <p>
        invite:{" "}
        <input
          type="text"
          name="invite"
          value={invite}
          onChange={(e) => setInvite(e.target.value)}
        />
      </p>
      <button
        onClick={() => {
          if (user === "" || invite === "") {
            alert("Field cannot be left empty.")
            return
          }

          dispatch(initialise({ userId: user, inviteCode: invite }))
        }}
      >
        Enter
      </button>
    </div>
  )
}

export default PutUserAndnviteCode
