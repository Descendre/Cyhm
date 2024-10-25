import path from 'path';
import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
	serve({ directory: 'app' });
} else {
	app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
	await app.whenReady();

	const mainWindow = createWindow('main', {
		width: 900,
		height: 600,
		minWidth: 900,
		minHeight: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
		autoHideMenuBar: true,
	});

	if (isProd) {
		mainWindow.center();
		await mainWindow.loadURL('app://./home');
	} else {
		const port = process.argv[2];
		mainWindow.center();
		await mainWindow.loadURL(`http://localhost:${port}`);
		mainWindow.webContents.openDevTools();
	}
})();

app.on('window-all-closed', () => {
	app.quit();
});

ipcMain.on('message', async (event, arg) => {
	event.reply('message', `${arg} World!`);
});
