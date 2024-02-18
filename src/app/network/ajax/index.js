import axios from "axios"
import config from "../config"

export default class Ajax {
  static #getBaseUrl() {
    return config.NETWORK.SERVER_URL + "/" + config.NETWORK.AJAX.PATH_PREFIX
  }

  static #getJoinUrl() {
    return Ajax.#getBaseUrl() + "/" + config.NETWORK.AJAX.PATHS.JOIN_CONTEST
  }

  static async #send(url, payload) {
    console.log(url, payload)
    try {
      const response = await axios.post(url, payload)
      return response
    } catch (error) {
      console.log("Ajax error", error)
    }
  }

  static async sendJoinRequest(userId, inviteCode) {
    const response = await Ajax.#send(Ajax.#getJoinUrl(), {
      sessionId: inviteCode,
      userId: userId,
    })
    return response
  }
}
