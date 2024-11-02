export interface UseDownloadProps {
	handleDownloadToDB: () => Promise<void>;
	handleDownloadToCSV: () => Promise<void>;
	handleDownloadToJSON: () => Promise<void>;
}
