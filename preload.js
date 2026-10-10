const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  close: () => ipcRenderer.send('close'),
  minimize: () => ipcRenderer.send('minimize'),
  setOpacity: (v) => ipcRenderer.send('opacity', v),
  onClickThrough: (cb) => ipcRenderer.on('click-through', (_e, on) => cb(on))
});
