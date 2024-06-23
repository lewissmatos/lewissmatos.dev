"use server";

import prismaClient from "../lib/prisma-db";

const getProjects = async () => {
	try {
		return await prismaClient.project.findMany();
	} catch (error) {
		throw new Error((error as Error)?.message);
	}
};

export default getProjects;
