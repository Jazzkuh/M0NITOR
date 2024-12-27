import React from 'react'
import {MonitoringData} from "@/types/monitor";
import {Button} from "@/components/ui/button";
import {PauseIcon, PlayIcon, TrackNextIcon, TrackPreviousIcon} from "@radix-ui/react-icons";
import axios from "axios";

const PreviousButton = ({ data }: {data: MonitoringData}) => {
	function toggle() {
		axios.post("/api/media", {
			action: "previous"
		});
	}
	
	return (
		<Button variant="ghost" onClick={toggle} className={
			"h-16 w-16 rounded-full font-bold text-3xl hover:bg-black/80"
		}>
			<TrackPreviousIcon />
		</Button>
	)
}
export default PreviousButton;