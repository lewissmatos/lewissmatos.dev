import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/prisma-db";

const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {
				email: { label: "email", type: "email" },
				password: { label: "password", type: "password" },
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password)
					throw new Error("Missing credentials");
				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user || !user.password) {
					throw new Error("User not found");
				}

				const isCorrect = await bcrypt.compare(
					credentials.password,
					user.password
				);

				if (!isCorrect) throw new Error("Invalid credentials");
				return user;
			},
		}),
	],
	adapter: PrismaAdapter(prisma),
	callbacks: {
		session: async ({ session }) => {
			return session;
		},
		jwt: async ({ user, token }) => {
			if (user) {
				token.uid = user.id;
			}
			return token;
		},
	},

	session: {
		strategy: "jwt",
	},

	secret: process.env.JWT_SECRET,
};

export default authOptions;
