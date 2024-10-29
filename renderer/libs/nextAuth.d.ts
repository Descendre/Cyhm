import NextAuth, { ISODateString } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user?: {
			name?: string | null;
			email?: string | null;
			image?: string | null;
			id?: string;
		};
		expires: ISODateString;
		provider?: string;
	}
	interface Profile extends DefaultProfile {
		picture?: string;
		avatar_url?: string;
	}
}
