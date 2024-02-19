import Stomp from "stompjs"
import config from "../config"

const Socket = {
  _client: null,
  _room: null,

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

  connect(room, onReceiveHandlers) {
    this._init()
    this._setRoom(room)

    this._client.connect(
      {},
      (frame) => {
        console.log("Socket connected", frame)
        this._client.subscribe(
          config.NETWORK.SOCKET.SUBSCRIBE + "/" + this._room,
          (receivedMessage) =>
            this._processReceivedMessage(receivedMessage, onReceiveHandlers)
        )
      },
      (frame) => {
        console.log("Socket error", frame)
      }
    )
  },

  _processReceivedMessage(receivedMessage, onReceiveHandlers) {
    console.log("receivedMessage", receivedMessage)
    console.log("onReceiveHandlers", onReceiveHandlers)
  },
}

// 'ws://localhost:8100/coding-battle-websocket'

export default Socket
