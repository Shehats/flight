import { app, BrowserWindow } from 'electron'

console.log(app)
app.on('ready', () => {
  let window = new BrowserWindow({ width: 800, height: 600 })
  window.loadURL('http://localhost:3000/')
})
