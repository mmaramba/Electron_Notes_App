const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require("path")
const isDev = require("electron-is-dev")

// dealing with pdf
const fs = require('fs');
const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 800,
    minHeight: 550,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadURL(
      isDev ? "http://localhost:3000" : 
      `file://${path.join(__dirname, "../build/index.html")}`
      )

  // Uncomment to open the DevTools on startup.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  // create worker window for PDF creation
  workerWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add Item',

    webPreferences: {
      nodeIntegration: true
    }
  }
  );
  workerWindow.loadURL(`file://${path.join(__dirname, "/worker.html")}`)
  //workerWindow.hide();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

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
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// create pdf
ipc.on('print-to-pdf', event => {
  console.log("PDF Print Event");
  const pdfPath = path.join(os.tmpdir(), 'testsaveitem.pdf');
  console.log(pdfPath);
  const win = BrowserWindow.fromWebContents(event.sender);
  console.log(win.webContents.printToPDF);

  win.webContents.printToPDF({}).then(data => {
    console.log("HERE");
    fs.writeFile(pdfPath, data, err => {
      if (err) return console.log(err.message);
      console.log("Write file successful");
      shell.openExternal('file://' + pdfPath);
      event.sender.send('wrote-pdf', pdfPath);
    })
  })
})


ipc.on('printPDF', (event, content) => {
  console.log("Sending content to worker window");
  console.log(content);
  workerWindow.webContents.send('printPDF', content);
})

ipc.on('readyToPrintPDF', (event) => {
  const pdfPath = path.join(os.tmpdir(), 'testsaveitem.pdf');

  workerWindow.webContents.printToPDF({}).then(data => {
    console.log("HERE");
    fs.writeFile(pdfPath, data, err => {
      if (err) return console.log(err.message);
      console.log("Write file successful");
      shell.openExternal('file://' + pdfPath);
      event.sender.send('wrote-pdf', pdfPath);
    })
  })
})


console.log("testing");