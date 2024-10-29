import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '../../../../libs';
import { Provider } from '@prisma/client';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET as string,
	callbacks: {
		async jwt({ token, account, profile }) {
			if (account) {
				token.provider = account.provider;
				token.id = account.providerAccountId;

				const userId = account.providerAccountId;
				const providerName = account.provider as Provider;
				const userName = profile?.name as string;
				const userEmail = profile?.email as string;
				const userImage = profile?.image as string;

				await prisma.user.upsert({
					where: {
						id: userId,
					},
					update: {
						provider: providerName,
						name: userName,
						email: userEmail,
						image: userImage,
					},
					create: {
						id: userId,
						provider: providerName,
						name: userName,
						email: userEmail,
						image: userImage,
					},
				});
			}
			return token;
		},
		async session({ session, token, user }: any) {
			session.user.provider = token.provider;
			session.user.id = token.id;
			return session;
		},
	},
});
export { handler as GET, handler as POST };
