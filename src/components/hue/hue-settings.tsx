"use client";

import React, {useEffect, useState} from "react";
import useWebSocket from "@/hooks/use-web-socket";
import {MonitoringData} from "@/types/monitor";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import axios from "axios";
import { Label } from "@/components/ui/label"
import {DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";

const HueSettings = ({socket}: {socket: ReturnType<typeof useWebSocket<MonitoringData>>}) => {
	// @ts-ignore
	const [data, setData] = useState<MonitoringData>(null);
	
	useEffect(() => {
		if (!socket.socket) return;
		
		socket.socket.addEventListener("message", (event) => {
			setData(JSON.parse(event.data));
		});
	}, [socket.socket]);
	
	const scenes = [
		"Rio",
		"Disturbia",
		"Chinatown",
		"Lily",
		"Studio",
		"Pink"
	];
	
	if (!data) return (
		<div className="flex flex-1 flex-col p-4 pt-0">
			<div className="flex justify-center items-center w-full h-full">
				<p className="text-muted-foreground">The websocket connection is not yet established.</p>
			</div>
		</div>
	)
	
	function setScene( scene: string ) {
		axios.post("/api/hue/scene", {
			room: "Studio",
			scene: scene
		});
	}
	
	return (
		<div className="p-6 pt-0 flex flex-wrap gap-2">
			{scenes.sort((a, b) => a.localeCompare(b)).map((scene, index) => (
				<Button key={index} variant="orange" onClick={() => setScene(scene)} className="flex-auto mt-2">{scene}</Button>
			))}
		</div>
	);
};

export default HueSettings;