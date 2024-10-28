import { LibraryAdd } from '@mui/icons-material';
import { useLayout } from '../../../hooks';

export const EditFooterAddTableIcon = () => {
	const { setIsTableAddMode, setIsEditLeftBar } = useLayout();

	const handleClick = (): void => {
		setIsEditLeftBar(true);
		setIsTableAddMode(true);
	};

	return (
		<LibraryAdd
			titleAccess="テーブルを追加"
			fontSize="small"
			onClick={handleClick}
			sx={{
				cursor: 'pointer',
			}}
		/>
	);
};
