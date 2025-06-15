import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';

const getApps = () => {
	const imagesPath = path.join(__dirname, 'src', 'app', 'images', 'apps');

	const apps: { name: string; path: string }[] = [];

	fs.readdirSync(imagesPath).forEach(file => {
		apps.push({ name: file.split('.')[0], path: path.join('src', 'app', 'images', 'apps', file) })
	});

	return apps;
}

// https://vitejs.dev/config
export default defineConfig({
	plugins: [react()],
	define: {
		RECENT_APPS: JSON.stringify(getApps())
	},
	server: {
		proxy: {
			'/freegame': {
				target: 'https://www.freetogame.com/api/games',
				changeOrigin: true,
        rewrite: (path) => path.replace(/^\/freegame/, ''),
			}
		}
	}
});
