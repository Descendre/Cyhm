import { Headset, HeadsetOff } from '@mui/icons-material';
import { useRTC } from '../../../hooks/context/useRTC';
import { Box } from '@mui/material';

export const EditFooterAudioIcon = () => {
	const { isAudio, setIsAudio } = useRTC();

	return (
		<Box
			title={isAudio ? '音声をオフ' : '音声をオン'}
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100%"
			onClick={() => setIsAudio((prev) => !prev)}
			sx={{
				cursor: 'pointer',
			}}
		>
			{isAudio ? (
				<Headset
					fontSize="small"
					sx={{
						pointerEvents: 'none',
					}}
				/>
			) : (
				<HeadsetOff
					fontSize="small"
					color="error"
					sx={{
						pointerEvents: 'none',
					}}
				/>
			)}
		</Box>
	);
};
