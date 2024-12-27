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
		`https://spclient.wg.spotify.com/color-lyrics/v2/track/${body.query}?format=json&vocalRemoval=false&market=from_token`,
		{
			headers: {
				"app-platform": "WebPlayer",
				Authorization: `Bearer ${body.token}`,
			},
		}
	);
	
	return NextResponse.json(data.data);
};