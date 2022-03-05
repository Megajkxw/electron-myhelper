'use strict'

import { app, protocol, BrowserWindow ,ipcMain} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import datastore from "./utils/datastore";
import db from "./utils/DataStoreHelper";

// import database from "./utils/database";
const isDevelopment = process.env.NODE_ENV !== 'production'
const exec = require("child_process").exec;

const fs=require('fs');
const {shell}  = require('electron')
// const DbHelper = require('utils/DataStoreHelper')


console.log(datastore)
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
let win
async function createWindow() {
  // Create the browser window.
   win = new BrowserWindow({
    width: 1250,
    height: 700,
    frame:false,
     webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
         // webSecurity: false
      // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

    ipcMain.on('WinSizeChange', (event,args) =>{
        if (args==='toLoginWin'){
            win.setSize(400,550)
        }
        else if (args==='toManagementWin'){
            win.setSize(1250,700)
        }
      }

    )


  ipcMain.on('close', () =>
      win.close()
  )
  ipcMain.on('minimize', ()=>
      win.minimize()
  )

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS3_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


ipcMain.on('maintest', (event, arg) => {
    console.log(arg)  // prints "ping"
    win.setSize(1000,800)
})

// ipcMain.on('FastFile',(event, args) => {
//     if (args.operate==='addItem'){
//         datastore.store.set('FastFile.'+args.name,args.path)
//         // datastore.fastfile.addItem(args.name,args.path)
//     }
//     else if (args.operate==='deleteItem'){
//         let isError=false
//         try {
//             datastore.fastfile.deleteItem(args.name)
//         }
//         catch (e) {
//             console.log('DataStore删除文件信息失败')
//             event.returnValue={error:e,isError:isError}
//         }
//     }
//     else if (args.operate==='getData'){
//         event.returnValue=datastore.fastfile.getData()
//     }
// })

ipcMain.on('openApp',(event,args)=>{
    var stat = fs.statSync(args)
    // if (stat.isFile()){
    //     // exec(args, (error, stdout, stderr) => {
    //     //     console.log(JSON.stringify(error, stdout, stderr));
    //     // });
    //     try {
    //         shell.openPath(args)
    //     }
    //     catch (e) {
    //         console.log('打开文件失败')
    //         event.returnValue=e;
    //     }
    // }
    // else if (stat.isDirectory()){
    //     shell.showItemInFolder(args)
    // }

    try {
        shell.openPath(args)
    }
    catch (e) {
        console.log('打开文件失败')
        event.returnValue=e;
    }

})




const winURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : `file://${__dirname}/index.html`


ipcMain.on('createWin',(event,args)=> {
    openCalendarWindow()
})



// 定义calendar窗体
let calendarWin
// 创建calendar窗口方法
function openCalendarWindow () {
    calendarWin = new BrowserWindow({
        width: 400,
        height: 550,
        parent: win, // win是主窗口
        webPreferences: {
            nodeIntegration: true
        }
    })
    calendarWin.loadURL(winURL + '#/Dialog')
    calendarWin.on('closed', () => { calendarWin = null })
}
ipcMain.on('openCalendarWindow', e =>
    openCalendarWindow()
)




// 定义calendar窗体
let suspensionBar
let suspensionBar_height=60
// 创建calendar窗口方法
function createWin (args) {
    let win=undefined
    let width=400
    let height=550
    let page='Login'
    let frame=true
    console.log(args)
    if (args!=undefined){
        if (args.width!=null&&args.width!=undefined){
            width=args.width
        }
        if (args.height!=null&&args.height!=undefined){
            height=args.height
        }
        if (args.page!=null&&args.page!=undefined){
            page=args.page
        }
        if (args.frame!=null&&args.frame!=undefined){
            frame=args.frame
        }
    }
    win = new BrowserWindow({
        // width: 1250,
        // height: suspensionBar_height,
        // x:200,
        // y:0,
        width,
        height,
        frame,
        // parent: win, // win是主窗口
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule:true
        }
    })
    console.log('page:')
    console.log(page)
    // suspensionBar.loadURL(winURL + '#/Login')
    // suspensionBar.loadURL(winURL + '#/SingleNote')
    win.loadURL(winURL + '#/'+page)
    win.on('closed', () => { win = null })
    win.show()
    return win
}

let loginWin;
let noteWin;
let taskWin;
ipcMain.on('openLoginWin', (event, args) =>
    loginWin=createWin(args)
)

ipcMain.on('openNoteWin', (event, args) =>
    noteWin=createWin({
        page:'SingleNote'
    })
)

let task=undefined

ipcMain.on('openTaskWin', (event, args) =>{
    task=args.task
    console.log('保存的task数据为：')
    console.log(task)
    taskWin=createWin({
        page:'SingleTask',
        frame:false,
        width:370,
        height:470,
        // height:970,
    })
    }
)

ipcMain.on('taskWin', (event, args) =>{
        if (args.operation=='close'){
                taskWin.close()
        }
        if (args.operation=='taskData'){
            console.log('取出的task数据为：')
            console.log(task)
            event.returnValue=JSON.parse(task)
        }
    }
)




ipcMain.on('getSuspensionBar',event => {
    event.returnValue=suspensionBar
})
ipcMain.on('hideSuspensionBar',event => {
    // suspensionBar.setPosition(400,400)
    setInterval(()=>{
        // let pos = suspensionBar.getBounds()
        // let h = suspensionBar.getSize().height
        let i=0
        let pos_y=suspensionBar_height
        while (pos_y>i){
            suspensionBar.setPosition(200,pos_y--)
            i++
        }
    }, 500)
})


ipcMain.on('getDataStorePath',event => {
    event.returnValue=app.getPath('userData')
})



ipcMain.on('FastFile',(event, args) => {
    if (args.operate==='addItem'){
        // datastore.store.set('FastFile.'+args.name,args.path)
        db.fastOpenHelper.addItem({name:args.name,path:args.path})
    }
    else if (args.operate==='deleteItem'){
        let isError=false
        try {
            // datastore.fastfile.deleteItem(args.name)
            db.fastOpenHelper.deleteItem(args.name)
        }
        catch (e) {
            console.log('DataStore删除文件信息失败')
            event.returnValue={error:e,isError:isError}
        }
    }
    else if (args.operate==='getData'){
        // event.returnValue=datastore.fastfile.getData()
        event.returnValue=db.fastOpenHelper.getAllItem()
    }
})
