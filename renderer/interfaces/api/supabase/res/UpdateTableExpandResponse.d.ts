export interface UpdateTableExpandResponse {
	isEditing: boolean;
	id: string;
	name: string;
	projectId: string;
	color: string;
	isExpanded: boolean;
	position: JsonValue;
	createdAt: Date;
	updatedAt: Date;
}
