import prismaClient from "@/app/lib/prisma-db";
import { Project } from "@prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (
	req: Request
): Promise<NextResponse<{ data: Project | null }> | undefined> => {
	const id = req.url.toString().split("=")[1];

	if (prismaClient) {
		try {
			const project = await prismaClient.project.update({
				where: { id },
				data: { isActive: false },
			});

			if (!project)
				return NextResponse.json(
					{ data: null, message: "projectNotFound", isSuccess: false },
					{ status: 404 }
				);

			return NextResponse.json(
				{ data: project, isSuccess: true, message: "executedSuccessfully" },
				{ status: 200 }
			);
		} catch (error) {
			return NextResponse.json(
				{ data: null, message: "errorRemovingProject", isSuccess: false },
				{ status: 500 }
			);
		}
	}
};
