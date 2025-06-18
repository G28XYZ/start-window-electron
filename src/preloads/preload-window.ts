import { contextBridge } from 'electron';
import { apiNodeFetch } from '../api/apiNodeFetch';

contextBridge.exposeInMainWorld('windowType', 'start_window');
contextBridge.exposeInMainWorld('apiNodeFetch', apiNodeFetch);

import './base-preload';