// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true
      //preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('app/index.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  const dockMenu = Menu.buildFromTemplate([
    {
      label: '新窗口',
      click () {
        console.log('新窗口')
      }
    }, {
      label: '设置',
      submenu: [
        { label: '静音' },
        { label: '关闭' }
      ]
    }
  ])
  app.dock.setMenu(dockMenu)   //添加菜单

  //注册渲染线程 屏幕最大化事件
  ipcMain.on('windowFullScreen', e =>
    mainWindow.setFullScreen(true)
  )

  //注册渲染线程 屏幕还原事件
  ipcMain.on('windowNormal', e =>
    mainWindow.setFullScreen(false)
  )

  //注册渲染线程 应用退出事件
  ipcMain.on('quitWindow', e =>
    app.quit()
  )
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

