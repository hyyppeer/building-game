import { WebSocketServer } from 'ws'

export default function startServer(port: number) {
  const wss = new WebSocketServer({
    port,
  })

  wss.on('connection', (sock, req) => {
    sock.on('message', (data) => {
      const msg = JSON.parse(data.toString())
      console.log(msg)
      sock.send(data)
    })
  })
}
