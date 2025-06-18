import { ipcRenderer } from 'electron';

export const electronAPI = {
	/** колбэк для открытия/закрытия окна пуска */
	toggleStartWindow: () => ipcRenderer.send('toggle-start-window'),
	/** колбэк закрытия приложения (кнопка выкл) */
	closeApp: () => ipcRenderer.send('close-app'),
	/** колбэк-слушатель для получения данных запроса */
	onListenFetchData: (callback: (data: any) => any) => ipcRenderer.on('fetch-data', (_, data) => callback(data)),
} as const

export type ElectronAPI = typeof electronAPI;