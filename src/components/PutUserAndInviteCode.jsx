import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { initialise } from "../features/appstate"

function PutUserAndnviteCode() {
  const [user, setUser] = React.useState("")
  const [invite, setInvite] = React.useState("")
  const dispatch = useDispatch()

  function doJoin(user, invite) {
    dispatch(initialise({ userId: user, inviteCode: invite }))
  }

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    const param_user = queryParameters.get("user")
    const param_invite = queryParameters.get("invite")
    if (param_user !== null && param_invite !== null) {
      doJoin(param_user, param_invite)
    }
  })

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

          doJoin(user, invite)
        }}
      >
        Enter
      </button>
    </div>
  )
}

export default PutUserAndnviteCode
