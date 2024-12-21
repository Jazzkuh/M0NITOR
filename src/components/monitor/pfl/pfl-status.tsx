import {MonitoringData} from "@/types/monitor";
import {Button} from "@/components/ui/button";

const PFLStatus = ({data, channel, channelName}: {data: MonitoringData; channel: number; channelName: string}) => {
	if (!data) {
		return (
			<Button variant={"secondary"} disabled={true} className={"w-full text-xxs"}>{channelName}</Button>
		)
	}
	
	function channelData() {
		return data.faderStatuses[channel];
	}
	
	function toggleChannel() {
		fetch("http://141.224.204.8:8082/pfl/" + (channel + 1));
	}
	
	if (channelData().cueActive) return (
		<Button variant={"gold"} className={"w-full text-xxs"} onClick={toggleChannel}>PFL<br/>{channelName}</Button>
	)
	
	return (
		<Button variant={"secondary"} className={"w-full text-xxs"} onClick={toggleChannel}>PFL<br/>{channelName}</Button>
	);
};

export default PFLStatus;