import { Typography } from '@mui/material';
import {
	BarChart,
	CalendarToday,
	Description,
	DoNotDisturb,
	HelpOutline,
	Numbers,
	StackedBarChart,
	TextFields,
} from '@mui/icons-material';
import { usePalette } from '../../hooks';
import { ColumnTypeTextsProps } from '../../interfaces';

export const ColumnTypeTexts = ({ type }: ColumnTypeTextsProps) => {
	const palette = usePalette();

	return (
		<>
			{type === 'INT' ? (
				<Typography
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="2px"
					height="100%"
					variant="body2"
					fontSize="0.6rem"
					color={palette.components.edit.reactFlow.column.color.int}
				>
					<Numbers
						sx={{
							fontSize: '1rem',
						}}
					/>
					INT
				</Typography>
			) : type === 'VARCHAR' ? (
				<Typography
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="2px"
					variant="body2"
					fontSize="0.6rem"
					color={palette.components.edit.reactFlow.column.color.varchar}
				>
					<TextFields
						sx={{
							fontSize: '1rem',
						}}
					/>
					VARCHAR
				</Typography>
			) : type === 'BOOLEAN' ? (
				<Typography
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="2px"
					variant="body2"
					fontSize="0.6rem"
					color={palette.components.edit.reactFlow.column.color.boolean}
				>
					<DoNotDisturb
						sx={{
							fontSize: '1rem',
						}}
					/>
					BOOLEAN
				</Typography>
			) : type === 'DATE' ? (
				<Typography
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="2px"
					variant="body2"
					fontSize="0.6rem"
					color={palette.components.edit.reactFlow.column.color.date}
				>
					<CalendarToday
						sx={{
							fontSize: '1rem',
						}}
					/>
					DATE
				</Typography>
			) : type === 'TEXT' ? (
				<Typography
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="2px"
					variant="body2"
					fontSize="0.6rem"
					color={palette.components.edit.reactFlow.column.color.text}
				>
					<Description
						sx={{
							fontSize: '1rem',
						}}
					/>
					TEXT
				</Typography>
			) : type === 'FLOAT' ? (
				<Typography
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="2px"
					variant="body2"
					fontSize="0.6rem"
					color={palette.components.edit.reactFlow.column.color.float}
				>
					<BarChart
						sx={{
							fontSize: '1rem',
						}}
					/>
					FLOAT
				</Typography>
			) : type === 'DOUBLE' ? (
				<Typography
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="2px"
					variant="body2"
					fontSize="0.6rem"
					color={palette.components.edit.reactFlow.column.color.double}
				>
					<StackedBarChart
						sx={{
							fontSize: '1rem',
						}}
					/>
					DOUBLE
				</Typography>
			) : (
				<Typography
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="2px"
					variant="body2"
					fontSize="0.6rem"
					color={palette.components.edit.reactFlow.column.color.undefined}
				>
					<HelpOutline
						sx={{
							fontSize: '1rem',
						}}
					/>
					UNDEFINED
				</Typography>
			)}
		</>
	);
};
