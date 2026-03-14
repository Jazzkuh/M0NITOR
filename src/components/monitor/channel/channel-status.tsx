"use client";

import {MonitoringData} from "@/types/monitor";
import {Button} from "@/components/ui/button";
import axios from "axios";
import React from "react";

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

	const fader = channelData();
	const isLive = fader.fader_active && fader.channel_on;
	const isCued = fader.cue_active;

	const accentColor = isCued ? "#fd9c2d" : isLive ? "#68e178" : "rgba(255,255,255,0.12)";
	const bg = isCued
		? "rgba(253,156,45,0.08)"
		: isLive
		? "rgba(104,225,120,0.07)"
		: "rgba(255,255,255,0.04)";

	const levelPct = Math.max(0, Math.min(100, ((fader.fader_level ?? 0) / 1024) * 100));

	return (
		<div className="rounded-md overflow-hidden w-full h-full flex flex-col" style={{ backgroundColor: bg }}>
			{/* Fader level bar — top accent */}
			<div style={{ height: 3, backgroundColor: "rgba(255,255,255,0.06)" }}>
				<div
					style={{
						height: "100%",
						width: `${levelPct}%`,
						backgroundColor: accentColor,
						transition: "width 0.1s linear",
					}}
				/>
			</div>

			{/* Content */}
			<div className="flex flex-col px-2 py-1.5 gap-1.5">
				<div className="flex items-center gap-1">
					<div
						className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${isLive && !isCued ? "animate-pulse" : ""}`}
						style={{ backgroundColor: accentColor }}
					/>
					<span className="text-xs font-semibold uppercase tracking-wider truncate" style={{ color: accentColor }}>
						{fader.name}
					</span>
				</div>

				<div className="flex flex-row gap-1.5">
					<Button onClick={toggle} size="xs" className="px-3 flex-1" style={{
						backgroundColor: fader.channel_on ? "#68e178" : "rgba(255,255,255,0.08)",
						color: fader.channel_on ? "#000" : "rgba(255,255,255,0.6)",
					}}>ON</Button>
					<Button onClick={pfl} size="xs" className="px-3 flex-1" style={{
						backgroundColor: fader.cue_active ? "#fd9c2d" : "rgba(255,255,255,0.08)",
						color: fader.cue_active ? "#000" : "rgba(255,255,255,0.6)",
					}}>PFL</Button>
				</div>
			</div>
		</div>
	)
};

export default ChannelStatus;
