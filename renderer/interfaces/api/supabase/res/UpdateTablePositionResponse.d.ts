export interface UpdateTablePositionResponse {
	projectId: string;
	name: string;
	id: string;
	position: JsonValue;
	color: string;
	isExpanded: boolean;
	isEditing: boolean;
	createdAt: Date;
	updatedAt: Date;
}
