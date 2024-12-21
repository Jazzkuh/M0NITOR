"use client";

import useWebSocket from "@/hooks/use-web-socket";
import {MonitoringData} from "@/types/monitor";
import {Container, ContainerContent, ContainerHeader, ContainerTitle} from "@/components/ui/container";
import ChannelStatus from "@/components/monitor/channel/channel-status";
import PFLStatus from "@/components/monitor/pfl/pfl-status";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

const PFLRow = ({socket}: {socket: ReturnType<typeof useWebSocket<MonitoringData>>}) => {
	return (
		<Container>
			<ContainerContent className="p-4 pt-0">
				<Badge variant={"blue"} className={"w-full py-2.5 justify-center"}>PFL Options</Badge>
				
				<div className="flex flex-row gap-2 justify-center pt-2">
					<PFLStatus socket={socket} channelName="MIC 1" channel={0} />
					<PFLStatus socket={socket} channelName="AUX 1" channel={1} />
					<PFLStatus socket={socket} channelName="AUX 2" channel={2} />
					<PFLStatus socket={socket} channelName="VOICE 1" channel={3} />
				</div>
				<div className="flex flex-row gap-2 justify-center pt-2">
					<PFLStatus socket={socket} channelName="MP A" channel={4} />
					<PFLStatus socket={socket} channelName="PC 1" channel={5} />
					<PFLStatus socket={socket} channelName="PC 2" channel={6} />
					<PFLStatus socket={socket} channelName="MP B" channel={7} />
				</div>
			</ContainerContent>
		</Container>
	);
};

export default PFLRow;