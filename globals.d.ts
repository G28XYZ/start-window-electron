import { ElectronAPI } from './src/electronAPI';


declare global {
	const electronAPI: ElectronAPI;
	const RECENT_APPS: Array<{ name: string; path: string }>;
}

export {}