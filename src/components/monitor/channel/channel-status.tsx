"use client";

import {MonitoringData} from "@/types/monitor";
import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import axios from "axios";

const ChannelStatus = ({data, channel, channelName}: {data: MonitoringData; channel: number; channelName: string}) => {
	function channelData() {
		return data.faders[channel];
	}
	
	function toggle() {
		axios.post("/api/channel", {
			channel: channel + 1
		});
	}
	
	function pfl() {
		axios.post("/api/pfl/channel", {
			channel: channel + 1
		});
	}
	
	function controls() {
		return (
			<DropdownMenuContent>
				<DropdownMenuItem onClick={pfl}>{channelData().cue_active ? "Reset CUE" : "CUE Channel"}</DropdownMenuItem>
				<DropdownMenuItem onClick={toggle}>Channel {channelData().channel_on ? "Off" : "On"}</DropdownMenuItem>
			</DropdownMenuContent>
		);
	}
	
	if (channelData().fader_active && channelData().channel_on) return (
		<DropdownMenu>
			<DropdownMenuTrigger className="w-full">
				<Button variant={"green"} className={"w-full py-4 border-2 border-[#4D9640] text-xxs"}>{channelName}</Button>
			</DropdownMenuTrigger>
			{controls()}
		</DropdownMenu>
	)
	
	if (!channelData().channel_on) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger className="w-full">
					<Button variant={"destructive"} className={"w-full py-4 border-2 border-destructive text-xxs"}>{channelName}</Button>
				</DropdownMenuTrigger>
				{controls()}
			</DropdownMenu>
		)
	}
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="w-full">
				<Button variant={"secondary"} className={`w-full py-4 border-2 text-xxs${
					channelData().cue_active ? " border-[#4D9640]" : " border-accent"
				}`}>{channelName}</Button>
			</DropdownMenuTrigger>
			{controls()}
		</DropdownMenu>
	);
};

export default ChannelStatus;