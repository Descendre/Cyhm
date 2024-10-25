import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

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
				token.id = account.providerAccountId;
			}
			return token;
		},
		async session({ session, token, user }: any) {
			session.id = token.id;
			return session;
		},
	},
});

export { handler as GET, handler as POST };
