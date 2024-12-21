"use client";

import {useEffect, useState} from "react";
import useWebSocket from "@/hooks/use-web-socket";
import {MonitoringData} from "@/types/monitor";
import {Container, ContainerContent, ContainerHeader, ContainerTitle} from "@/components/ui/container";
import CoverArt from "@/components/music/cover-art";
import {Progress} from "@/components/ui/progress";
import PlayButton from "@/components/music/button/play-button";
import SkipButton from "@/components/music/button/skip-button";
import PreviousButton from "@/components/music/button/previous-button";
import Status from "@/components/monitor/status";

const NowPlaying = ({socket}: {socket: ReturnType<typeof useWebSocket<MonitoringData>>}) => {
	// @ts-ignore
	const [data, setData] = useState<MonitoringData>(null);
	
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
	
	function getProgress(current: number, max: number) {
		return (current / max) * 100;
	}
	
	function getDuration(duration: number) {
		const minutes = Math.floor(duration / 60000);
		const seconds = ((duration % 60000) / 1000).toFixed(0);
		return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
	}
	
	return (
		<div className="grid gap-4">
			<Container>
				<ContainerContent>
					<div className="flex bg-sidebar justify-between w-full mt-2">
						<div className="flex py-2 px-4 bg-sidebar rounded-md justify-between w-full">
							<div className="flex flex-col gap-0.5">
								<p className="font-semibold text-2xl">Now Playing</p>
								<p className="text-xs text-muted-foreground">
									Detailed information about the currently playing track on Spotify.
								</p>
							</div>
							
							<div className="pt-1.5">
								<div className="flex flex-row gap-3">
									<Status socket={socket} offset={true}/>
								</div>
							</div>
						</div>
					</div>
					
					<div className="flex flex-row gap-4 mt-2">
						<div>
							<CoverArt trackId={data.spotify.trackId}/>
						</div>
						
						<div className="flex flex-col justify-center w-full">
							<p className="font-bold text-3xl leading-none tracking-tight">{data.spotify.track}</p>
							<p className="text-xl text-muted-foreground">{data.spotify.artist}</p>
							
							<div className="flex flex-col mt-2">
								<Progress value={getProgress(data.spotify.position, data.spotify.length)} className={
									"w-[100%] bg-white/20"
								}/>
								<div className="flex flex-row">
									<p className="text-muted-foreground w-full">
										{getDuration(data.spotify.position)}
									</p>
									
									<p className="text-muted-foreground">
										{getDuration(data.spotify.length)}
									</p>
								</div>
								
								<div className="flex flex-row justify-center pt-3">
									<PreviousButton data={data}/>
									<PlayButton data={data}/>
									<SkipButton data={data}/>
								</div>
							</div>
						</div>
					</div>
				</ContainerContent>
			</Container>
		</div>
	);
};

export default NowPlaying;