import { useSession } from 'next-auth/react';
import { useLayout } from '../hooks';
import {
	EditContents,
	LoadingContents,
	LoginContents,
	TopContents,
} from '../contents';

export const SwitchingContentsUi = () => {
	const { windowMode } = useLayout();
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <LoadingContents />;
	}

	return (
		<>
			{!session || !session.user ? (
				<LoginContents />
			) : windowMode === 'top' ? (
				<TopContents />
			) : windowMode === 'edit' ? (
				<EditContents />
			) : (
				<></>
			)}
		</>
	);
};
