import { AddTableResponse } from './AddTableResponse';
import { AddColumnResponse } from './AddColumnResponse';
import { FetchNotifyInvitedUserResponse } from './FetchNotifyInvitedUserResponse';

export interface FetchAllContentsResponse {
	tables: {
		[tableId: string]: AddTableResponse;
	};
	columns: {
		[tableId: string]: AddColumnResponse[];
	};
	invitedUsers: FetchNotifyInvitedUserResponse[];
}
