import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import { PublisherGithub } from '@electron-forge/publisher-github';
import path from 'node:path';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
		icon: path.join('src', 'app', 'images', 'rBmc'),
    name: 'Start menu'
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel(), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
	publishers: [
		new PublisherGithub({
			repository: {
				name: 'start-window-electron',
				owner: 'G28XYZ'
			},
			authToken: process.env.GITHUB_TOKEN,
			prerelease: false,
			draft: true
		}),
	],
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: 'src/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/preloads/preload-start.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
        {
          entry: 'src/preloads/preload-window.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        }
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
