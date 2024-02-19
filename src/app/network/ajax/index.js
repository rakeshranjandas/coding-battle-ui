import axios from "axios"
import config from "../config"

const Ajax = {
  _getBaseUrl() {
    return (
      config.NETWORK.AJAX.PROTOCOL +
      "://" +
      config.NETWORK.SERVER_URL +
      "/" +
      config.NETWORK.AJAX.PATH_PREFIX
    )
  },

  _getJoinUrl() {
    return this._getBaseUrl() + "/" + config.NETWORK.AJAX.PATHS.JOIN_CONTEST
  },

  async _send(url, payload) {
    console.log("Ajax", url, payload)
    try {
      const response = await axios.post(url, payload)
      return response
    } catch (error) {
      console.log("Ajax error", error)
    }
  },

  async sendJoinRequest(userId, inviteCode) {
    const response = await this._send(this._getJoinUrl(), {
      sessionId: inviteCode,
      userId: userId,
    })
    return response.data
  },
}

export default Ajax
