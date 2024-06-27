import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('networkingStartServer', (port: number) => {
  ipcRenderer.send('server-start', port)
})
