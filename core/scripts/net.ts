interface Message {
  op: string
}

type ClientHandler = <T extends Message>(data: T) => void

export default class NetClient {
  private ws: WebSocket
  private queue: string[] = []
  private handlers: Record<string, ClientHandler[]> = {}

  constructor(server: URL) {
    this.ws = new WebSocket(server)

    setInterval(() => {
      const item = this.queue.pop()
      if (!item) return
      this.ws.send(item)
    }, 10)

    this.ws.addEventListener('message', (e) => {
      const data: Message = JSON.parse(e.data.toString())

      this.handlers[data.op].forEach((h) => {
        h(data)
      })
    })
  }

  handle(op: string, handler: ClientHandler) {
    if (!this.handlers[op]) this.handlers[op] = []
    this.handlers[op].push(handler)
  }

  send<T extends Message>(message: T) {
    this.ws.send(JSON.stringify(message))
  }
}
