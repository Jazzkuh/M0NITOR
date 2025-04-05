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
import {Badge} from "@/components/ui/badge";

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
	
	function channelColor() {
		if (channel == 0 || channel == 2) {
			return "#cd2d25";
		}
		
		return "#3cab42";
	}
	
	function getColor(channelOn: boolean, faderActive: boolean) {
		if (channelOn && faderActive) {
			return channelColor();
		}
		
		if (faderActive && !channelOn) {
			return "#242428";
		}
		
		if (!channelOn) {
			return "#cd2d25";
		}
		
		return "#242428";
	}
	
	return (
		<div className="rounded-sm bg-sidebar w-full p-2 border-b-4 border-t-4" style={{
			borderColor: channelData().fader_active && channelData().channel_on ? channelColor() : (channelData().fader_active ? channelColor() : "#242428")
		}}>
			<div className="flex flex-col items-center">
				<p className="text-xs text-muted-foreground pb-2">{channelName}</p>
				<div className="flex flex-row gap-2">
					<Button onClick={pfl} className="text-xxs" style={{
						backgroundColor: channelData().cue_active ? "#3cab42" : "#242428"
					}}>PFL</Button>
					<Button onClick={toggle} className="text-xxs" style={{
						backgroundColor: getColor(channelData().channel_on, channelData().fader_active)
					}}>ON</Button>
				</div>
			</div>
		</div>
	)
};

export default ChannelStatus;