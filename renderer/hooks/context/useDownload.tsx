'use client';
import { useContext } from 'react';
import { Context } from '../../provider';
import { UseDownloadProps } from '../../interfaces';

export const useDownload = (): UseDownloadProps => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const { tables, columns, currentProject } = context;

	const handleDownloadToDB = async (): Promise<void> => {
		try {
			let filePath: string | null;
			if (
				typeof window !== 'undefined' &&
				window.ipc &&
				currentProject &&
				tables &&
				columns
			) {
				filePath = await window.ipc.invoke<string | null>('save-file', {
					project: currentProject,
					tables,
					columns,
					fileType: 'db',
				});
			} else {
				return;
			}
			if (filePath) {
				console.log(`DB file saved to: ${filePath}`);
			} else {
				console.error('File save was canceled or failed.');
			}
		} catch (error) {
			console.error('Error downloading DB:', error);
		}
	};

	const handleDownloadToCSV = async (): Promise<void> => {
		try {
			let filePath: string | null;
			if (
				typeof window !== 'undefined' &&
				window.ipc &&
				currentProject &&
				tables &&
				columns
			) {
				filePath = await window.ipc.invoke<string | null>('save-file', {
					project: currentProject,
					tables,
					columns,
					fileType: 'csv',
				});
			} else {
				return;
			}
			if (filePath) {
				console.log(`CSV file saved to: ${filePath}`);
			} else {
				console.error('File save was canceled or failed.');
			}
		} catch (error) {
			console.error('Error downloading CSV:', error);
		}
	};

	const handleDownloadToJSON = async (): Promise<void> => {
		try {
			let filePath: string | null;
			if (
				typeof window !== 'undefined' &&
				window.ipc &&
				currentProject &&
				tables &&
				columns
			) {
				filePath = await window.ipc.invoke<string | null>('save-file', {
					project: currentProject,
					tables,
					columns,
					fileType: 'json',
				});
			} else {
				return;
			}
			if (filePath) {
				console.log(`JSON file saved to: ${filePath}`);
			} else {
				console.error('File save was canceled or failed.');
			}
		} catch (error) {
			console.error('Error downloading JSON:', error);
		}
	};

	return {
		handleDownloadToDB,
		handleDownloadToCSV,
		handleDownloadToJSON,
	};
};
