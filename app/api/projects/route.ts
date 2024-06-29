import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
	const name = req.url.toString().split("=")[1];
	if (name) {
		const cleanName = name.replaceAll("-", " ");
		try {
			const project = await prisma.project.findFirst({
				where: { name: cleanName },
			});
			if (!project) {
				return NextResponse.json(
					{ data: null, message: "projectNotFound" },
					{ status: 404 }
				);
			}
			return NextResponse.json({ data: project }, { status: 200 });
		} catch (error) {
			return NextResponse.json({ data: error }, { status: 500 });
		}
	} else
		try {
			const projects = await prisma.project.findMany({
				where: { isActive: true },
				orderBy: { startedAt: "desc" },
			});
			if (!projects) {
				return NextResponse.json({ data: null }, { status: 404 });
			}
			return NextResponse.json({ data: projects }, { status: 200 });
		} catch (error) {
			return NextResponse.json({ data: error }, { status: 500 });
		}
};
