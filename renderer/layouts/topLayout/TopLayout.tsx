'use client';
import { Box } from '@mui/material';
import { TopLayoutProps } from '../../interfaces';
import { TopHeader, TopMain } from './section';
import { useLayout, useProject } from '../../hooks';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { TopLoading } from './section/TopLoading';

export const TopLayout = ({ children }: TopLayoutProps) => {
	const { userProjects, handleFetchUserProjects } = useProject();
	const { isPreparingProject } = useLayout();
	const { data: session } = useSession();

	useEffect(() => {
		(async () => {
			if (session && session.user && !userProjects) {
				await handleFetchUserProjects({ userId: session.user.id });
			}
		})();
	}, [session]);

	return (
		<>
			<Box width="100%" height="100vh" maxWidth="800px" margin="0 auto">
				<TopHeader />
				<TopMain>{children}</TopMain>
			</Box>

			{isPreparingProject && <TopLoading text={isPreparingProject} />}
		</>
	);
};
