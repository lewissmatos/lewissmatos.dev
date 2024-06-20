import prismaClient from "@/app/lib/prisma-db";
import { Project } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (
	req: Request
): Promise<NextResponse<{ data: Project | null }> | undefined> => {
	const body = await req.json();
	if (prismaClient) {
		try {
			const project = await prismaClient.project.create({
				data: { ...body },
			});

			console.log(project);

			if (!project) return NextResponse.json({ data: null }, { status: 404 });

			return NextResponse.json({ data: project }, { status: 201 });
		} catch (error) {
			console.log(error);
			return NextResponse.json(
				{ data: null, message: "errorCreatingProject" },
				{ status: 500 }
			);
		}
	}
};

// // pages/api/projects.ts
// export const GET = async (req: Request) => {
// 	const projects = await prismaClient.project.findMany();
// 	console.log(projects);
// 	NextResponse.json({ data: projects });
// };
