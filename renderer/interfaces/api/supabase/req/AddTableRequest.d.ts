export interface AddTableRequest {
	projectId: string;
	tableName: string;
	color: string;
	position: {
		x: number;
		y: number;
	};
}
