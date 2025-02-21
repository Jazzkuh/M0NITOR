"use client";

import {MonitoringData} from "@/types/monitor";
import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import React from "react";

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
	
	return (
		<div className="rounded-lg bg-sidebar w-full p-2 border-b-4 border-t-4" style={{
			borderColor: channelData().fader_active ? "#cd2d25" : "#242428"
		}}>
			<div className="flex flex-col items-center">
				<p className="text-xs text-muted-foreground pb-2">{channelName}</p>
				<div className="flex flex-row gap-2">
					<Button onClick={pfl} className="text-xxs" style={{
						backgroundColor: channelData().cue_active ? "#cd2d25" : "#242428"
					}}>PFL</Button>
					<Button onClick={toggle} className="text-xxs" style={{
						backgroundColor: channelData().channel_on ? "#cd2d25" : "#242428"
					}}>ON</Button>
				</div>
			</div>
		</div>
	)
};

export default ChannelStatus;