import { AddTableResponse } from './AddTableResponse';
import { AddColumnResponse } from './AddColumnResponse';

export interface FetchAllContentsResponse {
	tables: {
		[tableId: string]: AddTableResponse;
	};
	columns: {
		[tableId: string]: AddColumnResponse[];
	};
}
