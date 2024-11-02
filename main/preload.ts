import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const handler = {
	// send関数の第二引数をデフォルトでnullとする
	send(channel: string, value: unknown = null) {
		ipcRenderer.send(channel, value);
	},
	// 追加カスタムメソッド(返り値型ジェネリクス指定)
	async invoke<T>(channel: string, value: unknown = null): Promise<T> {
		return await ipcRenderer.invoke(channel, value);
	},
	on(channel: string, callback: (...args: unknown[]) => void) {
		const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
			callback(...args);
		ipcRenderer.on(channel, subscription);

		return () => {
			ipcRenderer.removeListener(channel, subscription);
		};
	},
};

contextBridge.exposeInMainWorld('ipc', handler);

export type IpcHandler = typeof handler;
