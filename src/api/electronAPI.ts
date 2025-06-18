import { ipcRenderer } from 'electron';

export const electronAPI = {
	/** колбэк для открытия окна пуска */
	openStartWindow: () => ipcRenderer.send('open-start-window'),
	/** колбэк закрытия окна пуска */
	closeStartWindow: () => ipcRenderer.send('close-start-window'),
	/** колбэк закрытия приложения (кнопка выкл) */
	closeApp: () => ipcRenderer.send('close-app'),
	/** колбэк-слушатель для получения данных запроса */
	onListenFetchData: (callback: (data: any) => any) => ipcRenderer.on('fetch-data', (_, data) => callback(data)),
	onListenIsOpenWindow: (callback: (data: any) => any) => ipcRenderer.on('get-is-open-window', (_, data) => callback(data)),
	handleIsOpenWindow: () => ipcRenderer.send('is-open-window')
} as const

export type ElectronAPI = typeof electronAPI;