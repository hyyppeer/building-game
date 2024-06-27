import { app, BrowserWindow, ipcMain } from 'electron'
import startServer from './netserver'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: `dist/desktop/preload.js`,
      webSecurity: false,
    },
  })

  win.loadFile('dist/core/game.html')
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('server-start', (_e, port: number) => {
  startServer(port)
})
