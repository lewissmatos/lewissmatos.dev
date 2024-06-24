import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
	try {
		const projects = await prisma.project.findMany({
			where: { isActive: true },
			orderBy: { startedAt: "desc" },
		});
		if (!projects) {
			return NextResponse.json([]);
		}
		return NextResponse.json({ data: projects }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ data: error }, { status: 500 });
	}
};
