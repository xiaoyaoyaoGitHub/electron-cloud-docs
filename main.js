// import { app, BrowserWindow } from "electron"

// const idDev = require('electron-is-dev');
const { app, BrowserWindow } = require('electron')

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
    })
    require('@electron/remote/main').initialize();
    require("@electron/remote/main").enable(mainWindow.webContents)
    mainWindow.loadURL('http://localhost:3000')

    mainWindow.webContents.openDevTools()
})

