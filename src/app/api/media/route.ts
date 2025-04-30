import { NextResponse } from "next/server";
import axios from "axios";
import {getAuthSession} from "@/lib/auth";

export const POST = async (request: Request) => {
	const session = await getAuthSession();
	if (!session) {
		return NextResponse.json(
			{ success: false, message: "Not authorized" },
			{ status: 401 }
		);
	}
	
	const body = await request.json();
	const data = await axios.get(
		`http://deamon.jazzkuh.com/media/${body.action}`,
		{
			headers: {
				"X-API-Key": process.env.DEAMON_API_KEY
			},
		}
	);
	
	return NextResponse.json(data.data);
};