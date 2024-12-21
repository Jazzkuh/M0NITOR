import React from 'react'
import {MonitoringData} from "@/types/monitor";
import {Button} from "@/components/ui/button";
import {PauseIcon, PlayIcon, TrackNextIcon} from "@radix-ui/react-icons";

const SkipButton = ({ data }: {data: MonitoringData}) => {
	function toggle() {
		fetch("http://141.224.204.8:8082/spotify/next");
	}
	
	return (
		<Button variant="ghost" onClick={toggle} className={
			"h-16 w-16 rounded-full font-bold text-3xl hover:bg-black/80"
		}>
			<TrackNextIcon />
		</Button>
	)
}
export default SkipButton;