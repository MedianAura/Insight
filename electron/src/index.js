import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

const ArgumentParser = require('argparse').ArgumentParser;
const debug = require('debug')('insight:main');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let args = null;
const parser = new ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'Argparse example',
});
parser.addArgument(
  '--server',
  {
    help: 'Start in server mode',
    defaultValue: false,
    action: 'storeTrue',
  },
);
parser.addArgument(
  '--debug',
  {
    help: 'Start in debug mode',
    defaultValue: false,
    action: 'storeTrue',
  },
);

let arg = process.argv.slice(1);
if (process.argv.join(' ').indexOf('electron.exe') > -1) {
  arg = process.argv.slice(2);
}

try {
  args = parser.parseArgs(arg);
} catch (e) {
  app.quit();
}

global.sharedObject = { appArgv: args };

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1420,
    height: 900,
    title: 'SpiderMAJ',
  });

  let urlPrecursor = {
    pathname: path.resolve(__dirname, '../../frontend/dist', 'index.html'),
    protocol: 'file:',
    slashes: true,
  };

  if (args.server) {
    urlPrecursor = {
      pathname: 'localhost:8080',
      protocol: 'http:',
      slashes: true,
    };
  }

  // and load the index.html of the app.
  debug(`index: ${url.format(urlPrecursor)}`);
  mainWindow.loadURL(url.format(urlPrecursor));

  if (args.debug) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
