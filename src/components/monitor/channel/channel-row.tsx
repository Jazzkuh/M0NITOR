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
	
	if (!data) return;
	
	return (
		<div className="flex flex-row gap-3 justify-center">
			<ChannelStatus data={data} channelName="Mic 1" channel={0} />
			<ChannelStatus data={data} channelName="Aux 1" channel={1} />
			<ChannelStatus data={data} channelName="Aux 2" channel={2} />
			<ChannelStatus data={data} channelName="Voice 1" channel={3} />
			<ChannelStatus data={data} channelName="USB 1" channel={4} />
			<ChannelStatus data={data} channelName="USB 2" channel={5} />
			<ChannelStatus data={data} channelName="USB 3" channel={6} />
			<ChannelStatus data={data} channelName="USB 4" channel={7} />
		</div>
	);
};

export default ChannelRow;