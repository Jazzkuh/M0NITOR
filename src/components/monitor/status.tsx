"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const Status = ({socket, offset}: {socket: any, offset: boolean}) => {
	return (
		<Tooltip>
			<TooltipTrigger>
				<div
					style={{
						backgroundColor: socket.isConnecting ? "#ff753f" : socket.isConnected ? "#4CAF50" : "#F44336",
					}}
					className={"rounded-full h-4 w-4 animate-pulse" + (!offset ? " mt-1" : "")}
				/>
			</TooltipTrigger>
			<TooltipContent style={{
				backgroundColor: socket.isConnecting ? "#ff753f" : socket.isConnected ? "#4CAF50" : "#F44336",
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