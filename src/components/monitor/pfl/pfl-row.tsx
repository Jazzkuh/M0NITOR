"use client";

import {MonitoringData} from "@/types/monitor";
import {Badge} from "@/components/ui/badge";
import PFLButton from "@/components/monitor/pfl/pfl-button";

const PFLRow = ({data}: {data: MonitoringData}) => {
	if (!data) return (
		<div className="flex justify-center items-center w-full h-full">
			<p className="text-muted-foreground">The websocket connection is not yet established.</p>
		</div>
	)
	
	return (
		<>
			<Badge variant={"blue"} className={"w-full py-2.5 justify-center"}>PFL Options</Badge>
			
			<div className="flex flex-row gap-2 justify-center pt-2">
			<PFLButton state={data.cue_enabled} write={"reset"} text={"RESET"} />
				<PFLButton state={data.auto_cue_announcer} write={"autoann"} text={"RETURN"} />
				<PFLButton state={data.auto_cue_crm} write={"autocrm"} text={"CRM"} />
				<PFLButton state={data.cue_aux} write={"aux"} text={"AUX"} />
			</div>
		</>
	);
};

export default PFLRow;