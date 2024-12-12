import { AddColumnResponse } from './AddColumnResponse';
import { ProjectsResponse } from './FetchUserProjectsResponse';

export interface UpdateProjectDBTypeResponse {
	project: ProjectsResponse;
	columns: AddColumnResponse[];
}
