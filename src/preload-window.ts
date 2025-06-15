import { contextBridge } from 'electron';
import { electronAPI } from './electronAPI';
import { apiNodeFetch } from './apiNodeFetch';

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
contextBridge.exposeInMainWorld('windowType', 'start_window');
contextBridge.exposeInMainWorld('apiNodeFetch', apiNodeFetch);