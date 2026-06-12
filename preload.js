const { contextBridge, ipcRenderer } = require('electron');

// Expose safe APIs to the renderer (HTML page)
// All Node.js/system access goes through this bridge
contextBridge.exposeInMainWorld('electronAPI', {
  // File-based config (more reliable than localStorage, survives app updates)
  config: {
    read:    ()       => ipcRenderer.invoke('config:read'),
    write:   (data)   => ipcRenderer.invoke('config:write', data),
    getPath: ()       => ipcRenderer.invoke('config:path'),
  },
  // Open URLs in system browser (not inside the app)
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  // Platform info
  platform: process.platform,
});
