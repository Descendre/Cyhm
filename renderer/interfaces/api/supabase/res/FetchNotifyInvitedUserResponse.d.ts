import { Provider } from '@prisma/client';
export interface FetchNotifyInvitedUserResponse {
	createdAt: Date;
	toUser: InvitedToUserProps;
}
export interface InvitedToUserProps {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	image: string | null;
	name: string | null;
	email: string | null;
	provider: Provider;
}
