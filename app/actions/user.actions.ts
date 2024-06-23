"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prismaClient from "../lib/prisma-db";

export const getCurrentUser = async () => {
	const session = await getServerSession(authOptions);
	return session?.user;
};

export const getServerCurrentUser = async () => {
	try {
		const _serverUser = await getCurrentUser();
		if (!_serverUser?.email) return null;

		const user = await prismaClient.user.findUnique({
			where: {
				email: _serverUser.email,
			},
			include: {
				role: true,
			},
		});

		return user;
	} catch (error) {
		throw new Error((error as Error)?.message);
		return null;
	}
};