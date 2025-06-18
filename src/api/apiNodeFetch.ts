import { ResponseType } from "axios";
import { ipcRenderer } from "electron";

export const apiNodeFetch = {
	GET: (url: string, from = 'start_window', opt?: { responseType: ResponseType }) => ipcRenderer.send('fetch-get', url, from, opt),
} as const

export type ApiNodeFetch = typeof apiNodeFetch;