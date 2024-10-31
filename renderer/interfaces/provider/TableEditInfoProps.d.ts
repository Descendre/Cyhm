export interface TableEditInfoProps {
	name: string;
	color: string;
}

export interface TableEditStateProps {
	[tableId: string]: TableEditInfoProps;
}
