"use client";

import useWebSocket from "@/hooks/use-web-socket";
import {MonitoringData} from "@/types/monitor";
import {Container, ContainerContent, ContainerHeader, ContainerTitle} from "@/components/ui/container";
import ChannelStatus from "@/components/monitor/channel/channel-status";
import {useEffect, useState} from "react";

const ChannelRow = ({socket}: {socket: ReturnType<typeof useWebSocket<MonitoringData>>}) => {
	// @ts-ignore
	const [data, setData] = useState<MonitoringData>(null);
	
	useEffect(() => {
		if (!socket.socket) return;
		
		socket.socket.addEventListener("message", (event) => {
			setData(JSON.parse(event.data));
		});
	}, [socket.socket]);
	
	if (!data) return (
		<Container>
			<ContainerContent className="p-4">
				<div className="flex justify-center items-center w-full h-full">
					<p className="text-muted-foreground">The websocket connection is not yet established.</p>
				</div>
			</ContainerContent>
		</Container>
	)
	
	return (
		<Container>
			<ContainerContent className="p-4">
				<div className="flex flex-row gap-4 justify-center">
					<ChannelStatus data={data} channelName="MIC 1" channel={0} />
					<ChannelStatus data={data} channelName="AUX 1" channel={1} />
					<ChannelStatus data={data} channelName="AUX 2" channel={2} />
					<ChannelStatus data={data} channelName="VOICE 1" channel={3} />
					<ChannelStatus data={data} channelName="MULTIPLAYER A" channel={4} />
					<ChannelStatus data={data} channelName="PC 1" channel={5} />
					<ChannelStatus data={data} channelName="PC 2" channel={6} />
					<ChannelStatus data={data} channelName="MULTIPLAYER B" channel={7} />
				</div>
			</ContainerContent>
		</Container>
	);
};

export default ChannelRow;