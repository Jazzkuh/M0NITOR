"use client";

import {useEffect, useState} from "react";
import useWebSocket from "@/hooks/use-web-socket";
import {MonitoringData} from "@/types/monitor";
import {Container, ContainerContent, ContainerHeader, ContainerTitle} from "@/components/ui/container";
import AudioMeter from "@/components/audio/audiometer";
import {balance, percentage} from "@/lib/utils";
import ClockComponent from "@/components/clock/ClockComponent";
import Status from "@/components/monitor/status";
import PFLRow from "@/components/monitor/pfl/pfl-row";
import ChannelRow from "@/components/monitor/channel/channel-row";
import {Badge} from "@/components/ui/badge";
import NowPlayingMini from "@/components/music/now-playing-mini";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

const Monitor = ({socket}: {socket: ReturnType<typeof useWebSocket<MonitoringData>>}) => {
	// @ts-ignore
	const [data, setData] = useState<MonitoringData>(null);
	const [activeTab, setActiveTab] = useState<string>("pfl");
	
	useEffect(() => {
		if (!socket.socket) return;
		
		socket.socket.addEventListener("message", (event) => {
			setData(JSON.parse(event.data));
		});
	}, [socket.socket]);
	
	if (!data) return (
		<div className="flex flex-1 flex-col p-4 pt-0">
			<div className="flex justify-center items-center w-full h-full">
				<p className="text-muted-foreground">The websocket connection is not yet established.</p>
			</div>
		</div>
	)
	
	return (
		<div className="grid gap-3">
			<Container>
				<ContainerContent>
					<div className="flex bg-sidebar justify-between w-full mt-2">
						<div className="flex py-2 px-4 bg-sidebar rounded-md justify-between w-full">
							<div className="flex flex-col gap-0.5">
								<p className="font-semibold text-xl">Monitoring</p>
								<p className="text-xs text-muted-foreground">
									Currently monitoring the audio levels of the PGM, CRM and PFL signals.
								</p>
							</div>
							
							<div className="pt-1.5">
								<div className="flex flex-row gap-3">
									{data.microphone_on ? (
										<Badge variant={"destructive"} className="py-1 text-xs">MIC ON</Badge>
									) : null}
									<Status socket={socket} offset={data.microphone_on}/>
								</div>
							</div>
						</div>
					</div>
					
					<div className="flex flex-row justify-between mt-2">
						<div className="flex flex-row">
							<AudioMeter text="PGM" left={percentage(data.metering.program_left)}
										right={percentage(data.metering.program_right)}
										balance={balance(data.metering.program_left, data.metering.program_right)}/>
							
							<div className="ml-12">
								<AudioMeter text="CRM" left={percentage(data.metering.crm_left)}
											right={percentage(data.metering.crm_right)}
											balance={balance(data.metering.crm_left, data.metering.crm_right)}/>
							</div>
						</div>
						
						<div className="w-full mx-8 flex flex-col">
							<Tabs defaultValue="pfl" value={activeTab} onValueChange={setActiveTab} className="w-full">
								<TabsList className="w-full bg-sidebar">
									<TabsTrigger className="data-[state=active]:bg-accent" value="pfl">PFL Options</TabsTrigger>
									<TabsTrigger className="data-[state=active]:bg-accent" value="nowplaying">Now Playing</TabsTrigger>
								</TabsList>
								
								<ClockComponent data={data}/>
								
								<TabsContent value="pfl">
									<PFLRow data={data}/>
								</TabsContent>
								
								<TabsContent value="nowplaying">
									<NowPlayingMini data={data}/>
								</TabsContent>
							</Tabs>
						</div>
						
						<div>
							<AudioMeter text="PFL" left={percentage(data.metering.phones_left)}
										right={percentage(data.metering.phones_right)}
										balance={balance(data.metering.phones_left, data.metering.phones_right)}/>
						</div>
					</div>
				</ContainerContent>
			</Container>
			
			<ChannelRow socket={socket}/>
		</div>
	);
};

export default Monitor;