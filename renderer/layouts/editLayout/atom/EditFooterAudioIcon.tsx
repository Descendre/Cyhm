import { Headset, HeadsetOff } from '@mui/icons-material';
import { useRTC } from '../../../hooks/context/useRTC';

export const EditFooterAudioIcon = () => {
	const { isAudio, setIsAudio } = useRTC();

	return (
		<>
			{isAudio ? (
				<Headset
					titleAccess="音声をオフ"
					fontSize="small"
					sx={{
						cursor: 'pointer',
					}}
					onClick={() => setIsAudio((prev) => !prev)}
				/>
			) : (
				<HeadsetOff
					titleAccess="音声をオン"
					fontSize="small"
					color="error"
					sx={{
						cursor: 'pointer',
					}}
					onClick={() => setIsAudio((prev) => !prev)}
				/>
			)}
		</>
	);
};
