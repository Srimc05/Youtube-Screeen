const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');

let win;
let clickThrough = false;

function setClickThrough(on) {
  clickThrough = on;
  win.setIgnoreMouseEvents(on, { forward: true });
  win.webContents.send('click-through', on);
}

function changeOpacity(delta) {
  win.setOpacity(Math.min(1, Math.max(0.2, win.getOpacity() + delta)));
}

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 480,
    height: 300,
    minWidth: 240,
    minHeight: 160,
    frame: false,
    alwaysOnTop: true,
    backgroundColor: '#000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true
    }
  });
  // 'screen-saver' level keeps the window above fullscreen apps too
  win.setAlwaysOnTop(true, 'screen-saver');
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.loadFile('index.html');

  ipcMain.on('close', () => app.quit());
  ipcMain.on('minimize', () => win.minimize());
  ipcMain.on('opacity', (_e, v) => win.setOpacity(v));

  globalShortcut.register('Control+Alt+Y', () => (win.isVisible() ? win.hide() : win.show()));
  globalShortcut.register('Control+Alt+C', () => setClickThrough(!clickThrough));
  globalShortcut.register('Control+Alt+Up', () => changeOpacity(0.1));
  globalShortcut.register('Control+Alt+Down', () => changeOpacity(-0.1));
});

app.on('will-quit', () => globalShortcut.unregisterAll());
app.on('window-all-closed', () => app.quit());
