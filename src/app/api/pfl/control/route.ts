import { NextResponse } from "next/server";
import axios from "axios";

export const POST = async (request: Request) => {
	const body = await request.json();
	const data = await axios.get(
		`http://141.224.204.8:8082/pfl/control/${body.value}`,
		{
			headers: {
				"X-API-Key": process.env.DEAMON_API_KEY
			},
		}
	);
	
	return NextResponse.json(data.data);
};