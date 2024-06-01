try{
const { contextBridge, ipcRenderer } = require('electron');

//throws an error unfound module codemirror(due to sandboxing), solution was to require codemiror in the main.js and send results here
//const CodeMirror = require('codemirror');
//require('codemirror/mode/javascript/javascript');

// Debug log function
const debugLog = (message) => {
  console.log('[Preload Script]', message);
};

contextBridge.exposeInMainWorld('electron', {
  exec: (command) => {
    debugLog(`Executing command: ${command}`);
    return ipcRenderer.invoke('exec', command);
  },
  fs: {
    writeFileSync: (path, data) => {
      debugLog(`Writing file: ${path}`);
      return ipcRenderer.invoke('writeFileSync', path, data);
    }
  },
  path: {
    join: (...args) => {
      const joinedPath = ipcRenderer.invoke('pathJoin', ...args);
      debugLog(`Joining path: ${joinedPath}`);
      return joinedPath;
    }
  },
//getsharedclient and get code mirror won't be handled by ipc for now because of difficulties in loading them
  getSharedbClient: async () => {
        const response = await ipcRenderer.invoke('getSharedbClient');
        if (response.error) {
            throw new Error(response.error);
        }

        const ShareDB = require('sharedb/lib/client');
        const ReconnectingWebSocket = require('reconnecting-websocket');
        const StringBinding = require('sharedb-string-binding');
        //const ShareDBCodeMirror = require('sharedb-codemirror');
        
        window.ReconnectingWebSocket = ReconnectingWebSocket.default;
        window.StringBinding = StringBinding;
        //interestingly this does not work
        // window.ShareDB = ShareDB;
        // window.ShareDB.Connection = ShareDB.Connection;
        return {
            ShareDB,  
            StringBinding,
            ReconnectingWebSocket: ReconnectingWebSocket.default
        };
    }
//   getCodeMirror: async () => {
//     const CodeMirror = await ipcRenderer.invoke('getCodeMirror');
//     return CodeMirror;
//   }
});
}
catch(e){
    console.log('preload ', e);
}
