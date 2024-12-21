import {NextResponse} from "next/server";
import axios from "axios";

export const POST = async (request: Request) => {
	const body = await request.json();
	
	const data = await axios.get("https://embed.spotify.com/oembed/?url=spotify:track:" + body.trackId);
	return NextResponse.json(data.data);
};