"use client";

import {MonitoringData} from "@/types/monitor";
import PFLButton from "@/components/monitor/pfl/pfl-button";
import {Separator} from "@/components/ui/separator";

const PFLRow = ({data}: {data: MonitoringData}) => {
	if (!data) return (
		<div className="flex justify-center items-center w-full h-full">
			<p className="text-muted-foreground">The websocket connection is not yet established.</p>
		</div>
	)
	
	return (
		<>
			<div className="rounded-lg bg-accent p-3 mt-3">
				<div className="flex flex-row gap-4">
					<div className="flex flex-col justify-center w-full">
						<div className="space-y-1">
							<h4 className="text-sm font-medium leading-none">PFL Options</h4>
							<p className="text-sm text-muted-foreground">
								Select an input source to listen to.
							</p>
						</div>
						
						<Separator className="my-2 bg-white/20" />
						
						<div className="flex flex-row gap-2 justify-center">
							<PFLButton state={data.cue_enabled} write={"reset"} text={"RESET"} />
							<PFLButton state={data.auto_cue_announcer} write={"autoann"} text={"RETURN"} />
							<PFLButton state={data.auto_cue_crm} write={"autocrm"} text={"CRM"} />
							<PFLButton state={data.cue_aux} write={"aux"} text={"AUX"} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PFLRow;