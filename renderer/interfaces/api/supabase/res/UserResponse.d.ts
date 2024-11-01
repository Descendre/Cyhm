import { Provider } from '@prisma/client';

export interface UserResponse {
	id: string;
	provider: Provider;
	name: string | null;
	email: string | null;
	image: string | null;
	createdAt: Date;
	updatedAt: Date;
}
