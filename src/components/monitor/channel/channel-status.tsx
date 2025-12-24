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

const ChannelStatus = ({data, channel}: {data: MonitoringData; channel: number;}) => {
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
		// if (channel == 0) {
		// 	return "#ea3b49";
		// }
		//
		return "#68e178";
	}
	
	function getColor(channelOn: boolean, faderActive: boolean) {
		if (channelOn && faderActive) {
			return channelColor();
		}
		
		if (faderActive && !channelOn) {
			return "#242428";
		}
		
		return "#242428";
	}
	
	return (
		<div className="rounded-sm bg-sidebar w-full p-2 border-b-4 border-t-4" style={{
			borderColor: channelData().fader_active && channelData().channel_on ? channelColor() : (channelData().fader_active ? channelColor() : "#242428")
		}}>
			<div className="flex flex-col items-center">
				<p className="text-xs text-muted-foreground pb-1">{channelData().name}</p>
                <div className="pb-3">
                    {channelData().channel_on ? (
                        <Badge variant={"green"} className="py-1 text-xs">Channel On</Badge>
                    ) :
                        <Badge variant={"destructive"} className="py-1 text-xs">Channel Off</Badge>
                    }
                </div>

				<div className="flex flex-row gap-2">
					<Button onClick={pfl} className="text-xxs" style={{
						backgroundColor: channelData().cue_active ? "#68e178" : "#242428"
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