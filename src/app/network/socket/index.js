import Stomp from "stompjs"
import config from "../config"

const Socket = {
  _client: null,
  _room: null,
  _userId: null,

  _init() {
    this._client = Stomp.client(
      config.NETWORK.SOCKET.PROTOCOL +
        "://" +
        config.NETWORK.SERVER_URL +
        "/" +
        config.NETWORK.SOCKET.URL
    )
  },

  _setRoom(room) {
    this._room = room
  },

  _setUser(userId) {
    this._userId = userId
  },

  connect(room, userId, onReceiveHandlers) {
    this._init()
    this._setRoom(room)
    this._setUser(userId)

    this._client.connect(
      {},
      (frame) => {
        console.log("Socket connected", frame)
        this._client.subscribe(
          config.NETWORK.SOCKET.SUBSCRIBE + "/" + this._room,
          (receivedMessage) =>
            this._processReceivedMessage(
              JSON.parse(receivedMessage.body),
              onReceiveHandlers
            )
        )

        this.sendJoined()
      },
      (frame) => {
        console.log("Socket error", frame)
      }
    )
  },

  _processReceivedMessage(receivedMessage, onReceiveHandlers) {
    console.log("receivedMessage", receivedMessage)
    console.log("onReceiveHandlers", onReceiveHandlers)

    switch (receivedMessage.eventType) {
      case "JOIN":
        onReceiveHandlers.onUserJoin(receivedMessage.userId)
        break

      case "CONTEST_START":
        onReceiveHandlers.onContestStart(receivedMessage.startedAt)
        break

      case "CONTEST_END":
        onReceiveHandlers.onContestEnd()
        break

      case "SUBMIT_AC":
        onReceiveHandlers.onUserSubmit(
          receivedMessage.userId,
          receivedMessage.contestQuestionId
        )
        break
    }
  },

  sendJoined() {
    this._send("", {
      eventType: "JOIN",
      userId: this._userId,
    })
  },

  sendStart() {
    this._send("/start", {
      eventType: "CONTEST_START",
      userId: this._userId,
    })
  },

  sendSubmission() {},

  _send(publishEndpoint, body) {
    this._client.send(
      config.NETWORK.SOCKET.PUBLISH + "/" + this._room + publishEndpoint,
      {},
      JSON.stringify(body)
    )
  },
}

export default Socket
