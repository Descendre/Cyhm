import {
	ColumnsStateProps,
	FetchUserProjectsResponse,
	TablesStateProps,
} from '../../renderer/interfaces';

export interface SaveFileContentProps {
	project: FetchUserProjectsResponse;
	tables: TablesStateProps;
	columns: ColumnsStateProps;
	fileType: FileTypeProps;
}

type FileTypeProps = 'csv' | 'json';
