import path from 'path';
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import serve from 'electron-serve';
import * as fs from 'node:fs';
import {
	convertToCSV,
	createDBSchema,
	createWindow,
	validateDefaultConstraintSqlite,
} from './helpers';
import {
	SaveFileContentProps,
	validateDefaultConstraintSqliteProps,
} from './interfaces';

const isProd = process.env.NODE_ENV === 'production';

let mainWindow: BrowserWindow;

if (isProd) {
	serve({ directory: 'app' });
} else {
	app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
	await app.whenReady();

	mainWindow = createWindow('main', {
		width: 900,
		height: 600,
		minWidth: 900,
		minHeight: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true,
		},
		// autoHideMenuBar: true,
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

// ユーザーがプロジェクトを起動するとIPCを受け取って画面を最大化
ipcMain.on('project-start', async () => {
	if (mainWindow) {
		mainWindow.maximize();
	}
});

// ユーザーがプロジェクトを終了するとIPCを受け取って画面を元のサイズに
ipcMain.on('project-end', async () => {
	if (mainWindow) {
		mainWindow.unmaximize();
	}
});

// githubの外部リンクをブラウザで開く
ipcMain.on('github-open', async () => {
	shell.openExternal('https://github.com/Descendre/Cyhm');
});

// デフォルト制約(sqlite)の検証
ipcMain.handle(
	'default-validate-sqlite',
	async (event, { column, value }: validateDefaultConstraintSqliteProps) => {
		const validationResult = await validateDefaultConstraintSqlite({
			column: column,
			value: value,
		});
		return validationResult;
	}
);

// ファイル出力
ipcMain.handle(
	'save-file',
	async (
		event,
		{ project, tables, columns, fileType }: SaveFileContentProps
	) => {
		const filters =
			fileType === 'csv'
				? [{ name: 'CSV Files', extensions: ['csv'] }]
				: fileType === 'json'
					? [{ name: 'JSON Files', extensions: ['json'] }]
					: [{ name: 'SQLite Database Files', extensions: ['db'] }];

		const defaultFileName = `${project.name}.${fileType}`;

		const { filePath } = await dialog.showSaveDialog(mainWindow, {
			title: 'Save File',
			defaultPath: defaultFileName,
			filters,
		});

		if (filePath) {
			if (fileType === 'csv') {
				const formattedContent = convertToCSV(tables, columns);
				fs.writeFileSync(filePath, formattedContent);
			} else if (fileType === 'json') {
				const formattedContent = JSON.stringify({ tables, columns }, null, 2);
				fs.writeFileSync(filePath, formattedContent);
			} else if (fileType === 'db') {
				await createDBSchema(filePath, tables, columns);
			}
			return filePath;
		}
		return null;
	}
);

app.on('window-all-closed', () => {
	app.quit();
});

ipcMain.on('message', async (event, arg) => {
	event.reply('message', `${arg} World!`);
});
