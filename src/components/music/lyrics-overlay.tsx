"use client";

import React, { useEffect, useRef, useState } from "react";

type LyricLine = { startMs: number; endMs: number | null; words: string; isDot?: boolean };

type Props = {
    track: string;
    artist: string;
    trackId: string;
    token: string | null;
    durationMs: number;
    positionMs: number;
};

const POSITION_OFFSET = 200;
const GAP_THRESHOLD = 15000; // ms gap before inserting dots

function injectDotLines(lines: LyricLine[]): LyricLine[] {
    const result: LyricLine[] = [];
    for (let i = 0; i < lines.length; i++) {
        // Insert dots before first line if it starts late
        if (i === 0 && lines[i].startMs > GAP_THRESHOLD) {
            result.push({ startMs: 0, endMs: lines[i].startMs, words: "•••", isDot: true });
        }
        result.push(lines[i]);
        // Insert dots in gaps between lines
        const next = lines[i + 1];
        if (next) {
            const gap = next.startMs - (lines[i].endMs ?? lines[i].startMs + 1500);
            if (gap > GAP_THRESHOLD) {
                result.push({ startMs: lines[i].startMs + 100, endMs: next.startMs, words: "•••", isDot: true });
            }
        }
    }
    return result;
}

const AnimatedDots = ({ active, opacity }: { active: boolean; opacity: number }) => (
    <div className="flex gap-2 justify-center" style={{ opacity }}>
        {[0, 1, 2].map(i => (
            <div
                key={i}
                className="rounded-full"
                style={{
                    width: active ? 10 : 7,
                    height: active ? 10 : 7,
                    backgroundColor: "#fff",
                    animation: active ? `bounce 1.2s ease-in-out ${i * 0.2}s infinite` : "none",
                    transition: "width 0.3s, height 0.3s",
                }}
            />
        ))}
        <style>{`
            @keyframes bounce {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-6px); }
            }
        `}</style>
    </div>
);

const LyricsOverlay = ({ track, artist, trackId, token, durationMs, positionMs }: Props) => {
    const [lines, setLines] = useState<LyricLine[]>([]);
    const [plain, setPlain] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const prevTrack = useRef<string>("");

    useEffect(() => {
        if (!track || prevTrack.current === track) return;
        prevTrack.current = track;
        setLoading(true);
        setLines([]);
        setPlain(null);

        fetch("/api/lyrics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ track, artist, duration: durationMs, trackId, token }),
        })
            .then(r => r.json())
            .then(data => {
                if (data.lines?.length) setLines(injectDotLines(data.lines));
                else if (data.plainLyrics) setPlain(data.plainLyrics);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [track]);

    const adjusted = positionMs + POSITION_OFFSET;

    const activeIndex = lines.length > 0
        ? lines.reduce((acc, line, i) => (line.startMs <= adjusted ? i : acc), -1)
        : -1;

    if (loading) return (
        <div className="flex flex-col gap-4 px-6 pt-6 animate-pulse">
            {[65, 80, 55, 75, 60].map((w, i) => (
                <div key={i} className="h-5 rounded-full bg-white/10" style={{ width: `${w}%` }} />
            ))}
        </div>
    );

    if (plain) return null;

    if (!lines.length) return (
        <div className="flex items-center justify-center h-full">
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>No lyrics available</p>
        </div>
    );

    const WINDOW = 2;
    const start = Math.max(0, activeIndex - WINDOW);
    const end = Math.min(lines.length - 1, activeIndex + WINDOW);
    const visible = lines.slice(start, end + 1);

    return (
        <div className="flex flex-col justify-center items-center h-full px-6 gap-4 text-center">
            {visible.map((line, i) => {
                const absIndex = start + i;
                const isActive = absIndex === activeIndex;
                const isPast = absIndex < activeIndex;
                const distance = Math.abs(absIndex - activeIndex);
                const opacity = isActive ? 1 : isPast ? 0.2 : Math.max(0.2, 0.5 - distance * 0.1);

                if (line.isDot) return (
                    <AnimatedDots key={absIndex} active={isActive} opacity={opacity} />
                );

                return (
                    <div
                        key={absIndex}
                        className="transition-all duration-500 ease-in-out"
                        style={{
                            fontSize: isActive ? 22 : 17 - distance,
                            fontWeight: isActive ? 700 : 500,
                            color: "#fff",
                            opacity,
                            lineHeight: 1.35,
                            textShadow: isActive ? "0 2px 16px rgba(0,0,0,1)" : "none",
                        }}
                    >
                        {line.words}
                    </div>
                );
            })}
        </div>
    );
};

export default LyricsOverlay;
