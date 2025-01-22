"use client";

import {useEffect, useState} from "react";
import useWebSocket from "@/hooks/use-web-socket";
import {HueData, Light} from "@/types/hue";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {Slider} from "@/components/ui/slider";

const Hue = ({socket}: {socket: ReturnType<typeof useWebSocket<HueData>>}) => {
	// @ts-ignore
	const [data, setData] = useState<HueData>(null);
	
	useEffect(() => {
		if (!socket.socket) return;
		
		socket.socket.addEventListener("message", (event) => {
			setData(JSON.parse(event.data));
		});
	}, [socket.socket]);
	
	if (!data) return (
		<div className="flex flex-1 flex-col p-4 pt-0">
			<div className="flex justify-center items-center w-full h-full">
				<p className="text-muted-foreground">The websocket connection is not yet established.</p>
			</div>
		</div>
	)
	
	function toggleLight(light: Light) {
		axios.post("/api/hue/action", {
			action: light.on ? "off" : "on",
			light: light.name
		});
	}
	
	function setBrightness(light: Light, brightness: number) {
		axios.post("/api/hue/brightness", {
			brightness: brightness,
			light: light.name,
		});
	}
	
	return (
		<div className="p-6">
			<div className="flex flex-col justify-center w-full">
				<div className="flex flex-row gap-4 mt-2 justify-center">
					{data.lights.map((light, index) => (
						<div key={index} className="flex flex-col gap-4 items-center">
							<div className="flex flex-col justify-center gap-3">
								<p className="font-bold text-lg leading-none tracking-tight">{light.name}</p>
								<p className="text-lg text-muted-foreground">{light.on ? "On" : "Off"}</p>
								
								<Button onClick={() => {
									toggleLight(light);
								}}>
									{light.on ? "Off" : "On"}
								</Button>
								
								<Slider className="w-full"
									min={0}
									max={254}
									defaultValue={[light.brightness]}
									onValueChange={(value) => {
										setBrightness(light, value[0]);
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Hue;