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

const Monitor = ({socket}: {socket: ReturnType<typeof useWebSocket<MonitoringData>>}) => {
	// @ts-ignore
	const [data, setData] = useState<MonitoringData>(null);
	
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
		<div className="grid gap-4">
			<Container>
				<ContainerContent>
					<div className="flex bg-sidebar justify-between w-full mt-2">
						<div className="flex py-2 px-4 bg-sidebar rounded-md justify-between w-full">
							<div className="flex flex-col gap-0.5">
								<p className="font-semibold text-2xl">Monitoring</p>
								<p className="text-xs text-muted-foreground">
									Curently monitoring the audio levels of the PGM, CRM and PFL signals.
								</p>
							</div>
							
							<div className="pt-1.5">
								<div className="flex flex-row gap-3">
									{data.micOn ? (
										<Badge variant={"destructive"} className="py-1 text-xs">MIC ON</Badge>
									) : null}
									<Status socket={socket} offset={data.micOn}/>
								</div>
							</div>
						</div>
					</div>
					
					<div className="flex flex-row justify-between mt-2">
						<div className="flex flex-row">
							<AudioMeter text="PGM" left={percentage(data.meteringValues.CRM_L)}
										right={percentage(data.meteringValues.CRM_R)}
										balance={balance(data.meteringValues.CRM_L, data.meteringValues.CRM_R)}/>
							
							<div className="ml-12">
								<AudioMeter text="CRM" left={percentage(data.meteringValues.PROG_L)}
											right={percentage(data.meteringValues.PROG_R)}
											balance={balance(data.meteringValues.PROG_L, data.meteringValues.PROG_R)}/>
							</div>
						</div>
						
						<div className="w-full mx-8 flex flex-col">
							<ClockComponent data={data}/>
							
							<div className="pt-3">
								<PFLRow socket={socket} />
							</div>
						</div>
						
						<div>
							<AudioMeter text="PFL" left={percentage(data.meteringValues.PHONES_L)}
										right={percentage(data.meteringValues.PHONES_R)}
										balance={balance(data.meteringValues.PHONES_L, data.meteringValues.PHONES_R)}/>
						</div>
					</div>
				</ContainerContent>
			</Container>
			
			<ChannelRow socket={socket}/>
		</div>
	);
};

export default Monitor;