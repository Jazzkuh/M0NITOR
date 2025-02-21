"use client";

import {Button} from "@/components/ui/button";
import axios from "axios";
import React from "react";

const PFLButton = ({state, write, text}: {state: boolean; write: string; text: string}) => {
	if (!state) {
		return (
			<Button variant={"card"} className={`w-full text-xxs`} onClick={toggle}>PFL<br/>{text}</Button>
		)
	}
	
	function toggle() {
		axios.post("/api/pfl/control", {
			value: write
		});
	}
	
	return (
		<Button variant={"orange"} className={`w-full text-accent`} style={{fontSize: "0.625rem", lineHeight: "0.8rem"}} onClick={toggle}>PFL<br/>{text}</Button>
	);
};

export default PFLButton;