import { ipcRenderer } from "electron";

export const apiNodeFetch = {
	GET: (url: string, from = 'start_window', opt?: { resContent: 'text' | 'json' }) => ipcRenderer.send('fetch-get', url, from, opt),
} as const

export type ApiNodeFetch = typeof apiNodeFetch;