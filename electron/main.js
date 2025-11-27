import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'url'
import path from 'path'

// ES 模块中需要手动定义 __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false, 
      // 开发时可以设置为 false，生产建议 true
      // 如果需要使用 Node API，可以配置 preload
      // preload: path.join(__dirname, 'preload.js')
    }
  })

  // 判断是开发环境还是生产环境
  if (process.env.NODE_ENV === 'development') {
    // 开发环境：加载 Vite 开发服务器
    mainWindow.loadURL('http://localhost:5173')
    // 打开开发者工具
    mainWindow.webContents.openDevTools()
  } else {
    // 生产环境：加载打包后的 index.html
    const indexPath = path.join(__dirname, '../dist/index.html')
    console.log('Loading index from:', indexPath)
    mainWindow.loadFile(indexPath)
    // 生产环境也打开开发者工具以便调试
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
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