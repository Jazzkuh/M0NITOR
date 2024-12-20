"use client";

import {useEffect, useState} from "react";
import useWebSocket from "@/hooks/use-web-socket";
import {MonitoringData} from "@/types/monitor";
import {Container, ContainerContent, ContainerHeader, ContainerTitle} from "@/components/ui/container";
import AudioMeter from "@/components/audio/audiometer";
import {balance, percentage} from "@/lib/utils";
import ClockComponent from "@/components/clock/ClockComponent";
import Status from "@/components/monitor/status";
import {Button} from "@/components/ui/button";

const ChannelStatus = ({socket, channel, channelName}: {socket: ReturnType<typeof useWebSocket<MonitoringData>>; channel: number; channelName: string}) => {
	// @ts-ignore
	const [data, setData] = useState<MonitoringData>(null);
	
	useEffect(() => {
		if (!socket.socket) return;
		
		socket.socket.addEventListener("message", (event) => {
			setData(JSON.parse(event.data));
		});
	}, [socket.socket]);

	if (!data) {
		return (
			<Button disabled={true} variant={"default"}>{channelName}</Button>
		)
	}
	
	function channelData() {
		return data.faderStatuses[channel];
	}
	
	function toggleChannel() {
		fetch("http://141.224.204.8:8082/write/" + (channel + 1) + "/toggle");
	}
	
	
	if (channelData().faderActive && channelData().channelOn) return (
		<Button variant={"default"} className={"w-full py-5"} onClick={toggleChannel}>{channelName}</Button>
	)
	
	if (!channelData().channelOn) {
		return (
			<Button variant={"destructive"} className={"w-full py-5"}  onClick={toggleChannel}>{channelName}</Button>
		)
	}
	
	return (
		<Button variant={"secondary"} className={"w-full py-5"}  onClick={toggleChannel}>{channelName}</Button>
	);
};

export default ChannelStatus;