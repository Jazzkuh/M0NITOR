"use client";

import useWebSocket from "@/hooks/use-web-socket";
import {MonitoringData} from "@/types/monitor";
import {Container, ContainerContent, ContainerHeader, ContainerTitle} from "@/components/ui/container";
import ChannelStatus from "@/components/monitor/channel/channel-status";
import PFLStatus from "@/components/monitor/pfl/pfl-status";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {useEffect, useState} from "react";
import PFLButton from "@/components/monitor/pfl/pfl-button";

const PFLRow = ({socket}: {socket: ReturnType<typeof useWebSocket<MonitoringData>>}) => {
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
			<ContainerContent className="p-4 pt-0">
				<div className="flex justify-center items-center w-full h-full">
					<p className="text-muted-foreground">The websocket connection is not yet established.</p>
				</div>
			</ContainerContent>
		</Container>
	)
	
	return (
		<Container>
			<ContainerContent className="p-4 pt-0">
				<Badge variant={"blue"} className={"w-full py-2.5 justify-center"}>PFL Options</Badge>
				
				<div className="flex flex-row gap-2 justify-center pt-2">
					<PFLButton state={data.cueEnabled} write={"resetpfl"} text={"RESET"} />
					<PFLButton state={data.autoCueANN} write={"pflautoann"} text={"RETURN"} />
					<PFLButton state={data.autoCueCRM} write={"pflautocrm"} text={"CRM"} />
					<PFLButton state={data.cueAux} write={"pflaux"} text={"AUX"} />
				</div>
			</ContainerContent>
		</Container>
	);
};

export default PFLRow;