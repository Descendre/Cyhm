import { UserSearchResultsProps } from '../provider';

export interface UseUserProps {
	userSearchResults: UserSearchResultsProps;
	setUserSearchResults: React.Dispatch<
		React.SetStateAction<UserSearchResultsProps>
	>;
	handleUserLikeSearch: ({
		keyWord,
	}: handleUserLikeSearchProps) => Promise<void>;
}
export interface handleUserLikeSearchProps {
	keyWord: string;
}
