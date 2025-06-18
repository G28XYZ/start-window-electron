import { ElectronAPI } from './src/api/electronAPI';
import { ApiNodeFetch }from './src/api/apiNodeFetch';


declare global {
	const electronAPI: ElectronAPI;
	const apiNodeFetch: ApiNodeFetch;
	const RECENT_APPS: Array<{ name: string; path: string; base64: string; }>;
	const windowType: string;
}

export {};