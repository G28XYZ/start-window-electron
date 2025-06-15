import { contextBridge } from 'electron';
import { electronAPI } from './electronAPI';

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
contextBridge.exposeInMainWorld('windowType', 'start');