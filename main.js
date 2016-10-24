const menubar = require('menubar')
const electron = require('electron')
const {app, BrowserWindow} = electron
const openpgp = require('openpgp')

var tray = electron.Tray
var mb = menubar()
mb.setOption('index', `file://${__dirname}/index.html`)

mb.on('ready', function ready () {

	   
     if (process.platform === "linux"){
       mb.tray.setToolTip('show app')
     }
  	console.log('app is ready')
  	// your app code here
})

app.on('ready', () => {
  let win = new BrowserWindow({width:800, height:600})
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.openDevTools()
})

exports.openWindow = () => {
  let win = new BrowserWindow({width:400, height:200})
  win.loadURL(`file://${__dirname}/bear.html`)
}
