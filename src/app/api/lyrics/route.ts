import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export const POST = async (request: Request) => {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 });

    try {
        const { track, artist, duration, trackId, token } = await request.json();

        // Try Spotify color-lyrics first (precise ms timing + endTime per line)
        if (trackId && token) {
            const spotifyRes = await fetch(
                `https://spclient.wg.spotify.com/color-lyrics/v2/track/${trackId}?format=json&vocalRemoval=false&market=from_token`,
                { headers: { "app-platform": "WebPlayer", Authorization: `Bearer ${token}` } }
            );
            if (spotifyRes.ok) {
                const data = await spotifyRes.json();
                const lines = data?.lyrics?.lines;
                if (lines?.length) {
                    return NextResponse.json({
                        source: "spotify",
                        synced: data.lyrics.syncType === "LINE_SYNCED",
                        lines: lines.map((l: any) => ({
                            startMs: parseInt(l.startTimeMs),
                            endMs: parseInt(l.endTimeMs) || null,
                            words: l.words,
                        })),
                    });
                }
            }
        }

        // Fallback: LRCLIB
        const params = new URLSearchParams({ track_name: track, artist_name: artist });
        if (duration) params.set("duration", String(Math.round(duration / 1000)));

        const res = await fetch(`https://lrclib.net/api/get?${params}`, {
            headers: { "Lrclib-Client": "M0NITOR (https://github.com/jazzkuh/m0nitor)" },
        });

        if (!res.ok) return NextResponse.json({ lines: null, plainLyrics: null });
        const data = await res.json();

        if (data.syncedLyrics) {
            const lines = data.syncedLyrics.split("\n")
                .map((line: string) => {
                    const m = line.match(/^\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
                    if (!m) return null;
                    const ms = parseInt(m[1]) * 60000 + parseInt(m[2]) * 1000 + parseInt(m[3].padEnd(3, "0"));
                    return { startMs: ms, endMs: null, words: m[4].trim() };
                })
                .filter((l: any) => l !== null && l.words.length > 0);
            return NextResponse.json({ source: "lrclib", synced: true, lines });
        }

        return NextResponse.json({ source: "lrclib", synced: false, lines: null, plainLyrics: data.plainLyrics ?? null });
    } catch {
        return NextResponse.json({ lines: null, plainLyrics: null });
    }
};
