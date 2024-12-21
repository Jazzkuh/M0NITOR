"use client";

import {Button} from "@/components/ui/button";

const PFLButton = ({state, write, text}: {state: boolean; write: string; text: string}) => {
	if (!state) {
		return (
			<Button variant={"secondary"} className={"w-full text-xxs"} onClick={toggle}>PFL<br/>{text}</Button>
		)
	}
	
	function toggle() {
		fetch(`http://141.224.204.8:8082/write/${write}`);
	}
	
	return (
		<Button variant={"gold"} className={"w-full text-xxs"} onClick={toggle}>PFL<br/>{text}</Button>
	);
};

export default PFLButton;