"use client";

import {useEffect, useRef} from "react";
import { useRouter } from "nextjs-toploader/app";
import useWebSocket from "@/hooks/use-web-socket";
import Hue from "@/components/hue/hue";
import {HueData} from "@/types/hue";

const HueDataComponent = () => {
	const router = useRouter();
	const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const socket = useWebSocket<HueData>("wss://141.224.204.8:8082/lights");
	
	useEffect(() => {
		if (!socket.isConnected) {
			reconnectTimeoutRef.current = setTimeout(() => {
				if (!socket.isConnected) {
					router.refresh();
					socket.closeConnection();
				}
			}, 1000);
		} else if (reconnectTimeoutRef.current) {
			clearTimeout(reconnectTimeoutRef.current);
			reconnectTimeoutRef.current = null;
		}
		
		return () => {
			if (reconnectTimeoutRef.current) {
				clearTimeout(reconnectTimeoutRef.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket.isConnected]);
	
	return (
		<>
			<Hue socket={socket}/>
		</>
	);
};

export default HueDataComponent;