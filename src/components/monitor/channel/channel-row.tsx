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
			<ChannelStatus data={data} channel={0} />
			<ChannelStatus data={data} channel={1} />
			<ChannelStatus data={data} channel={2} />
			<ChannelStatus data={data} channel={3} />
			<ChannelStatus data={data} channel={4} />
			<ChannelStatus data={data} channel={5} />
			<ChannelStatus data={data} channel={6} />
			<ChannelStatus data={data} channel={7} />
            <ChannelStatus data={data} channel={8} />
            <ChannelStatus data={data} channel={9} />
		</div>
	);
};

export default ChannelRow;