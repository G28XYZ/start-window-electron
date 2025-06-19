/** базовый/общий прелоадер */
import { contextBridge } from 'electron';
import { electronAPI } from '../api/electronAPI';

contextBridge.exposeInMainWorld('electronAPI', electronAPI);