import prismaClient from "@/app/lib/prisma-db";
import { Role, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (
	req: Request
): Promise<
	NextResponse<{ data: User | null; session?: { token: string } }> | undefined
> => {
	const body = await req.json();

	const { name, email, password } = body;

	const hashedPassword = await bcrypt.hash(password, 10);

	if (prismaClient) {
		try {
			const role = await prismaClient.role.findFirst({
				where: { name: "user" },
			});

			if (!role) return;
			const user = await prismaClient.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
					roleId: role?.id,
				},
				include: {
					role: true,
				},
			});

			return NextResponse.json(
				{ data: user, session: { token: "" } },
				{ status: 201 }
			);
		} catch (error) {
			return NextResponse.json(
				{ data: null, message: "error signing up" },
				{ status: 500 }
			);
		}
	}
};
