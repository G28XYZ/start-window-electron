import { app, BrowserWindow, ipcMain, screen } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { SocksProxyAgent } from 'socks-proxy-agent';
import axios from 'axios';

if (started) app.quit();

let mainWindow: BrowserWindow;
let startWindow: BrowserWindow;

const createWindow = () => {
	const primaryDisplay = screen.getPrimaryDisplay();
	const { width, height } = primaryDisplay.workArea;

	const [winWidth, winHeight] = [width, 60]

  mainWindow = new BrowserWindow({
		width         : winWidth,
		height        : winHeight,
		x             : 0,
		y             : height - winHeight,
		frame         : false,
		transparent   : true,
		webPreferences: { preload: path.join(__dirname, 'preload-start.js') },
  });

	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
	}
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on('open-start-window', () => {
	const primaryDisplay = screen.getPrimaryDisplay();
	const [_, mainY] = mainWindow.getPosition();
	const { width } = primaryDisplay.size;

	const [winHeight, winWidth] = [800, 800]

	startWindow = new BrowserWindow({
		width         : winWidth,
		height        : winHeight,
		frame         : false,
		transparent   : true,
		x             : (width - winWidth) / 2,
		y             : mainY - winHeight - 25,
		title         : 'Start Window',
		webPreferences: { preload: path.join(__dirname, 'preload-window.js') },
	});


	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		startWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL + '/start_window');
	} else {
		startWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
	}
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

	if(mainWindow) mainWindow.destroy();

})

ipcMain.on('is-open-window', () => {
	mainWindow.webContents.send('get-is-open-window', Boolean(startWindow));
})

const lastUrls: string[] = [];
const dataCash: Record<string, any> = {};

const socksProxyAgent = new SocksProxyAgent('socks://socksuser:socksuser@185.169.107.65:8467');

ipcMain.on('fetch-get', async (ev, url, from, opt: { responseType: 'text' | 'json' | 'arraybuffer' }) => {

	const { responseType='json' } = opt || {};

	const res = !lastUrls.includes(url) && await axios.get(url, { httpsAgent: socksProxyAgent, responseType });

	if(from === 'start_window') {
		!lastUrls.includes(url) && (dataCash[url] = res.data ? { url, data: res.data } : false);
		lastUrls.push(url);
		startWindow.webContents.send('fetch-data', dataCash[url]);
	}
})