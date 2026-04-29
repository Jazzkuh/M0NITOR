"use client";

import { useEffect, useState } from "react";
import useWebSocket from "@/hooks/use-web-socket";
import { MonitoringData } from "@/types/monitor";
import { Container, ContainerContent } from "@/components/ui/container";
import AudioMeter from "@/components/audio/audiometer";
import { balance, percentage } from "@/lib/utils";
import ClockComponent from "@/components/clock/ClockComponent";
import Status from "@/components/monitor/status";
import ChannelRow from "@/components/monitor/channel/channel-row";
import { Badge } from "@/components/ui/badge";
import NowPlayingMini from "@/components/music/now-playing-mini";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import * as React from "react";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LogOut, Home, Music, Lightbulb } from "lucide-react";
import HueScenes from "@/components/hue/hue-scenes";
import NowPlaying from "@/components/music/now-playing";

type Tab = "home" | "nowplaying" | "hue";

const TABS: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number }> }[] = [
    { id: "home",       label: "Home",        Icon: Home },
    { id: "nowplaying", label: "Now Playing", Icon: Music },
    { id: "hue",        label: "Hue",         Icon: Lightbulb },
];

const Monitor = ({ socket }: { socket: ReturnType<typeof useWebSocket<MonitoringData>> }) => {
    // @ts-ignore
    const [data, setData] = useState<MonitoringData>(null);
    const [tab, setTab] = useState<Tab>("home");

    useEffect(() => {
        if (!socket.socket) return;
        const handler = (event: MessageEvent) => setData(JSON.parse(event.data));
        socket.socket.addEventListener("message", handler);
        return () => socket.socket!.removeEventListener("message", handler);
    }, [socket.socket]);

    if (!data) return (
        <div className="flex justify-center items-center w-full h-full">
            <p className="text-muted-foreground">The websocket connection is not yet established.</p>
        </div>
    );

    const m = data.metering;
    const isHome = tab === "home";

    return (
        <div className="grid gap-2">

            {/* ── Header card ── */}
            <Container>
                <ContainerContent className="py-3">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex flex-row gap-2 items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="h-8 w-8 rounded-md cursor-pointer">
                                        <Image src="/logo.png" alt="M0NITOR" width={32} height={32} />
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="start" sideOffset={4}>
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel className="text-sm text-muted-foreground">Account</DropdownMenuLabel>
                                        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                                            <LogOut className="pr-2" /> Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className="flex flex-row items-center gap-1">
                                <p className="font-semibold text-xl">M0NITOR</p>
                                <p className="text-muted-foreground text-xs mt-1.5">v2-Alpha</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            {data.microphone_on && <Badge variant="destructive" className="py-1 text-xs">Mic On</Badge>}
                            {data.cue_air && <Badge variant="blue" className="py-1 text-xs">StereoTool Processing</Badge>}
                            <p className="font-semibold text-sm tabular-nums" style={{ color: "#CDD2D5" }}>
                                {data.time}
                            </p>
                            <Status socket={socket} />
                        </div>
                    </div>
                </ContainerContent>
            </Container>

            {/* ── Three-card main row ── */}
            <div className="flex flex-row gap-2">

                {/* Card 1: Meters */}
                <Container className="flex-shrink-0">
                    <ContainerContent className="py-3 h-full">
                        <div className="flex flex-row gap-3 h-full">
                            <AudioMeter text="PGM"    left={percentage(m.program_left)} right={percentage(m.program_right)} balance={balance(m.program_left, m.program_right)} />
                            {isHome && <AudioMeter text="MASTER" left={percentage(m.master_left)}  right={percentage(m.master_right)}  balance={balance(m.master_left, m.master_right)} />}
                            {isHome && <AudioMeter text="CRM"    left={percentage(m.crm_left)}     right={percentage(m.crm_right)}     balance={balance(m.crm_left, m.crm_right)} />}
                            {isHome && <AudioMeter text="PFL"    left={percentage(m.phones_left)}  right={percentage(m.phones_right)}  balance={balance(m.phones_left, m.phones_right)} />}
                        </div>
                    </ContainerContent>
                </Container>

                {/* Card 2: Content */}
                <Container className="flex-1">
                    <ContainerContent className="py-3 h-full flex flex-col justify-center items-center w-full">
                        {isHome && <>
                            <ClockComponent data={data} radius={160} />
                            <NowPlayingMini data={data} />
                        </>}
                        {tab === "nowplaying" && <NowPlaying data={data} className="w-full" />}
                        {tab === "hue" && <HueScenes />}
                    </ContainerContent>
                </Container>

                {/* Card 3: Tab buttons */}
                <Container className="flex-shrink-0">
                    <ContainerContent className="py-3 h-full">
                        <div className="flex flex-col gap-2 h-full">
                            {TABS.map(({ id, label, Icon }) => {
                                const active = tab === id;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => setTab(id)}
                                        className="flex flex-col items-center justify-center rounded-lg gap-2 transition-colors"
                                        style={{
                                            width: 100,
                                            flex: 1,
                                            backgroundColor: active ? "#68e178" : "rgba(255,255,255,0.06)",
                                            color: active ? "#000" : "rgba(255,255,255,0.45)",
                                        }}
                                    >
                                        <Icon size={26} />
                                        <span className="text-xs font-medium leading-none">{label}</span>
                                    </button>
                                );
                            })}
                            {[0,1,2].map(i => (
                                <div key={i} className="rounded-lg" style={{ width: 100, flex: 1, backgroundColor: "rgba(255,255,255,0.06)" }} />
                            ))}
                        </div>
                    </ContainerContent>
                </Container>

            </div>

            {/* Bottom: channel strips */}
            <ChannelRow data={data} />
        </div>
    );
};

export default Monitor;
