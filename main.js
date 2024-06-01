const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: true // Ensure nodeIntegration is disabled
    }
  });
  
  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools(); // Open Developer Tools

  console.log('Window created');
}

app.whenReady().then(() => {
  console.log('App ready');

  createWindow();

  app.on('activate', () => {
    console.log('App activated');
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  console.log('All windows closed');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers
ipcMain.handle('exec', (event, command) => {
  console.log('Received exec command:', command);
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing command:', error.message);
        reject(error.message);
      } else if (stderr) {
        console.error('Command returned stderr:', stderr);
        reject(stderr);
      } else {
        console.log('Command executed successfully');
        resolve(stdout);
      }
    });
  });
});

ipcMain.handle('writeFileSync', (event, filePath, data) => {
  console.log('Writing to file:', filePath);
  try {
    fs.writeFileSync(filePath, data);
    console.log('File write successful');
    return 'success';
  } catch (err) {
    console.error('Error writing to file:', err.message);
    throw err;
  }
});

ipcMain.handle('pathJoin', (event, ...args) => {
  console.log('Joining paths:', args);
  return path.join(...args);
});

// use its send function to communicate to the main process
// require all your fancy node modules and send some response back through your preload.
ipcMain.handle('getCodeMirror', () => {
  const CodeMirror = require('codemirror');
  require('node_modules/codemirror/mode/javascript/javascript'); // Import the JavaScript mode
  return CodeMirror;
});

// Error occurred in handler for 'getSharedbClient': Error: An object could not be cloned.
// typically occurs because Electron's IPC system is trying to serialize and transfer an object that contains elements it cannot clone
// Given that we can't directly pass instances of classes (like ShareDB.Connection) through IPC, we need to set up these instances directly in the renderer process
ipcMain.handle('getSharedbClient', () => {
    try {
        const ShareDB = require('sharedb/lib/client');
        //const ReconnectingWebSocket = require('reconnecting-websocket');
        const StringBinding = require('sharedb-string-binding');
        //console.log('ReconnectingWebSocket',ReconnectingWebSocket);
        // Only pass necessary parts
        return {
            ShareDB: {
                Connection: ShareDB.Connection.toString()//,
                //Doc: ShareDB.Doc.toString(),
                //types: ShareDB.types.toString(),
            },
            StringBinding: StringBinding.toString()
            //ReconnectingWebSocket: ReconnectingWebSocket.toString()
        };
    } catch (e) {
        console.error('Error in getSharedbClient:', e);
        return { error: e.message };
    }
});
