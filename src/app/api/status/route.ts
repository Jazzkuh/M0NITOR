import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { daemonGet } from "@/lib/daemon";

export const GET = async () => {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 });

    try {
        const data = await daemonGet("/status");
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ success: false, message: "Daemon unavailable" }, { status: 502 });
    }
};
