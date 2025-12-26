"use client";

import {MonitoringData} from "@/types/monitor";
import {Button} from "@/components/ui/button";
import axios from "axios";
import React from "react";
import {Badge} from "@/components/ui/badge";
import MiniAudiometer from "@/components/audio/mini-audiometer";

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


    function percentage(db: number) {
        const MIN_DB = -30;
        const MAX_DB = 5;

        const clamped = Math.min(MAX_DB, Math.max(MIN_DB, db));
        return ((clamped - MIN_DB) / (MAX_DB - MIN_DB)) * 100;
    }

	return (
		<div className="rounded-sm bg-sidebar w-full h-full p-1.5 border-b-4 border-t-4" style={{
			borderColor: channelData().fader_active && channelData().channel_on ? channelColor() : (channelData().fader_active ? channelColor() : "#242428")
		}}>
            <div className="flex flex-col items-center pb-1">
                <p className="text-xs text-muted-foreground">{channelData().name}</p>
            </div>
            <div className="flex gap-2">
                <div className="flex flex-col items-center">
                    <div className="pb-1.5">
                        {channelData().channel_on ? (
                                <Badge variant={"green"} className="py-0.5 px-4 text-[0.65rem]">ON</Badge>
                            ) :
                            <Badge variant={"destructive"} className="py-0.5 px-4 text-[0.65rem]">ON</Badge>
                        }
                    </div>

                    <div className="flex flex-row gap-2">
                        <Button onClick={pfl} size="xs" className="px-4" style={{
                            backgroundColor: channelData().cue_active ? "#68e178" : "#242428"
                        }}>PFL</Button>
                    </div>
                </div>

                <div className="flex-none w-8 h-[114px]">
                    <MiniAudiometer left={percentage(channelData().left)} right={percentage(channelData().right)}/>
                </div>
            </div>
		</div>
	)
};

export default ChannelStatus;