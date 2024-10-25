import { Login } from '@mui/icons-material';
import { Avatar, Card, CardHeader } from '@mui/material';
import { LoginButtonProps } from '../../../interfaces';

export const LoginButton = ({ src, text, onClick }: LoginButtonProps) => {
	return (
		<Card
			sx={{
				width: '80%',
				cursor: 'pointer',
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
				action={<Login />}
				sx={{
					height: '50px',
				}}
			/>
		</Card>
	);
};
