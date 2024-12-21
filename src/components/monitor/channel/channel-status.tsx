"use client";

import {MonitoringData} from "@/types/monitor";
import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const ChannelStatus = ({data, channel, channelName}: {data: MonitoringData; channel: number; channelName: string}) => {
	function channelData() {
		return data.faderStatuses[channel];
	}
	
	function toggle() {
		fetch("http://141.224.204.8:8082/write/" + (channel + 1) + "/toggle");
	}
	
	function pfl() {
		fetch("http://141.224.204.8:8082/pfl/" + (channel + 1));
	}
	
	function controls() {
		return (
			<DropdownMenuContent>
				<DropdownMenuItem onClick={pfl}>{channelData().cueActive ? "Reset CUE" : "CUE Channel"}</DropdownMenuItem>
				<DropdownMenuItem onClick={toggle}>Channel {channelData().channelOn ? "Off" : "On"}</DropdownMenuItem>
			</DropdownMenuContent>
		);
	}
	
	if (channelData().faderActive && channelData().channelOn) return (
		<DropdownMenu>
			<DropdownMenuTrigger className="w-full">
				<Button variant={"green"} className={"w-full py-5 text-xs"}>{channelName}</Button>
			</DropdownMenuTrigger>
			{controls()}
		</DropdownMenu>
	)
	
	if (!channelData().channelOn) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger className="w-full">
					<Button variant={"destructive"} className={"w-full py-5 text-xs"}>{channelName}</Button>
				</DropdownMenuTrigger>
				{controls()}
			</DropdownMenu>
		)
	}
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="w-full">
				<Button variant={"secondary"} className={"w-full py-5 text-xs"}>{channelName}</Button>
			</DropdownMenuTrigger>
			{controls()}
		</DropdownMenu>
	);
};

export default ChannelStatus;