'use strict'
exports.__esModule = true
var electron_1 = require('electron')
console.log(electron_1.app)
electron_1.app.on('ready', function () {
  var window = new electron_1.BrowserWindow({ width: 800, height: 600 })
  window.loadURL('http://localhost:3000/')
})
