import { ElectronAPI } from './src/electronAPI';
import { ApiNodeFetch }from './src/apiNodeFetch';


declare global {
	const electronAPI: ElectronAPI;
	const apiNodeFetch: ApiNodeFetch;
	const RECENT_APPS: Array<{ name: string; path: string; base64: string; }>;
	const windowType: string;
}

export {};