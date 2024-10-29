export interface AddTableResponse {
	projectId: string;
	color: string;
	position: JsonValue;
	id: string;
	name: string;
	isExpanded: boolean;
	isEditing: boolean;
	createdAt: Date;
	updatedAt: Date;
}
