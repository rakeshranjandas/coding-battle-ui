import Ajax from "./ajax"
import Socket from "./socket"

const Network = () => {
  return {
    ajax: Ajax,
    socket: Socket,
  }
}

export default Network
