import {NextResponse} from "next/server";
import axios from "axios";

export const POST = async (request: Request) => {
	const body = await request.json();
	
	const data = await axios.post("http://141.224.204.8:8082/lyrics", {
		query: body.query
	}, {
		headers:
			{
				"Content-Type": "application/json"
			}
	});
	
	return NextResponse.json(data.data);
};