import WebSocket, { WebSocketServer } from 'ws'

type MessageHandler = (
  socket: WebSocket,
  data: MessageData
) => MessageData | void

enum Operation {
  InvalidDataError,
}

interface MessageData {
  op: Operation
}

type Handlers = {
  [x in Operation]: MessageHandler
}

class NetServerBase {
  private server: WebSocketServer
  private handlers: Handlers = {
    [Operation.InvalidDataError]: function (
      socket: WebSocket,
      data: MessageData
    ) {
      console.error('InvalidDataError from socket')
    },
  }

  constructor(port: number) {
    this.server = new WebSocketServer({
      port,
    })

    this.server.on('connection', (socket, req) => {
      this.handleConnection(socket)
    })
  }

  handleConnection(socket: WebSocket) {
    socket.on('message', (message) => {
      let data: MessageData = { op: Operation.InvalidDataError }
      try {
        data = JSON.parse(message.toString())
      } catch (e) {}

      if (!data) return

      this.handlers[data.op](socket, data)
    })
  }
}

export default class NetServer extends NetServerBase {
  constructor(port: number) {
    super(port)
  }
}
