import { Box } from '@mui/material';
import { EditHeaderProjectTitle } from '../atom';
import { useModal, usePalette } from '../../../hooks';
import { AppModal } from '../../../components';
import { Settings } from '@mui/icons-material';
import { EditProjectSettingArea } from './EditProjectSettingArea';

export const EditHeaderProjectSettings = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const palette = usePalette();

	return (
		<>
			<Box
				display="flex"
				justifyContent="start"
				alignItems="center"
				width="calc(100% - 40px)"
				height="100%"
				sx={{
					cursor: 'pointer',
					'&:hover .settingsIcon': {
						opacity: 1,
					},
				}}
				onClick={() => openModal('projectSettingModal')}
			>
				<EditHeaderProjectTitle />
			</Box>

			<AppModal
				outerClose
				isOpen={isOpen('projectSettingModal')}
				closeModal={() => closeModal('projectSettingModal')}
				width="75vw"
				height="85vh"
				maxWidth="800px"
				maxHeight="640px"
				icon={
					<Settings
						fontSize="small"
						sx={{ color: palette.text.secondary, fontSize: '1.1rem' }}
					/>
				}
				title={`プロジェクトの設定`}
			>
				<EditProjectSettingArea />
			</AppModal>
		</>
	);
};
