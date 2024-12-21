"use client";

import useWebSocket from "@/hooks/use-web-socket";
import {MonitoringData} from "@/types/monitor";
import {Container, ContainerContent, ContainerHeader, ContainerTitle} from "@/components/ui/container";
import ChannelStatus from "@/components/monitor/channel/channel-status";

const ChannelRow = ({socket}: {socket: ReturnType<typeof useWebSocket<MonitoringData>>}) => {
	return (
		<Container>
			<ContainerContent className="p-4">
				<div className="flex flex-row gap-4 justify-center">
					<ChannelStatus socket={socket} channelName="MIC 1" channel={0} />
					<ChannelStatus socket={socket} channelName="AUX 1" channel={1} />
					<ChannelStatus socket={socket} channelName="AUX 2" channel={2} />
					<ChannelStatus socket={socket} channelName="VOICE 1" channel={3} />
					<ChannelStatus socket={socket} channelName="MULTIPLAYER A" channel={4} />
					<ChannelStatus socket={socket} channelName="PC 1" channel={5} />
					<ChannelStatus socket={socket} channelName="PC 2" channel={6} />
					<ChannelStatus socket={socket} channelName="MULTIPLAYER B" channel={7} />
				</div>
			</ContainerContent>
		</Container>
	);
};

export default ChannelRow;