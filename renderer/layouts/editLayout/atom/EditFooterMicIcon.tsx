import { Mic, MicOff } from '@mui/icons-material';
import { useRTC } from '../../../hooks/context/useRTC';
import { Box } from '@mui/material';

export const EditFooterMicIcon = () => {
	const { isMic, setIsMic } = useRTC();

	return (
		<Box
			title={isMic ? 'マイクをオフ' : 'マイクをオン'}
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100%"
			onClick={() => setIsMic((prev) => !prev)}
			sx={{
				pointerEvents: 'none',
			}}
		>
			{isMic ? (
				<Mic
					fontSize="small"
					sx={{
						cursor: 'pointer',
					}}
				/>
			) : (
				<MicOff
					fontSize="small"
					color="error"
					sx={{
						cursor: 'pointer',
					}}
				/>
			)}
		</Box>
	);
};
