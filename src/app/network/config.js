const CONFIG = {
  NETWORK: {
    SERVER_URL: "localhost:8100",

    AJAX: {
      PROTOCOL: "http",

      PATH_PREFIX: "v1/contest",

      PATHS: {
        JOIN_CONTEST: "join",
      },
    },

    SOCKET: {
      PROTOCOL: "ws",

      URL: "coding-battle-websocket",

      PUBLISH: "/cb-publish/contest",

      SUBSCRIBE: "/cb-topic",
    },
  },
}

export default CONFIG
