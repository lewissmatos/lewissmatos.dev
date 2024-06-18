import prismaClient from "@/app/lib/prisma-db";
import { getParamFromUrl } from "@/utils/auth.utils";
import { Role, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
	req: NextRequest
): Promise<NextResponse<{ data: User | null }> | undefined> => {
	const email = getParamFromUrl(req.url, "email");
	if (prismaClient) {
		try {
			const user = await prismaClient.user.findFirst({
				where: { email },
				include: { role: true },
			});

			return NextResponse.json({ data: user }, { status: 200 });
		} catch (error) {
			return NextResponse.json(
				{ data: null, message: "error signing up" },
				{ status: 500 }
			);
		}
	}
};
