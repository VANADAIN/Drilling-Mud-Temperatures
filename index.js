const path = require('path')
const url = require('url')

const {app, BrowserWindow, Menu} = require('electron')

let win

// process.env.NODE_ENV = 'production'

app.on('ready', () => {
    
    // create window
    win = new BrowserWindow({
        width: 1400,
        height: 900
    })

    // render file
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/index.html'),
        prorocol: 'file:',
        slashes: true
    }))

    // close window
    win.on('closed', () => {
        win = null
    })

    // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    // Menu.setApplicationMenu(mainMenu)

})

// const mainMenuTemplate = [
//     {
//         label: 'File'
//     }
// ]

app.on('window-all-closed', () => {
    app.quit()
})
