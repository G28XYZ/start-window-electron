import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('windowType', 'start');

import './base-preload';