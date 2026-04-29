
"use client";

import { MonitoringData } from "@/types/monitor";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { TrackNextIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import LyricsOverlay from "@/components/music/lyrics-overlay";

const NowPlaying = ({ data, className }: { data: MonitoringData; className?: string }) => {
    const [coverUrl, setCoverUrl] = useState<string | null>(null);

    const playing = data.spotify.playing;
    const trackId = playing ? data.spotify.track_id : null;

    useEffect(() => {
        if (!trackId) { setCoverUrl(null); return; }
        fetch("/api/spotify", {
            method: "POST",
            body: JSON.stringify({ trackId }),
        })
            .then(r => r.json())
            .then(j => setCoverUrl(j.thumbnail_url ?? null));
    }, [trackId]);

    function getProgress(current: number, max: number) {
        return (current / max) * 100;
    }

    function getDuration(duration: number) {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        return minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds;
    }

    function next() {
        axios.post("/api/media", { action: "next" });
    }

    const progress = playing ? getProgress(data.spotify.position, data.spotify.length) : 0;
    const position = playing ? getDuration(data.spotify.position) : "0:00";
    const length = playing ? getDuration(data.spotify.length) : "0:00";

    return (
        <div
            className={`relative w-full h-full rounded-lg overflow-hidden flex flex-col ${className ?? ""}`}
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        >
            {/* Blurred bg */}
            {coverUrl && (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${coverUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(40px) saturate(1.8)",
                        transform: "scale(1.2)",
                        opacity: 0.55,
                    }}
                />
            )}
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.45)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.1) 100%)" }} />
            <div className="absolute inset-0 rounded-lg" style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.7)" }} />

            {/* Lyrics — fills remaining space above player */}
            <div className="relative z-10 flex-1 min-h-0">
                {playing && (
                    <LyricsOverlay
                        track={data.spotify.track}
                        artist={data.spotify.artist}
                        trackId={data.spotify.track_id}
                        token={data.spotify.token}
                        durationMs={data.spotify.length}
                        positionMs={data.spotify.position}
                    />
                )}
            </div>

            {/* Player bar — pinned to bottom */}
            <div className="relative z-10 flex flex-row items-end gap-4 p-3 flex-shrink-0">
                {/* Cover thumbnail */}
                {coverUrl
                    ? <img src={coverUrl} alt="Cover" width={96} height={96} className="rounded-md flex-shrink-0 shadow-lg" />
                    : <div className="w-[96px] h-[96px] rounded-md bg-white/10 flex-shrink-0 animate-pulse" />
                }

                {/* Info + controls */}
                <div className="flex flex-col justify-end flex-1 min-w-0 gap-1.5">
                    {playing
                        ? <>
                            <p className="font-bold text-lg leading-tight truncate" style={{ color: "#fff", textShadow: "0 2px 12px rgba(0,0,0,1)" }}>{data.spotify.track}</p>
                            <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.55)" }}>{data.spotify.artist}</p>
                        </>
                        : <>
                            <div className="h-5 w-44 rounded-full bg-white/15 animate-pulse" />
                            <div className="h-3 w-28 rounded-full bg-white/10 animate-pulse" />
                        </>
                    }

                    <div className="flex flex-col gap-1">
                        <Progress value={progress} className="w-full h-1 bg-white/20" />
                        <div className="flex flex-row justify-between items-center">
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{position} / {length}</p>
                            <Button onClick={next} variant="ghost" size="sm" className="text-xs gap-1 px-2 h-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                                Next <TrackNextIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NowPlaying;
