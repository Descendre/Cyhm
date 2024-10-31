import { AddTableResponse } from './../../../api/supabase/res/AddTableResponse.d';
import { AddColumnResponse } from '../../../api';

export interface EditRightPopperColumnNameInputProps {
	column: AddColumnResponse;
	table: AddTableResponse;
}
