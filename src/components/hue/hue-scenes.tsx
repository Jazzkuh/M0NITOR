"use client";

import React, { useState } from "react";
import {
    Building2, Flower, Landmark, Sun, Zap, TreePalm,
    Lightbulb, Waves, Clapperboard, Flower2, Snowflake, Sparkles, PartyPopper,
} from "lucide-react";

type Scene = { id: string; label: string; Icon: React.ComponentType<{ size?: number }> };
type Room = { id: string; label: string; scenes: Scene[] };

// ── Edit your rooms and scenes here ──────────────────────────────
const ROOMS: Room[] = [
    {
        id: "Studio",
        label: "Studio",
        scenes: [
            { id: "Fairfax",            label: "Fairfax",         Icon: Building2     },
            { id: "Lily",               label: "Lily",            Icon: Flower        },
            { id: "Chinatown",          label: "Chinatown",       Icon: Landmark      },
            { id: "Miami",              label: "Miami",           Icon: Sun           },
            { id: "Disturbia",          label: "Disturbia",       Icon: Zap           },
            { id: "Osaka",              label: "Osaka",           Icon: TreePalm      },
            { id: "white",              label: "White",           Icon: Lightbulb     },
            { id: "Rio",                label: "Rio",             Icon: Waves         },
            { id: "Studio",             label: "Studio",          Icon: Clapperboard  },
            { id: "Amberbloesem",       label: "Amber Blossom",   Icon: Flower2       },
            { id: "Sneeuwschittering",  label: "Snow Sparkle",    Icon: Snowflake     },
            { id: "Kleurexplosie",      label: "Color Explosion", Icon: Sparkles      },
            { id: "Feestelijk plezier", label: "Festive Fun",     Icon: PartyPopper   },
        ],
    },
];
// ─────────────────────────────────────────────────────────────────

const HueScenes = () => {
    const [active, setActive] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<string | null>(null);

    const trigger = async (room: Room, scene: Scene) => {
        const key = `${room.id}:${scene.id}`;
        setLoading(key);
        try {
            await fetch("/api/hue/scene", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ room: room.id, scene: scene.id }),
            });
            setActive(prev => ({ ...prev, [room.id]: scene.id }));
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="flex flex-col gap-3 w-full h-full">
            {ROOMS.map(room => {
                const count = room.scenes.length;
                const cols = Math.ceil(Math.sqrt(count)) + 1;
                const rows = Math.ceil(count / cols);
                return (
                    <div key={room.id} className="flex flex-col gap-2 flex-1 min-h-0">
                        <p className="text-xs font-semibold uppercase tracking-widest flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>
                            {room.label}
                        </p>
                        <div
                            className="flex-1 min-h-0"
                            style={{
                                display: "grid",
                                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                                gridTemplateRows: `repeat(${rows}, 1fr)`,
                                gap: 8,
                            }}
                        >
                            {room.scenes.map(scene => {
                                const key = `${room.id}:${scene.id}`;
                                const isActive = active[room.id] === scene.id;
                                const isLoading = loading === key;
                                return (
                                    <button
                                        key={scene.id}
                                        onClick={() => trigger(room, scene)}
                                        disabled={isLoading}
                                        className="flex flex-col items-center justify-center gap-2 rounded-lg transition-colors text-xs font-medium leading-none w-full h-full"
                                        style={{
                                            backgroundColor: isActive ? "#68e178" : "rgba(255,255,255,0.06)",
                                            color: isActive ? "#000" : "rgba(255,255,255,0.45)",
                                            opacity: isLoading ? 0.5 : 1,
                                        }}
                                    >
                                        <scene.Icon size={22} />
                                        {scene.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HueScenes;
