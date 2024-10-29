'use client';
import { Box } from '@mui/material';
import { TopLayoutProps } from '../../interfaces';
import { TopHeader, TopLoading, TopMain } from './section';
import { useLayout } from '../../hooks';

export const TopLayout = ({ children }: TopLayoutProps) => {
	const { isCreatingProject } = useLayout();

	return (
		<>
			<Box width="100%" height="100vh" maxWidth="800px" margin="0 auto">
				<TopHeader />
				<TopMain>{children}</TopMain>
			</Box>

			{isCreatingProject && (
				<TopLoading text="プロジェクトをセットアップ中..." />
			)}
		</>
	);
};
