import { UserResponse } from '../api';

export interface UserSearchResultsProps {
	invite: {
		result: UserResponse[];
		query: string;
	};
}
