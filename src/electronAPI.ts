import { ipcRenderer } from 'electron';

export const electronAPI = {
	openStartWindow : () => ipcRenderer.send('open-start-window'),
	closeStartWindow: () => ipcRenderer.send('close-start-window'),
	closeApp        : () => ipcRenderer.send('close-app'),
	onFetchData     : (callback: (data: any) => any) => ipcRenderer.on('fetch-data', (_, data) => callback(data)),
} as const

export type ElectronAPI = typeof electronAPI;