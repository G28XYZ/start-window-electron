import { app, BrowserWindow, ipcMain, screen } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

if (started) app.quit();

let mainWindow: BrowserWindow;
let startWindow: BrowserWindow;

const createWindow = () => {
	const primaryDisplay = screen.getPrimaryDisplay();
	const { width, height } = primaryDisplay.workArea;

	const [winWidth, winHeight] = [width, 60]

  mainWindow = new BrowserWindow({
		width: winWidth,
		height: winHeight,
		x: 0,
		y: height - winHeight,
    frame: false,
		transparent   : true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('open-start-window', () => {
	const primaryDisplay = screen.getPrimaryDisplay();
	const [_, mainY] = mainWindow.getPosition();
	const { width } = primaryDisplay.size;

	const [winHeight, winWidth] = [800, 800]

	startWindow = new BrowserWindow({
		width      : winWidth,
		height     : winHeight,
		frame      : false,
		transparent: true,
		x          : (width - winWidth) / 2,
		y          : mainY - winHeight - 25,
		title      : 'Start Window',
		webPreferences: { preload: path.join(__dirname, 'preload-window.js') },
	});


  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    startWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL + '/start_window');
  } else {
    startWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

	mainWindow.focus();

});

ipcMain.on('close-start-window', () => {
	
	if(startWindow) {
		startWindow.close();
		startWindow = null;
	}

});

ipcMain.on('close-app', () => {
	if(startWindow) {
		startWindow.destroy();
		startWindow = null;
	}
	if(mainWindow) {
		mainWindow.destroy();
	}
})

const lastUrls: string[] = [];
const data: Record<string, any> = {};

ipcMain.on('fetch-get', async (ev, url, from) => {
	const res = !lastUrls.includes(url) && await fetch(url, { mode:'no-cors' });
	if(from === 'start_window') {
		!lastUrls.includes(url) && (data[url] = res.ok ? { url, data: await res.json() } : false);
		lastUrls.push(url);
		startWindow.webContents.send('fetch-data', data[url])
	}
})