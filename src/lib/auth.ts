import {getServerSession, NextAuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/sign-in",
		error: "/sign-in",
	},
	providers: [
		GithubProvider({
			clientId: process.env.AUTH_ID as string,
			clientSecret: process.env.AUTH_SECRET as string,
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			if (!profile) return false;
			
			const data = await fetch(`${profile.organizations_url}`);
			const json = await data.json();
			
			if (!json.some((org: any) => org.login === "M0NITOR-Access")) return false;
			return true;
		},
		
		async session({ session, user, token }) {
			if (token) {
				session.user.id = token.id as string
				session.user.name = token.name as string;
				session.user.avatar_url = token.avatar_url as string;
				session.user.email = token.email as string
				session.user.organizations_url = token.organizations_url as string;
			}
			
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			if (!user || !profile) return token;
			
			return {
				id: profile.id,
				name: profile.name,
				avatar_url: profile.avatar_url,
				email: profile.email,
				organizations_url: profile.organizations_url,
			};
		},
		async redirect({ url, baseUrl }) {
			return baseUrl + "/";
		},
	},
};

export const getAuthSession = () => getServerSession(authOptions);
