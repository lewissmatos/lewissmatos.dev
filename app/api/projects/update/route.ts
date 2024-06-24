import prismaClient from "@/app/lib/prisma-db";
import { Project } from "@prisma/client";
import { NextResponse } from "next/server";

export const PUT = async (
	req: Request
): Promise<NextResponse<{ data: Project | null }> | undefined> => {
	const body = await req.json();
	if (prismaClient) {
		const { id, ...payload } = body;
		try {
			const project = await prismaClient.project.update({
				where: { id },
				data: { ...payload },
			});

			if (!project)
				return NextResponse.json(
					{ data: null, message: "projectNotFound" },
					{ status: 404 }
				);

			return NextResponse.json(
				{ data: project, isSuccess: true, message: "executedSuccessfully" },
				{ status: 200 }
			);
		} catch (error) {
			return NextResponse.json(
				{ data: null, message: "errorCreatingProject", isSuccess: false },
				{ status: 500 }
			);
		}
	}
};
