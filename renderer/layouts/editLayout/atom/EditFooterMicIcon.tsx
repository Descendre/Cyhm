import { Mic, MicOff } from '@mui/icons-material';
import { useRTC } from '../../../hooks/context/useRTC';

export const EditFooterMicIcon = () => {
	const { isMic, setIsMic } = useRTC();

	return (
		<>
			{isMic ? (
				<Mic
					titleAccess="マイクをオフ"
					fontSize="small"
					sx={{
						cursor: 'pointer',
					}}
					onClick={() => setIsMic((prev) => !prev)}
				/>
			) : (
				<MicOff
					titleAccess="マイクをオン"
					fontSize="small"
					color="error"
					sx={{
						cursor: 'pointer',
					}}
					onClick={() => setIsMic((prev) => !prev)}
				/>
			)}
		</>
	);
};
