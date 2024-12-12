import { DBType } from '@prisma/client';

export interface ProjectSettingInfoProps {
	projectName: string;
	dbType: DBType | null;
}
