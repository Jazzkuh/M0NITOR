"use client";

import {useEffect, useState} from "react";
import useWebSocket from "@/hooks/use-web-socket";
import {MonitoringData} from "@/types/monitor";
import {Container, ContainerContent} from "@/components/ui/container";
import AudioMeter from "@/components/audio/audiometer";
import {balance, percentage} from "@/lib/utils";
import ClockComponent from "@/components/clock/ClockComponent";
import Status from "@/components/monitor/status";
import ChannelRow from "@/components/monitor/channel/channel-row";
import {Badge} from "@/components/ui/badge";
import NowPlayingMini from "@/components/music/now-playing-mini";
import {Avatar} from "@/components/ui/avatar";
import Image from "next/image";
import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {signOut} from "next-auth/react";
import {LogOut} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import TinyAudioMeter from "@/components/audio/tiny-audiometer";

const Monitor = ({socket}: {socket: ReturnType<typeof useWebSocket<MonitoringData>>}) => {
	// @ts-ignore
	const [data, setData] = useState<MonitoringData>(null);
	useEffect(() => {
		if (!socket.socket) return;

		const handler = (event: MessageEvent) => setData(JSON.parse(event.data));
		socket.socket.addEventListener("message", handler);
		return () => socket.socket!.removeEventListener("message", handler);
	}, [socket.socket]);

	if (!data) return (
        <div>
            <div className="flex justify-center items-center w-full h-full">
                <p className="text-muted-foreground">The websocket connection is not yet established.</p>
            </div>
        </div>
	)
	
	return (
		<div className="grid gap-2">
			<Container className="h-full">
				<ContainerContent>
					<div className="flex bg-sidebar justify-between w-full">
						<div className="flex py-2 bg-sidebar rounded-md justify-between w-full">
                            <div className="flex flex-row gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="h-8 w-8 rounded-md">
                                            <Image
                                                src="/logo.png"
                                                alt="M0NITOR"
                                                width={32}
                                                height={32}
                                            />
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                        side={"bottom"}
                                        align={"start"}
                                        sideOffset={4}
                                    >
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel className="text-sm text-muted-foreground">
                                                Account
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={() => signOut()}
                                            >
                                                <LogOut className="pr-2" />
                                                Log out
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <div className="flex flex-row items-center gap-1">
                                    <p className="font-semibold text-xl">M0NITOR</p>
                                    <p className="text-muted-foreground text-xs mt-1.5">v2-Alpha</p>
                                </div>
                            </div>

							<div className="">
								<div className="flex flex-row gap-2">
									<div className="flex flex-row gap-2">
										{data.microphone_on ? (
											<Badge variant={"destructive"} className="py-1 text-xs">Mic On</Badge>
										) : null}
										{data.cue_air ? (
											<Badge variant={"blue"} className="py-1 text-xs">StereoTool Processing</Badge>
										) : null}
									</div>
									<Status socket={socket} offset={data.microphone_on || data.cue_air}/>
								</div>
							</div>
						</div>
					</div>
					
					<div className="flex flex-row gap-4">
						<div className="flex flex-row gap-4">
							<AudioMeter text="PGM" left={percentage(data.metering.program_left)}
										right={percentage(data.metering.program_right)}
										balance={balance(data.metering.program_left, data.metering.program_right)}/>

                            <AudioMeter text="MASTER" left={percentage(data.metering.master_left)}
                                            right={percentage(data.metering.master_right)}
                                            balance={balance(data.metering.master_left, data.metering.master_right)}/>
						</div>
						
						<div className="w-full flex flex-col">
							<ClockComponent data={data}/>
							<NowPlayingMini data={data}/>
						</div>
						
						<div className="flex flex-row gap-4">
                            <div className="flex flex-col gap-2">
                                <TinyAudioMeter text="CRM" left={percentage(data.metering.crm_left)}
                                            right={percentage(data.metering.crm_right)}
                                            balance={balance(data.metering.crm_left, data.metering.crm_right)}/>

                                <TinyAudioMeter text="AUX" left={percentage(data.metering.aux_left)}
                                                right={percentage(data.metering.aux_right)}
                                                balance={balance(data.metering.aux_left, data.metering.aux_right)}/>
                            </div>

                            <div className="flex flex-col gap-2">
                                <TinyAudioMeter text="SUB" left={percentage(data.metering.sub_left)}
                                                right={percentage(data.metering.sub_right)}
                                                balance={balance(data.metering.sub_left, data.metering.sub_right)}/>
                                <TinyAudioMeter text="PFL" left={percentage(data.metering.phones_left)}
                                                right={percentage(data.metering.phones_right)}
                                                balance={balance(data.metering.phones_left, data.metering.phones_right)}/>
                            </div>
						</div>
					</div>
				</ContainerContent>
			</Container>

            <ChannelRow data={data}/>
		</div>
	);
};

export default Monitor;