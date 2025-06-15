import { ipcRenderer } from "electron";

export const apiNodeFetch = {
	GET: (url: string, from = 'start_window') => ipcRenderer.send('fetch-get', url, from),
} as const

export type ApiNodeFetch = typeof apiNodeFetch;