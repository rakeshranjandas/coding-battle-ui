const CONFIG = {
  NETWORK: {
    SERVER_URL: "http://localhost:8100",

    AJAX: {
      PATH_PREFIX: "v1/contest",

      PATHS: {
        JOIN_CONTEST: "join",
      },
    },

    SOCKET: {
      URL: "coding-battle-websocket",

      PUBLISH: "/cb-publish/contest",

      SUBSCRIBE: "/cb-topic",
    },
  },
}

export default CONFIG
