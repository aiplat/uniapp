const { app, BrowserWindow } = require('electron')
const path = require('path')
const utils = require('./utils.js');

async function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    const buildInfo = await utils.getBuildInfo();
    if (buildInfo && buildInfo.buildType.includes('build')) {
        win.loadFile('index.html') // build模式
    } else {
        win.loadURL('http://localhost:2016/#/') // dev模式
    }
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})