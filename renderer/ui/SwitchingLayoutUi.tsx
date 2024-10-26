'use client';
import { useSession } from 'next-auth/react';
import { useLayout } from '../hooks';
import { SwitchingLayoutUiProps } from '../interfaces';
import { EditLayout, LoginLayout, TopLayout } from '../layouts';

export const SwitchingLayoutUi = ({ children }: SwitchingLayoutUiProps) => {
	const { windowMode } = useLayout();
	const { data: session } = useSession();

	return (
		<>
			{!session || !session.user ? (
				<LoginLayout>{children}</LoginLayout>
			) : windowMode === 'top' ? (
				<TopLayout>{children}</TopLayout>
			) : windowMode === 'edit' ? (
				<EditLayout>{children}</EditLayout>
			) : (
				<></>
			)}
		</>
	);
};
