import React from 'react'
import {MonitoringData} from "@/types/monitor";
import {Button} from "@/components/ui/button";
import {PauseIcon, PlayIcon} from "@radix-ui/react-icons";

const PlayButton = ({ data }: {data: MonitoringData}) => {
	function toggle() {
		fetch("http://141.224.204.8:8082/spotify/play");
	}
	
	if (!data.spotify.playing) return (
		<Button variant="secondary" onClick={toggle} className={
			"h-16 w-16 rounded-full font-bold text-3xl"
		}>
			<PlayIcon />
		</Button>
	)
	
	return (
		<Button variant="secondary" onClick={toggle} className={
			"h-16 w-16 rounded-full font-bold text-3xl"
		}>
			<PauseIcon />
		</Button>
	)
}
export default PlayButton;