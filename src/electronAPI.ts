import { ipcRenderer } from 'electron';

export const electronAPI = {
	openStartWindow: () => ipcRenderer.send('open-start-window'),
	closeStartWindow: () => ipcRenderer.send('close-start-window'),
	closeApp: () => ipcRenderer.send('close-app')
} as const

export type ElectronAPI = typeof electronAPI;