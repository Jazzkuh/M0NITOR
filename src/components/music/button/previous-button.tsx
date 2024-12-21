import React from 'react'
import {MonitoringData} from "@/types/monitor";
import {Button} from "@/components/ui/button";
import {PauseIcon, PlayIcon, TrackNextIcon, TrackPreviousIcon} from "@radix-ui/react-icons";

const PreviousButton = ({ data }: {data: MonitoringData}) => {
	function toggle() {
		fetch("http://141.224.204.8:8082/spotify/previous");
	}
	
	return (
		<Button variant="ghost" onClick={toggle} className={
			"h-16 w-16 rounded-full font-bold text-3xl hover:bg-sidebar"
		}>
			<TrackPreviousIcon />
		</Button>
	)
}
export default PreviousButton;