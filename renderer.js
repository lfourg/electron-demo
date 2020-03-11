// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

//import { ipcRenderer } from 'electron'

let myNotification = new Notification('标题', {
  body: '通知正文内容',
})
myNotification.onclick = () => {
  console.log('通知被点击')
}

const alertOnlineStatus = () => {
  window.alert(navigator.onLine ? 'online' : 'offline')
}

window.addEventListener('online', alertOnlineStatus)
window.addEventListener('offline', alertOnlineStatus)
