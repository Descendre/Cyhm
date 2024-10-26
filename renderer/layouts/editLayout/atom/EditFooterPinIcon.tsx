import { PushPin, PushPinOutlined } from '@mui/icons-material';
import { useLayout } from '../../../hooks';

export const EditFooterPinIcon = () => {
	const { isPinned, setIsPinned } = useLayout();

	return (
		<>
			{isPinned ? (
				<PushPin
					titleAccess="ピンを外す"
					sx={{
						cursor: 'pointer',
					}}
					onClick={() => setIsPinned((prev) => !prev)}
				/>
			) : (
				<PushPinOutlined
					titleAccess="ピン止め"
					sx={{
						cursor: 'pointer',
					}}
					onClick={() => setIsPinned((prev) => !prev)}
				/>
			)}
		</>
	);
};
