'use client';
import { Login } from '@mui/icons-material';
import { Avatar, Card, CardHeader } from '@mui/material';
import { LoginButtonProps } from '../../../interfaces';
import { usePalette } from '../../../hooks';

export const LoginButton = ({ src, text, onClick }: LoginButtonProps) => {
	const palette = usePalette();

	return (
		<Card
			sx={{
				width: '80%',
				padding: '0 5px',
				cursor: 'pointer',
				borderRadius: '75px',
				color: palette.text.secondary,
				backgroundColor: palette.components.login.button.bg,
				'&:hover': {
					color: palette.primary.main,
				},
				'&:hover .action-icon': {
					color: palette.primary.main,
				},
			}}
			onClick={() => onClick()}
		>
			<CardHeader
				avatar={
					<Avatar
						src={src}
						sx={{
							width: 30,
							height: 30,
						}}
					></Avatar>
				}
				title={text}
				action={
					<Login
						className="action-icon"
						sx={{
							color: palette.text.secondary,
						}}
					/>
				}
				sx={{
					height: '50px',
				}}
			/>
		</Card>
	);
};
