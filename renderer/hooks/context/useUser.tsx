'use client';
import { useContext } from 'react';
import { Context } from '../../provider';
import {
	handleUserLikeSearchProps,
	UserLikeSearchResponse,
	UseUserProps,
} from '../../interfaces';
import { axiosFetch } from '../../libs';

export const useUser = (): UseUserProps => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const { userSearchResults, setUserSearchResults } = context;

	const handleUserLikeSearch = async ({
		keyWord,
	}: handleUserLikeSearchProps): Promise<void> => {
		try {
			setUserSearchResults((prevResults) => ({
				...prevResults,
				invite: {
					result: keyWord ? prevResults.invite.result : [],
					query: keyWord,
				},
			}));
			if (!keyWord) return;
			const users = await axiosFetch.get<UserLikeSearchResponse>(
				`/api/supabase/user/like/${keyWord}`
			);
			setUserSearchResults((prevResults) => ({
				...prevResults,
				invite: {
					result: users,
					query: prevResults.invite.query,
				},
			}));
		} catch (error) {
			console.error(error);
		}
	};

	return {
		userSearchResults,
		setUserSearchResults,

		handleUserLikeSearch,
	};
};
