"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const Status = ({socket, offset}: {socket: any, offset: boolean}) => {
	return (
		<Tooltip>
			<TooltipTrigger>
				<div
					style={{
						backgroundColor: socket.isConnecting ? "#fd9c2d" : socket.isConnected ? "#68e178" : "#ea3b49",
						marginTop: !offset ? "5px" : "0",
					}}
					className={"rounded-full h-4 w-4 animate-pulse"}
				/>
			</TooltipTrigger>
			<TooltipContent style={{
				backgroundColor: socket.isConnecting ? "#fd9c2d" : socket.isConnected ? "#68e178" : "#ea3b49",
			}}>
				{socket.isConnecting
					? "Connecting"
					: socket.isConnected
						? "Connected"
						: "Disconnected"}
			</TooltipContent>
		</Tooltip>
	);
};

export default Status;